import { test, expect } from '@playwright/test';

test.describe('Aqualux Link-in-Bio E2E Tests', () => {

  test('should display Link-in-Bio page when navigating to #links', async ({ page }) => {
    await page.goto('/#links');

    await expect(page.getByText('AQUALUX BIO LINK')).toBeVisible();
    await expect(page.getByRole('heading', { name: /Aqualux Private Swim/i })).toBeVisible();
    await expect(page.getByText('@aqualux.swim')).toBeVisible();
  });

  test('should display primary link cards for website and WhatsApp admins', async ({ page }) => {
    await page.goto('/#links');

    await expect(page.getByText('Kunjungi Website Resmi Aqualux')).toBeVisible();
    await expect(page.getByText('Chat WA Admin 1 (Coach Faqih)')).toBeVisible();
    await expect(page.getByText('Chat WA Admin 2 (Coach Abed)')).toBeVisible();
  });

  test('should navigate back to main landing page on website link click', async ({ page }) => {
    await page.goto('/#links');

    await page.getByText('Kunjungi Website Resmi Aqualux').click();

    // Verify returning to hero section on landing page
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/Dari Takut Air Menjadi/i);
  });

});
