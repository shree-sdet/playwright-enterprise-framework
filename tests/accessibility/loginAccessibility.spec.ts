import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import * as allure from 'allure-js-commons';


test('Login page accessibility scan @accessibility', async ({ page }) => {

    await page.goto('/');

    //Run all accessibility rules
    const results = await new AxeBuilder({ page }).analyze();  
   
    await allure.attachment(
        'Accessibility Violations',
        JSON.stringify(results.violations, null, 2),
        'application/json'
    );

    console.log(`Accessibility Violations Found: ${results.violations.length}`);

    results.violations.forEach(v => {
        console.log(`${v.id} - ${v.help}`);
    });

    expect(results.violations.length).toBeLessThanOrEqual(5);
});
