import { test, expect } from '@playwright/test'

for (const viewport of [
  { width: 390, height: 844 },
  { width: 844, height: 390 },
  { width: 1280, height: 800 },
]) {
  for (const theme of ['dark', 'light', 'e-ink-light', 'e-ink-dark']) {
    test(`${viewport.width}x${viewport.height} ${theme}`, async ({ page }) => {
      await page.setViewportSize(viewport)
      await page.addInitScript((theme) => {
        localStorage.setItem('alllinks:theme', theme)
        if (!localStorage.getItem('alllinks:language')) localStorage.setItem('alllinks:language', 'en')
      }, theme)
      const externalRequests: string[] = []
      page.on('request', (request) => {
        if (!request.url().startsWith('http://127.0.0.1:4173/') && /^https?:/.test(request.url()))
          externalRequests.push(request.url())
      })
      await page.goto('./')
      await expect(page.locator('.link-card')).toHaveCount(6)
      await expect(page.locator('html')).toHaveAttribute('data-theme', theme)
      await expect(page.locator('html')).toHaveAttribute('data-motion', theme.startsWith('e-ink') ? 'none' : 'normal')
      await expect(page.locator('#filter-all-btn')).toHaveAttribute('aria-pressed', 'true')
      await expect(page.locator('#filter-all-btn')).toHaveCSS('height', '24px')
      if (theme.startsWith('e-ink')) {
        await expect(page.locator('.all-filter-indicator')).toBeHidden()
        await expect(page.locator('#filter-all-btn')).toHaveCSS(
          'background-color',
          theme === 'e-ink-dark' ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)',
        )
        await expect(page.locator('#filter-all-btn .all-filter-count')).toHaveCSS(
          'color',
          theme === 'e-ink-dark' ? 'rgb(0, 0, 0)' : 'rgb(255, 255, 255)',
        )
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
      expect(await page.evaluate(() => getComputedStyle(document.body).backgroundColor)).toBe(
        {
          dark: 'rgb(10, 10, 10)',
          light: 'rgb(248, 250, 252)',
          'e-ink-light': 'rgb(255, 255, 255)',
          'e-ink-dark': 'rgb(0, 0, 0)',
        }[theme],
      )
      await page.locator('#header-menu-toggle').click()
      await page.locator('#lang-btn-pl').click()
      await expect(page.locator('html')).toHaveAttribute('lang', 'pl')
      await page.keyboard.press('Escape')
      await expect(page.getByRole('dialog')).toHaveCount(0)
      await page.locator('#filter-projects-btn').focus()
      await page.keyboard.press('Enter')
      await expect(page.locator('.link-card')).toHaveCount(2)
      await expect(page.locator('#filter-projects-btn')).toHaveAttribute('aria-pressed', 'true')
      await page.locator('#filter-all-btn').focus()
      await page.keyboard.press('Space')
      await expect(page.locator('.link-card')).toHaveCount(6)
      await expect(page.locator('#filter-all-btn')).toHaveAttribute('aria-pressed', 'true')
      await page.reload()
      await expect(page.locator('html')).toHaveAttribute('lang', 'pl')
      expect(externalRequests).toEqual([])
    })
  }
}

test('reduced motion keeps cards static and keyboard navigation usable', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('./')
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'none')
  await expect(page.locator('.all-filter-indicator')).toHaveCount(0)
  await page.locator('#filter-projects-btn').focus()
  await page.keyboard.press('Enter')
  await expect(page.locator('.link-card')).toHaveCount(2)
  const card = page.locator('#link-card-allgames')
  await card.hover()
  await expect(card).toHaveCSS('transform', 'none')
  await page.locator('#header-menu-toggle').focus()
  await page.keyboard.press('Enter')
  await expect(page.getByRole('dialog')).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog')).toHaveCount(0)
})
