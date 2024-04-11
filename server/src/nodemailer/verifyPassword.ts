import Mail from 'nodemailer/lib/mailer'

interface EmailInput {
  name: string | null
  email: string
  uuid: string
}

export const verifyPassword = (credentials: EmailInput): Mail.Options => ({
  from: 'Test App <test-noreply@application.com>',
  to: credentials.email,
  subject: `Welcome to TestApp, ${credentials.name ?? 'user'}!`,
  html: `<h1> Reset your password!</h1>\
	<p>Please click the link below to reset your password</p>\
	<a href="${process.env.BASE_URL || 'http://localhost:4000'}/user/confirm/reset?key=${
    credentials.uuid
  }">Reset password</a>`,
})
