import { Locator, Page } from '@playwright/test'

export class DatePicker {
  page: Page
  month: Locator
  year: Locator

  constructor(page: Page) {
    this.page = page
    this.month = this.page.locator('.ui-datepicker-month')
    this.year = this.page.locator('.ui-datepicker-year')
  }

  async selectDate(month: string, year: string, day: string) {
    console.log('The month is ', month)
    await this.month.selectOption({ label: month })
    await this.year.selectOption({ label: year })
    //await this.page.locator(`//a[text()="${day}"]`).click()
    await this.page.getByText(day, {exact:true}).click()
  }
}
