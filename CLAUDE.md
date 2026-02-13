# CLAUDE.md - Wise Detective Development Journal

**Project**: Wise Detective - The Auto-Investigation Challenge
**Purpose**: Interactive game demonstrating Trellix Wise's agentic flows for security alert triage
**Status**: Deployed & Live ✅ | Public Demo Available 🌐 | Multi-Scenario Support Complete ✅
**Live URL**: https://wisegame.pages.dev/
**Last Updated**: 2026-02-12 (Phase 6: Complete - OT Scenario & Multi-Source Telemetry)

---

## 📋 Project Overview

Wise Detective is an educational game that demonstrates how Trellix Wise's AI-powered security operations platform uses specialized agents to automatically investigate security alerts. Players drag agents to investigation questions, building confidence and saving analyst time through multiple attack scenarios.

**Scenarios:**
1. **David Squiller** (Complete ✅) - Enterprise IT credential theft attack using 4 agents (EDR, NDR, Identity, IVX)
2. **Manufacturing Floor Zero** (Complete ✅) - OT/ICS PLC hijacking attack using 5 agents (Splunk, S3, Oracle, OTMonitor, NDR)

**Agent Architecture:**
- Total agent types: 10 (EDR, NDR, Identity, IVX, Splunk, Proxy, S3, Oracle, OTMonitor, plus WISE as AI orchestrator)
- Dynamic agent filtering per scenario (only shows relevant agents)
- WISE removed from draggable toolbox (AI orchestrator, not a tool)

**Key Goals:**
- Demonstrate agentic AI flows in cybersecurity
- Show ROI through time savings (12-20+ minutes in <60 seconds)
- Educational tool for Trellix demos and presentations
- Content accuracy with actual product capabilities
- Showcase multi-source telemetry correlation (IT, cloud, HR, OT systems)

---

## 🎯 Phase 1: Requirements Gathering & Core Architecture (COMPLETE ✅)

### Step 1: Comprehensive Requirements Interview

Conducted detailed interview using `AskUserQuestion` tool across **8 key decision areas**:

#### **Technical Stack Decisions**
- ✅ React + TypeScript with Vite (fast HMR, modern tooling)
- ✅ React Context + useReducer for state management (no Redux needed)
- ✅ @hello-pangea/dnd for drag-and-drop (successor to react-beautiful-dnd)
- ✅ JSON config file for scenario data (easy to update, extensible)
- ✅ Desktop-optimized only (min 1280px width, no mobile support needed)
- ✅ Static site hosting (GitHub Pages/Netlify/Vercel)

#### **UX/UI Decisions**
- ✅ Magnetic snap drag-and-drop with visual feedback (glow effects, animations)
- ✅ Allow mistakes with educational feedback (low confidence + hints + shake animation)
- ✅ Linear question progression (not branching - simpler, clearer narrative)
- ✅ Card-based flow for investigation graph (vertical/horizontal with connecting lines)
- ✅ Streaming terminal-style transparency log (50ms per character typing speed)
- ✅ Interactive tooltip hints for tutorial (contextual, non-intrusive)
- ✅ Moderate animation polish (60fps target, no particle effects)
- ✅ No visible gameplay timer (45-second target is design guideline)
- ✅ Big "Execute Agentic Remediation" button for win state

#### **Game Mechanics Decisions**
- ✅ Predefined time values per agent action (EDR: 3min, NDR: 2.5min, Identity: 2min, IVX: 4min, Wise: 1.5min)
- ✅ Confidence score system: 0% → 95% goal
- ✅ Correct agent: +15-20% confidence | Incorrect: +5-15% confidence (partial credit)
- ✅ Win conditions: 95%+ confidence, 12+ min saved, all questions answered
- ✅ Error feedback: low confidence score + hint message + shake animation
- ✅ Keep agent capabilities simple for MVP (focus on correct/incorrect matching)

#### **Visual Design Decisions**
- ✅ Trellix brand colors: #1A1A1A (background), #2814FF (agent glow), #00CD00 (success), #FF4444 (error), #FFA500 (warning)
- ✅ Gamified/stylized visuals (not exact product replica)
- ✅ Sans-serif for UI, monospace for code/logs
- ✅ Sound effects enabled by default (pickup, drop, success, error, completion)

#### **Content Decisions**
- ✅ Source: Slides 20-30 from "Wise Auto Investigation.pdf"
- ✅ Adapt content for clarity and gameplay (not word-for-word from slides)
- ✅ Maintain technical accuracy and key data points
- ✅ Primary concern: Content accuracy with actual Trellix Wise product

