import React, { useEffect, useRef } from 'react';
import { Droppable } from '@hello-pangea/dnd';
import { useGame } from '../../context/GameContext';
import './InvestigationGraph.css';

const InvestigationGraph: React.FC = () => {
  const { state, dispatch } = useGame();
  const scenario = state.scenario;
  const questionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const remediationButtonRef = useRef<HTMLButtonElement>(null);

  const handleWiseDecision = (questionId: string) => {
    const question = scenario?.questions.find(q => q.id === questionId);
    if (!question) return;

    // For decision questions, automatically assign WISE agent
    const agentType = 'WISE' as const;
    const answer = question.answers[agentType];
    if (!answer) return;

    // Record the agent assignment
    dispatch({
      type: 'ASSIGN_AGENT',
      payload: { questionId, agentType }
    });

    // Generate transparency log entries
    const logEntries = answer.transparencySteps.map((step: string, index: number) => ({
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

    // Complete the question
    dispatch({
      type: 'COMPLETE_QUESTION',
      payload: {
        questionId,
        confidence: answer.confidence,
        timeSaved: question.timeSaved
      }
    });

    // Check win conditions and show remediation button
    const allQuestionsAnswered = state.completedQuestions.length + 1 === scenario?.questions.length;
    const newConfidence = state.confidenceScore + answer.confidence;
    const newTimeSaved = state.timeSaved + question.timeSaved;

    if (
      allQuestionsAnswered &&
      newConfidence >= (scenario?.winConditions.minConfidenceScore || 95) &&
      newTimeSaved >= (scenario?.winConditions.minTimeSaved || 12)
    ) {
      setTimeout(() => {
        dispatch({ type: 'SHOW_REMEDIATION_BUTTON' });
      }, 1000);
    }
  };

  // Autoscroll to next question when a question is completed
  useEffect(() => {
    if (!scenario || state.completedQuestions.length === 0) return;

    // Wait a moment for the answer to render, then scroll to next question
    const timer = setTimeout(() => {
      // Find the next unanswered question
      const nextQuestion = scenario.questions.find(
        q => !state.completedQuestions.includes(q.id)
      );

      if (nextQuestion && questionRefs.current[nextQuestion.id]) {
        questionRefs.current[nextQuestion.id]?.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
    }, 500); // Wait 500ms for answer to render

    return () => clearTimeout(timer);
  }, [state.completedQuestions.length, scenario]);

  // Autoscroll to remediation button when it appears
  useEffect(() => {
    if (state.showRemediationButton) {
      // Wait a moment for button to render
      const timer = setTimeout(() => {
        remediationButtonRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }, 1200); // Wait 1200ms (1000ms for button to appear + 200ms buffer)

      return () => clearTimeout(timer);
    }
  }, [state.showRemediationButton]);

  if (!scenario) return null;

  return (
    <div className="investigation-graph">
      {/* Initial Alert Card */}
      <div className="alert-card">
        <div className="alert-badge">Initial Alert</div>
        <h3 className="alert-title">{scenario.initialAlert.title}</h3>
        <div className="alert-meta">
          <div className="alert-meta-item">
            <span className="meta-label">Host:</span>
            <span className="meta-value">{scenario.initialAlert.host}</span>
          </div>
          <div className="alert-meta-item">
            <span className="meta-label">Severity:</span>
            <span className={`alert-severity severity-${scenario.initialAlert.severity.toLowerCase()}`}>
              {scenario.initialAlert.severity}
            </span>
          </div>
          <div className="alert-meta-item">
            <span className="meta-label">Timestamp:</span>
            <span className="meta-value">{scenario.initialAlert.timestamp}</span>
          </div>
        </div>
        <div className="alert-raw-details">
          <div className="raw-details-header">Alert Details</div>
          <pre className="raw-details-content">{scenario.initialAlert.rawDetails}</pre>
        </div>
      </div>

      {/* Investigation Guide */}
      <div className="investigation-guide">
        <div className="guide-arrow">↓</div>
        <div className="guide-text">
          <strong><p>INVESTIGATION QUESTIONS BELOW</p></strong>
          Give Wise access to data sources in your environment to increase its confidence as it auto-investigates this alert
        </div>
      </div>

      {/* Questions Flow */}
      <div className="questions-flow">
        {scenario.questions.map((question, index) => {
          const isLocked = question.locked && !state.completedQuestions.includes(scenario.questions[index - 1]?.id);
          const isCompleted = state.completedQuestions.includes(question.id);
          const isActive = state.currentQuestionId === question.id;
          const assignedAgent = state.agentAssignments[question.id];
          const answer = assignedAgent ? question.answers[assignedAgent] : null;

          return (
            <React.Fragment key={question.id}>
              {/* Connector line */}
              {index > 0 && <div className="question-connector" />}

              {/* Question Card - Wrap entire card in Droppable for better UX */}
              {!isLocked && !isCompleted && (!assignedAgent || (answer && !answer.isCorrect)) && !(question as any).isDecision ? (
                <Droppable droppableId={`question-${question.id}`}>
                  {(provided, snapshot) => (
                    <div
                      ref={(el) => {
                        provided.innerRef(el);
                        questionRefs.current[question.id] = el;
                      }}
                      {...provided.droppableProps}
                      className={`question-card ${isLocked ? 'locked' : ''} ${isCompleted ? 'completed' : ''} ${
                        isActive ? 'active' : ''
                      } ${snapshot.isDraggingOver ? 'drag-over' : ''}`}
                    >
                      <div className="question-header">
                        <span className="question-number">Question {question.order}</span>
                        <span className="question-category">{question.category}</span>
                      </div>

                      <div className="question-text">{question.text}</div>

                      {/* Show answer for assigned agent (correct or incorrect) */}
                      {assignedAgent && answer && (
                        <div className={`question-answer ${answer.isCorrect ? 'correct' : 'incorrect'}`}>
                          <div className="answer-header">
                            <span className="assigned-agent">{assignedAgent} Agent</span>
                            {answer.isCorrect && (
                              <span className={`confidence-badge ${answer.confidence >= 50 ? 'high' : 'low'}`}>
                                +{answer.confidence}% Confidence
                              </span>
                            )}
                          </div>
                          <div className="answer-text">{answer.text}</div>
                          {!answer.isCorrect && answer.hint && (
                            <div className="answer-hint">
                              💡 <strong>Hint:</strong> {answer.hint}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Show dropzone hint text */}
                      {!assignedAgent && (
                        <div className="question-dropzone-hint">
                          <span className="dropzone-text">
                            Drop an agent here to investigate
                          </span>
                        </div>
                      )}

                      {/* Show retry hint for incorrect answers */}
                      {assignedAgent && answer && !answer.isCorrect && (
                        <div className="question-dropzone-hint retry">
                          <span className="dropzone-text">
                            Try a different agent
                          </span>
                        </div>
                      )}

                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              ) : (
                <div
                  ref={(el) => questionRefs.current[question.id] = el}
                  className={`question-card ${isLocked ? 'locked' : ''} ${isCompleted ? 'completed' : ''} ${
                    isActive ? 'active' : ''
                  }`}
                >
                  <div className="question-header">
                    <span className="question-number">Question {question.order}</span>
                    <span className="question-category">{question.category}</span>
                  </div>

                  <div className="question-text">{question.text}</div>

                  {isLocked && (
                    <div className="question-locked">
                      <span className="lock-icon">🔒</span>
                      <span>Complete previous question to unlock</span>
                    </div>
                  )}

                  {/* Show answer for assigned agent (correct answer only for non-droppable state) */}
                  {!isLocked && !isCompleted && assignedAgent && answer && answer.isCorrect && (
                    <div className={`question-answer correct`}>
                      <div className="answer-header">
                        <span className="assigned-agent">{assignedAgent} Agent</span>
                        <span className={`confidence-badge ${answer.confidence >= 50 ? 'high' : 'low'}`}>
                          +{answer.confidence}% Confidence
                        </span>
                      </div>
                      <div className="answer-text">{answer.text}</div>
                    </div>
                  )}

                  {/* Show "See Wise Verdict" button for decision questions (Q6) */}
                  {!isLocked && !isCompleted && !assignedAgent && (question as any).isDecision && (
                    <button
                      className="wise-verdict-button"
                      onClick={() => handleWiseDecision(question.id)}
                    >
                      See Wise Verdict
                    </button>
                  )}

                  {isCompleted && answer && (
                    <div className="question-completed">
                      <span className="checkmark">✓</span>
                      <span>Investigation Complete</span>
                      <div className="completed-summary">
                        <span>{assignedAgent} Agent • {answer.confidence}% confidence</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Remediation Button */}
      {state.showRemediationButton && (
        <button
          ref={remediationButtonRef}
          className="remediation-button"
          onClick={() => {
            dispatch({ type: 'COMPLETE_GAME' });
          }}
        >
          Execute Agentic Remediation
        </button>
      )}
    </div>
  );
};

export default InvestigationGraph;
