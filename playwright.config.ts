import { defineConfig, devices } from '@playwright/test';
import { envConfig } from './config/env';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 1 : 0,
  /* Opt out of parallel tests on CI. */
  //*workers: process.env.CI ? 1 : undefined */
  workers: process.env.CI ? 1 : 3,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html'],
    ['allure-playwright'],
    ['./reporters/prometheusReporter.ts', {}],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: envConfig.baseURL,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    navigationTimeout: 30000, 
    actionTimeout: 15000,  

  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'setup',
      testMatch: 'auth.setup.ts',
    },

    {
      name: 'chromium',
      testIgnore: ['tests/mobile/**', 'tests/visual/**'],
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'auth/userAuth.json',
      },
      dependencies: ['setup'],
    },
    {
      name: 'webkit',
      testIgnore: ['tests/mobile/**', 'tests/visual/**'],
      use: { ...devices['Desktop Safari'], 
        storageState: 'auth/userAuth.json'
      },
      dependencies: ['setup'],
    },

    /* Test against mobile viewports. */
    {
      name: 'Mobile Chrome',
      testDir: './tests/mobile',
      use: {
        ...devices['Pixel 7']
      }
    },
    {
      name: 'Mobile Safari',
      testDir: './tests/mobile',
      use: {
        ...devices['iPhone 15']
      }
    },
    // Additional project for visual testing with Chromium, using a consistent viewport size and settings optimized for visual validation.
    {
      name: 'visual-chromium',
      testDir: './tests/visual',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'auth/userAuth.json',  
      },
      dependencies: ['setup'],               
      grep: /@visual/
    }

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
