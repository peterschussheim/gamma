const debug = require('debug')('api:email')
import * as SparkPost from 'sparkpost'

const client = new SparkPost(process.env.SPARKPOST_API_KEY)

// TODO: add webhook listening for event 'click'
export const sendConfirmationEmail = async (email: string, url: string) => {
  const transmission = {
    options: {
      open_tracking: true,
      click_tracking: true,
      transactional: true
    },
    recipients: [
      {
        address: {
          email
        },
        substitution_data: {
          url
        }
      }
    ],
    content: {
      from: {
        name: 'gamma.app',
        email: 'no-reply@gamma.app'
      },
      subject: 'Confirm Email',
      reply_to: 'Support <support@gamma.app>',
      text:
        'Hi! \nPlease verify your account by clicking the link below:\n{{url}}\nThis link expires in 24 hours',
      html:
        '<p>Hi! \nPlease verify your account by clicking the link below:\n{{url}}\n</p><p>This link expires in 24 hours</p>'
    }
  }

  client.transmissions
    .send(transmission)
    .then(data => {
      console.log('Congrats you can use our client library!')
      console.log(data)
    })
    .catch(err => {
      console.log('Whoops! Something went wrong')
      console.log(err)
    })
}

// Promise
export const sendEmail = async (recipient: string, url: string) => {
  const response = await client.transmissions.send({
    content: {
      from: {
        name: 'gamma.app',
        email: 'no-reply@gamma.app'
      },
      subject: 'Confirm Email',
      html: `<html>
          <body>
          <p>Welcome!  Please verify your account by clicking the link below:</p>
          <a href="${url}">confirm email</a>
          </body>
          </html>`
    },
    recipients: [{ address: { email: recipient } }]
  })
  debug(`SparkPost response: ${response}`)
}
