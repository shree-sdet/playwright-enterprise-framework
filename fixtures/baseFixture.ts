import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { HeaderComponent } from '../components/HeaderComponent';
import { PostsApiClient } from '../api-clients/PostsApiClient';
import { DatabaseClient } from '../db/databaseClient';

// Define test fixtures with appropriate types
type MyFixtures = {
    loginPage: LoginPage;
    inventoryPage: InventoryPage;
    headerComponent: HeaderComponent;
    autoLogger: void;
    postsApiClient: PostsApiClient;
  
};
// Define worker-scoped fixtures in a separate type
type MyWorkerFixtures = {
    workerLogger: string;
    dbClient: DatabaseClient;
};

export const test = base.extend<MyFixtures, MyWorkerFixtures>({
    //auto Fixture to log test start and end
    autoLogger: [async ({ }, use, testInfo) => {
        console.log(`Starting Test: ${testInfo.title}`);
        await use();
        console.log(`Finished Test: ${testInfo.title}`);
    }, { auto: true }],

    //workerLogger Fixture to log worker start and end (worker-scoped)
    workerLogger: [async ({ }, use) => {
        console.log('Worker Fixture Created');
        await use('Worker Active');
        console.log('Worker Fixture Destroyed');
    }, { scope: 'worker' }],

    //headerComponent Fixture to create an instance of HeaderComponent and use it in tests
    headerComponent: async ({ page }, use) => {
      const headerComponent = new HeaderComponent(page);
      await use(headerComponent);
    },
    
    //loginPage Fixture to create an instance of LoginPage and use it in tests
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },

    //inventoryPage Fixture to create an instance of InventoryPage and use it in tests  
    inventoryPage: async ({ page }, use) => {
        console.log('Creating InventoryPage Fixture');
        await page.goto('/inventory.html');
        const inventoryPage = new InventoryPage(page);
        await use(inventoryPage);
        console.log('Destroying InventoryPage Fixture');
    },

    //postsApiClient Fixture to create an instance of PostsApiClient and use it in tests
    postsApiClient: async ({ request }, use) => {
        const postsApiClient = new PostsApiClient(request);
        await use(postsApiClient);
    },

    //dbClient Fixture to create an instance of DatabaseClient and use it in tests
    dbClient: [ async ({ }, use) => {
        const dbClient = new DatabaseClient();
        await dbClient.connect();
        await use(dbClient);
        await dbClient.disconnect();
    }, { scope: 'worker' }]
});

export { expect } from '@playwright/test';
