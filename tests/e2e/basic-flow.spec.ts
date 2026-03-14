
import { test, expect } from '@playwright/test';

test.describe('Critical User Flows', () => {

    test('should load homepage and display hero section', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/NestAsia/);
    await expect(page.getByRole('heading', { name: 'Explore the Heart of Asia' })).toBeVisible();
    
    // Verify that featured listings are loaded
    await page.waitForSelector('.listing-card', { timeout: 10000 });
    const count = await page.locator('.listing-card').count();
    expect(count).toBeGreaterThan(0);
  });

    test('should be able to search for listings', async ({ page }) => {
        await page.goto('/');

        // Fill search input
        await page.getByPlaceholder('Tokyo, Bali, Jaipur...').fill('Siem Reap');

        // Click search button
        await page.getByRole('button', { name: 'Search' }).click();

        // Verify results page loaded
    await expect(page).toHaveURL(/.*\/listings\/search/);
    
    // Wait for either results or empty state
    await Promise.race([
        page.waitForSelector('.listing-card', { timeout: 15000 }),
        page.waitForSelector('.empty-state', { timeout: 15000 })
    ]);

    const listingCount = await page.locator('.listing-card').count();
    if (listingCount === 0) {
        const emptyText = await page.textContent('.empty-state h3');
        throw new Error(`Search failed: Found empty state with text "${emptyText}" instead of listings.`);
    }

    await expect(page.getByText('Private Khmer Villa near Angkor Wat')).toBeVisible();
  });

   test('should navigate to listing details', async ({ page }) => {
    // Go directly to a search result search
    await page.goto('/listings/search?city=Siem%20Reap');
    
    await page.waitForSelector('.listing-card', { timeout: 10000 });
    
    // Click on the first listing card
    const listingCard = page.locator('.listing-card').first();
    await listingCard.click();
    
    // Verify details page
    await expect(page).toHaveURL(/.*\/listings\/.*/);
    await expect(page.getByRole('button', { name: 'Reserve' })).toBeVisible();
  });
});
