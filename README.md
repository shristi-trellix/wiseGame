# Wise Detective - The Auto-Investigation Challenge

An interactive game demonstrating Trellix Wise's agentic flows for security alert triage and investigation.

## 🌐 Play Online

**🎮 Live Demo:** [https://wisegame.pages.dev/](https://wisegame.pages.dev/)

Experience the game directly in your browser - no installation required!

## 🎮 Game Overview

Deploy specialized Wise Agents across two realistic attack scenarios: investigate a credential theft attack (David Squiller) or an OT/ICS PLC hijacking (Manufacturing Floor Zero). Build confidence through correct agent selection, save analyst time, and demonstrate the power of AI-driven security operations with multi-source telemetry correlation.

### 🎯 Two Scenarios Available

1. **David Squiller - Enterprise IT Attack** (High Severity)
   - **Agents**: EDR, NDR, Identity, IVX (4 agents)
   - **Attack Type**: PowerShell credential stealer with C2 communication
   - **Time Savings**: 15.5 minutes saved through automation

2. **Manufacturing Floor Zero - OT/ICS Attack** (Critical Severity)
   - **Agents**: Splunk, S3, Oracle, OTMonitor, NDR (5 agents)
   - **Attack Type**: PLC hijacking via Modbus TCP protocol
   - **Time Savings**: 20 minutes saved through multi-source correlation

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm installed

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development Server

The app runs on [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
wiseGame/
├── src/
│   ├── components/          # React components
│   │   ├── GameBoard/       # Main game container
│   │   ├── SOCOverview/     # Start screen with alert swarm
│   │   ├── AgentToolbox/    # Left panel - draggable agents
│   │   ├── InvestigationGraph/ # Center panel - question cards
│   │   ├── TransparencyLog/ # Right panel - streaming log
│   │   └── ROISummary/      # Win screen with metrics
│   ├── context/             # State management
│   │   ├── GameContext.tsx  # React Context provider
│   │   └── gameReducer.ts   # Game state reducer
│   ├── hooks/               # Custom React hooks
│   │   └── useStreamingText.ts # Typing animation hook
│   ├── types/               # TypeScript definitions
│   │   └── game.ts          # Game state & scenario types
│   ├── App.tsx              # Root component
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles (Trellix theme)
├── public/
│   ├── scenario-david-squiller.json  # David Squiller scenario
│   └── scenario-plc-hijacking.json   # PLC hijacking scenario
├── .gitignore               # Git ignore rules
├── wrangler.toml            # Cloudflare Pages config
└── package.json             # Dependencies

## 🎯 Game Features

### ✅ Fully Implemented & Deployed
- ✅ **SOC Overview Screen**: Engaging start screen with 500 animated alert nodes
- ✅ **Two Scenario Support**: Choose between IT (David Squiller) or OT (PLC Hijacking) investigations
- ✅ **10 Agent Types**: EDR, NDR, Identity, IVX, Splunk, Proxy, S3, Oracle, OTMonitor (+ WISE as AI orchestrator)
- ✅ **Dynamic Agent Filtering**: Each scenario shows only relevant agents (4 or 5 agents per scenario)
- ✅ **Interactive Alerts**: Hover preview and zoom animation, severity-based colors (High vs Critical)
- ✅ **Drag & Drop System**: Smooth agent deployment with @hello-pangea/dnd
- ✅ **Full Game Logic**: Agent assignment, confidence scoring, time tracking
- ✅ **6 Investigation Questions**: Linear progression with lock/unlock mechanics per scenario
- ✅ **Answer Feedback**: Correct/incorrect validation with educational hints
- ✅ **Transparency Log**: Character-by-character streaming with typing cursor, sequential entry queuing
- ✅ **Investigation Guide**: Animated arrow guiding users through questions
- ✅ **Progress Tracking**: Real-time confidence, time saved, questions answered
- ✅ **Timeline Replay**: Automated playback of investigation with streaming particle system
- ✅ **ROI Summary**: Victory screen with automated remediation actions and metrics
- ✅ **Trellix Branding**: Full brand styling with #1A1A1A and #2814FF colors
- ✅ **Production Deployment**: Live on Cloudflare Pages with auto-deploy

### 🎮 Game Flow
1. **SOC Overview** → View 2,847 alerts/hour, 95% false positives, 500 animated alert nodes
2. **Choose Scenario** → Click David Squiller (High severity, blue) or PLC-HVAC-012 (Critical severity, red)
3. **Investigation Begins** → Zoom animation transitions to main game
4. **Drag Agents** → Deploy scenario-specific agents (4-5 agents shown per scenario)
   - **David**: EDR, NDR, Identity, IVX
   - **PLC**: Splunk, S3, Oracle, OTMonitor, NDR
5. **Build Confidence** → Reach 95% through correct agent selection
6. **See Wise Verdict** → Click button for Q6 final AI reasoning
7. **Execute Remediation** → Trigger automated response actions
8. **Timeline Replay** → Watch animated investigation timeline with streaming particles
9. **View ROI** → David: 15.5 min saved, PLC: 20 min saved, 6/6 questions answered
10. **Replay or Switch** → Try another scenario or replay current one

## 🎨 Design System

**Trellix Brand Colors:**
- Background: `#1A1A1A` (Dark Mode)
- Agent Glow: `#2814FF` (Bright Navy)
- Success: `#00CD00` (Green)
- Error: `#FF4444` (Red)
- Warning: `#FFA500` (Orange)

**Typography:**
- UI: Sans-serif (Inter, system-ui)
- Code/Log: Monospace (Courier New)

## 📊 Game Mechanics

- **2 Scenarios**: David Squiller (IT/Enterprise) and Manufacturing Floor Zero (OT/ICS)
- **6 Investigation Questions** per scenario in linear progression
- **10 Agent Types Total** (dynamically filtered per scenario):
  - **IT/Enterprise**: EDR (endpoint), NDR (network), Identity (IAM), IVX (sandbox)
  - **Multi-Source Telemetry**: Splunk (SIEM), Proxy (web logs), S3 (cloud storage), Oracle (HR database), OTMonitor (OT protocols)
  - **AI Orchestrator**: WISE (coordinates investigation, not draggable)
- **Scenario-Specific Agents**:
  - **David Squiller**: Shows 4 agents (EDR, NDR, Identity, IVX)
  - **PLC Hijacking**: Shows 5 agents (Splunk, S3, Oracle, OTMonitor, NDR)
- **Win Conditions**:
  - Reach 95% confidence score
  - Save 12+ minutes of analyst time (David: 15.5 min, PLC: 20 min)
  - Answer all 6 questions correctly

## 🛠️ Tech Stack

- **Framework**: React 18.3.1
- **Language**: TypeScript 5.6.3
- **Build Tool**: Vite 6.0.3
- **Drag & Drop**: @hello-pangea/dnd 17.0.0
- **State**: React Context + useReducer
- **Deployment**: Cloudflare Pages
- **Repository**: GitHub with auto-deploy

## 🚀 Deployment

**Live URL:** https://wisegame.pages.dev/

**Deployment Platform:** Cloudflare Pages
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Auto-Deploy**: Enabled on push to `main` branch
- **CDN**: Global edge network for fast loading
- **HTTPS**: Automatic SSL certificate

**Repository:** [https://github.com/shristi-trellix/wiseGame](https://github.com/shristi-trellix/wiseGame)

## 📝 Development Status

**Phase 1: Core Architecture** ✅ COMPLETE
**Phase 2: Drag & Drop + Game Logic** ✅ COMPLETE
**Phase 3: Transparency Log Streaming** ✅ COMPLETE
**Phase 4: SOC Overview + Deployment** ✅ COMPLETE
**Phase 5: Timeline Replay Feature** ✅ COMPLETE
**Phase 6: OT Scenario & Multi-Source Telemetry** ✅ COMPLETE

**🌐 Production Status:**
- ✅ Live at https://wisegame.pages.dev/
- ✅ GitHub repository with auto-deploy
- ✅ ~95% feature complete
- ✅ Production-ready and fully playable
- ✅ Two complete scenarios with 10 agent types

**Optional Future Enhancements:**
- Sound effects (pickup, drop, success, error sounds)
- Additional scenarios beyond David Squiller and PLC Hijacking
- Tutorial tooltips for first-time players
- Analytics and telemetry
- Difficulty modes (Easy/Normal/Hard)

## 📖 Documentation

See [Wise Auto-investigation Product Requirements Document (1).md](./Wise%20Auto-investigation%20Product%20Requirements%20Document%20(1).md) for complete requirements and technical specifications.

## 🎭 Scenario Data

### Scenario 1: David Squiller (Enterprise IT Attack)
Based on slides 20-24 of the Wise Auto Investigation presentation:
- **Attack Type**: PowerShell credential stealer with file masquerading
- **Malicious File**: 19625_cutepuppyjpg.exe (extension masquerading)
- **C2 Communication**: 178.23.145.92 (Tor exit node, Gunzenhausen, Germany)
- **Attack Pattern**: 304 brute force attempts + 33 password spray events
- **Target**: David Squiller, Director, Sales Department
- **Host**: dsquiller-finance-pc

### Scenario 2: Manufacturing Floor Zero (OT/ICS PLC Hijacking)
Based on Cyber4OT dataset (OT/ICS security research data):
- **Attack Type**: PLC hijacking via Modbus TCP protocol
- **Network**: 192.168.127.0/24 (ICS/OT network segment)
- **Target**: PLC-HVAC-012 (slave PLC controlling HVAC systems)
- **Protocol**: Modbus TCP (port 502)
- **Attack Flow**: Nmap reconnaissance → macof ARP spoofing → tcpkill connection termination → PLC takeover
- **Tools Used**: Nmap (304 port scans), macof (4,127 forged MACs), tcpkill (RST flood attacks)
- **Data Sources**: Splunk (EDR logs), S3 (VPC flow logs), Oracle (HR database), OTMonitor (Modbus TCP), NDR (network correlation)

---

Built for Trellix Wise demonstrations
