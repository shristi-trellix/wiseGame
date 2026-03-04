import { GameState, GameAction } from '../types/game';

export const initialGameState: GameState = {
  scenario: null,
  currentQuestionId: null,
  completedQuestions: [],
  agentAssignments: {},
  confidenceScore: 0,
  timeSaved: 0,
  transparencyLog: [],
  gamePhase: 'landing',
  showRemediationButton: false,
  startTime: null,
  endTime: null,
  wrongGuesses: {},
  wrongAgentsUsed: {},
  currentScoreBreakdown: null,
};

export const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'SET_SCENARIO':
      return {
        ...state,
        scenario: action.payload,
      };

    case 'START_GAME':
      return {
        ...state,
        gamePhase: 'playing',
        currentQuestionId: 'q1',
        startTime: Date.now(),
        wrongGuesses: {},
        wrongAgentsUsed: {},
        currentScoreBreakdown: null,
      };

    case 'ASSIGN_AGENT': {
      const { questionId, agentType } = action.payload;
      return {
        ...state,
        agentAssignments: {
          ...state.agentAssignments,
          [questionId]: agentType,
        },
      };
    }

    case 'UPDATE_CONFIDENCE': {
      const { confidence, timeSaved } = action.payload;
      return {
        ...state,
        confidenceScore: Math.min(100, state.confidenceScore + confidence),
        timeSaved: state.timeSaved + timeSaved,
      };
    }

    case 'COMPLETE_QUESTION': {
      const { questionId, confidence, timeSaved } = action.payload;
      return {
        ...state,
        completedQuestions: [...state.completedQuestions, questionId],
        confidenceScore: Math.min(100, state.confidenceScore + confidence),
        timeSaved: state.timeSaved + timeSaved,
      };
    }

    case 'ADD_LOG_ENTRIES':
      return {
        ...state,
        transparencyLog: [...state.transparencyLog, ...action.payload],
      };

    case 'UNLOCK_NEXT_QUESTION':
      return {
        ...state,
        currentQuestionId: action.payload,
      };

    case 'SHOW_REMEDIATION_BUTTON':
      return {
        ...state,
        showRemediationButton: true,
      };

    case 'COMPLETE_GAME':
      return {
        ...state,
        gamePhase: 'complete',
        endTime: Date.now(),
      };

    case 'RESET_GAME':
      return {
        ...initialGameState,
        gamePhase: 'soc-overview', // After reset, go to SOC overview (not registration)
      };

    case 'RECORD_WRONG_GUESS': {
      const { questionId, agentType } = action.payload;
      const currentCount = state.wrongGuesses[questionId] || 0;
      const currentAgents = state.wrongAgentsUsed[questionId] || [];
      return {
        ...state,
        wrongGuesses: {
          ...state.wrongGuesses,
          [questionId]: currentCount + 1,
        },
        wrongAgentsUsed: {
          ...state.wrongAgentsUsed,
          [questionId]: [...currentAgents, agentType],
        },
      };
    }

    case 'SET_SCORE_BREAKDOWN':
      return {
        ...state,
        currentScoreBreakdown: action.payload,
      };

    case 'SET_PHASE':
      return {
        ...state,
        gamePhase: action.payload,
      };

    default:
      return state;
  }
};
