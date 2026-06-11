import { Locator } from '@playwright/test'

export class Checkbox {
  locator: Locator

  constructor(locator: Locator) {
    this.locator = locator
  }

  async check() {
    await this.locator.check()
  }

  async uncheck() {
    await this.locator.uncheck()
  }

  async isChecked() {
    return await this.locator.isChecked()
  }
}
