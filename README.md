# Playwright Enterprise Framework

An enterprise-grade test automation framework built with **Playwright** and **TypeScript**, covering UI, API, Database, Accessibility, Visual Regression, and Mobile testing — with full CI/CD integration, Allure reporting, and Slack notifications.

---

## 📌 Table of Contents

- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Environment Setup](#-environment-setup)
- [Project Structure](#-project-structure)
- [Running Tests](#-running-tests)
- [Test Coverage](#-test-coverage)
- [CI/CD Pipelines](#-cicd-pipelines)
- [Reporting](#-reporting)
- [Framework Architecture](#-framework-architecture)
- [Design Patterns](#-design-patterns)
- [Security Practices](#-security-practices)

---

## 🛠 Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| Playwright | ^1.60.0 | UI + API Automation |
| TypeScript | Latest | Strong typing |
| Node.js | 20+ | Runtime environment |
| PostgreSQL | 15 | Database validation |
| dotenv | ^17.4.2 | Environment management |
| axe-core/playwright | ^4.11.3 | Accessibility testing |
| allure-playwright | ^3.9.0 | Test reporting |
| GitHub Actions | — | CI/CD pipelines |

---

## ✅ Prerequisites

- Node.js v20 or higher
- npm v9 or higher
- PostgreSQL (for database tests only)
- Allure CLI (for local report generation)

```bash
# Install Allure CLI globally
npm install -g allure-commandline

# Verify installations
node --version
npm --version
psql --version
allure --version
```

---

## 📦 Installation

```bash
# 1. Clone the repository
git clone https://github.com/shree-sdet/playwright-enterprise-framework.git
cd playwright-enterprise-framework

# 2. Install dependencies
npm ci

# 3. Install Playwright browsers
npx playwright install --with-deps
```

---

## ⚙️ Environment Setup

Create a `.env` file in the project root (never commit this file):

```env
# Environment selector: qa | staging | prod
ENV=qa

# Base URLs per environment
QA_BASE_URL=https://www.saucedemo.com
STAGE_BASE_URL=https://staging.example.com
PROD_BASE_URL=https://prod.example.com

# Auth credentials
USERNAME=standard_user
PASSWORD=secret_sauce

# Database (required only for DB tests)
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_db_password
DB_NAME=playwright_framework_db
```

> **Note:** `.env` and `auth/userAuth.json` are git-ignored and must never be committed.

### Switch environments

```bash
# Run against staging
ENV=staging npx playwright test

# Run against production
ENV=prod npx playwright test
```

---

## 📁 Project Structure

```text
playwright-enterprise-framework/
│
├── .github/
│   └── workflows/
│       ├── playwright_basic.yml      # Standard CI pipeline (chromium)
│       ├── playwright_shard.yml      # Sharded parallel pipeline (3×3 matrix)
│       └── playwright_visual.yml     # Visual regression pipeline
│
├── api-clients/
│   └── PostsApiClient.ts             # Reusable API client abstraction
│
├── components/
│   └── HeaderComponent.ts            # Reusable UI component (header/menu)
│
├── config/
│   ├── allure-config/
│   │   ├── categories.json           # Allure failure categorization rules
│   │   └── environment.properties    # Allure environment metadata
│   └── env.ts                        # Multi-environment config loader
│
├── db/
│   └── databaseClient.ts             # PostgreSQL client abstraction
│
├── fixtures/
│   └── baseFixture.ts                # Custom fixtures + auto failure hooks
│
├── mocks/
│   └── saucedemo.har                 # HAR recording for network replay
│
├── pages/
│   ├── BasePage.ts                   # Base page with shared methods
│   ├── LoginPage.ts                  # Login page object
│   └── InventoryPage.ts              # Inventory page object
│
├── test-data/
│   ├── loginUsers.json               # User test data
│   └── products.json                 # Product test data
│
├── tests/
│   ├── accessibility/
│   │   ├── colorContrast.spec.ts     # WCAG 2AA color contrast scan
│   │   ├── keyboardNavigation.spec.ts# Keyboard-only navigation tests
│   │   └── loginAccessibility.spec.ts# Full axe-core accessibility scan
│   ├── api/
│   │   ├── databaseValidation.spec.ts# DB CRUD + validation tests
│   │   ├── getUsers.spec.ts          # API GET request tests
│   │   ├── hybridFlow.spec.ts        # UI + API hybrid test flows
│   │   └── postsApiClient.spec.ts    # API client layer tests
│   ├── mobile/
│   │   └── mobile-verification.spec.ts# Mobile viewport + behavior tests
│   ├── ui/
│   │   ├── addToCart.spec.ts         # Cart add functionality
│   │   ├── allureReportTest.spec.ts  # Allure metadata demonstration
│   │   ├── cartConflict.spec.ts      # Cart state conflict scenarios
│   │   ├── harMock.spec.ts           # HAR replay tests
│   │   ├── inventory.spec.ts         # Inventory page tests
│   │   ├── login.spec.ts             # Login flow tests
│   │   ├── logout.spec.ts            # Logout flow tests
│   │   ├── multipleProducts.spec.ts  # Data-driven product tests
│   │   ├── networkMock.spec.ts       # Network interception/mocking
│   │   ├── productValidation.spec.ts # Product data validation
│   │   └── removeFromCart.spec.ts    # Cart remove functionality
│   ├── visual/
│   │   └── loginPageVisual.spec.ts   # Visual regression tests (@visual)
│   └── auth.setup.ts                 # Authentication setup (storageState)
│
├── utils/
│   ├── testDataManager.ts            # Test data access helpers
│   └── types.ts                      # Shared TypeScript interfaces
│
├── playwright.config.ts              # Playwright configuration
├── package.json                      # Dependencies + npm scripts
├── tsconfig.json                     # TypeScript configuration
└── README.md
```

---

## 🚀 Running Tests

### All tests
```bash
npm test
```

### By category
```bash
npm run test:ui          # UI tests only
npm run test:api         # API + database tests only
npm run test:a11y        # Accessibility tests only
npm run test:visual      # Visual regression tests only
npm run test:mobile      # Mobile tests (Pixel 7 + iPhone 15)
```

### By tag
```bash
npx playwright test --grep @smoke        # Smoke suite
npx playwright test --grep @regression   # Regression suite
npx playwright test --grep @ui           # UI tagged tests
npx playwright test --grep @api          # API tagged tests
npx playwright test --grep @accessibility# Accessibility tagged tests
npx playwright test --grep @visual       # Visual tagged tests
npx playwright test --grep @mobile       # Mobile tagged tests
```

### By browser
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
npx playwright test --project="Mobile Chrome"
npx playwright test --project="Mobile Safari"
```

### Headed / debug mode
```bash
npx playwright test --headed             # Run with browser visible
npx playwright test --debug             # Step-through debugger
npx playwright test --ui                # Playwright UI mode
```

### With Allure report
```bash
npm run test:allure   # Clean + run + generate Allure report
npx allure open allure-report           # Open the report
```

---

## 🧪 Test Coverage

| Category | Tests | Tags | Description |
|---|---|---|---|
| **UI** | Login, Logout, Cart, Inventory, Products | `@ui` `@smoke` `@regression` | Core user flows using Page Object Model |
| **API** | GET, POST, PUT, DELETE | `@api` `@smoke` | REST API testing via APIRequestContext |
| **Database** | CRUD, validation | `@db` | PostgreSQL validation via pg client |
| **Hybrid** | UI + API flows | — | Create data via API, validate in UI |
| **Accessibility** | axe-core, keyboard | `@accessibility` | WCAG 2AA compliance + keyboard-only navigation |
| **Visual** | Login, Logo, Inventory | `@visual` | Screenshot-based regression with pixel diff |
| **Mobile** | Viewport, offline, slow network | `@mobile` | Pixel 7 + iPhone 15 device emulation |
| **Network Mocking** | HAR replay, route interception | — | Mock API responses + HAR recording/replay |

---

## 🔄 CI/CD Pipelines

### Basic Pipeline (`playwright_basic.yml`)
- Triggers: push to `main`, scheduled daily at 20:30 UTC, manual dispatch
- Runs: Chromium tests
- Includes: Postgres service, DB schema setup, browser caching
- Reports: Allure report deployed to GitHub Pages
- Notifications: Slack pass/fail messages

### Shard Pipeline (`playwright_shard.yml`)
- Triggers: push to `main`, scheduled daily
- Runs: 3 shards × 3 browsers (Chromium, Firefox, WebKit) = 9 parallel jobs
- Reports: Merged Allure report from all shards deployed to GitHub Pages
- Notifications: Slack pass/fail messages

### Visual Pipeline (`playwright_visual.yml`)
- Triggers: manual dispatch only (`workflow_dispatch`)
- Runs: visual-chromium project with `@visual` tagged tests
- Reports: Playwright HTML report deployed to GitHub Pages
- Notifications: Slack pass/fail messages

### GitHub Secrets required
| Secret | Description |
|---|---|
| `QA_USERNAME` | Test user username |
| `QA_PASSWORD` | Test user password |
| `DB_PASSWORD` | PostgreSQL password |
| `SLACK_WEBHOOK_URL` | Slack incoming webhook URL |

---

## 📊 Reporting

### Allure Report (CI)
Allure reports are automatically generated and deployed to GitHub Pages on every CI run.

**Live report:** `https://shree-sdet.github.io/playwright-enterprise-framework/`

Features:
- Test steps with business-readable names
- Failure screenshots attached automatically
- Video recordings on failure
- Console log capture
- Failed network request logging
- Failure categorization (Locator Issues, Timeout Issues, Assertion Errors, API Failures)
- Environment metadata (QA / Chromium / BaseURL)
- Severity, Owner, and Feature labels

### Local Allure Report
```bash
npm run test:allure
npx allure open allure-report
```

### Playwright HTML Report
```bash
npx playwright test
npx playwright show-report
```

---

## 🏗 Framework Architecture

### Custom Fixtures (`fixtures/baseFixture.ts`)

All page objects are injected via custom Playwright fixtures — no manual instantiation in tests.

```ts
// test automatically gets loginPage, inventoryPage, dbClient etc.
test('example', async ({ loginPage, inventoryPage, dbClient }) => {
  // ...
});
```

Features:
- **Worker-scoped DB fixture** — single DB connection shared across tests in a worker
- **Auto fixture** — runs automatically for every test (logging, screenshot hooks)
- **Failure hooks** — captures screenshot, console logs, and failed network requests on failure

### Multi-Environment Config (`config/env.ts`)

```ts
// Switch environment via ENV variable
ENV=staging npx playwright test
```

Supports `qa`, `staging`, and `prod` environments with validation — throws an error if `baseURL` is missing.

### Authentication Strategy

Uses Playwright's `storageState` to reuse authenticated sessions across all tests — auth runs once per suite, not per test.

```ts
// auth/userAuth.json is generated once by auth.setup.ts
// all projects consume it via storageState: 'auth/userAuth.json'
```

### Page Object Model

```text
BasePage (shared methods)
  ├── LoginPage
  └── InventoryPage

HeaderComponent (reusable menu/header)
```

### API Client Layer (`api-clients/PostsApiClient.ts`)

Reusable abstraction over Playwright's `APIRequestContext`:

```ts
postsApiClient.getPost(id)
postsApiClient.createPost(data)
postsApiClient.updatePost(id, data)
postsApiClient.deletePost(id)
```

### Database Client (`db/databaseClient.ts`)

Reusable PostgreSQL client with parameterized queries and transaction support:

```ts
dbClient.getUserById(id)
dbClient.createUser(data)
dbClient.deleteUser(id)
```

---

## 🎨 Design Patterns

| Pattern | Where used |
|---|---|
| Page Object Model (POM) | `pages/` |
| Component Object | `components/` |
| Fixture-based DI | `fixtures/baseFixture.ts` |
| API Client abstraction | `api-clients/` |
| DB Client abstraction | `db/` |
| Data-driven testing | `test-data/` + `utils/testDataManager.ts` |
| Multi-environment config | `config/env.ts` |
| Auth state reuse | `tests/auth.setup.ts` |
| Auto fixtures | `baseFixture.ts` (autoLogger) |
| Worker-scoped resources | `dbClient` fixture |

---

## 🔒 Security Practices

- `.env` is git-ignored — never committed
- `auth/userAuth.json` is git-ignored — never committed
- All credentials loaded from environment variables or GitHub Secrets
- No hardcoded passwords or tokens in source code
- `forbidOnly: true` in CI — prevents accidental `test.only` in pipelines
- Parameterized DB queries — prevents SQL injection

---

## 📋 Allure Failure Categories

| Category | Matches |
|---|---|
| Locator Issues | Errors containing "locator" |
| Timeout Issues | Errors containing "timeout" |
| Assertion Errors | Errors containing "expect" |
| API Failures | Errors containing "API" |
| Authentication Failures | Errors containing "authentication" |
| Other Failures | All remaining failures |
