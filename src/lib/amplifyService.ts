import { client, isAmplifyConfigured } from './amplify';
import { ScoreBreakdown } from './scoring';

// ============ PLAYER OPERATIONS ============

export interface PlayerData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  createdAt: string;
  lastPlayedAt: string;
  bestScores: Record<string, number | null>;
  combinedScore: number;
  totalPlays: number;
}

export async function createPlayer(data: {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
}): Promise<PlayerData> {
  if (!client) throw new Error('Amplify not configured');

  const now = new Date().toISOString();
  const bestScores = {
    'david-squiller-case': null,
    'plc-hijacking-manufacturing': null,
  };

  const { data: created, errors } = await client.models.Player.create({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email.toLowerCase().trim(),
    company: data.company,
    bestScores: JSON.stringify(bestScores),
    combinedScore: 0,
    totalPlays: 0,
  });

  if (errors || !created) {
    throw new Error(errors?.[0]?.message || 'Failed to create player');
  }

  return {
    id: created.id,
    firstName: created.firstName,
    lastName: created.lastName,
    email: created.email,
    company: created.company,
    createdAt: created.createdAt || now,
    lastPlayedAt: created.updatedAt || now,
    bestScores,
    combinedScore: created.combinedScore ?? 0,
    totalPlays: created.totalPlays ?? 0,
  };
}

function parseBestScores(raw: any): Record<string, number | null> {
  if (!raw) return { 'david-squiller-case': null, 'plc-hijacking-manufacturing': null };
  if (typeof raw === 'string') {
    try { return JSON.parse(raw); } catch { return { 'david-squiller-case': null, 'plc-hijacking-manufacturing': null }; }
  }
  return raw as Record<string, number | null>;
}

function toPlayerData(record: any): PlayerData {
  return {
    id: record.id,
    firstName: record.firstName,
    lastName: record.lastName,
    email: record.email,
    company: record.company,
    createdAt: record.createdAt || '',
    lastPlayedAt: record.updatedAt || '',
    bestScores: parseBestScores(record.bestScores),
    combinedScore: record.combinedScore ?? 0,
    totalPlays: record.totalPlays ?? 0,
  };
}

export async function getPlayerByEmail(email: string): Promise<PlayerData | null> {
  if (!client) return null;

  const { data: players } = await client.models.Player.list({
    filter: { email: { eq: email.toLowerCase().trim() } },
  });

  if (!players || players.length === 0) return null;
  return toPlayerData(players[0]);
}

export async function getPlayerById(playerId: string): Promise<PlayerData | null> {
  if (!client) return null;

  const { data: player } = await client.models.Player.get({ id: playerId });
  if (!player) return null;
  return toPlayerData(player);
}

export async function updatePlayerScore(
  playerId: string,
  scenarioId: string,
  finalScore: number
): Promise<void> {
  if (!client) return;

  const { data: player } = await client.models.Player.get({ id: playerId });
  if (!player) return;

  const bestScores = parseBestScores(player.bestScores);
  const currentBest = bestScores[scenarioId] || 0;

  if (finalScore > currentBest) {
    const updatedBestScores = { ...bestScores, [scenarioId]: finalScore };
    const combinedScore = Object.values(updatedBestScores).reduce(
      (sum: number, s) => sum + (s || 0),
      0
    );

    await client.models.Player.update({
      id: playerId,
      bestScores: JSON.stringify(updatedBestScores),
      combinedScore,
      totalPlays: (player.totalPlays ?? 0) + 1,
    });
  } else {
    await client.models.Player.update({
      id: playerId,
      totalPlays: (player.totalPlays ?? 0) + 1,
    });
  }
}

// ============ GAME SESSION OPERATIONS ============

export async function createGameSession(data: {
  playerId: string;
  scenarioId: string;
  scoreBreakdown: ScoreBreakdown;
}): Promise<string> {
  if (!client) throw new Error('Amplify not configured');

  const { data: session, errors } = await client.models.GameSession.create({
    playerId: data.playerId,
    scenarioId: data.scenarioId,
    completionTimeMs: data.scoreBreakdown.completionTimeMs,
    accuracyScore: data.scoreBreakdown.accuracyScore,
    speedScore: data.scoreBreakdown.speedScore,
    rawScore: data.scoreBreakdown.rawScore,
    multiplier: data.scoreBreakdown.multiplier,
    finalScore: data.scoreBreakdown.finalScore,
    questionResults: JSON.stringify(data.scoreBreakdown.questionResults),
  });

  if (errors || !session) {
    throw new Error(errors?.[0]?.message || 'Failed to create game session');
  }

  return session.id;
}

