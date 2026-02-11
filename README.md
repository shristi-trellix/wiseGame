# Wise Detective - The Auto-Investigation Challenge

An interactive game demonstrating Trellix Wise's agentic flows for security alert triage and investigation.

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
│   │   ├── AgentToolbox/    # Left panel - draggable agents
│   │   ├── InvestigationGraph/ # Center panel - question cards
│   │   ├── TransparencyLog/ # Right panel - streaming log
│   │   ├── IntroScreen/     # Welcome/intro screen
│   │   └── ROISummary/      # Win screen with metrics
│   ├── context/             # State management
│   │   ├── GameContext.tsx  # React Context provider
│   │   └── gameReducer.ts   # Game state reducer
│   ├── types/               # TypeScript definitions
│   │   └── game.ts          # Game state & scenario types
│   ├── App.tsx              # Root component
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles (Trellix theme)
├── public/
│   └── scenario-david-squiller.json  # Game scenario data
├── scenario-david-squiller.json      # Source scenario file
└── package.json             # Dependencies

## 🎯 Game Features

### Implemented (Phase 1 - Complete ✅)
- ✅ Full React + TypeScript + Vite project setup
- ✅ Trellix brand styling (#1A1A1A background, #2814FF agent glow)
- ✅ State management with Context + useReducer
- ✅ 3-panel layout (Agent Toolbox, Investigation Board, Transparency Log)
- ✅ Intro screen with game instructions
- ✅ ROI summary screen with metrics
- ✅ Question progression system
- ✅ Progress indicators (confidence, time saved, questions answered)
- ✅ Scenario data loaded from JSON

### Coming Next (Phase 2)
- Drag & Drop with @hello-pangea/dnd
- Agent assignment logic
- Transparency log streaming
- Error handling & feedback (shake animation, hints)
- Sound effects

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

## 📝 Development Status

**Phase 1: Core Architecture** ✅ COMPLETE
- Project setup, state management, and basic UI complete

**Next Steps:**
- Phase 2: Implement drag-and-drop functionality
- Phase 3: Connect game logic to scenario data
- Phase 4: Add transparency log streaming animation
- Phase 5: Implement feedback mechanisms
- Phase 6: Polish & sound effects
- Phase 7: Playwright testing

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
