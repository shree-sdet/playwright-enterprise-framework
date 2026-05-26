import { test, expect } from '../../fixtures/baseFixture';

test('Get post using API client', async ({
    postsApiClient
}) => {

    const response = await postsApiClient.getPost(1);
    expect(response.status()).toBe(200);
    const responseBody =  await response.json();
    console.log(responseBody);
    expect(responseBody.id).toBe(1);
});

test('incorrect endpoint test', async ({
    postsApiClient
}) => {

    const response = await postsApiClient.getPost(9999);
    expect(response.status()).toBe(200);
    const responseBody =  await response.json();
    console.log(responseBody);
    expect(responseBody.id).toBe(9999);
});