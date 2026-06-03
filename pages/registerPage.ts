import { expect, Locator, Page } from '@playwright/test'
import { DatePicker } from '../components/datePicker'
import { BasePage } from '../pages/basePage'
import { TMonth } from '../tests/login.spec'
import { RadioButton } from '../components/radioButton'
import { Input } from '../components/input'
import { Checkbox } from '../components/checkbox'

export class RegistrationPage extends BasePage {
  url = 'https://demo.opensource-socialnetwork.org/'

  //page: Page
  //firstName: Locator
  //lastName: Locator
  //email: Locator
  //confirmEmail: Locator
  //username: Locator
  //password: Locator
  //termsCheckbox: Locator
  firstName: Input
  lastName: Input
  email: Input
  confirmEmail: Input
  username: Input
  password: Input
  termsCheckbox: Checkbox

  createAccountButton: Locator
  birthdate: Locator
  datePicker: DatePicker
  genderM: RadioButton
  genderF: RadioButton
  genderO: RadioButton

  registeredCheck: Locator

  constructor(page: Page) {
    super(page)

    //this.firstName = this.page.getByPlaceholder('First Name')
    //this.lastName = this.page.getByPlaceholder('Last Name')
    //this.email = this.page.getByPlaceholder('Email', { exact: true })
    //this.confirmEmail = this.page.getByPlaceholder('Re-enter Email')
    //this.username = this.page.getByPlaceholder('Username')
    //this.password = this.page.getByPlaceholder('Password')
    //this.termsCheckbox = this.page.locator('input[type="checkbox"]')
    this.firstName = new Input(this.page.getByPlaceholder('First Name'))
    this.lastName = new Input(this.page.getByPlaceholder('Last Name'))
    this.email = new Input(this.page.getByPlaceholder('Email', { exact: true }))
    this.confirmEmail = new Input(this.page.getByPlaceholder('Re-enter Email'))
    this.username = new Input(this.page.getByPlaceholder('Username'))
    this.password = new Input(this.page.getByPlaceholder('Password'))
    this.termsCheckbox = new Checkbox(this.page.locator('input[type="checkbox"]'))

    this.birthdate = this.page.getByPlaceholder('Birthdate')
    this.createAccountButton = this.page.getByRole('button', { name: 'Create an account' })

    this.datePicker = new DatePicker(page)

    this.genderM = new RadioButton(this.page.locator('//input[@value="male"]'))
    this.genderF = new RadioButton(this.page.locator('//input[@value="female"]'))
    this.genderO = new RadioButton(this.page.locator('//input[@value="other"]'))

    this.registeredCheck = this.page.getByText('Your account has been registered!')
  }

  async fillRegistrationForm(
    firstName: string,
    lastName: string,
    email: string,
    username: string,
    password: string,
    month: TMonth[number],
    year: string,
    day: string,
    gender: 'Male' | 'Female' | 'Other'
  ) {
    //await this.page.goto(this.url)

    await this.open(this.url)
    await this.firstName.fill(firstName)
    await this.lastName.fill(lastName)
    await this.email.fill(email)
    await this.confirmEmail.fill(email)
    await this.username.fill(username)
    await this.password.fill(password)
    await this.birthdate.click()
    await this.datePicker.selectDate(month, year, day)

    console.log('the gender is', gender)
    switch (gender) {
      case 'Male':
        await this.genderM.on()
        break

      case 'Female':
        await this.genderF.on()
        break

      case 'Other':
        await this.genderO.on()
        break

      default:
        break
    }

    //await this.termsCheckbox.click()
    await this.termsCheckbox.check()

    await this.createAccountButton.click()

    //this.registeredCheck = this.page.getByText('Your account has been registered!')
    await expect(await this.page.getByText('Your account has been registered!')).toBeVisible()
  }
}
