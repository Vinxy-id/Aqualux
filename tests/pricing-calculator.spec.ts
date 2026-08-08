import { test, expect } from '@playwright/test';

test.describe('Aqualux Pricing Calculator E2E Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should render pricing calculator section', async ({ page }) => {
    const calcSection = page.locator('#kalkulator');
    await expect(calcSection).toBeVisible();
    await expect(calcSection.getByRole('heading', { name: /Hitung Biaya Les & Tiket Kolam/i })).toBeVisible();
  });

  test('should calculate correct price for Privat 8x at Hotel Tychi', async ({ page }) => {
    const calcSection = page.locator('#kalkulator');
    
    // Select Privat
    await calcSection.getByRole('button', { name: /Privat \(1-on-1\)/i }).click();

    // Select 8x Pertemuan
    await calcSection.getByRole('button', { name: /8x Pertemuan/i }).click();

    // Select Hotel Tychi Malang (HTM Rp 30.000)
    await calcSection.getByRole('button', { name: /Hotel Tychi Malang/i }).click();

    // Course rate for Privat 8x is Rp 1.000.000 + 8 * 30.000 (240.000) = Rp 1.240.000
    await expect(calcSection.getByText('Rp 1.240.000')).toBeVisible();
  });

  test('should update total price when switching to Reguler 4x at Hotel Ubud', async ({ page }) => {
    const calcSection = page.locator('#kalkulator');

    // Select Reguler
    await calcSection.getByRole('button', { name: /Reguler \(3-4 Orang\)/i }).click();

    // Select 4x Pertemuan
    await calcSection.getByRole('button', { name: /4x Pertemuan/i }).click();

    // Select Hotel Ubud Malang (HTM Rp 25.000)
    await calcSection.getByRole('button', { name: /Hotel Ubud Malang/i }).click();

    // Course rate for Reguler 4x is Rp 400.000 + 4 * 25.000 (100.000) = Rp 500.000
    await expect(calcSection.getByText('Rp 500.000')).toBeVisible();
  });

  test('should generate pre-filled WhatsApp message URL on CTA click', async ({ page }) => {
    const calcSection = page.locator('#kalkulator');
    const waLink = calcSection.getByRole('link', { name: /Ambil Slot & Konsultasi WA/i });

    await expect(waLink).toBeVisible();
    const href = await waLink.getAttribute('href');

    expect(href).toMatch(/wa\.me|api\.whatsapp\.com/);
    expect(href).toContain('Aqualux');
  });

});
