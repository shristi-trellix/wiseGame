import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import './SOCOverview.css';

// Generate fake alerts with random positions and animations
const generateAlerts = (count: number) => {
  const severities = ['Low', 'Medium', 'High', 'Critical'];
  const types = [
    'Suspicious Process',
    'Network Anomaly',
    'Failed Login',
    'Malware Detection',
    'Data Exfiltration',
    'Port Scan',
    'Brute Force',
    'Privilege Escalation',
    'Lateral Movement',
    'C2 Communication',
  ];

  return Array.from({ length: count }, (_, i) => ({
    id: `alert-${i}`,
    type: types[Math.floor(Math.random() * types.length)],
    severity: severities[Math.floor(Math.random() * severities.length)],
    host: `host-${Math.floor(Math.random() * 500)}`,
    time: `${Math.floor(Math.random() * 24)}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
    // Random positioning for swarm effect
    x: Math.random() * 100, // Random x position (0-100%)
    y: Math.random() * 100, // Random y position (0-100%)
    // Random animation properties
    duration: 15 + Math.random() * 25, // 15-40 seconds per cycle
    delay: Math.random() * -20, // Stagger start times
  }));
};

const SOCOverview: React.FC = () => {
  const { dispatch } = useGame();
  const [hoveredAlert, setHoveredAlert] = useState<string | null>(null);
  const [isZooming, setIsZooming] = useState(false);
  const alerts = React.useMemo(() => generateAlerts(500), []);

  // The David Squiller alert (positioned in the middle-ish area)
  const davidAlert = {
    id: 'david-squiller-alert',
    type: 'WINDOWS METHODOLOGY [Powershell DownloadFile]',
    severity: 'Medium',
    host: 'dsquiller-finance-pc',
    time: '14:23',
  };

  const handleAlertClick = (alertId: string) => {
    if (alertId === davidAlert.id) {
      setIsZooming(true);
      // Wait for zoom animation, then transition to intro
      setTimeout(() => {
        dispatch({ type: 'START_GAME' });
      }, 1500);
    }
  };

  return (
    <div className={`soc-overview ${isZooming ? 'zooming' : ''}`}>
      {/* Background: Alert Swarm */}
      <div className="alert-swarm">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`swarm-node ${alert.severity.toLowerCase()}`}
            style={{
              left: `${alert.x}%`,
              top: `${alert.y}%`,
              animationDuration: `${alert.duration}s`,
              animationDelay: `${alert.delay}s`,
            }}
          />
        ))}

      </div>

      {/* David Squiller Alert Node - prominent and interactive, positioned above swarm */}
      <div
        className={`david-node ${hoveredAlert === davidAlert.id ? 'hovered' : ''}`}
        style={{
          left: '75%',
          top: '50%',
        }}
        onMouseEnter={() => setHoveredAlert(davidAlert.id)}
        onMouseLeave={() => setHoveredAlert(null)}
        onClick={() => handleAlertClick(davidAlert.id)}
      >
        {hoveredAlert === davidAlert.id && (
          <div className="alert-preview">
            <div className="preview-header">
              <span className="preview-badge">INVESTIGATE</span>
            </div>
            <div className="preview-title">{davidAlert.type}</div>
            <div className="preview-host">Host: {davidAlert.host}</div>
            <div className="preview-time">Time: {davidAlert.time}:41 UTC</div>
            <div className="preview-action">Click to investigate with Wise →</div>
          </div>
        )}
      </div>

      {/* Foreground: Content Box */}
      <div className="content-box">
        <div className="soc-header">
          <h1 className="soc-title">Security Operations Center</h1>
          <div className="soc-stats">
            <div className="stat-box">
              <div className="stat-value">2,847</div>
              <div className="stat-label">Alerts/Hour</div>
            </div>
            <div className="stat-box">
              <div className="stat-value">68,328</div>
              <div className="stat-label">Alerts/Day</div>
            </div>
            <div className="stat-box">
              <div className="stat-value">~95%</div>
              <div className="stat-label">False Positives</div>
            </div>
          </div>
        </div>

        <div className="soc-message">
          <p className="message-large">This is your SOC.</p>
          <p className="message-medium">And these are your average alerts per hour.</p>
          <p className="message-question">Overwhelmed?</p>
          <p className="message-solution">
            Let <span className="wise-highlight">Trellix Wise</span> help you investigate 100% of these alerts
            <br />
            and bring you only the ones that need your attention.
          </p>
          <p className="message-instruction">
            <span className="magnifying-glass-icon">🔍</span> Hover over the glowing alert to see how Wise investigates each alert
          </p>
        </div>
      </div>

      {isZooming && (
        <div className="zoom-overlay">
          <div className="zoom-circle"></div>
          <div className="zoom-text">Initializing Wise Investigation...</div>
        </div>
      )}
    </div>
  );
};

export default SOCOverview;
