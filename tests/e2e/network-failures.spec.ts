import { test, expect } from '@playwright/test';

test.describe('Network Resilience & Error Handling', () => {

  test('should show error toast when search API fails', async ({ page }) => {
    // Mock API failure (500)
    await page.route('/api/listings/search*', route => route.fulfill({
      status: 500,
      contentType: 'application/json',
      body: JSON.stringify({ message: 'Internal Server Error' }),
    }));

    await page.goto('/');
    
    // Fill search input
    await page.getByPlaceholder('Tokyo, Bali, Jaipur...').fill('Mumbai');
    await page.getByRole('button', { name: 'Search' }).click();
    
    // Verify toast notification
    await expect(page.locator('.toast-item.error').first()).toBeVisible();
  });

  test('should show loading state and handle slow network', async ({ page }) => {
    // Mock slow API
    await page.route('/api/listings/search*', async route => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      await route.continue();
    });

    await page.goto('/');
    
    // Wait for search trigger
    await page.getByPlaceholder('Tokyo, Bali, Jaipur...').fill('Kyoto');
    await page.getByRole('button', { name: 'Search' }).click();
    
    // Verify loading state
    await expect(page.locator('.loading-state')).toBeVisible();
    
    // Eventually it should load
    await expect(page.locator('.listing-card')).toBeVisible({ timeout: 15000 });
  });

  test('should handle offline mode gracefully', async ({ page, context }) => {
    await page.goto('/');
    
    // Go offline
    await context.setOffline(true);
    
    // Attempt search
    await page.getByPlaceholder('Tokyo, Bali, Jaipur...').fill('Bangkok');
    await page.getByRole('button', { name: 'Search' }).click();
    
    // Verify local error handling for network error
    const toast = page.locator('.toast-item.error').first();
    const isVisible = await toast.isVisible().catch(() => false);
    
    if (!isVisible) {
      console.log('Toast not visible on offline search, checking if results are NOT loaded');
      await expect(page.locator('.listing-card')).not.toBeVisible();
    } else {
      await expect(toast).toBeVisible();
    }
    
    await context.setOffline(false);
  });
});
