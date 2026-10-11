// Renders a compact GitHub stats card styled like assets/terminal.svg: all-time contributions,
// active days, longest streak, pull requests and top languages by commit.
//
// Usage: node stats-card.mjs <output.svg>
// Env:   GH_LOGIN  account to summarize
//        GH_TOKEN  workflow token, or a read-only PAT to also count languages from private repos
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';

const WIDTH = 840;
const HEIGHT = 160;
const FONT = '"Fira Code", "JetBrains Mono", Consolas, Menlo, "DejaVu Sans Mono", "Courier New", monospace';
const BAR = { x: 24, y: 122, width: WIDTH - 48, height: 6 };

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const num = (n) => n.toLocaleString('en-US');

function renderCard({ since, contributions, activeDays, longestStreak, pullRequests, languages }) {
  const kpis = [
    [num(contributions), `contributions since ${since}`],
    [num(activeDays), 'active days'],
    [`${longestStreak} days`, 'longest streak'],
    [num(pullRequests), 'pull requests'],
  ];
  const column = BAR.width / kpis.length;
  const kpiSvg = kpis
    .map(([value, label], i) => {
      const x = BAR.x + i * column;
      const divider = i ? `<line x1="${x - 16}" y1="72" x2="${x - 16}" y2="108" stroke="#21262d" />` : '';
      return `${divider}<g class="in" style="animation-delay:${200 + i * 120}ms"><text x="${x}" y="90" class="n">${esc(value)}</text><text x="${x}" y="107" class="l">${esc(label)}</text></g>`;
    })
    .join('');

  // Top five languages plus "Other", as a segmented bar with an inline legend
  const top = languages.slice(0, 5);
  const rest = languages.slice(5).reduce((sum, l) => sum + l.count, 0);
  if (rest) top.push({ name: 'Other', color: '#6e7681', count: rest });
  const total = top.reduce((sum, l) => sum + l.count, 0);
  let barX = BAR.x;
  let legendX = BAR.x;
  const segments = [];
  const legend = [];
  top.forEach((lang, i) => {
    const share = lang.count / total;
    const width = share * BAR.width;
    const delay = 700 + i * 90;
    segments.push(`<rect class="grow" style="animation-delay:${delay}ms" x="${barX.toFixed(1)}" y="${BAR.y}" width="${Math.max(width - 2, 1).toFixed(1)}" height="${BAR.height}" fill="${lang.color}" />`);
    const pct = `${Math.round(share * 100)}%`;
    legend.push(`<g class="in" style="animation-delay:${delay}ms"><circle cx="${legendX + 4}" cy="142" r="4" fill="${lang.color}" /><text x="${legendX + 13}" y="146" class="g">${esc(lang.name)} <tspan class="l">${pct}</tspan></text></g>`);
    barX += width;
    legendX += (lang.name.length + pct.length + 1) * 7 + 30;
  });

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" role="img" aria-labelledby="t">
  <title id="t">GitHub stats: ${num(contributions)} contributions since ${since}, ${num(activeDays)} active days, ${longestStreak}-day longest streak, ${num(pullRequests)} pull requests</title>
  <style>
    text { font-family: ${FONT}; fill: #c9d1d9; }
    .u { fill: #3fb950; } .p { fill: #58a6ff; }
    .n { font-size: 22px; font-weight: 700; fill: #58a6ff; }
    .l { font-size: 11.5px; fill: #8b949e; }
    .g { font-size: 11.5px; }
    .in { animation: in .6s ease-out backwards; }
    @keyframes in { from { opacity: 0; transform: translateY(4px); } }
    .grow { transform-box: fill-box; transform-origin: 0 50%; animation: grow .6s ease-out backwards; }
    @keyframes grow { from { transform: scaleX(0); } }
    @media (prefers-reduced-motion: reduce) { * { animation: none !important; } }
  </style>
  <defs><clipPath id="bar"><rect x="${BAR.x}" y="${BAR.y}" width="${BAR.width}" height="${BAR.height}" rx="3" /></clipPath></defs>
  <rect x="0.5" y="0.5" width="${WIDTH - 1}" height="${HEIGHT - 1}" rx="10" fill="#0d1117" stroke="#30363d" />
  <path d="M10.5 0.5 H${WIDTH - 10.5} A10 10 0 0 1 ${WIDTH - 0.5} 10.5 V32.5 H0.5 V10.5 A10 10 0 0 1 10.5 0.5 Z" fill="#161b22" />
  <line x1="0.5" y1="32.5" x2="${WIDTH - 0.5}" y2="32.5" stroke="#30363d" />
  <circle cx="18" cy="16.5" r="5.5" fill="#ff5f56" />
  <circle cx="36" cy="16.5" r="5.5" fill="#ffbd2e" />
  <circle cx="54" cy="16.5" r="5.5" fill="#27c93f" />
  <text x="${WIDTH / 2}" y="21" text-anchor="middle" class="l" style="font-size:12px">eberth@sec: ~/stats</text>
  <text x="24" y="58" style="font-size:13px"><tspan class="u">eberth@sec</tspan>:<tspan class="p">~</tspan>$ gh stats --all-time</text>
  ${kpiSvg}
  ${segments.length ? `<g clip-path="url(#bar)">${segments.join('')}</g>${legend.join('')}` : ''}
</svg>
`;
}

async function graphql(token, query, variables) {
  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: { Authorization: `bearer ${token}`, 'Content-Type': 'application/json', 'User-Agent': 'profile-stats-card' },
    body: JSON.stringify({ query, variables }),
  });
  const body = await res.json();
  if (!res.ok || body.errors) throw new Error(`GraphQL request failed: ${JSON.stringify(body.errors ?? body)}`);
  return body.data;
}

const YEAR_QUERY = `query($login: String!, $from: DateTime!, $to: DateTime!) {
  user(login: $login) {
    contributionsCollection(from: $from, to: $to) {
      totalPullRequestContributions
      contributionCalendar { totalContributions weeks { contributionDays { date contributionCount } } }
      commitContributionsByRepository(maxRepositories: 100) {
        repository { primaryLanguage { name color } }
        contributions { totalCount }
      }
    }
  }
}`;

async function fetchStats(login, token) {
  const { user } = await graphql(token, 'query($login: String!) { user(login: $login) { contributionsCollection { contributionYears } } }', { login });
  const years = [...user.contributionsCollection.contributionYears].sort((a, b) => a - b);
  const now = new Date();

  let contributions = 0;
  let pullRequests = 0;
  const days = new Map();
  const languages = new Map();
  for (const year of years) {
    // A contributions collection may span at most one year, so query each calendar year
    const to = year === now.getUTCFullYear() ? now.toISOString() : `${year}-12-31T23:59:59Z`;
    const { user: { contributionsCollection: c } } = await graphql(token, YEAR_QUERY, { login, from: `${year}-01-01T00:00:00Z`, to });
    contributions += c.contributionCalendar.totalContributions;
    pullRequests += c.totalPullRequestContributions;
    for (const week of c.contributionCalendar.weeks) {
      for (const day of week.contributionDays) days.set(day.date, day.contributionCount);
    }
    for (const { repository, contributions: commits } of c.commitContributionsByRepository) {
      const lang = repository.primaryLanguage;
      if (!lang) continue;
      const entry = languages.get(lang.name) ?? { name: lang.name, color: lang.color ?? '#8b949e', count: 0 };
      entry.count += commits.totalCount;
      languages.set(lang.name, entry);
    }
  }

  let activeDays = 0;
  let longestStreak = 0;
  let streak = 0;
  for (const date of [...days.keys()].sort()) {
    if (days.get(date) > 0) {
      activeDays += 1;
      streak += 1;
      longestStreak = Math.max(longestStreak, streak);
    } else {
      streak = 0;
    }
  }

  return {
    since: years[0] ?? now.getUTCFullYear(),
    contributions,
    activeDays,
    longestStreak,
    pullRequests,
    languages: [...languages.values()].sort((a, b) => b.count - a.count),
  };
}

const out = process.argv[2] ?? 'dist/stats.svg';
const { GH_LOGIN: login, GH_TOKEN: token } = process.env;
if (!login || !token) {
  console.error('GH_LOGIN and GH_TOKEN are required');
  process.exit(1);
}
const stats = await fetchStats(login, token);
await mkdir(dirname(out), { recursive: true });
await writeFile(out, renderCard(stats));
console.log(`Wrote ${out}`, { ...stats, languages: stats.languages.map((l) => `${l.name}:${l.count}`) });
