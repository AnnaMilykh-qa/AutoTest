import { expect, Locator } from '@playwright/test'

export class Input {
  locator: Locator

  constructor(locator: Locator) {
    this.locator = locator
  }

  async fill(value: string) {
    await this.locator.fill(value)
    await this.verify(value)

  }

  async getValue() {
    return await this.locator.inputValue()
  }

  async verify(expected: string) {
    await expect(this.locator).toHaveValue(expected)
  }

}