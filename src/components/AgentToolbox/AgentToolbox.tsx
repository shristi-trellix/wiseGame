import React from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import './AgentToolbox.css';

const AgentToolbox: React.FC = () => {
  const agents = [
    { id: 'EDR', name: 'EDR Agent', description: 'Process creation & file changes', color: '#2814FF' },
    { id: 'NDR', name: 'NDR Agent', description: 'Network traffic & C2 beacons', color: '#00CD00' },
    { id: 'Identity', name: 'Identity Agent', description: 'User roles & access levels', color: '#FFA500' },
    { id: 'IVX', name: 'IVX Agent', description: 'File sandboxing & malware analysis', color: '#FF4444' },
  ];

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
                      {agent.id}
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
