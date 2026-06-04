/**
 * Metrics verification tests.
 * Run these to confirm the Pushgateway pipeline is working.
 *
 * After running, check:
 *   - http://localhost:9091 (Pushgateway UI — should show "playwright" job)
 *   - http://localhost:9090/graph (Prometheus — query playwright_tests_passed_total)
 *   - http://localhost:3000 (Grafana dashboard)
 */

import { expect, test } from '@playwright/test';

test('metrics verification — pass', async () => {
  // This test always passes and increments playwright_tests_passed_total
  expect(1).toBe(1);
});

test('metrics verification — fail (opt-in)', async () => {
  // Set RUN_FAILING_METRICS_TEST=true to generate a failed-test metric
  test.skip(
    process.env.RUN_FAILING_METRICS_TEST !== 'true',
    'Opt-in test: set RUN_FAILING_METRICS_TEST=true to generate a failed metric.',
  );
  expect(1).toBe(2);
});

test.skip('metrics verification — skip', () => {
  // This always-skipped test increments playwright_tests_skipped_total
});