import { test, expect } from '@playwright/test';

test.describe('Admin Operations Flows', () => {

  test.beforeEach(async ({ page }) => {
    // 1. Login as Admin
    await page.goto('/auth/login');
    await page.locator('#email').fill('admin@example.com');
    await page.locator('#password').fill('Password123!');
    await page.getByRole('button', { name: 'Log In' }).click();
    await expect(page).toHaveURL('/');
  });

  test('should access admin dashboard and see overview', async ({ page }) => {
    await page.goto('/admin');
    
    await expect(page.getByRole('heading', { name: /Admin Dashboard/i })).toBeVisible();
    await expect(page.getByText(/Total Users/i)).toBeVisible();
    await expect(page.getByText(/Total Revenue/i)).toBeVisible();
  });

  test('should manage users', async ({ page }) => {
    await page.goto('/admin');
    await page.getByRole('button', { name: /Users/i }).click();
    
    await expect(page.getByRole('heading', { name: /Users Management/i })).toBeVisible();
    const userRows = await page.locator('table tbody tr').count();
    expect(userRows).toBeGreaterThanOrEqual(1);
  });

  test('should manage listings', async ({ page }) => {
    await page.goto('/admin');
    await page.getByRole('button', { name: /Listings/i }).click();
    
    await expect(page.getByRole('heading', { name: /Listing Approvals/i })).toBeVisible();
    const listingRows = await page.locator('table tbody tr').count();
    expect(listingRows).toBeGreaterThanOrEqual(1);
  });
});
