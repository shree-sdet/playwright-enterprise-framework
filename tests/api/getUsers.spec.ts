import { test, expect } from '@playwright/test';

test('Get users API test @api @smoke', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    console.log(responseBody);
    expect(responseBody.id).toBe(1);
    expect(responseBody.userId).toBe(1);
});

test('Create post API test', async ({ request }) => {
    const requestBody = {
        title: 'Playwright Learning',
        body: 'API Automation Testing',
        userId: 101
    };

    const response = await request.post('https://jsonplaceholder.typicode.com/posts',
        {
            data: requestBody
        }
    );

    expect(response.status()).toBe(201);
    const responseBody = await response.json();
    console.log(responseBody);
    expect(responseBody.title).toBe('Playwright Learning');
    expect(responseBody.userId).toBe(101);
});

test('Update post API test', async ({ request }) => {

    const updatedBody = {
        id: 1,
        title: 'Updated Playwright Title',
        body: 'Updated API body',
        userId: 999
    };

    const response = await request.put('https://jsonplaceholder.typicode.com/posts/1',
        {
            data: updatedBody
        }
    );

    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    console.log(responseBody);
    expect(responseBody.title).toBe('Updated Playwright Title');
    expect(responseBody.userId).toBe(999);
});

test('Delete post API test', async ({ request }) => {
    const response = await request.delete('https://jsonplaceholder.typicode.com/posts/1');
    expect(response.status()).toBe(200);
    console.log('Post deleted successfully');
});

test('Authorization header API test', async ({ request }) => {
    const fakeToken = 'sample-playwright-token';
    const response = await request.get('https://httpbin.org/bearer',
        {
            headers: {
                Authorization: `Bearer ${fakeToken}`
            }
        }
    );

    console.log(await response.text());
    expect(response.status()).toBe(200);
});