import { APIRequestContext } from '@playwright/test';

export class PostsApiClient {

    readonly request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async getPost(postId: number) {
        return await this.request.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    }

    async createPost(requestBody: object) {
        return await this.request.post('https://jsonplaceholder.typicode.com/posts',
            {
                data: requestBody
            }
        );
    }
}