// =============================================================================
// Playwright Prometheus Reporter
// =============================================================================
// WHAT THIS FILE DOES:
//   After all tests finish, this reporter counts how many tests passed, failed,
//   or were skipped — then sends those numbers to Pushgateway.
//
// HOW IT WORKS (simple flow):
//   1. Tests run normally in Playwright
//   2. This reporter keeps a count as each test finishes
//   3. When ALL tests are done, it sends the counts to Pushgateway
//   4. Prometheus reads from Pushgateway → Grafana shows the charts
// =============================================================================

import type { Reporter, TestCase, TestResult } from '@playwright/test/reporter';
import client from 'prom-client';

// Where is Pushgateway running? Default is localhost, but Docker uses the service name.
const PUSHGATEWAY_URL = process.env.PUSHGATEWAY_URL || 'http://localhost:9091';

// Create a fresh container to hold our metrics (keeps them separate from anything else)
const registry = new client.Registry();

// -----------------------------------------------------------------------------
// STEP 1: Define the 3 metrics we want to track
// -----------------------------------------------------------------------------

// Counts tests that PASSED
const passedTotal = new client.Counter({
  name: 'playwright_tests_passed_total',
  help: 'Number of tests that passed',
  registers: [registry],
});

// Counts tests that FAILED
const failedTotal = new client.Counter({
  name: 'playwright_tests_failed_total',
  help: 'Number of tests that failed',
  registers: [registry],
});

// Counts tests that were SKIPPED
const skippedTotal = new client.Counter({
  name: 'playwright_tests_skipped_total',
  help: 'Number of tests that were skipped',
  registers: [registry],
});

// -----------------------------------------------------------------------------
// STEP 2: The reporter class — Playwright calls these methods automatically
// -----------------------------------------------------------------------------

export default class PrometheusReporter implements Reporter {

  // Called once after EACH test finishes
  onTestEnd(test: TestCase, result: TestResult) {
    if (result.status === 'passed')  passedTotal.inc();
    if (result.status === 'failed')  failedTotal.inc();
    if (result.status === 'skipped') skippedTotal.inc();
  }

  // Called once when ALL tests are done
  async onEnd() {
    console.log('\n[Prometheus] All tests done. Sending metrics to Pushgateway...');

    try {
      const gateway = new client.Pushgateway(PUSHGATEWAY_URL, [], registry);
      await gateway.pushAdd({ jobName: 'playwright' });
      console.log(`[Prometheus] ✅ Metrics sent to ${PUSHGATEWAY_URL}`);
      console.log('[Prometheus] Check http://localhost:9091 to see them');
    } catch (err) {
      console.error('[Prometheus] ❌ Could not reach Pushgateway. Is Docker running?');
      console.error(err);
    }
  }
}