// ============ LEADERBOARD OPERATIONS ============

export interface LeaderboardEntry {
  playerId: string;
  playerName: string;
  company: string;
  combinedScore: number;
  bestScores: Record<string, number | null>;
  rank: number;
}

function playersToLeaderboard(players: any[], topN: number): LeaderboardEntry[] {
  return players
    .filter((p) => (p.combinedScore ?? 0) > 0)
    .sort((a, b) => (b.combinedScore ?? 0) - (a.combinedScore ?? 0))
    .slice(0, topN)
    .map((p, index) => ({
      playerId: p.id,
      playerName: `${p.firstName} ${p.lastName.charAt(0)}.`,
      company: p.company,
      combinedScore: p.combinedScore ?? 0,
      bestScores: parseBestScores(p.bestScores),
      rank: index + 1,
    }));
}

export async function getLeaderboard(topN: number = 10): Promise<LeaderboardEntry[]> {
  if (!client) return [];

  const { data: players } = await client.models.Player.list({
    filter: { combinedScore: { gt: 0 } },
    limit: 100,
  });

  if (!players) return [];
  return playersToLeaderboard(players, topN);
}

export function subscribeToLeaderboard(
  topN: number,
  callback: (entries: LeaderboardEntry[]) => void
): () => void {
  if (!client) return () => {};

  // Use observeQuery for real-time updates
  const sub = client.models.Player.observeQuery().subscribe({
    next: ({ items }) => {
      callback(playersToLeaderboard(items, topN));
    },
    error: (err: any) => {
      console.warn('Leaderboard subscription error:', err);
    },
  });

  return () => sub.unsubscribe();
}

export async function getPlayerRank(playerId: string): Promise<number> {
  const player = await getPlayerById(playerId);
  if (!player || player.combinedScore === 0) return -1;
  if (!client) return -1;

  const { data: players } = await client.models.Player.list({
    filter: { combinedScore: { gt: player.combinedScore } },
    limit: 1000,
  });

  return (players?.length ?? 0) + 1;
}

// ============ ADMIN OPERATIONS ============

export interface AdminSettings {
  id?: string;
  eventName: string;
  leaderboardEnabled: boolean;
  scenariosEnabled: Record<string, boolean>;
  adminPassword: string;
}

const ADMIN_CONFIG_KEY = 'config';

export async function getAdminSettings(): Promise<AdminSettings> {
  if (!client) throw new Error('Amplify not configured');

  const { data: items } = await client.models.AdminSettings.list({
    filter: { configKey: { eq: ADMIN_CONFIG_KEY } },
  });

  if (items && items.length > 0) {
    const item = items[0];
    return {
      id: item.id,
      eventName: item.eventName ?? 'Trellix Trade Show',
      leaderboardEnabled: item.leaderboardEnabled ?? true,
      scenariosEnabled: typeof item.scenariosEnabled === 'string'
        ? JSON.parse(item.scenariosEnabled)
        : (item.scenariosEnabled as any) ?? { 'david-squiller-case': true, 'plc-hijacking-manufacturing': true },
      adminPassword: item.adminPassword ?? 'trellix2026',
    };
  }

  // Create default settings
  const defaults = {
    configKey: ADMIN_CONFIG_KEY,
    eventName: 'Trellix Trade Show',
    leaderboardEnabled: true,
    scenariosEnabled: JSON.stringify({
      'david-squiller-case': true,
      'plc-hijacking-manufacturing': true,
    }),
    adminPassword: 'trellix2026',
  };

  const { data: created } = await client.models.AdminSettings.create(defaults);

  return {
    id: created?.id,
    eventName: defaults.eventName,
    leaderboardEnabled: defaults.leaderboardEnabled,
    scenariosEnabled: JSON.parse(defaults.scenariosEnabled as string),
    adminPassword: defaults.adminPassword,
  };
}

