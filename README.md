# Wise Detective - The Auto-Investigation Challenge

An interactive game demonstrating Trellix Wise's agentic flows for security alert triage and investigation.

## 🌐 Play Online

**🎮 Live Demo:** [https://wisegame.pages.dev/](https://wisegame.pages.dev/)

Experience the game directly in your browser - no installation required!

## 🎮 Game Overview

Deploy specialized Wise Agents (EDR, NDR, Identity, IVX) to investigate the David Squiller security incident. Build confidence through correct agent selection, save analyst time, and demonstrate the power of AI-driven security operations.

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
│   └── scenario-david-squiller.json  # Game scenario data
├── .gitignore               # Git ignore rules
├── wrangler.toml            # Cloudflare Pages config
└── package.json             # Dependencies

## 🎯 Game Features

### ✅ Fully Implemented & Deployed
- ✅ **SOC Overview Screen**: Engaging start screen with 500 animated alert nodes
- ✅ **Interactive Alert**: Hover preview and zoom animation on David Squiller alert
- ✅ **Drag & Drop System**: Smooth agent deployment with @hello-pangea/dnd
- ✅ **Full Game Logic**: Agent assignment, confidence scoring, time tracking
- ✅ **6 Investigation Questions**: Linear progression with lock/unlock mechanics
- ✅ **Answer Feedback**: Correct/incorrect validation with hints
- ✅ **Transparency Log**: Character-by-character streaming with typing cursor
- ✅ **Investigation Guide**: Animated arrow guiding users through questions
- ✅ **Progress Tracking**: Real-time confidence, time saved, questions answered
- ✅ **ROI Summary**: Victory screen with automated remediation actions
- ✅ **Trellix Branding**: Full brand styling with #1A1A1A and #2814FF colors
- ✅ **Production Deployment**: Live on Cloudflare Pages with auto-deploy

### 🎮 Game Flow
1. **SOC Overview** → View 2,847 alerts/hour, 95% false positives
2. **Click Alert** → David Squiller investigation begins with zoom animation
3. **Drag Agents** → Deploy EDR, NDR, Identity, IVX to answer questions
4. **Build Confidence** → Reach 95% through correct agent selection
5. **Execute Remediation** → See automated response actions
6. **View ROI** → 15.5 minutes saved, 6/6 questions answered

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

- **6 Investigation Questions** in linear progression
- **4 Specialized Agents**: EDR, NDR, Identity, IVX
- **Win Conditions**:
  - Reach 95% confidence score
  - Save 12+ minutes of analyst time
  - Answer all questions correctly

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

**🌐 Production Status:**
- ✅ Live at https://wisegame.pages.dev/
- ✅ GitHub repository with auto-deploy
- ✅ ~90% feature complete
- ✅ Production-ready and playable

**Optional Future Enhancements:**
- Sound effects (pickup, drop, success, error sounds)
- Additional scenarios beyond David Squiller case
- Tutorial tooltips for first-time players
- Analytics and telemetry

## 📖 Documentation

See [Wise Auto-investigation Product Requirements Document (1).md](./Wise%20Auto-investigation%20Product%20Requirements%20Document%20(1).md) for complete requirements and technical specifications.

## 🎭 Scenario Data

The game uses the David Squiller case from slides 20-24 of the Wise Auto Investigation presentation, featuring:
- File masquerading attack (19625_cutepuppyjpg.exe)
- PowerShell credential stealer
- C2 communication via Tor node
- 304 brute force attempts
- Director-level user compromise

---

Built with ❤️ for Trellix Wise demonstrations
