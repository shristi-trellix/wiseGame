import React, { useState, useEffect, useCallback } from 'react';
import { isAmplifyConfigured } from '../../lib/amplify';
import {
  getAdminSettings,
  updateAdminSettings,
  resetLeaderboard,
  exportPlayersCSV,
  getAdminStats,
  AdminSettings,
  AdminStats,
} from '../../lib/amplifyService';
import './AdminPanel.css';

const AdminPanel: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [settings, setSettings] = useState<AdminSettings | null>(null);
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [s, st] = await Promise.all([getAdminSettings(), getAdminStats()]);
      setSettings(s);
      setStats(st);
    } catch (err) {
      console.error('Failed to load admin data:', err);
    }
    setLoading(false);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    if (!isAmplifyConfigured()) {
      setAuthError('Backend not configured');
      return;
    }

    try {
      const adminSettings = await getAdminSettings();
      if (password === adminSettings.adminPassword) {
        setIsAuthenticated(true);
        setSettings(adminSettings);
        const st = await getAdminStats();
        setStats(st);
      } else {
        setAuthError('Incorrect password');
      }
    } catch (err) {
      setAuthError('Failed to connect to backend');
    }
  };

  useEffect(() => {
    if (isAuthenticated) loadData();
  }, [isAuthenticated, loadData]);

  const handleResetLeaderboard = async () => {
    if (!confirmReset) {
      setConfirmReset(true);
      return;
    }
    try {
      await resetLeaderboard();
      setStatusMessage('Leaderboard reset successfully');
      setConfirmReset(false);
      loadData();
    } catch (err) {
      setStatusMessage('Failed to reset leaderboard');
    }
    setTimeout(() => setStatusMessage(''), 3000);
  };

  const handleExportCSV = async () => {
    try {
      const csv = await exportPlayersCSV();
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `wise-game-players-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      URL.revokeObjectURL(url);
      setStatusMessage('CSV exported');
    } catch (err) {
      setStatusMessage('Failed to export CSV');
    }
    setTimeout(() => setStatusMessage(''), 3000);
  };

  const handleToggleScenario = async (scenarioId: string, enabled: boolean) => {
    if (!settings) return;
    const updatedScenarios = { ...settings.scenariosEnabled, [scenarioId]: enabled };
    try {
      await updateAdminSettings({ scenariosEnabled: updatedScenarios });
      setSettings({ ...settings, scenariosEnabled: updatedScenarios });
    } catch (err) {
      setStatusMessage('Failed to update setting');
      setTimeout(() => setStatusMessage(''), 3000);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-panel">
        <div className="admin-login">
          <h1 className="admin-title">Admin Panel</h1>
          <form onSubmit={handleLogin} className="admin-login-form">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="admin-input"
              autoFocus
            />
            {authError && <div className="admin-error">{authError}</div>}
            <button type="submit" className="admin-btn primary">Login</button>
          </form>
          <a href="/" className="admin-back-link">Back to game</a>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <div className="admin-container">
        <div className="admin-header">
          <h1 className="admin-title">Admin Panel</h1>
          <a href="/" className="admin-back-link">Back to game</a>
        </div>

        {statusMessage && <div className="admin-status">{statusMessage}</div>}

        {loading ? (
          <div className="admin-loading">Loading...</div>
        ) : (
          <>
            {/* Stats */}
            {stats && (
              <section className="admin-section">
                <h2>Statistics</h2>
                <div className="admin-stats-grid">
                  <div className="admin-stat">
                    <div className="admin-stat-value">{stats.totalPlayers}</div>
                    <div className="admin-stat-label">Total Players</div>
                  </div>
                  <div className="admin-stat">
                    <div className="admin-stat-value">{stats.totalPlays}</div>
                    <div className="admin-stat-label">Total Plays</div>
                  </div>
                  <div className="admin-stat">
                    <div className="admin-stat-value">{stats.avgScore}</div>
                    <div className="admin-stat-label">Avg Score</div>
                  </div>
                </div>

                {Object.keys(stats.playsPerScenario).length > 0 && (
                  <div className="admin-scenario-stats">
                    <h3>Plays per Scenario</h3>
                    {Object.entries(stats.playsPerScenario).map(([id, count]) => (
                      <div key={id} className="admin-scenario-row">
                        <span>{id}</span>
                        <span>{count} plays</span>
                      </div>
                    ))}
                  </div>
                )}

                {stats.topCompanies.length > 0 && (
                  <div className="admin-companies">
                    <h3>Top Companies</h3>
                    {stats.topCompanies.map((c) => (
                      <div key={c.company} className="admin-company-row">
                        <span>{c.company}</span>
                        <span>{c.playerCount} players, avg {c.avgScore} pts</span>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            )}

            {/* Scenario Toggles */}
            {settings && (
              <section className="admin-section">
                <h2>Scenario Settings</h2>
                <div className="admin-toggles">
                  {Object.entries(settings.scenariosEnabled).map(([id, enabled]) => (
                    <label key={id} className="admin-toggle">
                      <input
                        type="checkbox"
                        checked={enabled}
                        onChange={(e) => handleToggleScenario(id, e.target.checked)}
                      />
                      <span className="toggle-label">{id}</span>
                    </label>
                  ))}
                </div>
              </section>
            )}

            {/* Actions */}
            <section className="admin-section">
              <h2>Actions</h2>
              <div className="admin-actions">
                <button className="admin-btn" onClick={handleExportCSV}>
                  Export Players CSV
                </button>
                <button
                  className={`admin-btn danger ${confirmReset ? 'confirming' : ''}`}
                  onClick={handleResetLeaderboard}
                >
                  {confirmReset ? 'Click again to confirm reset' : 'Reset Leaderboard'}
                </button>
                {confirmReset && (
                  <button className="admin-btn" onClick={() => setConfirmReset(false)}>
                    Cancel
                  </button>
                )}
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