export async function updateAdminSettings(updates: Partial<AdminSettings>): Promise<void> {
  if (!client) return;

  const settings = await getAdminSettings();
  if (!settings.id) return;

  const updateData: any = { id: settings.id };
  if (updates.eventName !== undefined) updateData.eventName = updates.eventName;
  if (updates.leaderboardEnabled !== undefined) updateData.leaderboardEnabled = updates.leaderboardEnabled;
  if (updates.scenariosEnabled !== undefined) updateData.scenariosEnabled = JSON.stringify(updates.scenariosEnabled);
  if (updates.adminPassword !== undefined) updateData.adminPassword = updates.adminPassword;

  await client.models.AdminSettings.update(updateData);
}

export async function resetLeaderboard(): Promise<void> {
  if (!client) return;

  // Delete all game sessions
  const { data: sessions } = await client.models.GameSession.list({ limit: 1000 });
  if (sessions) {
    for (const session of sessions) {
      await client.models.GameSession.delete({ id: session.id });
    }
  }

  // Reset all player scores
  const { data: players } = await client.models.Player.list({ limit: 1000 });
  if (players) {
    for (const player of players) {
      await client.models.Player.update({
        id: player.id,
        bestScores: JSON.stringify({
          'david-squiller-case': null,
          'plc-hijacking-manufacturing': null,
        }),
        combinedScore: 0,
        totalPlays: 0,
      });
    }
  }
}

export async function exportPlayersCSV(): Promise<string> {
  if (!client) return '';

  const { data: players } = await client.models.Player.list({ limit: 1000 });
  if (!players) return '';

  const sorted = [...players].sort((a, b) => (b.combinedScore ?? 0) - (a.combinedScore ?? 0));

  const headers = ['First Name', 'Last Name', 'Email', 'Company', 'Combined Score', 'Total Plays', 'Registered'];
  const rows = sorted.map((p) => {
    return [
      p.firstName,
      p.lastName,
      p.email,
      p.company,
      (p.combinedScore ?? 0).toString(),
      (p.totalPlays ?? 0).toString(),
      p.createdAt || '',
    ].map((field) => `"${field.replace(/"/g, '""')}"`).join(',');
  });

  return [headers.join(','), ...rows].join('\n');
}

export interface AdminStats {
  totalPlayers: number;
  totalPlays: number;
  avgScore: number;
  playsPerScenario: Record<string, number>;
  topCompanies: Array<{ company: string; playerCount: number; avgScore: number }>;
}

export async function getAdminStats(): Promise<AdminStats> {
  if (!client) return { totalPlayers: 0, totalPlays: 0, avgScore: 0, playsPerScenario: {}, topCompanies: [] };

  const { data: players } = await client.models.Player.list({ limit: 1000 });
  const { data: sessions } = await client.models.GameSession.list({ limit: 1000 });

  const playerList = players || [];
  const sessionList = sessions || [];

  const totalPlayers = playerList.length;
  const totalPlays = sessionList.length;

  const scoresWithPlays = playerList.filter((p) => (p.combinedScore ?? 0) > 0);
  const avgScore = scoresWithPlays.length > 0
    ? Math.round(scoresWithPlays.reduce((sum, p) => sum + (p.combinedScore ?? 0), 0) / scoresWithPlays.length)
    : 0;

  // Plays per scenario
  const playsPerScenario: Record<string, number> = {};
  sessionList.forEach((s) => {
    const sid = s.scenarioId;
    playsPerScenario[sid] = (playsPerScenario[sid] || 0) + 1;
  });

  // Top companies
  const companyMap: Record<string, { count: number; totalScore: number }> = {};
  playerList.forEach((p) => {
    if (!companyMap[p.company]) {
      companyMap[p.company] = { count: 0, totalScore: 0 };
    }
    companyMap[p.company].count++;
    companyMap[p.company].totalScore += (p.combinedScore ?? 0);
  });

  const topCompanies = Object.entries(companyMap)
    .map(([company, data]) => ({
      company,
      playerCount: data.count,
      avgScore: data.count > 0 ? Math.round(data.totalScore / data.count) : 0,
    }))
    .sort((a, b) => b.avgScore - a.avgScore)
    .slice(0, 10);

  return { totalPlayers, totalPlays, avgScore, playsPerScenario, topCompanies };
}
