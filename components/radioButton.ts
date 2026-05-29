import { Locator } from '@playwright/test'

export class RadioButton {
  locator: Locator

  constructor(locator: Locator) {
    this.locator = locator
  }

  async on() {
    await this.locator.check()
  }

  async off() {
    await this.locator.uncheck()
  }

  async getValue() {
   return await this.locator.isChecked()
  }
}
