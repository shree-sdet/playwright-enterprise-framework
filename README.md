# Playwright Enterprise Framework

An enterprise-grade test automation framework built with **Playwright + TypeScript**, covering **10 testing disciplines** — UI, API, Database, Accessibility, Visual Regression, Mobile, Performance (k6), Contract (Pact), Network Mocking, and Observability (Prometheus + Grafana) — with **5 CI/CD pipelines**, Allure reporting, Docker support, BrowserStack cloud execution, and Slack notifications.

> **Application under test:** [SauceDemo](https://www.saucedemo.com) — a sample e-commerce app used for demonstration purposes.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Running Tests](#running-tests)
- [Performance Testing k6](#performance-testing-k6)
- [Contract Testing Pact](#contract-testing-pact)
- [Observability Stack](#observability-stack)
- [Docker Support](#docker-support)
- [BrowserStack Integration](#browserstack-integration)
- [CICD Pipelines](#cicd-pipelines)
- [Reporting](#reporting)
- [Framework Architecture](#framework-architecture)
- [Design Patterns](#design-patterns)
- [Security Practices](#security-practices)

---

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| Playwright | ^1.60.0 | UI, API, visual, mobile, network testing |
| TypeScript | Latest | Type-safe framework code |
| Node.js | 20+ | Runtime environment |
| k6 | Latest | Performance load/spike/stress testing |
| Pact | ^16.4.0 | Consumer-driven contract testing |
| PostgreSQL | 16 | Database validation |
| axe-core/playwright | ^4.11.3 | WCAG 2AA accessibility scanning |
| allure-playwright | ^3.9.0 | Rich test reporting |
| prom-client | ^15.1.3 | Custom Prometheus metrics reporter |
| Prometheus | Latest | Metrics collection and storage |
| Grafana | Latest | Metrics dashboard visualisation |
| Docker / Compose | Latest | Containerised test execution |
| BrowserStack | ^1.55.5 | Cross-browser cloud testing |
| GitHub Actions | — | 5 CI/CD pipelines |
| dotenv | ^17.4.2 | Multi-environment config management |

---

## Prerequisites

- Node.js v20+
- npm v9+
- Docker Desktop (for Docker and observability stack)
- k6 (for performance tests)
- PostgreSQL 16 (for DB tests without Docker)
- Allure CLI (for local Allure reports)

```bash
# Install Allure CLI globally
npm install -g allure-commandline

# Install k6 on macOS
brew install k6

# Install k6 on Linux
sudo apt-get install k6

# Verify tools
node --version && npm --version && k6 version && allure --version && docker --version
```

---

## Installation

```bash
# 1. Clone the repository
git clone https://github.com/shree-sdet/playwright-enterprise-framework.git
cd playwright-enterprise-framework

# 2. Install dependencies
npm ci

# 3. Install Playwright browsers with OS dependencies
npx playwright install --with-deps
```

## Project Structure

```
playwright-enterprise-framework/
|
+-- .github/workflows/
|   +-- playwright_basic.yml            # Standard CI — chromium + webkit
|   +-- playwright_shard.yml            # Sharded parallel — 3 shards x 3 browsers
|   +-- playwright_visual.yml           # Visual regression pipeline
|   +-- playwright_docker-K6.yml        # Docker + k6 + contract testing
|   +-- playwright_browserstack.yml     # BrowserStack cloud execution
|
+-- api-clients/
|   +-- PostsApiClient.ts               # Reusable REST API client abstraction
|
+-- components/
|   +-- HeaderComponent.ts              # Reusable header/menu component object
|
+-- config/
|   +-- allure-config/
|   |   +-- categories.json             # Allure failure categories (6 types)
|   |   +-- environment.properties      # Allure environment metadata
|   +-- env.ts                          # Multi-environment config loader
|
+-- db/
|   +-- databaseClient.ts               # PostgreSQL client with CRUD + transactions
|   +-- init.sql                        # Schema + seed data for Docker Postgres
|
+-- fixtures/
|   +-- baseFixture.ts                  # Custom fixtures + auto failure hooks
|
+-- mocks/
|   +-- saucedemo.har                   # HAR recording for network replay tests
|
+-- observability/
|   +-- prometheus.yml                  # Prometheus scrape configuration
|   +-- grafana/
|       +-- dashboards/
|       |   +-- playwright-metrics.json # Pre-built Grafana dashboard
|       +-- provisioning/
|           +-- dashboards/playwright.yml
|           +-- datasources/prometheus.yml
|
+-- pages/
|   +-- BasePage.ts                     # Shared page methods (base class)
|   +-- LoginPage.ts                    # Login page object
|   +-- InventoryPage.ts                # Inventory page object (parameterized)
|
+-- performance/
|   +-- homepageLoadTest.js             # Load test — 2 VUs, 30s
|   +-- homepageSpikeTest.js            # Spike test — ramp 2 to 20 VUs
|   +-- stressTest.js                   # Stress test — ramp to 100 VUs
|   +-- thresholdTest.js                # Threshold assertions test
|   +-- apiPerformanceTest.js           # API endpoint performance test
|   +-- README.md                       # k6 test results and observations
|
+-- reporters/
|   +-- prometheusReporter.ts           # Custom Playwright -> Pushgateway reporter
|
+-- test-data/
|   +-- loginUsers.json                 # User test data
|   +-- products.json                   # Product test data
|
+-- tests/
|   +-- accessibility/
|   |   +-- colorContrast.spec.ts       # WCAG 2AA color contrast scan
|   |   +-- keyboardNavigation.spec.ts  # Keyboard-only navigation flow
|   |   +-- loginAccessibility.spec.ts  # Full axe-core accessibility scan
|   +-- api/
|   |   +-- databaseValidation.spec.ts  # DB CRUD validation
|   |   +-- getUsers.spec.ts            # REST API GET tests
|   |   +-- hybridFlow.spec.ts          # UI + API hybrid flow tests
|   |   +-- postsApiClient.spec.ts      # API client abstraction tests
|   +-- contract-testing/
|   |   +-- consumer.spec.ts            # Pact consumer contract definition
|   |   +-- provider.spec.ts            # Pact provider verification
|   |   +-- pacts/
|   |       +-- PlaywrightFramework-UserAPI.json
|   +-- mobile/
|   |   +-- mobile-verification.spec.ts # Pixel 7 + iPhone 15 tests
|   +-- ui/
|   |   +-- addToCart.spec.ts
|   |   +-- allureReportTest.spec.ts    # Allure metadata demonstration
|   |   +-- browserstackSmoke.spec.ts   # BrowserStack smoke test
|   |   +-- cartConflict.spec.ts
|   |   +-- harMock.spec.ts             # HAR network replay
|   |   +-- inventory.spec.ts
|   |   +-- login.spec.ts
|   |   +-- logout.spec.ts
|   |   +-- multipleProducts.spec.ts    # Data-driven product tests
|   |   +-- networkMock.spec.ts         # Route interception + mocking
|   |   +-- productValidation.spec.ts
|   |   +-- removeFromCart.spec.ts
|   +-- visual/
|   |   +-- loginPageVisual.spec.ts     # Screenshot regression (@visual)
|   +-- auth.setup.ts                   # One-time auth setup (storageState)
|   +-- metrics-verification.spec.ts    # Prometheus metrics pipeline verification
|
+-- utils/
|   +-- testDataManager.ts              # Type-safe test data access helpers
|   +-- types.ts                        # Shared TypeScript interfaces
|
+-- Dockerfile
+-- docker-compose.yml                  # 4-service stack
+-- browserstack.yml                    # BrowserStack platform config
+-- playwright.config.ts                # Main config (6 projects)
+-- playwright.browserstack.config.ts   # BrowserStack config
+-- package.json
+-- tsconfig.json
```

---

## Running Tests

All tests:

```bash
npm test
```

By category:

```bash
npm run test:ui
npm run test:api
npm run test:a11y
npm run test:visual
npm run test:mobile
```

By browser project:

```bash
npx playwright test --project=chromium
npx playwright test --project=webkit
npx playwright test --project="Mobile Chrome"
npx playwright test --project="Mobile Safari"
npx playwright test --project=visual-chromium
```

By tag:

```bash
npx playwright test --grep @smoke
npx playwright test --grep @regression
npx playwright test --grep @visual
npx playwright test --grep @accessibility
npx playwright test --grep @mobile
npx playwright test --grep @api
```

Debug modes:

```bash
npx playwright test --headed
npx playwright test --debug
npx playwright test --ui
```

With Allure report:

```bash
npm run test:allure
npx allure open allure-report
```

---

## Performance Testing k6

5 k6 scripts covering different load patterns:

| Script | Type | VUs | Duration | Thresholds |
|---|---|---|---|---|
| homepageLoadTest.js | Load | 2 | 30s | p95 < 500ms, errors < 1% |
| homepageSpikeTest.js | Spike | 2 to 20 | staged | p95 < 1000ms, errors < 5% |
| stressTest.js | Stress | ramp to 100 | staged | p95 < 2000ms, errors < 10% |
| thresholdTest.js | Threshold | 2 | 20s | p95 < 500ms, errors < 1% |
| apiPerformanceTest.js | API | 5 | 30s | p95 < 1000ms, errors < 1% |

```bash
k6 run performance/homepageLoadTest.js
k6 run performance/homepageSpikeTest.js
k6 run performance/stressTest.js
k6 run performance/apiPerformanceTest.js
k6 run --summary-trend-stats="avg,p(90),p(95),p(99)" performance/homepageLoadTest.js
```

Observed results: Load test passed with avg ~16ms response time, p95 ~17ms, 0% error rate. Spike test revealed HTTP 429 rate limiting under sudden traffic burst — demonstrating real bottleneck detection.

---

## Contract Testing Pact

Consumer-driven contract testing with PactV3 — ensures API consumer and provider stay in sync without full integration tests.

```bash
# Step 1 — run consumer test, generates contract JSON
npx playwright test tests/contract-testing/consumer.spec.ts

# Step 2 — run provider verification against generated contract
npx playwright test tests/contract-testing/provider.spec.ts
```

How it works:

1. Consumer defines the expected request/response interaction
2. Pact generates a JSON contract file in `tests/contract-testing/pacts/`
3. Provider verification runs against the real provider API
4. Any breaking change on the provider immediately fails verification

The pact JSON is committed so provider verification can run independently in CI.

---

## Observability Stack

Live metrics pipeline: Playwright -> Pushgateway -> Prometheus -> Grafana

```bash
# Start observability stack
docker compose up pushgateway prometheus grafana -d

# Run tests — metrics pushed automatically
npm test

# Open dashboards
open http://localhost:9091   # Pushgateway
open http://localhost:9090   # Prometheus
open http://localhost:3000   # Grafana (admin / admin)
```

Metrics tracked after every test run:

| Metric | Description |
|---|---|
| playwright_tests_passed_total | Count of passed tests |
| playwright_tests_failed_total | Count of failed tests |
| playwright_tests_skipped_total | Count of skipped tests |

The Grafana dashboard is pre-provisioned and loads automatically with no manual configuration.

```bash
# Verify metrics pipeline end-to-end
npx playwright test tests/metrics-verification.spec.ts
```

---

## Docker Support

```bash
# Build and run in Docker
docker build -t playwright-framework .
docker run --rm playwright-framework

# Full stack — tests + all services
docker compose up --build

# Tests + database only
docker compose up postgres playwright
```

Services in docker-compose.yml:

| Service | Port | Description |
|---|---|---|
| postgres | 5432 | PostgreSQL 16 — schema and seed data auto-loaded from init.sql |
| pushgateway | 9091 | Receives Playwright metrics pushes |
| prometheus | 9090 | Scrapes and stores metrics |
| grafana | 3000 | Dashboard visualisation (admin/admin) |

All services include healthcheck and depends_on for correct startup order.

---

## BrowserStack Integration

Runs tests on real cloud browsers via BrowserStack Automate.

```bash
# Create .env.browserstack (never commit)
BROWSERSTACK_USERNAME=your_username
BROWSERSTACK_ACCESS_KEY=your_access_key

# Run on BrowserStack
npx browserstack-node-sdk playwright test tests/ui/browserstackSmoke.spec.ts
```

Current platforms in browserstack.yml:

| OS | Version | Browser | Version |
|---|---|---|---|
| Windows | 11 | Chrome | Latest |

---

## CICD Pipelines

5 GitHub Actions workflows:

| Workflow | Trigger | Browsers | Features |
|---|---|---|---|
| playwright_basic.yml | push/main, daily, manual | Chromium + WebKit | Postgres service, cache, Slack |
| playwright_shard.yml | push/main, daily | 3 shards x 3 browsers | Merged Allure report, Slack |
| playwright_visual.yml | manual | visual-chromium | Snapshot comparison, Pages |
| playwright_docker-K6.yml | manual | Docker container | k6 + Pact parallel jobs |
| playwright_browserstack.yml | manual | Windows/Chrome cloud | BrowserStack Automate |

---

## Reporting

Allure report is automatically generated and deployed to GitHub Pages on every CI run.

Live report: https://shree-sdet.github.io/playwright-enterprise-framework/

Features:
- Test steps with business-readable names
- Screenshots auto-attached on failure
- Video recordings retained on failure
- Console log capture per test
- Failed network request logging
- Failure categorisation: Locator Issues, Timeout Issues, Assertion Errors, API Failures, Auth Failures
- Environment metadata: environment name, browser, base URL
- Severity, Owner, Feature labels

Local Allure report:

```bash
npm run test:allure
npx allure open allure-report
```

Playwright HTML report:

```bash
npx playwright show-report
```

---

## Framework Architecture

### Playwright Projects (6 configured)

| Project | Browser | Scope | Auth |
|---|---|---|---|
| setup | — | auth.setup.ts only | Generates storageState |
| chromium | Desktop Chrome | All tests except mobile and visual | Reuses storageState |
| webkit | Desktop Safari | All tests except mobile and visual | Reuses storageState |
| Mobile Chrome | Pixel 7 | tests/mobile/ only | None |
| Mobile Safari | iPhone 15 | tests/mobile/ only | None |
| visual-chromium | Desktop Chrome | tests/visual/ + @visual tag | Reuses storageState |

### Custom Fixtures

All page objects and utilities are injected via Playwright fixtures — no manual instantiation in tests:

```ts
test('example', async ({ loginPage, inventoryPage, dbClient, postsApiClient }) => {
  // everything injected automatically
});
```

Auto fixture runs for every test: captures console logs, logs failed network requests, attaches screenshot on failure, retains video on failure.

Worker-scoped dbClient maintains a single database connection per worker, closed automatically after the worker finishes.

### Multi-Environment Config

```ts
// Throws a clear error if baseURL is missing — never runs silently against wrong env
ENV=staging npx playwright test
```

### Auth Strategy

Auth runs once per CI run via auth.setup.ts. Session saved to auth/userAuth.json and reused across all projects via storageState. No repeated logins per test.

### Custom Prometheus Reporter

Implements Playwright's Reporter interface:

```
onTestEnd() counts pass/fail/skip
onEnd() pushes 3 metrics to Pushgateway via prom-client
```

Registered in playwright.config.ts — runs automatically with every execution. Metrics appear in Grafana within 15 seconds.

---

## Design Patterns

| Pattern | Location |
|---|---|
| Page Object Model | pages/ |
| Component Object | components/HeaderComponent.ts |
| Fixture-based dependency injection | fixtures/baseFixture.ts |
| API client abstraction | api-clients/PostsApiClient.ts |
| DB client abstraction | db/databaseClient.ts |
| Data-driven testing | test-data/ + utils/testDataManager.ts |
| Multi-environment config | config/env.ts |
| Storagestate auth reuse | tests/auth.setup.ts |
| Auto fixtures | baseFixture.ts autoLogger |
| Worker-scoped shared resources | dbClient fixture |
| Custom reporter | reporters/prometheusReporter.ts |
| Consumer-driven contracts | tests/contract-testing/ |

---

## Security Practices

- .env is git-ignored — credentials never committed
- auth/userAuth.json is git-ignored — session tokens never committed
- .env.browserstack is git-ignored — cloud credentials never committed
- All CI credentials stored as GitHub Secrets
- forbidOnly: true in CI — blocks accidental test.only in pipelines
- Parameterised PostgreSQL queries — prevents SQL injection
- BrowserStack credentials via environment variables only

---

## Test Coverage Summary

| Category | Files | Key techniques |
|---|---|---|
| UI | 11 spec files | POM, fixtures DI, data-driven, storageState |
| API | 4 spec files | APIRequestContext, client abstraction, CRUD, hybrid |
| Database | 1 spec file | pg client, parameterised queries, transactions |
| Accessibility | 3 spec files | axe-core WCAG2AA, keyboard-only flow, color contrast |
| Visual regression | 1 spec file | Baseline screenshots, masking, pixel threshold, Linux baselines |
| Mobile | 1 spec file | Pixel 7, iPhone 15, offline mode, slow network |
| Performance | 5 k6 scripts | Load, spike, stress, threshold, API performance |
| Contract | 2 spec files | PactV3 consumer + provider, generated contract JSON |
| Network mocking | 2 spec files | Route interception, HAR replay |
| Observability | 1 spec file | Prometheus metrics verification |
