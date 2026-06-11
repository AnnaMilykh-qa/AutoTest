import { Locator } from '@playwright/test'

export class CreateButton {
  locator: Locator

  constructor(locator: Locator) {
    this.locator = locator
  }

  async click() {
    await this.locator.click()
  }

  async isVisible() {
    return await this.locator.isVisible()
  }
}
