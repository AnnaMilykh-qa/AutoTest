// лишний импорт
import test, { expect } from '@playwright/test'
import { LoginPage } from '../pages/loginPage'
import { RegistrationPage } from '../pages/registerPage'
import { faker } from '@faker-js/faker'

// вынести
export type TMonth = [
  'Jan.',
  'Feb.',
  'Mar.',
  'Apr.',
  'May',
  'June',
  'July',
  'Aug.',
  'Sep.',
  'Oct.',
  'Nov.',
  'Dec.',
]

// починить
test('User can log in with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page)
  // в .env
  await loginPage.login('administrator', 'administrator')
  await loginPage.checkLogin()
})

// перенести вдругой файл
test.skip('User can register a new account', async ({ page }) => {
  const registerPage = new RegistrationPage(page)
  const userName = faker.internet.username().replace('.', '')
  const genders: ['Male', 'Female', 'Other'] = ['Male', 'Female', 'Other']
  const month: TMonth = [
    'Jan.',
    'Feb.',
    'Mar.',
    'Apr.',
    'May',
    'June',
    'July',
    'Aug.',
    'Sep.',
    'Oct.',
    'Nov.',
    'Dec.',
  ]

  //вынести подготовку данных
  await registerPage.fillRegistrationForm(
    faker.person.firstName(),
    faker.person.lastName(),
    faker.internet.email(),
    userName,
    faker.internet.password(),
    faker.helpers.arrayElement(month),
    faker.number.int({ min: 1970, max: 2005 }).toString(),
    faker.number.int({ min: 1, max: 29 }).toString(),
    faker.helpers.arrayElement(genders)
  )
})
