import { AgentType } from '../types/game';

export interface QuestionResult {
  wrongGuesses: number;
  wrongAgentsUsed: AgentType[];
  correctAgent: AgentType;
}

export interface ScoreBreakdown {
  accuracyScore: number;     // 0-700
  speedScore: number;        // 0-300
  rawScore: number;          // 0-1000
  multiplier: number;        // 1 or 2
  finalScore: number;
  completionTimeMs: number;
  questionResults: Record<string, QuestionResult>;
}

// Accuracy factor based on wrong guesses for a single question
function getAccuracyFactor(wrongGuesses: number): number {
  switch (wrongGuesses) {
    case 0: return 1.0;   // Perfect - first try
    case 1: return 0.6;   // Decent
    case 2: return 0.3;   // Struggled
    default: return 0.1;  // Brute-forced (3+)
  }
}

// Calculate accuracy points (0-700) from wrong guesses per question
export function calculateAccuracyScore(wrongGuesses: Record<string, number>, totalQuestions: number): number {
  let totalFactor = 0;
  for (let i = 1; i <= totalQuestions; i++) {
    const qId = `q${i}`;
    const guesses = wrongGuesses[qId] || 0;
    totalFactor += getAccuracyFactor(guesses);
  }
  const avgFactor = totalFactor / totalQuestions;
  return Math.round(avgFactor * 700);
}

// Calculate speed points (0-300) from completion time in milliseconds
export function calculateSpeedScore(completionTimeMs: number): number {
  const completionSeconds = completionTimeMs / 1000;
  // 30s or less = perfect (1.0), 210s+ = no bonus (0.0)
  const speedFactor = Math.max(0, Math.min(1, 1 - (completionSeconds - 30) / 180));
  return Math.round(speedFactor * 300);
}

// Get difficulty multiplier for a scenario
export function getMultiplier(scenarioId: string): number {
  return scenarioId === 'plc-hijacking-manufacturing' ? 2 : 1;
}

// Calculate full score breakdown
export function calculateFinalScore(
  wrongGuesses: Record<string, number>,
  wrongAgentsUsed: Record<string, AgentType[]>,
  completionTimeMs: number,
  scenarioId: string,
  totalQuestions: number = 6,
  agentAssignments: Record<string, AgentType> = {}
): ScoreBreakdown {
  const accuracyScore = calculateAccuracyScore(wrongGuesses, totalQuestions);
  const speedScore = calculateSpeedScore(completionTimeMs);
  const rawScore = accuracyScore + speedScore;
  const multiplier = getMultiplier(scenarioId);
  const finalScore = rawScore * multiplier;

  // Build question results
  const questionResults: Record<string, QuestionResult> = {};
  for (let i = 1; i <= totalQuestions; i++) {
    const qId = `q${i}`;
    questionResults[qId] = {
      wrongGuesses: wrongGuesses[qId] || 0,
      wrongAgentsUsed: wrongAgentsUsed[qId] || [],
      correctAgent: agentAssignments[qId] as AgentType,
    };
  }

  return {
    accuracyScore,
    speedScore,
    rawScore,
    multiplier,
    finalScore,
    completionTimeMs,
    questionResults,
  };
}
