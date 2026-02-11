// Agent types
export type AgentType = 'EDR' | 'NDR' | 'Identity' | 'IVX' | 'WISE';

// Game phases
export type GamePhase = 'soc-overview' | 'playing' | 'complete';

// Transparency log entry
export interface LogEntry {
  id: string;
  timestamp: number;
  text: string;
  agentType?: AgentType;
}

// Question answer for different agents
export interface QuestionAnswer {
  confidence: number;
  text: string;
  isCorrect: boolean;
  hint?: string;
  transparencySteps: string[];
}

// Investigation question
export interface Question {
  id: string;
  order: number;
  text: string;
  category: string;
  locked: boolean;
  correctAgent: AgentType;
  timeSaved: number;
  isDecision?: boolean;
  answers: Record<AgentType, QuestionAnswer>;
}

// Initial alert information
export interface InitialAlert {
  title: string;
  host: string;
  severity: string;
  timestamp: string;
  rawDetails: string;
}

// Win conditions
export interface WinConditions {
  minConfidenceScore: number;
  minTimeSaved: number;
  allQuestionsAnswered: boolean;
}

// Complete scenario data structure
export interface Scenario {
  id: string;
  title: string;
  description: string;
  initialAlert: InitialAlert;
  questions: Question[];
  winConditions: WinConditions;
  metrics: {
    totalQuestions: number;
    totalTimeSavingsPossible: number;
    perfectPlaytimeTarget: number;
  };
}

// Game state
export interface GameState {
  currentQuestionId: string | null;
  completedQuestions: string[];
  agentAssignments: Record<string, AgentType>;
  confidenceScore: number;
  timeSaved: number;
  transparencyLog: LogEntry[];
  gamePhase: GamePhase;
  showRemediationButton: boolean;
  startTime: number | null;
  endTime: number | null;
}

// Game actions for reducer
export type GameAction =
  | { type: 'START_GAME' }
  | { type: 'ASSIGN_AGENT'; payload: { questionId: string; agentType: AgentType } }
  | { type: 'UPDATE_CONFIDENCE'; payload: { confidence: number; timeSaved: number } }
  | { type: 'COMPLETE_QUESTION'; payload: { questionId: string; confidence: number; timeSaved: number } }
  | { type: 'ADD_LOG_ENTRIES'; payload: LogEntry[] }
  | { type: 'UNLOCK_NEXT_QUESTION'; payload: string }
  | { type: 'SHOW_REMEDIATION_BUTTON' }
  | { type: 'COMPLETE_GAME' }
  | { type: 'RESET_GAME' };
