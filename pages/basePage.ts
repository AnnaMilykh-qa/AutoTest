import { expect, Page } from '@playwright/test'

export class BasePage {
  page: Page

  constructor(page: Page) {
    this.page = page
  }

  async open(url: string) {
    await this.page.goto(url)
    await expect(this.page).toHaveURL(url)
  }
}
