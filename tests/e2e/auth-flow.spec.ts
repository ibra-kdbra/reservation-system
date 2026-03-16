import { test, expect } from '@playwright/test';

test.describe('Multi-Role Authentication Flows', () => {

  test('should register a new user and login', async ({ page }) => {
    await page.goto('/auth/register');
    
    const email = `test-${Date.now()}@example.com`;
    await page.locator('#firstName').fill('E2E');
    await page.locator('#lastName').fill('User');
    await page.locator('#email').fill(email);
    await page.locator('#password').fill('StrongPassword123!');
    
    // Check Terms of Service (required)
    await page.locator('input[type="checkbox"]').check();
    
    await page.getByRole('button', { name: 'Create Account' }).click();
    
    // Verify redirect to home or profile
    await expect(page).toHaveURL('/');
    await expect(page.getByText('E2E')).toBeVisible();
  });

  test('should handle invalid login credentials with toast', async ({ page }) => {
    await page.goto('/auth/login');
    
    await page.locator('#email').fill('non-existent@example.com');
    await page.locator('#password').fill('WrongPass123!');
    await page.getByRole('button', { name: 'Log In' }).click();
    
    // Verify toast notification
    await expect(page.locator('.toast-item.error').first()).toBeVisible();
    await expect(page.getByText(/Invalid credentials/i).first()).toBeVisible();
  });

  test('should logout correctly', async ({ page }) => {
    // 1. Login first
    await page.goto('/auth/login');
    await page.locator('#email').fill('guest@example.com');
    await page.locator('#password').fill('Password123!');
    await page.getByRole('button', { name: 'Log In' }).click();
    
    await expect(page).toHaveURL('/');
    
    // 2. Click user menu then logout
    await page.getByRole('button', { name: /User Menu/i }).click();
    await page.getByRole('button', { name: /Log Out/i }).click();
    
    // 3. Verify user is logged out
    await expect(page.getByRole('link', { name: /Log In/i }).first()).toBeVisible();
  });

  test.describe('Mobile Viewport', () => {
    test.use({ viewport: { width: 375, height: 667 } });

    test('should show mobile-optimized auth pages', async ({ page }) => {
      await page.goto('/auth/login');
      // On mobile, the brand panel is hidden, so 'Welcome Back' h1 is not visible.
      // We check for the 'Log In' h2 instead.
      await expect(page.getByRole('heading', { name: /Log In/i })).toBeVisible();
    });
  });
});
