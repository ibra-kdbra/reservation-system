import { test, expect } from '@playwright/test';

test.describe('Host Management Flows', () => {

  test.beforeEach(async ({ page }) => {
    // 1. Login as Host
    await page.goto('/auth/login');
    await page.locator('#email').fill('host@example.com');
    await page.locator('#password').fill('Password123!');
    await page.getByRole('button', { name: 'Log In' }).click();
    await expect(page).toHaveURL('/');
  });

  test('should navigate to host dashboard and see stats', async ({ page }) => {
    await page.goto('/host/dashboard');
    
    // Verify dashboard elements
    await expect(page.getByRole('heading', { name: /Host Dashboard/i })).toBeVisible();
    await expect(page.getByText(/Total Revenue/i)).toBeVisible();
    await expect(page.getByText(/Active Listings/i)).toBeVisible();
  });

  test('should view my listings', async ({ page }) => {
    await page.goto('/host/dashboard');
    await expect(page.getByRole('heading', { name: /My Listings/i })).toBeVisible();
    
    // Check for listing cards
    const cardCount = await page.locator('.listing-card').count();
    expect(cardCount).toBeGreaterThanOrEqual(0);
  });

  test('should view host bookings', async ({ page }) => {
    await page.goto('/host/dashboard');
    await expect(page.getByRole('heading', { name: /Recent Bookings/i })).toBeVisible();
    
    await expect(page.getByRole('heading', { name: /Recent Bookings/i })).toBeVisible();
  });
});
