# Playwright Enterprise Framework

## Overview

This repository contains an enterprise-grade Playwright automation framework built using:

* Playwright
* TypeScript
* API Automation
* PostgreSQL Database Validation
* Fixtures Architecture
* Mocking & HAR Replay
* Dynamic Test Data
* Multi-Browser Execution
* Environment-Based Configuration

The framework is designed using scalable enterprise automation architecture patterns.

---

# Tech Stack

| Technology | Purpose                |
| ---------- | ---------------------- |
| Playwright | UI + API Automation    |
| TypeScript | Strong typing          |
| PostgreSQL | Database validation    |
| pgAdmin4   | Database management    |
| Node.js    | Runtime environment    |
| dotenv     | Environment management |
| GitHub     | Version control        |

---

# Framework Architecture

```text
playwright-enterprise-framework/
│
├── api-clients/
├── components/
├── config/
├── db/
├── fixtures/
├── mocks/
├── pages/
├── test-data/
├── tests/
│   ├── api/
│   └── ui/
├── utils/
├── playwright.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

---

# Features Implemented

## UI Automation

* Page Object Model (POM)
* Reusable BasePage
* Reusable UI components
* Assertions & auto waiting
* Cross-browser execution

---

## Fixtures Architecture

Implemented:

* Custom fixtures
* Auto fixtures
* Worker-scoped fixtures
* Dependency injection
* Centralized setup & teardown

### Worker Fixtures Used For

* Database connections
* Shared reusable resources
* Optimized execution

---

# API Automation

Implemented:

* GET requests
* POST requests
* PUT requests
* DELETE requests
* APIRequestContext
* Authentication headers
* Reusable API client architecture
* Hybrid UI + API testing

### API Client Layer

Reusable abstraction layer for API operations.

Example:

```ts
getPosts()
createPost()
deletePost()
```

---

# Database Testing

Implemented:

* PostgreSQL integration
* pg library integration
* Database validation
* Dynamic test data generation
* Cleanup strategies
* Worker-scoped DB fixtures
* Parameterized queries

### Database Client Architecture

Reusable DB abstraction layer.

Example:

```ts
getUserById()
createUser()
deleteUser()
```

---

# Mocking & Network Interception

Implemented:

* route.continue()
* route.fulfill()
* route.abort()
* Request interception
* Response mocking
* HAR recording
* HAR replay

---

# Dynamic Test Data Strategy

Implemented:

* Timestamp-based unique data generation
* Dynamic users
* Parallel-safe execution
* Automated cleanup

Example:

```ts
const timestamp = Date.now();
```

---

# Parallel Execution & Isolation

Implemented:

* Parallel execution
* Worker optimization
* Retry handling
* Isolated execution strategy
* Flaky test prevention

---

# Tags & Execution Strategy

Implemented:

* @smoke
* @regression
* @api
* @ui
* @db
* @mock

### Example

```bash
npx playwright test --grep "@smoke"
```

---

# Multi-Browser Execution

Supported Browsers:

* Chromium
* Firefox
* WebKit

### Example

```bash
npx playwright test --project=chromium
```

---

# Environment Configuration

Centralized environment management using:

* dotenv
* env.ts
* process.env

### Example

```env
ENV=qa
QA_BASE_URL=https://www.saucedemo.com
```

---

# Security Best Practices

The framework avoids committing:

* .env
* auth storage files
* secrets
* API tokens
* database passwords

### Recommended .gitignore

```gitignore
node_modules/
playwright-report/
test-results/
.env
auth/*.json
playwright/.auth/
.DS_Store
```

---

# Sample Commands

## Run All Tests

```bash
npx playwright test
```

---

## Run Smoke Suite

```bash
npx playwright test --grep "@smoke"
```

---

## Run API Tests

```bash
npx playwright test --grep "@api"
```

---

## Run Specific Browser

```bash
npx playwright test --project=chromium
```

---

# Enterprise Concepts Covered

* Scalable framework architecture
* Reusable abstraction layers
* Dependency injection
* Infrastructure lifecycle management
* Resource optimization
* Dynamic test data
* Environment-driven configuration
* Hybrid automation strategy
* Parallel-safe execution

---

# Current Learning Coverage

## Playwright

✅ POM
✅ Fixtures
✅ Parallel execution
✅ Mocking
✅ HAR Replay
✅ Multi-browser execution
✅ Environment config

---

## API Automation

✅ CRUD operations
✅ API clients
✅ Authentication headers
✅ Hybrid testing

---

## Database Automation

✅ PostgreSQL integration
✅ DB client architecture
✅ Dynamic data generation
✅ Cleanup strategies
✅ Worker-scoped DB fixtures

---

# Allure Reporting & Centralized Debugging

## Overview

This framework integrates:

* Playwright HTML Reports
* Allure Reports
* Automatic Failure Screenshots
* Video Recording
* Console Log Capture
* Failed Network Request Logging
* Environment Metadata
* Failure Categorization
* Business-Level Test Steps

The goal is to build an enterprise-grade reporting and debugging ecosystem.

---

# Why Allure Reporting?

Playwright HTML reports are useful for local execution debugging.

Allure adds:

* Rich dashboards
* Business-readable reporting
* Test categorization
* Attachments
* Failure analytics
* Environment tracking
* Historical trends
* CI/CD integration

---

# Install Allure Dependencies

```bash
npm install -D allure-playwright allure-commandline
```

---

# Configure Allure Reporter

## playwright.config.ts

```ts
reporter: [
  ['html'],
  ['allure-playwright']
],
```

---

# Execute Tests

```bash
npx playwright test
```

This generates:

```text
allure-results/
```

The `allure-results` folder contains:

* test result JSON files
* attachments
* screenshots
* videos
* metadata

---

# Generate Allure Report

```bash
npx allure generate --output allure-report allure-results
```

---

# Open Allure Report

```bash
npx allure open allure-report
```

---

# Important Allure Lifecycle Understanding

## allure-results

Raw execution artifacts.

Contains:

* execution JSON
* screenshots
* videos
* metadata
* categories

## allure-report

Generated visual dashboard built from `allure-results`.

---

# Important Best Practice

Always run tests before generating reports.

Correct flow:

```text
Clean old reports
↓
Run Playwright tests
↓
Generate allure-results
↓
Generate allure-report
↓
Open report
```

---

# Centralized Failure Screenshot Attachment

Implemented inside:

```text
fixtures/baseFixture.ts
```

Framework automatically:

* captures screenshot on failure
* attaches screenshot to Allure
* works for all tests globally

## Example

```ts
if (
  testInfo.status !==
  testInfo.expectedStatus
) {

  const screenshot =
    await testInfo.page!.screenshot();

  await testInfo.attach(
    'Failure Screenshot',
    {
      body: screenshot,
      contentType: 'image/png'
    }
  );
}
```

---

# Why Centralized Debugging Hooks?

Benefits:

* avoids repetitive code
* standardizes debugging
* scalable architecture
* easier maintenance
* reusable framework behavior

Instead of adding screenshots manually in every test, the framework handles failures automatically.

---

# Automatic Console Log Capture

Framework automatically captures:

* browser console logs
* frontend JavaScript errors
* warnings
* runtime failures

## Example

```ts
const consoleLogs: string[] = [];

testInfo.page?.on(
  'console',
  message => {
    consoleLogs.push(
      `[${message.type()}] ${message.text()}`
    );
  }
);
```

---

# Automatic Failed Network Request Logging

Framework automatically captures:

* failed API calls
* aborted requests
* network failures

## Example

```ts
const failedRequests: string[] = [];

testInfo.page?.on(
  'requestfailed',
  request => {
    failedRequests.push(
      `${request.method()} ${request.url()}`
    );
  }
);
```

---

# Why Failure-Only Attachments?

Attachments are generated only on failures because:

* avoids noisy reports
* reduces storage usage
* improves readability
* scales better in CI/CD

Enterprise frameworks optimize debugging evidence carefully.

---

# Playwright Attachments vs Allure Attachments

Preferred approach:

```ts
await test.info().attach()
```

instead of:

```ts
allure.attachment()
```

Reason:

* Playwright-native
* reporter-independent
* cleaner architecture
* less tool coupling

Allure automatically consumes Playwright attachments.

---

# test.step() vs allure.step()

Preferred:

```ts
await test.step()
```

Reason:

* Playwright-native
* reusable across reporters
* Allure automatically visualizes steps

Use `test.step()` for:

* Login
* Add Product
* Checkout
* Validation

Avoid tiny technical steps.

Reports should represent:

* business workflow
* user journey

---

# Allure Metadata

## Severity

```ts
await allure.severity('critical');
```

## Owner

```ts
await allure.owner('Shree SDET');
```

## Feature

```ts
await allure.feature('Cart Functionality');
```

---

# Where Metadata Appears

| Metadata | Location in Allure |
| -------- | ------------------ |
| Steps    | Test details page  |
| Severity | Labels section     |
| Owner    | Labels section     |
| Feature  | Behaviors tab      |

---

# Environment Metadata

Create:

```text
allure-results/environment.properties
```

## Example

```properties
Environment=QA
Browser=Chromium
BaseURL=https://www.saucedemo.com
Framework=Playwright Enterprise Framework
```

This helps enterprise teams identify:

* environment
* browser
* execution context
* framework version

---

# Failure Categorization

Create:

```text
allure-results/categories.json
```

## Example

```json
[
  {
    "name": "Locator Issues",
    "matchedStatuses": ["failed"],
    "messageRegex": ".*locator.*"
  },
  {
    "name": "Timeout Issues",
    "matchedStatuses": ["failed"],
    "messageRegex": ".*timeout.*"
  }
]
```

Benefits:

* automatic failure grouping
* flaky analysis
* automation health tracking
* easier debugging

---

# Enterprise Reporting Benefits

This reporting architecture provides:

* centralized debugging
* operational visibility
* business-readable reports
* faster root cause analysis
* scalable CI/CD integration
* enterprise-grade execution diagnostics

---

# Current Reporting Capabilities

Framework currently supports:

* Playwright HTML Reports
* Allure Reports
* Automatic Screenshots
* Video Attachments
* Console Logs
* Failed Request Logging
* Test Steps
* Severity & Owners
* Environment Metadata
* Failure Categories
* Centralized Failure Hooks

---

# Next Planned Enhancements

Upcoming topics:

* GitHub Actions CI/CD
* Slack Notifications
* Report Publishing
* History Trending
* Flaky Test Tracking
* Scheduled Execution Pipelines
* Docker Integration


# Design Philosophy

This framework focuses on:

* scalability
* maintainability
* reusability
* enterprise architecture
* clean separation of concerns

The goal is not just writing automated tests, but building a production-grade automation platform.
