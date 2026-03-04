import React, { useState } from 'react';
import { usePlayer } from '../../context/PlayerContext';
import { useGame } from '../../context/GameContext';
import './RegistrationForm.css';

const RegistrationForm: React.FC = () => {
  const { registerPlayer } = usePlayer();
  const { dispatch } = useGame();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [welcomeBack, setWelcomeBack] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setWelcomeBack('');

    if (!firstName.trim() || !lastName.trim() || !email.trim() || !company.trim()) {
      setError('All fields are required');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    try {
      const player = await registerPlayer({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        company: company.trim(),
      });

      // Check if this is a returning player
      if (player.totalPlays > 0) {
        setWelcomeBack(`Welcome back, ${player.firstName}! Your best score: ${player.combinedScore}`);
        setTimeout(() => {
          dispatch({ type: 'SET_PHASE', payload: 'soc-overview' });
        }, 1500);
      } else {
        dispatch({ type: 'SET_PHASE', payload: 'soc-overview' });
      }
    } catch (err) {
      setError('Registration failed. Please try again.');
      console.error('Registration error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="registration-screen">
      {/* Background alert swarm (simplified) */}
      <div className="reg-background">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className={`reg-particle severity-${['low', 'medium', 'high', 'critical'][i % 4]}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 15}s`,
              animationDuration: `${15 + Math.random() * 25}s`,
            }}
          />
        ))}
      </div>

      <div className="reg-content">
        <div className="reg-header">
          <h1 className="reg-title">Wise Detective Challenge</h1>
          <p className="reg-subtitle">Test your security investigation skills and compete for the top of the leaderboard</p>
        </div>

        <form className="reg-form" onSubmit={handleSubmit}>
          <div className="reg-form-row">
            <div className="reg-field">
              <label htmlFor="firstName">First Name</label>
              <input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter your first name"
                autoComplete="given-name"
                disabled={isSubmitting}
              />
            </div>
            <div className="reg-field">
              <label htmlFor="lastName">Last Name</label>
              <input
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter your last name"
                autoComplete="family-name"
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="reg-field">
            <label htmlFor="email">Work Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              autoComplete="email"
              disabled={isSubmitting}
            />
          </div>

          <div className="reg-field">
            <label htmlFor="company">Company</label>
            <input
              id="company"
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Your company name"
              autoComplete="organization"
              disabled={isSubmitting}
            />
          </div>

          {error && <div className="reg-error">{error}</div>}
          {welcomeBack && <div className="reg-welcome">{welcomeBack}</div>}

          <button
            type="submit"
            className="reg-submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Registering...' : 'Start Investigation'}
          </button>
        </form>

        <div className="reg-features">
          <div className="reg-feature">
            <span className="feature-icon">🎯</span>
            <span>Choose your difficulty level</span>
          </div>
          <div className="reg-feature">
            <span className="feature-icon">🏆</span>
            <span>Compete on the live leaderboard</span>
          </div>
          <div className="reg-feature">
            <span className="feature-icon">⚡</span>
            <span>Accuracy + Speed = Your Score</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
