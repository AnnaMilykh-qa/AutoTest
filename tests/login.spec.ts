import test from '@playwright/test'
import { LoginPage } from '../pages/loginPage'
import { RegistrationPage } from '../pages/registerPage'
import { faker } from '@faker-js/faker'

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

test.skip('login test', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.login('administrator', 'administrator')
  await loginPage.checkLogin()
})

test('register test', async ({ page }) => {
  const registerPage = new RegistrationPage(page)
  const userName = faker.internet.username()
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

test.skip('userName test', async () => {
  const genders = ['Male', 'Female', 'Other']
  const user1 = {
    name: 'Anna',
    lastName: 'Milykh',
  }

  console.log(user1)
  user1.lastName = 'Newone'
  //user1 = 2
  console.log(user1)

  let value = 'qwe'
  console.log(value)
  value = 'ewq'
  console.log(value)

  const gender = faker.helpers.arrayElement(genders)
  console.log(gender)
})
