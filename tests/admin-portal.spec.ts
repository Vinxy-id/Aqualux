import { test, expect } from '@playwright/test';

test.describe('Aqualux Admin Portal E2E Tests', () => {

  test('should display login form when navigating to #admin', async ({ page }) => {
    await page.goto('/#admin');
    await expect(page.getByRole('heading', { name: /Portal Admin Aqualux/i })).toBeVisible();
    await expect(page.getByPlaceholder('Masukkan password admin...')).toBeVisible();
  });

  test('should show error message when entering wrong password', async ({ page }) => {
    await page.goto('/#admin');
    await page.getByPlaceholder('Masukkan password admin...').fill('wrongpass123');
    await page.getByRole('button', { name: /Masuk ke Dashboard Admin/i }).click();

    await expect(page.getByText('Password admin salah. Silakan coba lagi.')).toBeVisible();
  });

  test('should successfully log in with correct password aqualux123', async ({ page }) => {
    await page.goto('/#admin');
    await page.getByPlaceholder('Masukkan password admin...').fill('aqualux123');
    await page.getByRole('button', { name: /Masuk ke Dashboard Admin/i }).click();

    // Verify Admin Portal Sidebar header & tabs
    await expect(page.getByText('AQUALUX Admin Portal').first()).toBeVisible();
    await expect(page.getByRole('button', { name: /1\. Tempat & HTM Kolam/i }).first()).toBeVisible();
  });

  test('should navigate between Sidebar tabs including Link-in-Bio', async ({ page }) => {
    await page.goto('/#admin');
    await page.getByPlaceholder('Masukkan password admin...').fill('aqualux123');
    await page.getByRole('button', { name: /Masuk ke Dashboard Admin/i }).click();

    // Tab 2: Harga Paket Les
    await page.getByRole('button', { name: /2\. Harga Paket Les/i }).first().click();
    await expect(page.getByText(/Paket Privat \(1 Pelatih : 1 Peserta\)/i).first()).toBeVisible();

    // Tab 3: Kontak WA Admin
    await page.getByRole('button', { name: /3\. Kontak WA Admin/i }).first().click();
    await expect(page.getByText(/Nomor WA Admin 1/i).first()).toBeVisible();

    // Tab 4: Kelola Link-in-Bio
    await page.getByRole('button', { name: /4\. Kelola Link-in-Bio/i }).first().click();
    await expect(page.getByText(/Profil & Informasi Akun Bio/i).first()).toBeVisible();

    // Tab 5: Ganti Password
    await page.getByRole('button', { name: /5\. Ganti Password/i }).first().click();
    await expect(page.getByRole('button', { name: /Simpan Password Baru/i })).toBeVisible();
  });

  test('should update WhatsApp contact number and trigger realtime save toast', async ({ page }) => {
    await page.goto('/#admin');
    await page.getByPlaceholder('Masukkan password admin...').fill('aqualux123');
    await page.getByRole('button', { name: /Masuk ke Dashboard Admin/i }).click();

    // Open Kontak WA Admin tab
    await page.getByRole('button', { name: /3\. Kontak WA Admin/i }).first().click();

    // Change phone input
    const input = page.locator('input[value="082142698440"]');
    await input.fill('082142698449');

    // Verify save toast appears
    await expect(page.getByText(/Perubahan data berhasil disimpan/i)).toBeVisible();
  });

  test('should logout successfully', async ({ page }) => {
    await page.goto('/#admin');
    await page.getByPlaceholder('Masukkan password admin...').fill('aqualux123');
    await page.getByRole('button', { name: /Masuk ke Dashboard Admin/i }).click();

    // Click Logout button
    await page.getByRole('button', { name: /Keluar/i }).first().click();

    // Verify back to login page
    await expect(page.getByRole('heading', { name: /Portal Admin Aqualux/i })).toBeVisible();
  });

});
