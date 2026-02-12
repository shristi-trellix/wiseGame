# CLAUDE.md - Wise Detective Development Journal

**Project**: Wise Detective - The Auto-Investigation Challenge
**Purpose**: Interactive game demonstrating Trellix Wise's agentic flows for security alert triage
**Status**: Deployed & Live ✅ | Public Demo Available 🌐 | Feature Complete 🎉
**Live URL**: https://wisegame.pages.dev/
**Last Updated**: 2026-02-12

---

## 📋 Project Overview

Wise Detective is an educational game that demonstrates how Trellix Wise's AI-powered security operations platform uses specialized agents (EDR, NDR, Identity, IVX) to automatically investigate security alerts. Players drag agents to investigation questions, building confidence and saving analyst time through the David Squiller security incident scenario.

**Key Goals:**
- Demonstrate agentic AI flows in cybersecurity
- Show ROI through time savings (12+ minutes in <45 seconds)
- Educational tool for Trellix demos and presentations
- Content accuracy with actual product capabilities

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

**Total Files Created**: 38 files
**Total Lines of Code**: ~4,850 (Phase 1: 3,500 | Phase 2: +200 | Phase 3: +100 | Phase 4: +400 | Phase 5: +650)
**Components**: 11 (SOCOverview, GameBoard, AgentToolbox, InvestigationGraph, TransparencyLog, ROISummary, TimelineReplay, TimelineNode, TimelineConnector, ConfidenceBar, App)
**Custom Hooks**: 1 (useStreamingText)
**Type Definitions**: 12 types, 4 interfaces (added TimelineEvent + Particle)
**State Actions**: 9 action types (all implemented)
**Scenario Questions**: 6 questions (with 24 agent answers total)
**CSS Classes**: ~75 classes across all components
**Particle System**: 50 particles per card × 7 cards = up to 350 concurrent particles

**Phase 1 Completion**: ✅ 100% (Requirements, Setup, UI)
**Phase 2 Completion**: ✅ 100% (Drag & Drop, Game Logic)
**Phase 3 Completion**: ✅ 100% (Transparency Log Streaming)
**Phase 4 Completion**: ✅ 100% (SOC Overview, Deployment)
**Phase 5 Completion**: ✅ 100% (Timeline Replay, Streaming Particles)
**Overall Project Completion**: ~95% (Feature Complete!)

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

**Deployment Status**: ✅ LIVE at https://wisegame.pages.dev/
**Estimated Time to Final Polish**: 1-2 hours remaining (optional enhancements only)

**Development Velocity:**
- Phase 1: ~3 hours (requirements + setup + components)
- Phase 2: ~1 hour (drag-and-drop + game logic)
- Phase 3: ~1 hour (streaming animation + bug fixes)
- Phase 4: ~1.5 hours (SOC overview + deployment + UX refinements)
- Phase 5: ~2 hours (timeline replay + streaming particles + layout fixes)
- **Total: ~8.5 hours to feature-complete game!**

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
2. **Single scenario** - Only David Squiller case implemented
3. **No analytics** - No tracking or data collection
4. **No backend** - Purely client-side, static hosting
5. **No save/resume** - Game state not persisted
6. **No difficulty levels** - Single fixed difficulty
7. **No leaderboard** - No scoring or comparison

### **Technical Debt to Address**
1. **TypeScript strict mode** - Some `any` types to clean up
2. **Accessibility** - Need ARIA labels, keyboard navigation
3. **Error boundaries** - No error boundaries for component crashes
4. **Loading states** - Basic loading spinner, could be improved
5. **Code splitting** - No lazy loading of components yet

### **Future Enhancements (Post-MVP)**
1. **Multiple scenarios** - Add more investigation cases
2. **Difficulty modes** - Easy/Normal/Hard with time pressure
3. **Hint system** - Optional hints for stuck players
4. **Achievement system** - Badges for perfect runs, speed runs, etc.
5. **Scenario editor** - UI to create new scenarios
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

**Current Position**: Phase 5 Complete, Feature Complete! 🎉
**Live URL**: https://wisegame.pages.dev/
**Blocker Status**: None
**Progress**: 95% Complete (Feature Complete!)

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
- ✅ **Timeline Replay with streaming particles** (NEW!)
- ✅ Deployed to Cloudflare Pages
- ✅ GitHub integration with auto-deploy
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
3. Hover over glowing David Squiller alert node
4. Click to begin investigation
5. Drag agents to questions (EDR, NDR, Identity, IVX)
6. Build confidence to 95% and save 15.5 minutes
7. Click "See Wise Verdict" for Question 6
8. Execute Agentic Remediation
9. **Watch timeline replay with streaming particles**
10. View your ROI metrics!

**Repository:**
- GitHub: https://github.com/shristi-trellix/wiseGame
- Auto-deploys on push to main branch

---

**End of CLAUDE.md** | Last updated: 2026-02-11 | Phase 4 Complete ✅ | Live & Production Ready 🌐
