import { createError } from 'apollo-errors'

const errors = {
  auth: {
    emailInUse: {
      message: 'The email address you entered is already in use.',
      code: 100
    },
    invalidEmailFormat: {
      message: 'Email provided does not match expected pattern.',
      code: 101
    },
    accountNotFound: {
      message:
        'Account does not exist. Check credentials or create new account.',
      code: 102
    },
    confirmEmail: {
      message: 'You must verify your email address before using a new account.',
      code: 103
    },
    confirmationTokenExpired: {
      message:
        'Email confirmation token expired.  Please contact admin for help.',
      code: 104
    },
    pwResetTokenExpired: {
      message: 'PW reset token expired.  Please contact admin for help.',
      code: 105
    }
  },
  postNotFound: {
    message: 'Post does not exist.',
    code: 200
  }
}

export const EmailInUseError = createError('EmailInUse', {
  message: errors.auth.emailInUse.message,
  data: { code: errors.auth.emailInUse.code }
})

export const InvalidEmailFormatError = createError('InvalidEmailFormat', {
  message: errors.auth.invalidEmailFormat.message,
  data: { code: errors.auth.invalidEmailFormat.code }
})

export const AccountNotFoundError = createError('AccountNotFound', {
  message: errors.auth.accountNotFound.message,
  data: { code: errors.auth.accountNotFound.code }
})

export const ConfirmEmailError = createError('ConfirmEmail', {
  message: errors.auth.confirmEmail.message,
  data: { code: errors.auth.confirmEmail.code }
})

export const ConfirmationTokenExpiredError = createError(
  'ConfirmationTokenExpired',
  {
    message: errors.auth.confirmationTokenExpired.message,
    data: { code: errors.auth.confirmationTokenExpired.code }
  }
)

export const PwResetTokenExpiredError = createError('PwResetTokenExpired', {
  message: errors.auth.pwResetTokenExpired.message,
  data: { code: errors.auth.pwResetTokenExpired.code }
})

export const PostNotFoundError = createError('PostNotFound', {
  message: errors.postNotFound.message,
  data: { code: errors.postNotFound.code }
})
