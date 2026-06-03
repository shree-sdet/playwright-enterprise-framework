import { test, expect } from '@playwright/test';
import { PactV3 } from '@pact-foundation/pact';

test('Consumer Contract Test', async () => {
  const provider = new PactV3({
    consumer: 'PlaywrightFramework',
    provider: 'UserAPI',
    dir: './tests/contract-testing/pacts',
  });

  provider
    .given('User exists')
    .uponReceiving('a request for user details')
    .withRequest({
      method: 'GET',
      path: '/users/1',
    })
    .willRespondWith({
      status: 200,
      body: {
        id: 1,
        name: 'Leanne Graham',
      },
    });

  await provider.executeTest(async (mockServer) => {
    const response = await fetch(`${mockServer.url}/users/1`);

    expect(response.status).toBe(200);

    const user = (await response.json()) as {
      id: number;
      name: string;
    };

    expect(user.id).toBe(1);
    expect(user.name).toBe('Leanne Graham');
  });
});