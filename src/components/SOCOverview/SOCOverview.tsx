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

const SOCOverview: React.FC = () => {
  const { dispatch, setScenario } = useGame();
  const [hoveredAlert, setHoveredAlert] = useState<string | null>(null);
  const [isZooming, setIsZooming] = useState(false);

  // Responsive alert count based on screen size
  const alertCount = React.useMemo(() => {
    const width = window.innerWidth;
    if (width < 768) return 150; // Mobile: fewer alerts for performance
    if (width < 1024) return 300; // Tablet: medium alert count
    return 500; // Desktop: full alert swarm
  }, []);

  const alerts = React.useMemo(() => generateAlerts(alertCount), [alertCount]);

  // Scenario alerts configuration - positioning adjusts for screen size
  const isMobile = window.innerWidth < 768;
  const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

  const scenarioAlerts: ScenarioAlert[] = [
    {
      id: 'david-squiller-alert',
      scenarioFile: '/scenario-david-squiller.json',
      type: 'WINDOWS METHODOLOGY [Powershell DownloadFile]',
      severity: 'High',
      host: 'dsquiller-finance-pc',
      time: '14:23',
      icon: '👤',
      position: isMobile
        ? { x: '85%', y: '12%' }  // Mobile: top right corner, well above content
        : isTablet
        ? { x: '80%', y: '20%' }  // Tablet: upper right
        : { x: '75%', y: '50%' }, // Desktop: original position
    },
    {
      id: 'plc-hijacking-alert',
      scenarioFile: '/scenario-plc-hijacking.json',
      type: 'INDUSTRIAL PROTOCOL ANOMALY [Unauthorized Modbus TCP]',
      severity: 'Critical',
      host: 'PLC-HVAC-012',
      time: '03:47',
      icon: '🏭',
      position: isMobile
        ? { x: '15%', y: '10%' }  // Mobile: top left corner, well above content
        : isTablet
        ? { x: '20%', y: '18%' }  // Tablet: upper left
        : { x: '25%', y: '45%' }, // Desktop: original position
    },
  ];

  const handleAlertClick = async (alert: ScenarioAlert) => {
    setIsZooming(true);

    // Load scenario JSON
    try {
      const response = await fetch(alert.scenarioFile);
      const data = await response.json();

      // Set the loaded scenario in the game context
      setScenario(data.scenario);

      // Wait for zoom animation, then start game with loaded scenario
      setTimeout(() => {
        dispatch({ type: 'START_GAME' });
      }, 1500);
    } catch (error) {
      console.error('Failed to load scenario:', error);
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

      {/* Scenario Alert Nodes - prominent and interactive, positioned above swarm */}
      {scenarioAlerts.map((alert) => (
        <div
          key={alert.id}
          className={`scenario-node ${alert.severity.toLowerCase()} ${hoveredAlert === alert.id ? 'hovered' : ''}`}
          style={{
            left: alert.position.x,
            top: alert.position.y,
          }}
          onMouseEnter={() => setHoveredAlert(alert.id)}
          onMouseLeave={() => setHoveredAlert(null)}
          onClick={() => handleAlertClick(alert)}
        >
          <div className="scenario-icon">{alert.icon}</div>
          {hoveredAlert === alert.id && (
            <div className="alert-preview">
              <div className="preview-header">
                <span className={`preview-badge ${alert.severity.toLowerCase()}`}>
                  {alert.severity === 'Critical' ? '🚨 CRITICAL' : '⚠️ HIGH'}
                </span>
              </div>
              <div className="preview-title">{alert.type}</div>
              <div className="preview-host">Host: {alert.host}</div>
              <div className="preview-time">Time: {alert.time}:22 UTC</div>
              <div className="preview-action">Click to investigate with Wise →</div>
            </div>
          )}
        </div>
      ))}

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
            <span className="magnifying-glass-icon">🔍</span> Hover over the glowing alert to see how Trellix Wise investigates each alert
          </p>
        </div>
      </div>

      {isZooming && (
        <div className="zoom-overlay">
          <div className="zoom-circle"></div>
          <div className="zoom-text">Initializing Trellix Wise Investigation...</div>
        </div>
      )}
    </div>
  );
};

export default SOCOverview;
