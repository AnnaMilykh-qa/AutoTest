import { expect, Locator, Page } from '@playwright/test'
import { BasePage } from '../pages/basePage'

export class LoginPage extends BasePage {
  url = process.env.START_URL + 'login'
  userName: Locator
  password: Locator
  loginButton: Locator
  resetPassword: Locator

  constructor(page: Page) {
    super(page)
    this.userName = this.page.getByRole('textbox', { name: 'username' })
    this.password = this.page.getByRole('textbox', { name: 'password' })
    this.loginButton = this.page.locator('//input[@value="Login"]')
    this.resetPassword = this.page.locator('//a[@class="forgot-link"]')
  }

  async login(username: string, password: string) {
    await this.open(this.url)

    await this.userName.fill(username)
    await this.password.fill(password)
    await this.loginButton.click()
  }

  async checkLogin() {
    await expect(this.page, 'Checking URL').toHaveURL(
      'https://demo.opensource-socialnetwork.org/home'
    )
  }
}
