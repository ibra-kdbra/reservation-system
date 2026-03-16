import { test, expect } from '@playwright/test';

test('diagnostic: capture hydration and network errors', async ({ page }) => {
  page.on('console', msg => console.log(`BROWSER CONSOLE: ${msg.type().toUpperCase()}: ${msg.text()}`));
  page.on('pageerror', err => console.log(`BROWSER ERROR: ${err.message}`));
  page.on('requestfailed', request => console.log(`REQUEST FAILED: ${request.url()} - ${request.failure()?.errorText}`));

  console.log('Navigating to /auth/login...');
  await page.goto('/auth/login', { waitUntil: 'load' });
  
  console.log('Page loaded according to "load" event. Waiting 5s for hydration...');
  await page.waitForTimeout(5000);
  
  const content = await page.content();
  console.log('Current DOM snapshot length:', content.length);
  
  const appHtml = await page.locator('#app').innerHTML();
  console.log('Content inside #app:', appHtml.substring(0, 500));

  const emailVisible = await page.locator('#email').isVisible();
  console.log('Email visible:', emailVisible);
  
  if (!emailVisible) {
    console.log('FULL DOM CONTENT:');
    console.log(content);
  }
  
  await expect(page.locator('#email')).toBeVisible({ timeout: 10000 });
});
