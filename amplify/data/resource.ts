import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  Player: a
    .model({
      firstName: a.string().required(),
      lastName: a.string().required(),
      email: a.string().required(),
      company: a.string().required(),
      bestScores: a.json(),
      combinedScore: a.integer().default(0),
      totalPlays: a.integer().default(0),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  GameSession: a
    .model({
      playerId: a.string().required(),
      scenarioId: a.string().required(),
      completionTimeMs: a.integer().required(),
      accuracyScore: a.integer().required(),
      speedScore: a.integer().required(),
      rawScore: a.integer().required(),
      multiplier: a.integer().required(),
      finalScore: a.integer().required(),
      questionResults: a.json(),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  AdminSettings: a
    .model({
      configKey: a.string().required(),
      eventName: a.string(),
      leaderboardEnabled: a.boolean().default(true),
      scenariosEnabled: a.json(),
      adminPassword: a.string(),
    })
    .authorization((allow) => [allow.publicApiKey()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'apiKey',
    apiKeyAuthorizationMode: {
      expiresInDays: 365,
    },
  },
});
