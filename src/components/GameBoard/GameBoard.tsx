import React from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { useGame } from '../../context/GameContext';
import AgentToolbox from '../AgentToolbox/AgentToolbox';
import InvestigationGraph from '../InvestigationGraph/InvestigationGraph';
import TransparencyLog from '../TransparencyLog/TransparencyLog';
import ROISummary from '../ROISummary/ROISummary';
import SOCOverview from '../SOCOverview/SOCOverview';
import { AgentType, LogEntry } from '../../types/game';
import '../../App.css';

const GameBoard: React.FC = () => {
  const { state, scenario, dispatch } = useGame();

  const handleDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;

    // No destination or dropped outside valid area
    if (!destination) {
      return;
    }

    // Dropped back on source (no-op)
    if (source.droppableId === destination.droppableId) {
      return;
    }

    // Extract agent type from draggableId (format: "agent-EDR")
    const agentType = draggableId.replace('agent-', '') as AgentType;

    // Extract question ID from destination (format: "question-q1")
    const questionId = destination.droppableId.replace('question-', '');

    // Find the question in scenario
    const question = scenario?.questions.find(q => q.id === questionId);
    if (!question) return;

    // Check if question is locked
    if (question.locked) {
      const prevQuestionIndex = question.order - 2;
      if (prevQuestionIndex >= 0) {
        const prevQuestionId = scenario?.questions[prevQuestionIndex]?.id;
        if (prevQuestionId && !state.completedQuestions.includes(prevQuestionId)) {
          return; // Question is locked
        }
      }
    }

    // Check if question is already completed
    if (state.completedQuestions.includes(questionId)) {
      return; // Don't allow re-answering
    }

    // Get the answer for this agent
    const answer = question.answers[agentType];
    if (!answer) return;

    // Record the agent assignment
    dispatch({
      type: 'ASSIGN_AGENT',
      payload: { questionId, agentType }
    });

    // Generate transparency log entries with unique IDs
    const logEntries: LogEntry[] = answer.transparencySteps.map((step, index) => ({
      id: `${questionId}-${agentType}-${index}-${Date.now()}`,
      timestamp: Date.now() + index * 50,
      text: step,
      agentType,
    }));

    // Add log entries
    dispatch({
      type: 'ADD_LOG_ENTRIES',
      payload: logEntries
    });

    // Handle correct vs incorrect agent assignment
    if (answer.isCorrect) {
      // CORRECT AGENT: Complete question, unlock next, save time
      dispatch({
        type: 'COMPLETE_QUESTION',
        payload: {
          questionId,
          confidence: answer.confidence,
          timeSaved: question.timeSaved
        }
      });

      // Unlock next question
      const nextQuestion = scenario?.questions.find(q => q.order === question.order + 1);
      if (nextQuestion) {
        dispatch({
          type: 'UNLOCK_NEXT_QUESTION',
          payload: nextQuestion.id
        });
      }

      // Check win conditions
      const allQuestionsAnswered = state.completedQuestions.length + 1 === scenario?.questions.length;
      const newConfidence = state.confidenceScore + answer.confidence;
      const newTimeSaved = state.timeSaved + question.timeSaved;

      if (
        allQuestionsAnswered &&
        newConfidence >= (scenario?.winConditions.minConfidenceScore || 95) &&
        newTimeSaved >= (scenario?.winConditions.minTimeSaved || 12)
      ) {
        // Show remediation button after a brief delay
        setTimeout(() => {
          dispatch({ type: 'SHOW_REMEDIATION_BUTTON' });
        }, 1000);
      }
    }
    // INCORRECT AGENT: Don't increase confidence or time saved
    // Player can try again with correct agent
  };

  // Show SOC overview screen
  if (state.gamePhase === 'soc-overview') {
    return <SOCOverview />;
  }

  // Show completion screen
  if (state.gamePhase === 'complete') {
    return <ROISummary />;
  }

  // Main game view (3-panel layout)
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="app">
        {/* Header */}
        <header className="app-header">
          <h1 className="app-title">Wise Auto Investigation</h1>
          <div className="app-subtitle">{scenario?.title || 'The Auto-Investigation Challenge'}</div>
        </header>

        {/* Three-panel game area */}
        <div className="game-container">
          {/* Left Panel: Agent Toolbox */}
          <div className="panel agent-toolbox-panel">
            <div className="panel-header">Agent Toolbox</div>
            <div className="panel-content">
              <AgentToolbox />
            </div>
          </div>

          {/* Center Panel: Investigation Graph */}
          <div className="panel investigation-panel">
            <div className="panel-header">Investigation Board</div>
            <div className="panel-content">
              <InvestigationGraph />
            </div>
          </div>

          {/* Right Panel: Transparency Log */}
          <div className="panel transparency-panel">
            <div className="panel-header">Transparency Log</div>
            <div className="panel-content">
              <TransparencyLog />
            </div>
          </div>
        </div>

        {/* Footer: Progress Indicators */}
        <div className="progress-indicators">
          <div className="progress-item">
            <div className="progress-label">Confidence Score</div>
            <div className="progress-value confidence">{state.confidenceScore}%</div>
          </div>
          <div className="progress-item">
            <div className="progress-label">Time Saved</div>
            <div className="progress-value time-saved">{state.timeSaved.toFixed(1)} min</div>
          </div>
          <div className="progress-item">
            <div className="progress-label">Questions Answered</div>
            <div className="progress-value">{state.completedQuestions.length}/{scenario?.questions.length || 0}</div>
          </div>
        </div>
      </div>
    </DragDropContext>
  );
};

export default GameBoard;
