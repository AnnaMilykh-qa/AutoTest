import { expect, Locator, Page } from '@playwright/test'
// не тот уровень импорта
import { BasePage } from './basePage'

export class LoginPage extends BasePage {
  url = '/login'
  userName: Locator
  password: Locator
  loginButton: Locator
  resetPassword: Locator

  constructor(page: Page) {
    super(page)
    // ниже коммент
    this.userName = this.page.getByRole('textbox', { name: 'username' })
    this.password = this.page.getByRole('textbox', { name: 'password' })
    this.loginButton = this.page.locator('//input[@value="Login"]')
    this.resetPassword = this.page.locator('//a[@class="forgot-link"]')
  }

  async login(username: string, password: string) {
    await this.open(this.url)

    await this.userName.fill(username)
    await this.password.fill(password)
    await this.page.pause()
    await this.loginButton.click()
  }

  // к единой системе в одной page проверка снаружи в другой внутри
  async checkLogin() {
    await expect(this.page, 'Checking URL').toHaveURL('/home')
  }
}

//Для accessible name = "Username" label должен быть связан с input, например так:
//
//   <label for="username">Username</label>
//   <input id="username" name="username">
//
//   или так:
//
//   <label>
//     Username
//     <input name="username">
//   </label>
//
//   На скриншоте label просто стоит рядом:
//
//   <label>Username</label>
//   <input ...>
//
//   Если в реальном DOM нет for/id и input не вложен внутрь label, то getByRole('textbox', { name: 'username' }) может не найти поле. В таком случае надежнее:
//
//   this.userName = this.page.locator('input[name="username"]')
