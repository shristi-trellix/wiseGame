import React, { useMemo } from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import { useGame } from '../../context/GameContext';
import './AgentToolbox.css';

const AgentToolbox: React.FC = () => {
  const { state } = useGame();
  const scenario = state.scenario;

  // All available agents (excluding WISE - it's the AI orchestrator, not a draggable agent)
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

  // Filter agents based on current scenario
  const agents = useMemo(() => {
    if (!scenario) return [];

    // David Squiller scenario: only show IT/enterprise agents
    if (scenario.id === 'david-squiller-case') {
      return allAgents.filter(agent =>
        ['EDR', 'NDR', 'Identity', 'IVX'].includes(agent.id)
      );
    }

    // PLC Hijacking scenario: show multi-source telemetry agents
    if (scenario.id === 'plc-hijacking-manufacturing') {
      return allAgents.filter(agent =>
        ['Splunk', 'S3', 'Oracle', 'OTMonitor', 'NDR'].includes(agent.id)
      );
    }

    // Default fallback: log warning and show all agents
    console.warn(`Unknown scenario ID: ${scenario.id}. Showing all agents.`);
    return allAgents;
  }, [scenario]);

  return (
    <div className="agent-toolbox">
      <div className="toolbox-instruction">
        Drag agents to investigation questions to deploy them.
      </div>

      <Droppable droppableId="agent-toolbox" isDropDisabled={true}>
        {(provided) => (
          <div
            className="agents-list"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {agents.map((agent, index) => (
              <Draggable
                key={agent.id}
                draggableId={`agent-${agent.id}`}
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`agent-card ${snapshot.isDragging ? 'dragging' : ''}`}
                    style={{
                      ...provided.draggableProps.style,
                      borderColor: agent.color,
                    }}
                  >
                    <div className="agent-icon" style={{ backgroundColor: agent.color }}>
                      {agent.icon}
                    </div>
                    <div className="agent-info">
                      <div className="agent-name">{agent.name}</div>
                      <div className="agent-description">{agent.description}</div>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <div className="toolbox-hint">
        <strong>Tip:</strong> Each agent specializes in different data sources. Choose wisely!
      </div>
    </div>
  );
};

export default AgentToolbox;
