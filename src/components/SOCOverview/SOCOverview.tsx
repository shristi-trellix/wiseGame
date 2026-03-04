import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { usePlayer } from '../../context/PlayerContext';
import LeaderboardTab from '../Leaderboard/LeaderboardTab';
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

interface ScenarioCard {
  id: string;
  scenarioFile: string;
  title: string;
  subtitle: string;
  difficulty: 'Easy' | 'Hard';
  multiplier: string;
  icon: string;
  description: string;
  host: string;
  alertType: string;
}

const scenarios: ScenarioCard[] = [
  {
    id: 'david-squiller-case',
    scenarioFile: '/scenario-david-squiller.json',
    title: 'David Squiller',
    subtitle: 'Credential Theft',
    difficulty: 'Easy',
    multiplier: '1x',
    icon: '👤',
    description: 'Investigate a PowerShell-based credential theft attack targeting enterprise IT.',
    host: 'dsquiller-finance-pc',
    alertType: 'WINDOWS METHODOLOGY [Powershell DownloadFile]',
  },
  {
    id: 'plc-hijacking-manufacturing',
    scenarioFile: '/scenario-plc-hijacking.json',
    title: 'Manufacturing Floor Zero',
    subtitle: 'PLC Hijacking',
    difficulty: 'Hard',
    multiplier: '2x',
    icon: '🏭',
    description: 'Trace an OT/ICS attack using Modbus TCP exploitation on industrial controllers.',
    host: 'PLC-HVAC-012',
    alertType: 'INDUSTRIAL PROTOCOL ANOMALY [Unauthorized Modbus TCP]',
  },
];

const SOCOverview: React.FC = () => {
  const { dispatch, setScenario } = useGame();
  const { player } = usePlayer();
  const [isZooming, setIsZooming] = useState(false);
  const [loadingScenario, setLoadingScenario] = useState<string | null>(null);

  // Responsive alert count based on screen size
  const alertCount = React.useMemo(() => {
    const width = window.innerWidth;
    if (width < 768) return 150;
    if (width < 1024) return 300;
    return 500;
  }, []);

  const alerts = React.useMemo(() => generateAlerts(alertCount), [alertCount]);

  // Decorative pulsing node positions
  const isMobile = window.innerWidth < 768;
  const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

  const decorativeNodes = [
    {
      severity: 'high' as const,
      position: isMobile ? { x: '85%', y: '12%' } : isTablet ? { x: '80%', y: '20%' } : { x: '75%', y: '50%' },
    },
    {
      severity: 'critical' as const,
      position: isMobile ? { x: '15%', y: '10%' } : isTablet ? { x: '20%', y: '18%' } : { x: '25%', y: '45%' },
    },
  ];

  const handleScenarioClick = async (scenario: ScenarioCard) => {
    if (loadingScenario) return;
    setLoadingScenario(scenario.id);
    setIsZooming(true);

    try {
      const response = await fetch(scenario.scenarioFile);
      const data = await response.json();
      setScenario(data.scenario);

      setTimeout(() => {
        dispatch({ type: 'START_GAME' });
      }, 1500);
    } catch (error) {
      console.error('Failed to load scenario:', error);
      setIsZooming(false);
      setLoadingScenario(null);
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

      {/* Decorative pulsing nodes (no interaction) */}
      {decorativeNodes.map((node, i) => (
        <div
          key={i}
          className={`scenario-node ${node.severity} decorative`}
          style={{ left: node.position.x, top: node.position.y }}
        />
      ))}

      {/* Leaderboard floating button */}
      <LeaderboardTab />

      {/* Foreground: Content Box */}
      <div className="content-box">
        {player && player.totalPlays > 0 && (
          <div className="soc-welcome-back">
            Welcome back, {player.firstName}! Best score: {player.combinedScore}
          </div>
        )}
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
        </div>

        {/* Scenario Selection Cards */}
        <div className="scenario-cards">
          <h2 className="scenario-cards-heading">Choose Your Investigation</h2>
          <div className="scenario-cards-grid">
            {scenarios.map((scenario) => (
              <button
                key={scenario.id}
                className={`scenario-card ${scenario.difficulty.toLowerCase()} ${loadingScenario === scenario.id ? 'loading' : ''}`}
                onClick={() => handleScenarioClick(scenario)}
                disabled={!!loadingScenario}
              >
                <div className="scenario-card-top">
                  <span className={`difficulty-badge ${scenario.difficulty.toLowerCase()}`}>
                    {scenario.difficulty}
                  </span>
                  <span className="multiplier-badge">{scenario.multiplier}</span>
                </div>
                <div className="scenario-card-icon">{scenario.icon}</div>
                <div className="scenario-card-title">{scenario.title}</div>
                <div className="scenario-card-subtitle">{scenario.subtitle}</div>
                <div className="scenario-card-description">{scenario.description}</div>
                <div className="scenario-card-meta">
                  <span className="scenario-card-host">{scenario.host}</span>
                </div>
                <div className="scenario-card-action">
                  {loadingScenario === scenario.id ? 'Loading...' : 'Investigate →'}
                </div>
              </button>
            ))}
          </div>
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