#### **Deployment Decisions**
- ✅ Internal demo/presentation tool
- ✅ MVP/prototype-first timeline
- ✅ No analytics or tracking for MVP
- ✅ Project location: `c:\Users\ShristiSharma\Desktop\wiseGame\`

### Step 2: PRD Enhancement

**Updated**: `Wise Auto-investigation Product Requirements Document (1).md`

Added comprehensive sections:
- **Section 3**: Complete David Squiller case study (6 questions extracted from slides)
- **Section 6**: Technical Implementation Details (9 subsections: A-K)
  - Technology stack specifications
  - Data architecture and state shape
  - UI/UX specifications with exact behaviors
  - Game mechanics with formulas
  - Visual design system (colors, typography, animations)
  - Component architecture (9 core components)
  - Testing strategy (Playwright requirements)
  - Development priorities (4 phases)
  - Content management approach
  - Analytics approach (none for MVP)
  - Deployment specifications
- **Section 7**: 7-phase development strategy
- **Section 8**: Key decisions summary (all interview results)
- **Section 9**: Next steps roadmap

### Step 3: Scenario Data Extraction

**Created**: `scenario-david-squiller.json`

Extracted content from slides 20-30 and structured into production-ready JSON:

**Game Flow (6 Questions):**
1. **Q1**: "What happened on this endpoint?" → EDR Agent (90% confidence, 3min saved)
2. **Q2**: "Who is this user and are they a high-value target?" → Identity Agent (95% confidence, 2min saved, includes 90-day lookback)
3. **Q3**: "Is this tool usage normal for this user's role?" → EDR Agent (92% confidence, 2.5min saved)
4. **Q4**: "Was the downloaded file malicious?" → IVX Agent (94% confidence, 4min saved)
5. **Q5**: "What did this endpoint do on the network after infection?" → NDR Agent (93% confidence, 2.5min saved)
6. **Q6**: "Should we escalate this alert to Critical?" → Wise Reasoning (98% confidence, 1.5min saved)

**Key Data Points Preserved:**
- User: David Squiller, Director, Sales Department
- Host: dsquiller-finance-pc
- Malicious file: 19625_cutepuppyjpg.exe (file extension masquerading)
- C2 IP: 178.23.145.92 (Tor exit node, Gunzenhausen, Germany)
- Attack pattern: 304 brute force attempts + 33 password spray events
- PowerShell download from raw.githubusercontent.com

**Scenario Structure:**
- Each question has 4 agent answers (EDR, NDR, Identity, IVX)
- Correct answer: high confidence (90-98%), isCorrect: true
- Incorrect answers: low confidence (5-15%), with hints
- Each answer includes transparency log steps (for streaming animation)
- Win conditions and metrics defined

### Step 4: Project Setup & Core Architecture

**Files Created**: 29 files total

#### **Configuration Files**
- `package.json` - Dependencies (React 18.3.1, TypeScript 5.6.3, Vite 6.0.3, @hello-pangea/dnd 17.0.0)
- `vite.config.ts` - Vite configuration (port 3000)
- `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json` - TypeScript configuration
- `index.html` - HTML entry point

#### **Type Definitions** (`src/types/game.ts`)
```typescript
- AgentType: 'EDR' | 'NDR' | 'Identity' | 'IVX' | 'WISE'
- GamePhase: 'intro' | 'playing' | 'complete'
- LogEntry: { id, timestamp, text, agentType }
- Question: { id, order, text, category, locked, correctAgent, timeSaved, answers }
- Scenario: { id, title, description, initialAlert, questions, winConditions, metrics }
- GameState: { currentQuestionId, completedQuestions, agentAssignments, confidenceScore, timeSaved, transparencyLog, gamePhase, showRemediationButton, startTime, endTime }
- GameAction: 9 action types (START_GAME, ASSIGN_AGENT, COMPLETE_QUESTION, etc.)
```

#### **State Management**
- `src/context/GameContext.tsx` - React Context provider with useGame hook
- `src/context/gameReducer.ts` - Reducer with 9 action handlers
  - START_GAME: Initialize gameplay, set first question
  - ASSIGN_AGENT: Record agent assignment
  - COMPLETE_QUESTION: Update confidence, time saved, completed list
  - ADD_LOG_ENTRIES: Append transparency log entries
  - UNLOCK_NEXT_QUESTION: Progress to next question
  - SHOW_REMEDIATION_BUTTON: Display final action button
  - COMPLETE_GAME: End game, record completion time
  - RESET_GAME: Reset to initial state

#### **Components Created**

**1. App.tsx** - Root component
- Loads scenario from `/public/scenario-david-squiller.json`
- Loading and error states
- Wraps game in GameProvider

**2. GameBoard.tsx** - Main game container
- 3-panel layout (25% | 50% | 25%)
- Header with title and subtitle
- Footer with progress indicators
- Phase routing (intro → playing → complete)

**3. IntroScreen.tsx + IntroScreen.css**
- Welcome screen with gradient title
- Game description and objectives
- Initial alert display (orange border, warning badge)
- How to Play instructions (4-step list)
- Agent preview badges (4 agents with colors)
- "Begin Investigation" button (gradient, hover effects)
- Animations: gradient text, button hover/active states

**4. AgentToolbox.tsx + AgentToolbox.css**
- Left panel component
- 4 agent cards (EDR, NDR, Identity, IVX)
- Each card: icon + name + description
- Border colors match agent types
- Hover effects: translate up, box shadow
- Instruction text with colored border
- Tip section at bottom

**5. InvestigationGraph.tsx + InvestigationGraph.css**
- Center panel component
- Initial alert card (gradient background, warning border)
- Question cards in vertical flow
- Connector lines between questions (gradient arrows)
- Question states: locked, active, completed
- Locked: 🔒 icon, dimmed, pointer-events: none
- Active: glowing border, box shadow
- Completed: ✓ checkmark, green border, success background
- Dropzone: dashed border, hover effects
- "Execute Agentic Remediation" button (pulsing animation)

**6. TransparencyLog.tsx + TransparencyLog.css**
- Right panel component
- Empty state: 💭 icon, waiting message
- Log entries: monospace font, [Wise] prefix in blue
- Auto-scroll to bottom on new entries
- FadeIn animation for new entries
- Typing indicator animation (blinking cursor)

**7. ROISummary.tsx + ROISummary.css**
- Completion screen component
- Victory/incomplete verdict (emoji + text)
- 4 metric cards in grid layout
  - Confidence Score (goal: 95%)
  - Time Saved (goal: 12 min)
  - Completion Time (target: 45s)
  - Questions Answered (all required)
- Color-coded metrics (success/warning)
- Remediation actions list (7 actions)
- "Try Again" / "Investigate Another Case" button
- Staggered animations (fadeInUp with delays)

#### **Styling**
- `src/index.css` - Global styles, CSS variables, Trellix theme
- Component-specific CSS files (7 files)
- Responsive scrollbars
- Smooth transitions
- Keyframe animations (spin, shake, pulse, fadeIn, fadeInUp, scaleIn)

#### **Assets**
- `public/scenario-david-squiller.json` - Game data (copied from root)

### Step 5: Build & Test

**Commands Executed:**
```bash
npm install              # Installed 189 packages successfully
npm run dev              # Dev server started on http://localhost:3000
```

**Status**: ✅ Application running successfully, no errors

---

## 🎯 Phase 2: Drag & Drop Implementation (COMPLETE ✅)

### **Objectives Achieved**
1. ✅ Made agent cards draggable with @hello-pangea/dnd
2. ✅ Made question cards droppable
3. ✅ Connected drops to game logic with full state updates
4. ✅ Implemented correct/incorrect feedback system
5. ✅ Added visual answer display with confidence badges
6. ✅ Connected transparency log to agent actions

### **Implementation Details**

#### **Step 1: DragDropContext Setup**
**File Modified**: `src/components/GameBoard/GameBoard.tsx`

Added comprehensive `handleDragEnd` handler with:
- **Validation**: Checks for valid destination, locked questions, completed questions
- **Agent extraction**: Parses `draggableId` format ("agent-EDR")
- **Question lookup**: Finds question from scenario by ID
- **Answer processing**: Gets correct/incorrect answer based on agent type
- **State updates**: Dispatches 5 action types:
  1. `ASSIGN_AGENT` - Records agent-to-question mapping
  2. `ADD_LOG_ENTRIES` - Adds transparency log steps
  3. `COMPLETE_QUESTION` - Updates confidence, time saved, completed list
  4. `UNLOCK_NEXT_QUESTION` - Progresses to next question
  5. `SHOW_REMEDIATION_BUTTON` - Displays final action button when win conditions met

**Win Condition Logic:**
```typescript
if (
  allQuestionsAnswered &&
  newConfidence >= 95 &&
  newTimeSaved >= 12
) {
  setTimeout(() => {
    dispatch({ type: 'SHOW_REMEDIATION_BUTTON' });
  }, 1000);
}
```

#### **Step 2: Draggable Agents**
**File Modified**: `src/components/AgentToolbox/AgentToolbox.tsx`

- Wrapped agents in `<Droppable>` with `isDropDisabled={true}` (clone mode)
- Each agent is a `<Draggable>` with:
  - `draggableId`: "agent-EDR", "agent-NDR", "agent-Identity", "agent-IVX"
  - `index`: Array position
  - Dynamic styling with `provided.draggableProps.style`
  - "dragging" class when `snapshot.isDragging === true`

**Visual States:**
- Default: Full opacity, normal border
- Dragging: Reduced opacity (0.5), rotated (5deg)
- Hover: Translated up (-2px), box shadow

#### **Step 3: Droppable Questions**
**File Modified**: `src/components/InvestigationGraph/InvestigationGraph.tsx`

Each unlocked question has a `<Droppable>` dropzone with:
- `droppableId`: "question-q1", "question-q2", etc.
- Conditional rendering: Only shows if `!isLocked && !isCompleted && !assignedAgent`
- Drag-over styling: Glowing border when `snapshot.isDraggingOver === true`

**Question States:**
1. **Locked**: 🔒 icon, dimmed, no dropzone
2. **Active + Empty**: Dropzone with dashed border
3. **Active + Assigned**: Answer display (not yet completed)
4. **Completed**: ✓ checkmark, summary, green background

#### **Step 4: Answer Display System**
**File Modified**: `src/components/InvestigationGraph/InvestigationGraph.tsx` + CSS

Added comprehensive answer display with:

**Correct Answer (isCorrect: true)**:
- Green left border (#00CD00)
- High confidence badge (green background)
- Answer text in gray
- No hint shown

**Incorrect Answer (isCorrect: false)**:
- Red left border (#FF4444)
- Low confidence badge (orange background)
- Answer text in gray
- Hint box with 💡 icon and educational message

**Confidence Badges:**
- High (≥50%): Green background, success color
- Low (<50%): Orange background, warning color
- Format: "{confidence}% Confidence"

**Assigned Agent Display:**
- Shows which agent was used (e.g., "EDR Agent")
- Color-coded to agent type
- Uppercase, bold, letter-spacing

#### **Step 5: Visual CSS Additions**
**File Modified**: `src/components/InvestigationGraph/InvestigationGraph.css`

Added 100+ lines of CSS:
- `.question-answer` - Answer container with fadeIn animation
- `.answer-header` - Flexbox header with agent + confidence
- `.assigned-agent` - Agent label styling
- `.confidence-badge` - High/low confidence styling
- `.answer-text` - Main answer text
- `.answer-hint` - Hint box with orange theme
- `.completed-summary` - Summary text for completed questions
- `@keyframes fadeIn` - Smooth entrance animation (0.3s)

#### **Step 6: Remediation Button**
**File Modified**: `src/components/InvestigationGraph/InvestigationGraph.tsx`

- Button appears when `state.showRemediationButton === true`
- Click handler dispatches `COMPLETE_GAME` action
- Transitions game to 'complete' phase
- Shows ROI summary screen

### **Code Statistics**
- **Files Modified**: 3 files (GameBoard, AgentToolbox, InvestigationGraph)
- **Lines Added**: ~200 lines
- **New CSS Rules**: ~20 classes
- **State Actions Used**: 5 action types
- **Compilation Status**: ✅ No errors, all HMR updates successful

### **Testing Results**

**Tested Scenarios:**
1. ✅ Drag EDR agent to Q1 → Correct answer, 90% confidence, 3 min saved
2. ✅ Drag wrong agent to Q1 → Low confidence, hint displayed, can retry
3. ✅ Question unlocking → Q2 unlocks after Q1 completion
4. ✅ Progress indicators → Confidence and time update in real-time
5. ✅ Transparency log → Entries populate (all at once for now)
6. ✅ Win condition → Remediation button appears after all questions
7. ✅ ROI summary → Displays metrics correctly

**Known Behaviors:**
- Transparency log entries appear instantly (streaming animation pending - Phase 3)
- Agents can be dropped multiple times on same question before completion
- Locked questions cannot receive drops (validated in handleDragEnd)

---

## 🎯 Phase 3: Transparency Log Streaming (COMPLETE ✅)

### **Objectives Achieved**
1. ✅ Created custom React hook for character-by-character streaming
2. ✅ Implemented typing cursor animation with blinking effect
3. ✅ Built entry queuing system for sequential streaming
4. ✅ Auto-scroll updates as text appears
5. ✅ Optimized streaming speed (30ms per character)

### **Implementation Details**

#### **Step 1: useStreamingText Custom Hook**
**File Created**: `src/hooks/useStreamingText.ts`

Created reusable hook for text streaming animation:
- **Input**: `text` (string), `speed` (ms per char), `onComplete` (callback)
- **Output**: `displayedText` (current visible text), `isTyping` (boolean state)
- **Logic**: Uses `setTimeout` for character-by-character reveal
- **Cleanup**: Clears timeout on unmount to prevent memory leaks
- **Speed**: 30ms per character (slightly faster than 50ms spec for smoother UX)

```typescript
export const useStreamingText = ({ text, speed = 50, onComplete }: Options): Return => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    // Character-by-character typing logic
    const typeNextCharacter = () => {
      if (indexRef.current < text.length) {
        setDisplayedText(text.slice(0, indexRef.current + 1));
        indexRef.current += 1;
        timeoutRef.current = setTimeout(typeNextCharacter, speed);
      } else {
        setIsTyping(false);
        if (onComplete) onComplete();
      }
    };
    // ...
  }, [text, speed, onComplete]);

  return { displayedText, isTyping };
};
```

#### **Step 2: StreamingLogEntry Component**
**File Modified**: `src/components/TransparencyLog/TransparencyLog.tsx`

Created dedicated component for each log entry:
- **Conditional Streaming**: Only streams when `shouldStream={true}`
- **Instant Display**: Shows full text immediately for completed entries
- **Typing Cursor**: Blue block cursor (`▊`) appears only during active typing
- **Clean Rendering**: No re-animation of already-streamed entries

#### **Step 3: Entry Queuing System**
**File Modified**: `src/components/TransparencyLog/TransparencyLog.tsx`

Implemented sequential streaming logic:
- **streamingIndex State**: Tracks which entry is currently streaming
- **Conditional Rendering**: Only renders entries that have been streamed or are currently streaming (`index <= streamingIndex`)
- **Auto-Advancement**: When entry completes, `handleEntryComplete()` increments `streamingIndex`
- **Queue Processing**: Next entry begins streaming automatically after previous completes

**Key Logic**:
```typescript
{state.transparencyLog.map((entry, index) => {
  // Only render entries that have been streamed or are currently streaming
  if (index > streamingIndex) {
    return null; // Future entries hidden until their turn
  }

  const shouldStream = index === streamingIndex;
  return (
    <StreamingLogEntry
      key={entry.id}
      text={entry.text}
      shouldStream={shouldStream}
      onComplete={handleEntryComplete}
    />
  );
})}
```

#### **Step 4: Blinking Cursor Animation**
**File Modified**: `src/components/TransparencyLog/TransparencyLog.css`

Added CSS animation for typing cursor:
- **Visual**: Blue block character (`▊`) using Trellix brand color
- **Animation**: 0.8s blink cycle with 50% opacity transition
- **Positioning**: 2px margin-left after current text
- **State**: Only visible when `isTyping === true`

```css
.typing-cursor {
  color: var(--color-agent-glow);
  font-weight: bold;
  animation: cursorBlink 0.8s infinite;
  margin-left: 2px;
}

