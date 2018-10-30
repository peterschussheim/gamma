import * as Yup from 'yup'

const minEmailLength = 'email must be at least 6 characters'
const minPasswordLength = 'password must be at least 5 characters'
const invalidEmail = 'Email invalid'

const validEmail = Yup.string()
  .min(6, minEmailLength)
  .max(255)
  .email(invalidEmail)
  .required()

const validPassword = Yup.string()
  .min(5, minPasswordLength)
  .max(255)
  .required()

export const validRegistrationSchema = Yup.object().shape({
  email: validEmail,
  password: validPassword
})

export const validLoginSchema = Yup.object().shape({
  email: validEmail,
  password: validPassword
})
