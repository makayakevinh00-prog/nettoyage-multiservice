import { describe, it, expect } from 'vitest';
import { testHubSpotConnection } from './hubspot';

describe('HubSpot API Integration', () => {
  it('should validate HubSpot API key by fetching account info', async () => {
    const result = await testHubSpotConnection();
    expect(result).toBe(true);
  });
});