@keyframes cursorBlink {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}
```

#### **Step 5: Auto-Scroll During Streaming**
**File Modified**: `src/components/TransparencyLog/TransparencyLog.tsx`

Enhanced scroll behavior:
- **Trigger**: Updates on both `state.transparencyLog` changes and `streamingIndex` changes
- **Behavior**: Smooth scroll to bottom as text appears
- **Element**: Uses `logEndRef` to track bottom of log container
- **Experience**: Keeps newest content visible without jarring jumps

### **Bug Fixes**
- **Issue**: Initial implementation showed all entries at once, then "rewrote" them with streaming effect
- **Fix**: Added conditional rendering (`if (index > streamingIndex) return null`) to only show entries that should be visible
- **Result**: Each entry appears exactly once as it streams, no overwriting effect

### **Code Statistics**
- **Files Created**: 1 new hook file
- **Files Modified**: 2 files (TransparencyLog component + CSS)
- **Lines Added**: ~100 lines
- **New Hook**: useStreamingText (reusable for future features)
- **Compilation Status**: ✅ No errors, all HMR updates successful

### **User Experience**
1. Agent dropped → Transparency log entries queued
2. First entry begins streaming character-by-character with blinking cursor
3. Cursor disappears when entry completes
4. Next entry begins streaming immediately
5. Auto-scroll keeps content visible throughout
6. All entries streamed sequentially until queue empty

**Phase 3 Status**: ✅ **COMPLETE**

---

## 🎯 Phase 4: SOC Overview & Deployment (COMPLETE ✅)

### **Objectives Achieved**
1. ✅ Created engaging SOC Overview screen with alert swarm visualization
2. ✅ Removed redundant intro screen (direct transition to gameplay)
3. ✅ Added investigation guide with animated arrow
4. ✅ Deployed game to Cloudflare Pages
5. ✅ Public URL live and accessible

### **Implementation Details**

#### **Step 1: SOC Overview Screen**
**File Created**: `src/components/SOCOverview/SOCOverview.tsx` + CSS

Created immersive start screen with:
- **Alert Swarm**: 500 animated alert nodes with random positioning
- **Statistics Display**: 2,847 alerts/hour, 68,328/day, ~95% false positives
- **David Squiller Alert**: Prominent glowing node with hover preview
- **Zoom Animation**: Smooth transition to main game on click
- **Brand Styling**: Trellix colors with dramatic visual impact

**Visual Features:**
- Floating alert nodes with staggered animations (15-40s cycles)
- Severity-based colors (low/medium/high/critical)
- Interactive hover state showing alert details
- Click handler transitions to playing phase

#### **Step 2: Removed Intro Screen**
**Files Deleted**: `src/components/IntroScreen/` (entire directory)
**Files Modified**:
- `src/components/GameBoard/GameBoard.tsx` - Removed IntroScreen import and phase check
- `src/types/game.ts` - Updated GamePhase type to remove 'intro'

**New Game Flow:**
- SOC Overview → Click David alert → Main Game (playing) → Summary (complete)
- Eliminated redundant intro screen for smoother experience
- SOC Overview serves as engaging replacement with visual impact

#### **Step 3: Investigation Guide**
**File Modified**: `src/components/InvestigationGraph/InvestigationGraph.tsx` + CSS

Added downward arrow guide to orient users:
- **Animated Arrow**: Bouncing arrow (↓) with 1.5s cycle
- **Instruction Text**: "Give Wise access to data sources in your environment..."
- **Positioning**: Between alert card and questions
- **Styling**: Blue-themed box with Trellix brand colors

#### **Step 4: UX Improvements**
- **Alert Card Height**: Reduced from 400px to 200px for better visibility
- **Timing Pressure Removed**: Eliminated 45-second completion time metric
- **Progress Indicators**: Now shows only Confidence, Time Saved, Questions Answered

#### **Step 5: Deployment to Cloudflare Pages**

**Setup Process:**
1. Initialized Git repository with `.gitignore`
2. Created initial commit with all project files
3. Pushed to GitHub: `https://github.com/shristi-trellix/wiseGame.git`
4. Connected repository to Cloudflare Pages
5. Configured build settings:
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Framework**: Vite
   - **Deploy command**: `echo "No custom deploy needed"`

**Configuration Files:**
- `.gitignore` - Node modules, dist, build artifacts
- `wrangler.toml` - Cloudflare Pages configuration

**Deployment Result:**
- **Live URL**: https://wisegame.pages.dev/
- **Build Status**: ✅ Successful
- **CDN**: Cloudflare global edge network
- **Auto-Deploy**: GitHub push triggers rebuild
- **HTTPS**: Automatic SSL certificate

### **Code Statistics**
- **Files Created**: 2 (SOCOverview component)
- **Files Deleted**: 2 (IntroScreen component)
- **Files Modified**: 5 (GameBoard, game.ts, InvestigationGraph + CSS, README)
- **Lines Added**: ~150 lines (SOC Overview + configuration)
- **Deployment Files**: 3 (.gitignore, wrangler.toml, git config)

### **User Experience Flow**
1. User visits https://wisegame.pages.dev/
2. Sees dramatic SOC Overview with 500 animated alerts
3. Reads statistics (2,847 alerts/hour, 95% false positives)
4. Hovers over glowing David Squiller alert node
5. Preview popup shows alert details
6. Clicks alert → zoom animation
7. Main game loads with investigation guide
8. Completes investigation → ROI summary

**Phase 4 Status**: ✅ **COMPLETE** | Game is now publicly accessible!

---

## 🎯 Phase 5: Timeline Replay Feature (COMPLETE ✅)

### **Objectives Achieved**
1. ✅ Created automatic timeline replay on ROI summary screen
2. ✅ Implemented sequential card animation (7 nodes total)
3. ✅ Added streaming particle system mimicking SOC alert swarm
4. ✅ Built data processing pipeline from game state to timeline events
5. ✅ Integrated animated confidence bars and time saved badges

### **Implementation Details**

#### **Step 1: Type Definitions**
**File Modified**: `src/types/game.ts`

Added `TimelineEvent` interface for structured timeline data:
```typescript
export interface TimelineEvent {
  id: string;
  type: 'alert' | 'question' | 'decision';
  order: number;
  questionId?: string;
  questionText?: string;
  agentType?: AgentType;
  confidenceGained: number;
  cumulativeConfidence: number;
  timeSaved: number;
  cumulativeTime: number;
  keyFinding: string;
  isCorrect?: boolean;
}
```

#### **Step 2: Timeline Components**
**Files Created**: 4 new components in `src/components/TimelineReplay/`

**1. TimelineReplay.tsx** - Main orchestrator component (~160 lines)
- **buildTimelineEvents()**: Converts game state to timeline event array
  - Extracts initial alert as event 0
  - Processes 6 completed questions as events 1-6
  - Calculates cumulative confidence and time saved
  - Extracts key findings (first sentence or 100 chars)
- **Sequential Animation Logic**:
  - `currentEventIndex` state tracks which card is active
  - 800ms display time per card + 500ms gap between cards
  - Total animation: ~9 seconds for 7 cards
- **Particle System**:
  - Generates 50 particles per card activation
  - Random sizes (2-5px), durations (1.5-3s), vertical positions (30-70%)
  - Particles stream from left to right across full timeline width
  - Auto-cleanup after 4 seconds to prevent memory buildup

**2. TimelineNode.tsx** - Individual timeline card (~115 lines)
- **Visual Elements**:
  - Order badge (top-left numbered circle)
  - Time saved badge (top-right with ⏱️ icon)
  - Agent icon (colored emoji with drop-shadow glow)
  - Question text (truncated to 2.6rem min-height)
  - Key finding (monospace terminal font)
  - Confidence bar with +X% gain and cumulative total
- **Node States**:
  - `pending`: opacity 0, visibility hidden
  - `active`: scale 1.05, glowing border, box-shadow
  - `completed`: opacity 0.85, green border
- **Animation Control**:
  - Uses `useRef` to prevent duplicate completion calls
  - Immediate text display (no streaming for speed)
  - 800ms timer before triggering next card

**3. TimelineConnector.tsx** - Animated SVG line (~35 lines)
- **SVG Line**: 60px width, 2px stroke
- **Gradient**: Blue glow fading from left to right
- **Animation States**:
  - `pending`: opacity 0, hidden
  - `animating`: stroke-dashoffset draws line over 0.5s
  - `completed`: full opacity, visible

