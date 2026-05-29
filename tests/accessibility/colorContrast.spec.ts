import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('Color contrast validation @accessibility', async ({ page }) => {

    await page.goto('/');

    //Run only rules tagged as WCAG 2.0 AA
    const results = await new AxeBuilder({ page })
        .withTags(['wcag2aa'])
        .analyze();

    const colorContrastIssues =
        results.violations.filter(
            v => v.id === 'color-contrast'
        );

    expect(colorContrastIssues).toEqual([]);
});