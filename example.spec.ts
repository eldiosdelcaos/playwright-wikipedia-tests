import { test, expect } from '@playwright/test';

const BASE_URL = 'https://es.wikipedia.org';

test.describe('Wikipedia en español', () => {

  test('la página principal carga correctamente', async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page).toHaveTitle(/Wikipedia/);
    await expect(page.locator('#searchInput')).toBeVisible();
  });

  test('buscar un término muestra resultados', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.locator('#searchInput').fill('Patagonia');
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/search|Patagonia/);
    await expect(page.locator('h1')).toBeVisible();
  });

  test('el artículo tiene secciones', async ({ page }) => {
    await page.goto(`${BASE_URL}/wiki/Patagonia`);
    await expect(page.locator('h1')).toContainText('Patagonia');
    const sections = page.locator('h2');
    await expect(sections).not.toHaveCount(0);
  });

  test('los enlaces internos funcionan', async ({ page }) => {
    await page.goto(`${BASE_URL}/wiki/Patagonia`);
    const firstLink = page.locator('#mw-content-text a').first();
    await firstLink.click();
    await expect(page).toHaveURL(/es\.wikipedia\.org/);
  });

});