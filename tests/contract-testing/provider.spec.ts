import { test, expect } from '@playwright/test';
import { Verifier } from '@pact-foundation/pact';

test('Provider Verification', async () => {

  const opts = {
    provider: 'UserAPI',
    providerBaseUrl: 'https://jsonplaceholder.typicode.com',
    pactUrls: ['./tests/contract-testing/pacts/PlaywrightFramework-UserAPI.json']
  };

  const output = await new Verifier(opts).verifyProvider();

  const result = typeof output === 'string' ? JSON.parse(output) : output;

  expect(result).toBeDefined();
  expect(result.result ?? result).toBe(true);
});