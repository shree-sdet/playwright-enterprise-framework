import { test, expect } from '../../fixtures/baseFixture';

test('Hybrid UI + API flow', async ({postsApiClient}) => {

    // CREATE DATA VIA API
    const requestBody = {
        title: 'Hybrid Framework',
        body: 'Playwright API + UI',
        userId: 101
    };

    const createResponse = await postsApiClient.createPost(requestBody);
    expect(createResponse.status()).toBe(201);
    const createdPost = await createResponse.json();
    console.log(createdPost);

    // USE CREATED DATA
    const createdTitle = createdPost.title;

    // VALIDATE DATA
    expect(createdTitle).toBe('Hybrid Framework');
});