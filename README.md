<div align="center">

# Hi, I'm Eberth Alarcón 👋

[![Typing SVG](https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=22&pause=1000&color=0A66C2&center=true&vCenter=true&width=700&lines=Cybersecurity+Engineer;AI+Security;AI+Solutions+Architect;I+write+my+own+Python+security+tooling)](https://github.com/Eberth-sys)

**Cybersecurity Engineer · AI Security · AI Solutions Architect · Pentesting · Custom Python security tooling**

📍 Santiago, Chile · 🕐 UTC-4/-3

</div>

---

Cybersecurity engineer based in Santiago, Chile, with 10+ years in IT, networks and infrastructure. My angle is applying traditional, battle-tested security discipline to the new attack surface of AI and LLM systems.

I built and ran the full IT and security function for a ~60-person organization from the ground up, then designed and secured, as its sole engineer, an on-premises LLM voice agent. I also write my own security tooling in Python.

---

## 🛠️ What I do — Focus areas

- **AI/LLM security** — prompt-injection defense, canary tokens, output validation and excessive-agency controls, mapped to the OWASP LLM Top 10, MITRE ATLAS and NIST AI RMF
- **Threat modeling & secure SDLC** — threat modeling practices, security design reviews, AI-assisted development under human review
- **Penetration testing** — internal pentesting, vulnerability management with CVSS-based prioritization, and remediation
- **Identity & access management** — Active Directory, Entra ID hybrid identity, MFA and identity lifecycle
- **Network & endpoint security** — GPO-based hardening, centralized EDR/antivirus, VLAN segmentation and VPN
- **Incident response** — detection, containment and security awareness for a ~60-person org
- **IoT security** — device and network security informed by IoT postgraduate work
- **Custom Python tooling** — building my own scripts and utilities for security tasks

---

## 🚀 Featured projects

### On-premises AI voice agent for customer calls — sole engineer (2025–2026)

A fully local LLM voice pipeline over SIP/RTP (Faster-Whisper, **Ollama**, **LangChain**, Piper, Silero VAD) in **Docker**, with no dependency on external AI services, built secure-by-design with 12-factor configuration (environment-based settings, no hardcoded values). Taken to preproduction on a GPU server.

- Code, not the model, controls consent, data capture and actions; the LLM has no tool access
- Layered guardrails: prompt-injection detection, per-session canary tokens and output validation before speech
- Privacy by design: AI disclosure and consent, PII masking and credential redaction in logs
- Validated with 800+ real calls, including adversarial ones, and 6,600+ automated tests
- Controls mapped to the **OWASP LLM Top 10**, **MITRE ATLAS** and the **NIST AI RMF**

<sub>Company project: the source code is private.</sub>

### [Deauth-Alert](https://github.com/Eberth-sys/Deauth-Alert-WiFi-IoT-System) — Wi-Fi deauthentication-attack detection with IoT

Distributed IoT intrusion-detection system: ESP32 sensors detect 802.11 deauthentication frames and report over encrypted BLE to a Raspberry Pi 5; FastAPI/PostgreSQL backend with JWT, TLS/WSS and Telegram alerts; validated with aircrack-ng attacks. Postgraduate thesis at Universidad de Buenos Aires, graded 10/10.

---

## 🧰 Tech & tools

**Languages & core**

![Python](https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=white)
![Bash](https://img.shields.io/badge/Bash-4EAA25?style=flat&logo=gnubash&logoColor=white)
![Linux](https://img.shields.io/badge/Linux-FCC624?style=flat&logo=linux&logoColor=black)
![Ubuntu](https://img.shields.io/badge/Ubuntu-E95420?style=flat&logo=ubuntu&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=flat&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat&logo=fastapi&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat&logo=postgresql&logoColor=white)

**AI / LLM**

![Ollama](https://img.shields.io/badge/Ollama-000000?style=flat&logo=ollama&logoColor=white)
![LangChain](https://img.shields.io/badge/LangChain-1C3C3C?style=flat&logo=langchain&logoColor=white)

**Security tooling**

![Kali Linux](https://img.shields.io/badge/Kali_Linux-557C94?style=flat&logo=kalilinux&logoColor=white)
![Parrot Security](https://img.shields.io/badge/Parrot_Security-15E0ED?style=flat&logo=parrotsecurity&logoColor=black)
![Nmap](https://img.shields.io/badge/Nmap-0E83CD?style=flat)
![Burp Suite](https://img.shields.io/badge/Burp_Suite-FF6633?style=flat&logo=burpsuite&logoColor=white)
![Metasploit](https://img.shields.io/badge/Metasploit-2A0D45?style=flat&logo=metasploit&logoColor=white)
![OpenVAS](https://img.shields.io/badge/OpenVAS-66C430?style=flat)
![Wireshark](https://img.shields.io/badge/Wireshark-1679A7?style=flat&logo=wireshark&logoColor=white)

**Identity & directory**

![Active Directory](https://img.shields.io/badge/Active_Directory-0078D4?style=flat&logo=microsoft&logoColor=white)
![Microsoft Entra ID](https://img.shields.io/badge/Microsoft_Entra_ID-0078D4?style=flat&logo=microsoftentraid&logoColor=white)

**Networking & IoT**

![Cisco](https://img.shields.io/badge/Cisco-1BA0D7?style=flat&logo=cisco&logoColor=white)
![MikroTik](https://img.shields.io/badge/MikroTik-293239?style=flat&logo=mikrotik&logoColor=white)
![Raspberry Pi](https://img.shields.io/badge/Raspberry_Pi-A22846?style=flat&logo=raspberrypi&logoColor=white)
![ESP32](https://img.shields.io/badge/ESP32-E7352C?style=flat&logo=espressif&logoColor=white)

**Observability**

![Grafana](https://img.shields.io/badge/Grafana-F46800?style=flat&logo=grafana&logoColor=white)

**Frameworks & standards**

![OWASP](https://img.shields.io/badge/OWASP-000000?style=flat&logo=owasp&logoColor=white)
![MITRE ATT&CK](https://img.shields.io/badge/MITRE_ATT%26CK-CC0000?style=flat&logo=mitre&logoColor=white)
![NIST](https://img.shields.io/badge/NIST-005EA2?style=flat&logo=nist&logoColor=white)

<sub>Identity: Active Directory, Entra ID hybrid identity, SSO and MFA. Supported ISO/IEC 27001 audit readiness (company certified in 2026). Observability: Vector, Loki and Grafana in a local stack.</sub>

---

## 🎓 Education & certifications

- **Postgraduate Specialization in IoT** — Universidad de Buenos Aires (UBA); GPA 9.2/10, thesis graded 10/10; served as a thesis-defense examiner in 2026
- **Electronics Engineering degree, Telecommunications major** — Universidad Privada Dr. Rafael Belloso Chacín (URBE), Venezuela; graduated with honors
- **Diplomas in Cybersecurity Tools (2024) and Network Security (2023)** — Universidad de Santiago de Chile (USACH); Outstanding Student award in both
- **MikroTik Certified Security Engineer (MTCSE)** — valid through Nov 2026
- **CEH v13** — *in progress*
- Languages: Spanish (native), English (intermediate, conversational)

---

## 🤝 Let's connect

<div align="center">

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/eberthalarcon90/)

</div>

<!-- opcional: descomenta la siguiente linea si quieres senalar disponibilidad de forma publica -->
<!-- Open to remote opportunities in cybersecurity and AI security. -->
