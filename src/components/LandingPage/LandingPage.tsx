import React, { useMemo } from 'react';
import { useGame } from '../../context/GameContext';
import './LandingPage.css';

const LandingPage: React.FC = () => {
  const { dispatch } = useGame();

  // Generate background grid nodes
  const gridNodes = useMemo(() => {
    return Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 2 + Math.random() * 4,
      delay: Math.random() * 8,
      duration: 3 + Math.random() * 4,
    }));
  }, []);

  // Generate floating threat indicators
  const threats = useMemo(() => {
    const labels = [
      'Credential Theft', 'PLC Hijacking', 'Lateral Movement',
      'Data Exfiltration', 'Ransomware', 'C2 Beacon',
      'Privilege Escalation', 'ARP Spoofing', 'Brute Force',
      'Modbus Exploit',
    ];
    return labels.map((label, i) => ({
      id: i,
      label,
      x: 10 + Math.random() * 80,
      y: 15 + Math.random() * 70,
      delay: i * 0.6,
      duration: 12 + Math.random() * 8,
    }));
  }, []);

  const handlePlayGame = () => {
    dispatch({ type: 'SET_PHASE', payload: 'registration' });
  };

  return (
    <div className="landing-page">
      {/* Animated background */}
      <div className="landing-bg">
        {/* Grid pulse nodes */}
        {gridNodes.map((node) => (
          <div
            key={node.id}
            className="landing-grid-node"
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              width: `${node.size}px`,
              height: `${node.size}px`,
              animationDelay: `${node.delay}s`,
              animationDuration: `${node.duration}s`,
            }}
          />
        ))}

        {/* Floating threat labels */}
        {threats.map((threat) => (
          <div
            key={threat.id}
            className="landing-threat-tag"
            style={{
              left: `${threat.x}%`,
              top: `${threat.y}%`,
              animationDelay: `${threat.delay}s`,
              animationDuration: `${threat.duration}s`,
            }}
          >
            {threat.label}
          </div>
        ))}

        {/* Radial gradient overlay */}
        <div className="landing-gradient-overlay" />
      </div>

      {/* Main content */}
      <div className="landing-content">
        {/* Trellix logo */}
        <img
          src="/Trellix_LOGO_Color_White (1).png"
          alt="Trellix"
          className="landing-logo"
        />

        {/* Hero section */}
        <h1 className="landing-hero-title">
          <span className="landing-hero-line1">Wise</span>
          <span className="landing-hero-line2">Auto-Investigation</span>
        </h1>

        <p className="landing-hero-description">
          Step into the SOC. Investigate real security threats using Trellix Wise's
          AI-powered agents. Race the clock, build confidence, and prove you can
          contain the threat.
        </p>

        {/* Features */}
        <div className="landing-features">
          <div className="landing-feature">
            <div className="landing-feature-icon">2</div>
            <div className="landing-feature-text">Scenarios</div>
          </div>
          <div className="landing-feature-divider" />
          <div className="landing-feature">
            <div className="landing-feature-icon">Live</div>
            <div className="landing-feature-text">Leaderboard</div>
          </div>
          <div className="landing-feature-divider" />
          <div className="landing-feature">
            <div className="landing-feature-icon">Score</div>
            <div className="landing-feature-text">&amp; Compete</div>
          </div>
        </div>

        {/* CTA button */}
        <button className="landing-cta" onClick={handlePlayGame}>
          <span className="landing-cta-text">Play the Challenge</span>
          <span className="landing-cta-arrow">&rarr;</span>
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