**4. ConfidenceBar.tsx** - Animated progress bar (~40 lines)
- **Color Coding**:
  - Red (#FF4444): < 50%
  - Orange (#FFA500): 50-69%
  - Blue (--color-agent-glow): 70-94%
  - Green (--color-success): ≥ 95%
- **Animation**: Smooth width transition using cubic-bezier easing

#### **Step 3: Streaming Particle System**
**Files Modified**: `TimelineReplay.tsx` + `TimelineReplay.css`

**Particle Generation Logic**:
```typescript
// Generate burst of 50 particles when new card activates
useEffect(() => {
  if (currentEventIndex < 0 || isComplete) return;

  const newParticles: Particle[] = [];
  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    newParticles.push({
      id: Date.now() + i + Math.random() * 1000,
      top: 30 + Math.random() * 40, // 30-70% vertical position
      size: 2 + Math.random() * 3,   // 2-5px diameter
      duration: 1.5 + Math.random() * 1.5, // 1.5-3s
      delay: Math.random() * 0.5,    // 0-0.5s delay
    });
  }

  setParticles(prev => [...prev, ...newParticles]);

  // Cleanup after 4s
  const cleanup = setTimeout(() => {
    setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)));
  }, 4000);

  return () => clearTimeout(cleanup);
}, [currentEventIndex, isComplete]);
```

**CSS Animation**:
```css
@keyframes streamFlow {
  0% { left: 0%; opacity: 0; }
  5% { opacity: 0.6; }
  95% { opacity: 0.4; }
  100% { left: 100%; opacity: 0; }
}
```

**Visual Effect**:
- Hundreds of tiny blue circles flow from left to right
- Particles fade in at 5%, fade out at 95%
- Mimics SOC overview alert swarm aesthetic
- Creates visual representation of data flow through investigation

#### **Step 4: ROI Summary Integration**
**File Modified**: `src/components/ROISummary/ROISummary.tsx`

Restructured layout for full-width timeline:
```typescript
<div className="roi-summary">
  {/* Header: Investigation Complete */}
  <div className="summary-container">
    <div className="summary-verdict">🎉 Investigation Complete!</div>
    <h1 className="summary-title">Threat Successfully Contained</h1>
  </div>

  {/* Timeline Replay - Full Width */}
  <TimelineReplay
    state={state}
    scenario={scenario}
    onComplete={() => setReplayComplete(true)}
  />

  {/* Metrics Cards - Delayed until timeline completes */}
  <div className="summary-container">
    <div className="summary-metrics" style={{ animationDelay: replayComplete ? '0.5s' : '999s' }}>
      {/* 4 metric cards */}
    </div>
  </div>
</div>
```

**Layout Changes**:
- Changed from horizontal center layout to vertical flex column
- Timeline breaks out of summary-container for full width
- Metrics animation delayed until `replayComplete === true`
- Fixed scrolling issues (body overflow-y: auto, #root min-height: 100vh)

#### **Step 5: Styling & Animations**
**File Created**: `src/components/TimelineReplay/TimelineReplay.css` (~305 lines)

**Key CSS Classes**:
- `.timeline-replay`: Container with gradient background
- `.timeline-track`: Horizontal flexbox with relative positioning
- `.timeline-stream-particles`: Absolute positioned particle container (z-index: 0)
- `.stream-particle`: Individual particle with border-radius: 50%
- `.timeline-node`: Card styling with 3 states (pending/active/completed)
- `.node-agent-icon`: Agent emoji with color-coded drop-shadow
- `.confidence-bar-fill`: Animated width with cubic-bezier transition
- `.node-time`, `.node-order`: Positioned badges (top-right, top-left)

**Animations**:
- `nodeActivate`: Scale and opacity animation (0.3s)
- `drawLine`: Stroke-dashoffset line drawing (0.5s)
- `streamFlow`: Left position with opacity fade (1.5-3s variable)

### **Data Flow**

```
ROI Summary Screen Loads
  ↓
buildTimelineEvents() processes game state
  ↓
Timeline events array created (7 nodes):
  - Event 0: Initial Alert (0% confidence, ⚠️ icon)
  - Event 1: Q1 + EDR (40% cumulative, +3 min)
  - Event 2: Q2 + Identity (52% cumulative, +2 min)
  - Event 3: Q3 + EDR (63% cumulative, +2.5 min)
  - Event 4: Q4 + IVX (74% cumulative, +4 min)
  - Event 5: Q5 + NDR (84% cumulative, +2.5 min)
  - Event 6: Q6 + WISE (95% cumulative, +1.5 min)
  ↓
Sequential animation begins (currentEventIndex = 0)
  ↓
For each card:
  1. Generate 50 streaming particles
  2. Card fades in with scale animation (0.3s)
  3. Text displays immediately
  4. Confidence bar animates to cumulative value (0.5s)
  5. Wait 800ms to show content
  6. Trigger next card (500ms gap)
  ↓
All 7 cards complete (~9 seconds total)
  ↓
onComplete() callback → Metrics cards fade in
```

### **Code Statistics**
- **Files Created**: 5 (TimelineReplay.tsx, TimelineNode.tsx, TimelineConnector.tsx, ConfidenceBar.tsx, TimelineReplay.css)
- **Files Modified**: 3 (game.ts, ROISummary.tsx, ROISummary.css, index.css)
- **Lines Added**: ~650 lines total
- **New Components**: 4 React components + 1 CSS file
- **Compilation Status**: ✅ No errors, all HMR updates successful

### **User Experience**
1. **ROI screen loads** → "Investigation Complete" header appears
2. **Timeline starts** → Initial alert card fades in with particle burst
3. **Sequential progression** → Each card activates one at a time (1.3s per card)
4. **Streaming particles** → Hundreds of blue circles flow left-to-right as timeline progresses
5. **Visual feedback** → Confidence bars fill, time badges glow, agent icons pulse
6. **Completion** → All 7 cards visible, particles fade out
7. **Metrics reveal** → ROI metric cards animate in below timeline

**Phase 5 Status**: ✅ **COMPLETE** | Timeline Replay with Streaming Particles!

---

## 🎯 Phase 6: OT Scenario & Multi-Source Telemetry (COMPLETE ✅)

### **Objectives Achieved**
1. ✅ Created second playable scenario based on Cyber4OT dataset (OT/ICS security)
2. ✅ Expanded agent types from 5 to 10 (added Splunk, Proxy, S3, Oracle, OTMonitor)
3. ✅ Implemented scenario selector UI on SOC Overview (two glowing alert nodes)
4. ✅ Demonstrated multi-source telemetry correlation across IT, cloud, HR, and OT systems
5. ✅ Told authentic story: "Manufacturing Floor Zero - PLC Hijacking" attack
6. ✅ Implemented dynamic agent filtering per scenario (David: 4 agents, PLC: 5 agents)
7. ✅ Removed WISE from draggable agents (AI orchestrator, not a tool)
8. ✅ Fixed transparency log duplicate "[Wise]" prefix issue

### **Plan Overview**

**Comprehensive Implementation Plan**: [C:\Users\ShristiSharma\.claude\plans\robust-scribbling-graham.md](C:\Users\ShristiSharma\.claude\plans\robust-scribbling-graham.md)

**Attack Narrative**: Manufacturing Floor PLC Hijacking
- **Based on**: Cyber4OT dataset files (Cyber4OT_090-091 PLC hijacking, Cyber4OT_095-096 baseline + attack)
- **Network**: 192.168.127.0/24 (ICS/OT network segment)
- **Target**: Slave PLC controlling HVAC systems
- **Protocol**: Modbus TCP (port 502)
- **Attack Flow**: Nmap reconnaissance → macof ARP spoofing → tcpkill connection termination → PLC takeover

**New Agent Types (5 added)**:
- **Splunk**: Splunk SIEM with indexed telemetry (EDR, Windows Event Logs, Sysmon)
- **Proxy**: Web proxy logs (HTTP/HTTPS traffic, URL filtering, web activity)
- **S3**: VPC flow logs in S3 buckets (AWS cloud-native storage)
- **Oracle**: Oracle HR database + identity systems (employee data, access history)
- **OTMonitor**: Industrial protocol parsers (Modbus TCP, DNP3, SCADA telemetry)

**Question Flow (6 Questions)**:
1. **Q1**: "What reconnaissance activity preceded this unauthorized access?" → **Splunk** (+38%, 3.5 min) - EDR telemetry shows Nmap scans
2. **Q2**: "What network anomalies indicate MAC spoofing?" → **S3** (+14%, 4 min) - VPC flow logs show ARP anomalies
3. **Q3**: "Who has legitimate access to this OT segment?" → **Oracle** (+13%, 2.5 min) - HR database + AD access control
4. **Q4**: "Is this Modbus TCP connection legitimate?" → **OTMonitor** (+12%, 5 min) - Protocol analysis shows tcpkill signatures
5. **Q5**: "What's the attack scope across the OT network?" → **NDR** (+10%, 3 min) - Network-wide Modbus correlation
6. **Q6**: "Should we trigger emergency PLC shutdown?" → **WISE** (+8%, 2 min) - Operational impact vs security reasoning

**Win Conditions**: 95% confidence, 20 minutes saved, all 6 questions answered

### **Implementation Progress**

#### **✅ Step 1: Extend AgentType to Support 10 Agent Types (COMPLETED)**
**File Modified**: `src/types/game.ts`

Extended AgentType union from 5 to 10 types (backwards compatible):

```typescript
// BEFORE:
export type AgentType = 'EDR' | 'NDR' | 'Identity' | 'IVX' | 'WISE';

// AFTER:
export type AgentType =
  | 'EDR'       // Endpoint Detection & Response
  | 'NDR'       // Network Detection & Response
  | 'Identity'  // Identity & Access Management
  | 'IVX'       // Intelligent Virtual eXecution (sandbox)
  | 'WISE'      // Wise AI Reasoning Engine
  | 'Splunk'    // Splunk SIEM with indexed telemetry
  | 'Proxy'     // Web proxy logs (HTTP/HTTPS traffic)
  | 'S3'        // VPC flow logs in S3 buckets
  | 'Oracle'    // Oracle HR/Identity database
  | 'OTMonitor'; // OT protocol monitoring (Modbus, SCADA)
```

**Result**: All existing code continues to work, new agent types now available for scenario.

---

#### **✅ Step 2: Create OT Scenario JSON (COMPLETED)**
**File Created**: `public/scenario-plc-hijacking.json` (~800 lines)

**Structure Implemented**:
- 6 questions × 10 agent answers = **60 total answers** written
- Each answer includes: confidence, text, isCorrect, hint (optional), transparencySteps (6-8 entries each)
- Real attack data incorporated: IPs (192.168.127.x), Modbus TCP port 502, tools (Nmap, macof, tcpkill)
- Based on authentic Cyber4OT dataset attack patterns

**Initial Alert**:
```json
{
  "title": "INDUSTRIAL PROTOCOL ANOMALY [Unauthorized Modbus TCP Connection]",
  "host": "PLC-HVAC-012",
  "severity": "Critical",
  "timestamp": "2024-11-05 03:47:22 UTC"
}
```

**Attack Flow Documented**:
1. Nmap reconnaissance across OT network (192.168.127.0/24)
2. macof ARP spoofing with MAC address forgery (4,127 forged MACs)
3. tcpkill connection termination (RST/FIN flood attacks)
4. Rogue Modbus TCP session establishment (port 502)
5. PLC control takeover (HVAC system compromise)

**Win Conditions**: 95% confidence, 20 minutes saved, all 6 questions answered

---

#### **✅ Step 3: Update AgentToolbox with Dynamic Filtering (COMPLETED)**
**File Modified**: `src/components/AgentToolbox/AgentToolbox.tsx`

**Changes Implemented**:
- Added 5 new agent cards (Splunk, Proxy, S3, Oracle, OTMonitor)
- Implemented dynamic agent filtering using `useMemo` based on `scenario.id`
- David Squiller scenario: Shows only 4 agents (EDR, NDR, Identity, IVX)
- PLC Hijacking scenario: Shows only 5 agents (Splunk, S3, Oracle, OTMonitor, NDR)
- Removed WISE from draggable agents (it's the AI orchestrator, not a tool)
- Single-column grid layout when 4-5 agents present (via CSS :has() selector)
- 2-column grid layout when 6+ agents (future scenarios)

**Agent Definitions**:
```typescript
const allAgents = [
  { id: 'EDR', name: 'EDR Agent', description: 'Endpoint process & file activity', color: '#00D9FF', icon: '🖥️' },
  { id: 'NDR', name: 'NDR Agent', description: 'Network traffic & correlation', color: '#00FF94', icon: '🌐' },
  { id: 'Identity', name: 'Identity Agent', description: 'User roles & access levels', color: '#FF6B00', icon: '👤' },
  { id: 'IVX', name: 'IVX Agent', description: 'File sandboxing & malware analysis', color: '#FF00FF', icon: '🔬' },
  { id: 'Splunk', name: 'Splunk Index', description: 'Indexed EDR & log search', color: '#00C853', icon: '🔍' },
  { id: 'Proxy', name: 'Proxy Logs', description: 'Web traffic & URL filtering', color: '#FFB300', icon: '🌍' },
  { id: 'S3', name: 'S3 Flow Logs', description: 'VPC flow logs in cloud storage', color: '#FF6F00', icon: '☁️' },
  { id: 'Oracle', name: 'Oracle DB', description: 'HR & identity data queries', color: '#D32F2F', icon: '🗄️' },
  { id: 'OTMonitor', name: 'OT Monitor', description: 'Industrial protocol analysis', color: '#7B1FA2', icon: '🏭' },
];
```

**Filtering Logic**:
```typescript
const agents = useMemo(() => {
  if (!scenario) return [];

  if (scenario.id === 'david-squiller') {
    return allAgents.filter(agent =>
      ['EDR', 'NDR', 'Identity', 'IVX'].includes(agent.id)
    );
  }

  if (scenario.id === 'plc-hijacking-manufacturing') {
    return allAgents.filter(agent =>
      ['Splunk', 'S3', 'Oracle', 'OTMonitor', 'NDR'].includes(agent.id)
    );
  }

  return allAgents;
}, [scenario]);
```

---

#### **✅ Step 4: Add CSS Styling for New Agents (COMPLETED)**
**Files Modified**:
- `src/index.css` (color variables)
- `src/components/AgentToolbox/AgentToolbox.css` (single-column layout, agent card borders)
- `src/components/TimelineReplay/TimelineNode.tsx` (agent icon mapping)

**CSS Variables Added**:
```css
:root {
  /* Existing agent colors */
  --color-edr: #00D9FF;
  --color-ndr: #00FF94;
  --color-identity: #FF6B00;
  --color-ivx: #FF00FF;
  --color-wise: #2814FF;

  /* NEW: Multi-source telemetry agent colors */
  --color-splunk: #00C853;      /* Green - indexed search */
  --color-proxy: #FFB300;       /* Amber - web traffic */
  --color-s3: #FF6F00;          /* Deep Orange - cloud storage */
  --color-oracle: #D32F2F;      /* Red - database queries */
  --color-otmonitor: #7B1FA2;   /* Purple - OT protocols */
}
```

**Agent Card Layout (AgentToolbox.css)**:
```css
/* Single column layout when 5 or fewer agents */
@supports selector(:has(*)) {
  .agents-list:has(:nth-child(5):last-child),
  .agents-list:has(:nth-child(4):last-child) {
    grid-template-columns: 1fr;
    max-width: 350px;
    margin: 0 auto;
  }
}
```

**Timeline Icon Mapping (TimelineNode.tsx)**:
```typescript
const getAgentIcon = (agent: AgentType): string => {
  const icons = {
    EDR: '🖥️', NDR: '🌐', Identity: '👤', IVX: '🔬',
    Splunk: '🔍', Proxy: '🌍', S3: '☁️',
    Oracle: '🗄️', OTMonitor: '🏭',
  };
  return icons[agent] || '•';
};
```

---

#### **✅ Step 5: Implement Scenario Selector on SOC Overview (COMPLETED)**
**Files Modified**:
- `src/components/SOCOverview/SOCOverview.tsx` (scenario selection logic)
- `src/components/SOCOverview/SOCOverview.css` (critical severity styling)

**Changes Implemented**:
- Added second prominent glowing alert node for PLC scenario
- David Squiller alert: High severity (blue pulse animation)
- PLC-HVAC-012 alert: Critical severity (red pulse animation)
- Each alert dynamically loads its scenario JSON on click
- Visual distinction: severity badges, icons (👤 vs 🏭), different colors

**Scenario Configuration**:
```typescript
interface ScenarioAlert {
  id: string;
  scenarioFile: string;
  type: string;
  severity: 'High' | 'Critical';
  host: string;
  time: string;
  icon: string;
  position: { x: string; y: string };
}

const scenarioAlerts: ScenarioAlert[] = [
  {
    id: 'david-squiller-alert',
    scenarioFile: '/scenario-david-squiller.json',
    type: 'WINDOWS METHODOLOGY [Powershell DownloadFile]',
    severity: 'High',
    host: 'dsquiller-finance-pc',
    time: '14:23',
    icon: '👤',
    position: { x: '75%', y: '50%' },
  },
  {
    id: 'plc-hijacking-alert',
    scenarioFile: '/scenario-plc-hijacking.json',
    type: 'INDUSTRIAL PROTOCOL ANOMALY [Unauthorized Modbus TCP]',
    severity: 'Critical',
    host: 'PLC-HVAC-012',
    time: '03:47',
    icon: '🏭',
    position: { x: '25%', y: '45%' },
  },
];
```

**Click Handler with Dynamic Loading**:
```typescript
const handleAlertClick = async (alert: ScenarioAlert) => {
  const response = await fetch(alert.scenarioFile);
  const data = await response.json();
  setScenario(data.scenario);
  setTimeout(() => dispatch({ type: 'START_GAME' }), 1500);
};
```

**CSS Severity Animations**:
```css
.scenario-node.high {
  background: var(--color-agent-glow);
  animation: highPulse 1.5s ease-in-out infinite;
}

.scenario-node.critical {
  background: var(--color-error);
  animation: criticalPulse 1.5s ease-in-out infinite;
}
```

---

#### **✅ Step 6: Update App.tsx for Dynamic Scenario Loading (COMPLETED)**
**Files Modified**:
- `src/App.tsx` (removed hardcoded scenario loading)
- `src/context/GameContext.tsx` (added setScenario function)
- `src/context/gameReducer.ts` (added SET_SCENARIO action handler)
- `src/components/GameBoard/GameBoard.tsx` (updated to use state.scenario)

**Changes Implemented**:
- Removed hardcoded scenario load on mount from App.tsx
- Added `SET_SCENARIO` action type to GameAction union
- SOC Overview passes selected scenario to GameContext via setScenario
- Both scenarios use same game flow, just different data
- GameState now has `scenario: Scenario | null` field

**Updated Context API**:
```typescript
interface GameContextType {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
  setScenario: (scenario: Scenario) => void;  // NEW
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialGameState);

  const setScenario = useCallback((scenario: Scenario) => {
    dispatch({ type: 'SET_SCENARIO', payload: scenario });
  }, []);

  return (
    <GameContext.Provider value={{ state, dispatch, setScenario }}>
      {children}
    </GameContext.Provider>
  );
};
```

**Reducer Change**:
```typescript
export const initialGameState: GameState = {
  scenario: null,  // NEW: Starts null, set by scenario selector
  currentQuestionId: null,
  // ... other fields
};

export const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'SET_SCENARIO':
      return { ...state, scenario: action.payload };
    // ... other cases
  }
};
```

**GameBoard Update**:
```typescript
// Changed from: const scenario = context.scenario;
// To:
const { state, dispatch } = useGame();
const scenario = state.scenario;
```

---

#### **✅ Step 7: Test Both Scenarios (COMPLETED)**

**Testing Results**:
1. ✅ **Scenario Selection**: Both alerts visible and clickable on SOC Overview
2. ✅ **David Scenario Flow**: 4 agents shown (EDR, NDR, Identity, IVX), all questions completable
3. ✅ **PLC Scenario Flow**: 5 agents shown (Splunk, S3, Oracle, OTMonitor, NDR), all questions completable
4. ✅ **Cross-Scenario**: Can switch between scenarios by clicking "Investigate Another Case"
5. ✅ **Timeline Replay**: Both scenarios show correct agent icons with proper colors
6. ✅ **Win Conditions**: Each scenario has appropriate win conditions (David: 15.5 min, PLC: 20 min)
7. ✅ **No Interference**: Each scenario operates independently with its own data
8. ✅ **Dynamic Agent Filtering**: Toolbox shows only relevant agents per scenario
9. ✅ **Compilation**: All HMR updates successful, no errors

**Manual Testing via HMR**:
- All changes verified via hot module replacement during development
- Both scenarios playable end-to-end
- Agent filtering working correctly
- Timeline replay showing proper agent icons and colors

---

#### **✅ Additional Improvements (Post-Implementation)**

**1. WISE Removed from Draggable Agents**
- **Rationale**: WISE is the AI orchestrator running the entire auto-investigation, not a draggable agent tool
- **Implementation**: Removed from `allAgents` array in AgentToolbox.tsx
- **Question 6**: Still uses "See Wise Verdict" button for final AI reasoning decision (correct behavior)

**2. Transparency Log Duplicate Fix**
- **Issue**: Every log line showed "[Wise] [Wise] ..." (duplicate prefix)
- **Root Cause**: Component added hardcoded "[Wise]" prefix, but scenario JSON already included it in text
- **Fix**: Added regex parsing to extract existing "[Wise]" from text, display only once with blue styling
```typescript
const wiseMatch = finalText.match(/^\[Wise\]\s*/);
const prefix = wiseMatch ? wiseMatch[0] : '';
const content = wiseMatch ? finalText.substring(prefix.length) : finalText;

return (
  <div className="log-entry">
    {prefix && <span className="log-prefix">{prefix}</span>}
    <span className="log-text">{content}</span>
  </div>
);
```

**3. Hints Verification**
- **User Concern**: Hints appeared to disappear for incorrect agent drops
- **Investigation**: Hints were already working correctly in InvestigationGraph.tsx (lines 149-153)
- **Result**: No changes needed, hints display properly for all incorrect answers

---

### **Technical Architecture Changes**

**Type System**:
- AgentType union extended (5 → 10 types)
- Backwards compatible with all existing code
- All components using AgentType automatically support new agents

**Data Sources**:
- **IT/Enterprise**: EDR, NDR, Identity, IVX (existing)
- **AI Reasoning**: WISE (existing)
- **Enterprise SIEM**: Splunk (new)
- **Network Infrastructure**: Proxy (new)
- **Cloud Telemetry**: S3 (new)
- **HR/Identity**: Oracle (new)
- **OT/ICS**: OTMonitor (new)

**Scenario Architecture**:
- Scenario selector replaces hardcoded loading
- Dynamic scenario loading via GameContext
- Two independent scenarios coexist
- Same UI/game flow, different data

---

### **Code Statistics (Phase 6 Complete)**

- **Files Created**: 1 (scenario-plc-hijacking.json - ~800 lines)
- **Files Modified**: 15 files
  - `src/types/game.ts` (AgentType extension, GameState.scenario field)
  - `src/components/AgentToolbox/AgentToolbox.tsx` (dynamic filtering, 9 agents)
  - `src/components/AgentToolbox/AgentToolbox.css` (single-column layout)
  - `src/components/SOCOverview/SOCOverview.tsx` (two scenario alerts)
  - `src/components/SOCOverview/SOCOverview.css` (critical severity styling)
  - `src/components/GameBoard/GameBoard.tsx` (state.scenario usage)
  - `src/components/TransparencyLog/TransparencyLog.tsx` (duplicate prefix fix)
  - `src/components/TimelineReplay/TimelineNode.tsx` (5 new agent icons)
  - `src/context/GameContext.tsx` (setScenario function)
  - `src/context/gameReducer.ts` (SET_SCENARIO action)
  - `src/App.tsx` (removed hardcoded loading)
  - `src/index.css` (5 new agent color variables)
  - `public/scenario-plc-hijacking.json` (moved to public folder)
- **Lines Added**: ~1,200 lines total
  - Scenario JSON: ~800 lines (60 agent answers with transparency steps)
  - Component updates: ~400 lines (dynamic filtering, scenario selection, fixes)
- **New Agent Types**: 5 (Splunk, Proxy, S3, Oracle, OTMonitor)
- **Total Scenarios**: 2 (David Squiller, PLC Hijacking)
- **Total Agent Answers Written**: 84 (David: 24 answers, PLC: 60 answers)
- **Compilation Status**: ✅ No errors, all HMR updates successful

---

### **Real Attack Data Sources**

**Cyber4OT Dataset Files**:
- **Cyber4OT_090-091**: Full successful PLC hijacking attack
- **Cyber4OT_095-096**: 15-minute baseline + attack sequence
- **Network segment**: 192.168.127.0/24 (ICS/OT network)
- **Attack tools**: Nmap (304 port scans), macof (4,127 forged MACs), tcpkill (RST floods)

**Attack Timeline**:
1. **Reconnaissance**: Nmap network scans (Insane to Sneaky modes)
2. **Positioning**: ARP spoofing with macof (MAC address forgery)
3. **Hijacking**: tcpkill connection termination (RST/FIN attacks)
4. **Takeover**: Attacker establishes rogue Modbus TCP session
5. **Control**: Attacker can now issue commands to PLC

**Transparency Log Examples**:
```
"[Wise] Querying Splunk index: index=edr source=sysmon host=192.168.127.100"
"[Wise] Analyzing VPC flow logs: s3://security-logs-prod/vpc-flow-logs/2024/11/05/"
"[Wise] Executing Oracle query: SELECT * FROM hr_employees WHERE department='OT Operations'"
"[Wise] Parsing Modbus TCP traffic: port 502, function code 0x03 (Read Holding Registers)"
"[Wise] NDR correlation: 12 PLCs affected, 7 show anomalous Modbus traffic patterns"
```

---

### **Phase 6 Complete Summary**

**All 7 Implementation Steps Completed**:
1. ✅ Extended AgentType from 5 to 10 types
2. ✅ Created complete scenario-plc-hijacking.json (~800 lines, 60 agent answers)
3. ✅ Updated AgentToolbox with dynamic agent filtering per scenario
4. ✅ Added CSS styling for 5 new agent colors and timeline icons
5. ✅ Implemented two-alert scenario selector on SOC Overview
6. ✅ Refactored App.tsx and GameContext for dynamic scenario loading
7. ✅ Tested both scenarios independently and cross-scenario flow

**Additional Improvements**:
- ✅ Removed WISE from draggable agents (AI orchestrator, not a tool)
- ✅ Fixed transparency log duplicate "[Wise]" prefix
- ✅ Verified hints display correctly for incorrect answers
- ✅ Implemented single-column layout for 4-5 agents

**Development Time**: ~8-10 hours total (including scenario writing, testing, and refinements)

**Phase 6 Status**: ✅ **COMPLETE** - Multi-Scenario Support with 10 Agent Types!

---

## 🎮 Current State - Live & Production Ready!

### ✅ **Implemented Features**
1. **SOC Overview Start Screen**
   - 500 animated alert nodes with realistic swarm effect
   - Live SOC statistics display
   - Interactive David Squiller alert with hover preview
   - Smooth zoom transition to main game
   - Dramatic visual impact with Trellix branding

2. **Complete Drag & Drop System**
   - All 4 agents draggable (EDR, NDR, Identity, IVX)
   - All 6 questions droppable (with lock/unlock logic)
   - Magnetic snap behavior
   - Visual feedback on drag-over

3. **Full Game Logic**
   - Agent assignment tracking
   - Correct/incorrect answer processing
   - Confidence score calculation (0% → 98%)
   - Time saved tracking (0 → 15.5 minutes)
   - Question progression (Q1 → Q2 → ... → Q6)
   - Win condition detection

4. **Answer Display System**
   - Correct answers: Green border, high confidence badge
   - Incorrect answers: Red border, low confidence badge, hints
   - Agent labeling (shows which agent was used)
   - Answer text from scenario JSON

5. **Progress Tracking**
   - Live confidence score (footer)
   - Live time saved (footer)
   - Questions answered counter (footer)
   - Visual question states (locked, active, completed)

6. **Transparency Log with Streaming Animation**
   - Character-by-character streaming (30ms per char)
   - Blinking typing cursor during active streaming
   - Sequential entry queuing (one at a time)
   - Auto-scroll to bottom as text appears
   - Monospace terminal styling
   - [Wise] prefix in blue
   - Empty state message

7. **Investigation Guide**
   - Animated downward arrow to guide users
   - Clear instruction text about data source access
   - Positioned between alert and questions

8. **Timeline Replay Feature**
   - Automatic playback on ROI summary screen
   - Sequential animation of 7 timeline nodes (initial alert + 6 questions)
   - Streaming particle system (50 particles per card, hundreds total)
   - Visual data flow mimicking SOC alert swarm aesthetic
   - Animated confidence bars showing cumulative progress (0% → 95%)
   - Time saved badges with ⏱️ icons
   - Agent icons with color-coded glows
   - Smooth transitions between cards (800ms display + 500ms gap)
   - ~9 second total animation duration
   - Full-width layout breaking out of center container

9. **Complete Game Flow**
   - SOC Overview screen → Click David alert
   - Zoom animation → Main game loads
   - Drag agents to questions → Answer revealed
   - Progress through 6 questions → Build confidence
   - Win conditions met → Remediation button appears
   - Click remediation → ROI summary screen
   - Timeline replay auto-plays → Metrics reveal

10. **Public Deployment**
    - Live at https://wisegame.pages.dev/
    - GitHub repository integration
    - Auto-deploy on code changes
    - Cloudflare CDN for global performance
    - HTTPS enabled

### ⚠️ **Pending Features (Optional Enhancements)**
- **Sound Effects**: Audio feedback (pickup, drop, success, error, victory) - Optional
- **Tutorial Tooltips**: First-time user guidance - Optional
- **Performance Testing**: Cross-browser testing, accessibility improvements
- **Playwright Testing Suite**: Automated end-to-end tests

---

## 🚀 Next Steps - Optional Polish & Testing

With Timeline Replay complete, the core game experience is fully implemented and production-ready. Remaining work focuses on optional enhancements and automated testing.

---

## 📅 Optional Enhancement Roadmap

### **Optional: Sound Effects** (1 hour)
- [ ] Find/create 5 sound assets (pickup, drop, success, error, victory)
- [ ] Create sound manager hook or utility
- [ ] Add audio files to public folder
- [ ] Play sounds on: drag start, drop, correct answer, incorrect answer, game complete
- [ ] Optional: Add mute toggle button

### **Optional: Polish & Edge Cases** (2 hours)
- [ ] Add interactive tooltip hints (first-time guidance)
- [ ] Handle rapid clicking/double drops
- [ ] Add shake animation for incorrect drops (CSS already exists)
- [ ] Performance optimization (React.memo for static components)
- [ ] Cross-browser testing (Chrome, Edge, Firefox)
- [ ] Accessibility: ARIA labels, keyboard navigation

### **Optional: Playwright Testing** (2-3 hours)
- [ ] Set up Playwright test suite
- [ ] Test: Agent Logic (NDR on process question → low confidence)
- [ ] Test: Breadcrumb Check (90-day lookback dialogue appears for Identity agent on Q2)
- [ ] Test: ROI Calculation (final screen shows 15.5 min saved)
- [ ] Test: Drag and drop functionality
- [ ] Test: Animation performance (60fps)
- [ ] Test: Sound playback (if implemented)
- [ ] Test: Win condition triggering
- [ ] Test: All 24 agent/question combinations

### **Phase 7: Final Polish & Documentation** (1 hour)
- [ ] Update README with gameplay instructions
- [ ] Add screenshots/GIF to documentation
- [ ] Code cleanup and comments
- [ ] Build production bundle
- [ ] Test offline functionality
- [ ] Prepare for deployment (Netlify/Vercel)
- [ ] Final CLAUDE.md update

---

## 📊 Progress Metrics

**Total Files Created**: 39 files (including Phase 6)
**Total Lines of Code**: ~6,060 (Phase 1: 3,500 | Phase 2: +200 | Phase 3: +100 | Phase 4: +400 | Phase 5: +650 | Phase 6: +1,210)
**Components**: 11 (SOCOverview, GameBoard, AgentToolbox, InvestigationGraph, TransparencyLog, ROISummary, TimelineReplay, TimelineNode, TimelineConnector, ConfidenceBar, App)
**Custom Hooks**: 1 (useStreamingText)
**Type Definitions**: 12 types, 4 interfaces (TimelineEvent, Particle, LogEntry, Question)
**Agent Types**: 10 total (EDR, NDR, Identity, IVX, WISE, Splunk, Proxy, S3, Oracle, OTMonitor) ✅ **+5 new multi-source agents**
**Draggable Agents**: 9 (WISE removed as it's the AI orchestrator, not a tool)
**State Actions**: 10 action types (all implemented, including SET_SCENARIO)
**Scenarios**: 2 scenarios complete (David Squiller ✅, PLC Hijacking ✅)
**Scenario Questions**: 6 questions per scenario (12 total)
**Agent Answers**: 84 total answers (David: 24, PLC: 60)
**Dynamic Agent Filtering**: David shows 4 agents, PLC shows 5 agents
**CSS Classes**: ~90 classes across all components (including 5 new agent styles)
**Particle System**: 50 particles per card × 7 cards = up to 350 concurrent particles

**Phase 1 Completion**: ✅ 100% (Requirements, Setup, UI)
**Phase 2 Completion**: ✅ 100% (Drag & Drop, Game Logic)
**Phase 3 Completion**: ✅ 100% (Transparency Log Streaming)
**Phase 4 Completion**: ✅ 100% (SOC Overview, Deployment)
**Phase 5 Completion**: ✅ 100% (Timeline Replay, Streaming Particles)
**Phase 6 Completion**: ✅ 100% (OT Scenario & Multi-Source Telemetry - All 7 steps complete!)
**Overall Project Completion**: ~95% (Core features complete, optional enhancements remain)

**Bug Fixes & Improvements Completed**:
- ✅ Confidence system rebalanced (40% → 95% gradual progression)
- ✅ Incorrect agents no longer complete questions
- ✅ Question 6 converted to "See Wise Verdict" button
- ✅ Transparency log streaming (no overwrite effect)
- ✅ Intro screen removed (redundant with SOC Overview)
- ✅ Investigation guide added (downward arrow)
- ✅ Alert card height optimized (200px)
- ✅ Timing pressure removed (no completion time metric)
- ✅ Timeline replay added to ROI summary
- ✅ Streaming particle system (hundreds of animated circles)
- ✅ ROI summary layout restructured for full-width timeline
- ✅ Page scrolling fixed (body overflow, #root min-height)
- ✅ **Phase 6**: Multi-scenario support with dynamic agent filtering
- ✅ **Phase 6**: WISE removed from draggable agents (AI orchestrator clarification)
- ✅ **Phase 6**: Transparency log duplicate "[Wise]" prefix fixed
- ✅ **Phase 6**: Two-scenario selector on SOC Overview (High vs Critical severity)
- ✅ **Phase 6**: Single-column agent layout for 4-5 agents

**Deployment Status**: ✅ LIVE at https://wisegame.pages.dev/
**Estimated Time to Final Polish**: 1-2 hours remaining (optional enhancements only)

**Development Velocity:**
- Phase 1: ~3 hours (requirements + setup + components)
- Phase 2: ~1 hour (drag-and-drop + game logic)
- Phase 3: ~1 hour (streaming animation + bug fixes)
- Phase 4: ~1.5 hours (SOC overview + deployment + UX refinements)
- Phase 5: ~2 hours (timeline replay + streaming particles + layout fixes)
- Phase 6: ~9 hours (OT scenario + 5 new agents + dynamic filtering + testing + refinements)
- **Total: ~17.5 hours to full multi-scenario game!**

---

## 🔧 Technical Details

### **Dependencies Installed**
```json
{
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "@hello-pangea/dnd": "^17.0.0"
  },
  "devDependencies": {
    "@types/react": "^18.3.12",
    "@types/react-dom": "^18.3.1",
    "@typescript-eslint/eslint-plugin": "^8.15.0",
    "@typescript-eslint/parser": "^8.15.0",
    "@vitejs/plugin-react": "^4.3.4",
    "eslint": "^9.15.0",
    "typescript": "^5.6.3",
    "vite": "^6.0.3"
  }
}
```

### **Project Structure**
```
wiseGame/
├── src/
│   ├── components/
│   │   ├── AgentToolbox/
│   │   │   ├── AgentToolbox.tsx
│   │   │   └── AgentToolbox.css
│   │   ├── GameBoard/
│   │   │   └── GameBoard.tsx
│   │   ├── SOCOverview/
│   │   │   ├── SOCOverview.tsx
│   │   │   └── SOCOverview.css
│   │   ├── InvestigationGraph/
│   │   │   ├── InvestigationGraph.tsx
│   │   │   └── InvestigationGraph.css
│   │   ├── ROISummary/
│   │   │   ├── ROISummary.tsx
│   │   │   └── ROISummary.css
│   │   └── TransparencyLog/
│   │       ├── TransparencyLog.tsx
│   │       └── TransparencyLog.css
│   ├── context/
│   │   ├── GameContext.tsx
│   │   └── gameReducer.ts
│   ├── hooks/
│   │   └── useStreamingText.ts
│   ├── types/
│   │   └── game.ts
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── public/
│   └── scenario-david-squiller.json
├── scenario-david-squiller.json
├── .gitignore
├── wrangler.toml
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
├── README.md
├── CLAUDE.md (this file)
├── Wise Auto Investigation.txt
└── Wise Auto-investigation Product Requirements Document (1).md
```

### **State Flow**
```
User visits https://wisegame.pages.dev/
  ↓
SOC Overview screen loads (gamePhase: 'soc-overview')
  ↓
User hovers over David Squiller alert → Preview popup appears
  ↓
User clicks David Squiller alert
  ↓
dispatch({ type: 'START_GAME' })
  ↓
gamePhase: 'soc-overview' → 'playing'
currentQuestionId: 'q1'
startTime: Date.now()
  ↓
Zoom animation plays → Main game loads
  ↓
User drags EDR agent to Q1 dropzone
  ↓
onDragEnd handler
  ↓
dispatch({ type: 'ASSIGN_AGENT', payload: { questionId: 'q1', agentType: 'EDR' } })
  ↓
Lookup answer from scenario.questions[0].answers['EDR']
  ↓
dispatch({ type: 'ADD_LOG_ENTRIES', payload: [...transparencySteps] })
dispatch({ type: 'COMPLETE_QUESTION', payload: { questionId: 'q1', confidence: 90, timeSaved: 3 } })
dispatch({ type: 'UNLOCK_NEXT_QUESTION', payload: 'q2' })
  ↓
Repeat for Q2-Q6...
  ↓
After Q6 completed and win conditions met:
dispatch({ type: 'SHOW_REMEDIATION_BUTTON' })
  ↓
User clicks "Execute Agentic Remediation"
  ↓
dispatch({ type: 'COMPLETE_GAME' })
  ↓
gamePhase: 'playing' → 'complete'
endTime: Date.now()
  ↓
ROI Summary displayed
```

---

## 💡 Key Insights & Decisions

### **Why @hello-pangea/dnd over react-beautiful-dnd?**
- react-beautiful-dnd is no longer maintained
- @hello-pangea/dnd is the active fork with React 18 support
- API is identical, drop-in replacement

### **Why Context + useReducer over Redux?**
- Single game state (not multiple features)
- No need for middleware or dev tools
- Simpler setup, less boilerplate
- Sufficient for MVP complexity

### **Why JSON for scenario data?**
- Easy to update without code changes
- Supports future scenario variations
- Clear separation of data and logic
- Can be loaded dynamically

### **Why no visible timer?**
- Reduces pressure on demo presenters
- 45-second target is design goal, not hard rule
- Focus on correct agent selection, not speed
- Better UX for learning/education

### **Why linear progression over branching?**
- Simpler state management
- Clearer narrative flow
- Matches actual investigation process
- Easier to test and debug
- Sufficient for MVP

---

## 🐛 Known Issues & Limitations

### **Current Limitations (Intentional for MVP)**
1. **No mobile support** - Desktop only (min 1280px)
2. **Limited scenarios** - 2 scenarios (David Squiller complete, PLC Hijacking in progress)
3. **No analytics** - No tracking or data collection
4. **No backend** - Purely client-side, static hosting
5. **No save/resume** - Game state not persisted
6. **No difficulty levels** - Single fixed difficulty per scenario
7. **No leaderboard** - No scoring or comparison

### **Technical Debt to Address**
1. **TypeScript strict mode** - Some `any` types to clean up
2. **Accessibility** - Need ARIA labels, keyboard navigation
3. **Error boundaries** - No error boundaries for component crashes
4. **Loading states** - Basic loading spinner, could be improved
5. **Code splitting** - No lazy loading of components yet

### **Future Enhancements (Post-Phase 6)**
1. **Additional scenarios** - Beyond David Squiller and PLC Hijacking (ransomware, supply chain, etc.)
2. **Difficulty modes** - Easy/Normal/Hard with time pressure
3. **Hint system** - Optional hints for stuck players
4. **Achievement system** - Badges for perfect runs, speed runs, etc.
5. **Scenario editor** - UI to create new scenarios without coding
6. **Localization** - Support multiple languages
7. **Demo mode** - Auto-play for presentations

---

## 📝 Notes for Future Development

### **Drag & Drop Tips**
- Use `droppableId` format: `question-${questionId}`
- Use `draggableId` format: `agent-${agentType}`
- Enable clone mode for agents (they stay in toolbox)
- Disable drops on locked questions in onDragEnd validation

### **Animation Performance**
- Use CSS transforms (not top/left) for 60fps
- Avoid animating expensive properties (box-shadow in moderation)
- Use `will-change` sparingly on animated elements
- Test on lower-end devices

### **Sound Implementation**
- Use Web Audio API for better control
- Preload all sounds on game start
- Provide mute button (accessibility requirement)
- Keep sounds short (<1 second) and subtle

### **Testing Priorities**
1. Happy path (all correct agents)
2. All incorrect combinations (24 tests)
3. Edge cases (rapid clicking, double drops)
4. Cross-browser (Chrome, Edge, Firefox)
5. Performance (60fps, no memory leaks)

---

## 🎓 Lessons Learned

1. **Requirements gathering first** - The detailed interview saved hours of rework
2. **PRD as single source of truth** - Having everything documented prevented scope creep
3. **TypeScript pays off** - Type safety caught several bugs early
4. **Component isolation** - Each component in its own folder with CSS makes refactoring easy
5. **State first, UI second** - Getting the reducer right made component development smooth
6. **Scenario data extraction** - Pulling from slides early validated the game structure

---

## 🔗 References

**Documentation:**
- [Wise Auto-investigation Product Requirements Document (1).md](./Wise%20Auto-investigation%20Product%20Requirements%20Document%20(1).md)
- [README.md](./README.md)

**Scenario Data:**
- [scenario-david-squiller.json](./scenario-david-squiller.json)
- [Wise Auto Investigation.txt](./Wise%20Auto%20Investigation.txt) (slides 20-30)

**External Resources:**
- [@hello-pangea/dnd Documentation](https://github.com/hello-pangea/dnd)
- [React Context + useReducer Pattern](https://react.dev/learn/scaling-up-with-reducer-and-context)
- [Vite Documentation](https://vite.dev/)

---

## ✅ Phase 1 Completion Checklist

- [x] Requirements gathering interview completed
- [x] PRD updated with technical specifications
- [x] Scenario data extracted and structured (JSON)
- [x] Project initialized (Vite + React + TypeScript)
- [x] Dependencies installed (189 packages)
- [x] Type definitions created (game.ts)
- [x] State management implemented (Context + Reducer)
- [x] Component structure created (7 components)
- [x] Styling applied (Trellix brand theme)
- [x] Intro screen implemented
- [x] 3-panel layout implemented
- [x] Progress indicators implemented
- [x] ROI summary screen implemented
- [x] Dev server running successfully
- [x] No compilation errors
- [x] README documentation written
- [x] CLAUDE.md development journal created

**Phase 1 Status**: ✅ **COMPLETE**

---

## ✅ Phase 2 Completion Checklist

- [x] Wrapped GameBoard in DragDropContext
- [x] Implemented handleDragEnd with full game logic
- [x] Made all 4 agents draggable (EDR, NDR, Identity, IVX)
- [x] Made all 6 questions droppable with lock validation
- [x] Connected agent drops to state updates
- [x] Implemented answer display system (correct/incorrect)
- [x] Added confidence badges (high/low)
- [x] Added hint system for incorrect answers
- [x] Implemented question progression (unlock next)
- [x] Connected transparency log entries
- [x] Implemented win condition detection
- [x] Added "Execute Agentic Remediation" button
- [x] Tested all game flows (correct agents, incorrect agents, progression)
- [x] Updated CSS with answer display styles
- [x] Verified HMR updates working
- [x] No compilation errors

**Phase 2 Status**: ✅ **COMPLETE**

**Game Playability**: 🎮 **FULLY PLAYABLE!**

---

## 🚦 Production Status

**Current Position**: Phase 6 Complete! ✅ Multi-Scenario Support with 10 Agent Types
**Live URL**: https://wisegame.pages.dev/
**Blocker Status**: None
**Progress**: 95% Complete (Both scenarios complete, optional enhancements remain)

**Current Game State:**
- ✅ SOC Overview start screen with alert swarm
- ✅ Complete drag & drop system
- ✅ Full game logic and state management
- ✅ Correct/incorrect agent mechanics
- ✅ Gradual confidence progression (40% → 95%)
- ✅ Answer display with feedback and hints
- ✅ Win/loss conditions
- ✅ ROI summary screen
- ✅ Transparency log streaming with typing animation
- ✅ Question 6 "See Wise Verdict" button
- ✅ Investigation guide with animated arrow
- ✅ Timeline Replay with streaming particles
- ✅ Deployed to Cloudflare Pages
- ✅ GitHub integration with auto-deploy
- ✅ **Phase 6: OT Scenario & Multi-Source Telemetry (COMPLETE)**
  - ✅ AgentType extended (5 → 10 types: +Splunk, Proxy, S3, Oracle, OTMonitor)
  - ✅ Created scenario-plc-hijacking.json (~800 lines, 60 agent answers)
  - ✅ Updated AgentToolbox with dynamic agent filtering per scenario
  - ✅ Added CSS styling for 5 new agent colors and timeline icons
  - ✅ Implemented two-alert scenario selector on SOC Overview
  - ✅ Refactored App.tsx + GameContext for dynamic scenario loading
  - ✅ Tested both scenarios independently and cross-scenario flow
  - ✅ WISE removed from draggable agents (AI orchestrator clarification)
  - ✅ Fixed transparency log duplicate "[Wise]" prefix
  - ✅ Scenario-specific agent lists (David: 4, PLC: 5)
- ⏳ Sound effects (optional - Future enhancement)
- ⏳ Additional polish (optional - Future enhancement)

**Play Online:**
Visit https://wisegame.pages.dev/ to play the live game!

**Local Development:**
```bash
cd c:\Users\ShristiSharma\Desktop\wiseGame
npm run dev
# Navigate to http://localhost:3001
```

**How to Play:**
1. Visit https://wisegame.pages.dev/
2. View SOC Overview with 500 animated alerts
3. Choose your scenario:
   - **David Squiller** (High severity, blue glow) - Enterprise IT credential theft
   - **PLC-HVAC-012** (Critical severity, red glow) - OT/ICS PLC hijacking
4. Click alert to begin investigation
5. Drag relevant agents to questions:
   - **David**: EDR, NDR, Identity, IVX (4 agents)
   - **PLC**: Splunk, S3, Oracle, OTMonitor, NDR (5 agents)
6. Build confidence to 95% and save time (David: 15.5 min, PLC: 20 min)
7. Click "See Wise Verdict" for Question 6
8. Execute Agentic Remediation
9. **Watch timeline replay with streaming particles**
10. View your ROI metrics!
11. Click "Investigate Another Case" to try the other scenario

**Repository:**
- GitHub: https://github.com/shristi-trellix/wiseGame
- Auto-deploys on push to main branch

---

**End of CLAUDE.md** | Last updated: 2026-02-12 | Phase 6 Complete ✅ | Multi-Scenario Support with 10 Agent Types!
