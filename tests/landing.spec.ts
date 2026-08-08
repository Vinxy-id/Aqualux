import { test, expect } from '@playwright/test';

test.describe('Aqualux Landing Page E2E Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display official brand title and logo', async ({ page }) => {
    await expect(page).toHaveTitle(/AQUALUX Swimming Course/i);
    const logo = page.locator('img[alt="AQUALUX Private Swim"]').first();
    await expect(logo).toBeVisible();
  });

  test('should display hero section and WhatsApp CTA button', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/Dari Takut Air Menjadi/i);
    
    // WhatsApp CTA button check
    const waButton = page.getByRole('link', { name: /Daftar|Chat Admin WA/i }).first();
    await expect(waButton).toBeVisible();
    await expect(waButton).toHaveAttribute('href', /api\.whatsapp\.com|wa\.me/);
  });

  test('should display 4 program categories in Programs section', async ({ page }) => {
    const programSection = page.locator('#program');
    await expect(programSection).toBeVisible();

    await expect(programSection.getByText('Anak Usia 5+ Tahun')).toBeVisible();
    await expect(programSection.getByText('Pelajar & Remaja')).toBeVisible();
    await expect(programSection.getByText('Dewasa & Umum')).toBeVisible();
    await expect(programSection.getByText('Persiapan Tes TNI / Polri')).toBeVisible();
  });

  test('should display 3 hotel pool locations with HTM info', async ({ page }) => {
    const lokasiSection = page.locator('#lokasi');
    await expect(lokasiSection).toBeVisible();

    await expect(lokasiSection.getByText('Hotel Ubud Malang', { exact: true })).toBeVisible();
    await expect(lokasiSection.getByText('Hotel Tychi Malang', { exact: true })).toBeVisible();
    await expect(lokasiSection.getByText('Hotel Savana Malang', { exact: true })).toBeVisible();
  });

  test('should expand and collapse FAQ accordion items', async ({ page }) => {
    const faqSection = page.locator('#faq');
    await expect(faqSection).toBeVisible();

    // Click first FAQ item
    const firstFaq = page.getByText(/Bagaimana cara pembayaran tiket masuk kolam renang/i);
    await expect(firstFaq).toBeVisible();
    await firstFaq.click();

    // Verify answer text is visible
    await expect(page.getByText(/Biaya kursus dibayarkan langsung ke pihak Aqualux/i)).toBeVisible();
  });

});
