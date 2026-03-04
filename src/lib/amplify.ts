import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/data';
import outputs from '../../amplify_outputs.json';

let configured = false;

try {
  // Only configure if outputs has actual API data
  if (outputs && typeof outputs === 'object' && 'data' in outputs) {
    Amplify.configure(outputs as any);
    configured = true;
  }
} catch {
  // amplify_outputs.json is empty or invalid - offline mode
}

export function isAmplifyConfigured(): boolean {
  return configured;
}

// Generate typed client (null if not configured)
export const client = configured ? generateClient<any>() : null;
