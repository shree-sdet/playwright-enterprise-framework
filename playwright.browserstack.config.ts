import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  reporter: [['html']],

  use: {
   baseURL: 'https://www.saucedemo.com',
    trace: 'on',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium'
      }
    }
  ]
});