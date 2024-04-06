import Mail from 'nodemailer/lib/mailer'

interface EmailInput {
  name: string | null
  email: string
  uuid: string
}

export const verifyEmail = (credentials: EmailInput): Mail.Options => ({
  from: 'Test App <test-noreply@application.com>',
  to: credentials.email,
  subject: `Welcome to TestApp, ${credentials.name ?? 'user'}!`,
  html: `<h1> Verify your new email!</h1>\
	<p>Please click the link below to update and verify your new email</p>\
	<a href="${process.env.BASE_URL || 'http://localhost:4000'}/user/confirm/email?key=${
    credentials.uuid
  }">Update email</a>`,
})
