import Mail from 'nodemailer/lib/mailer'

interface EmailInput {
  name: string | null
  email: string
  uuid: string
}

export const verifyAccount = (credentials: EmailInput): Mail.Options => ({
  from: 'Test App <test-noreply@application.com>',
  to: credentials.email,
  subject: `Welcome to TestApp, ${credentials.name ?? 'user'}!`,
  html: `<h1> Verify your account!</h1>\
	<p>Please click the link below to verify your account</p>\
	<a href="${process.env.BASE_URL || 'http://localhost:4000'}/user/confirm/account?key=${
    credentials.uuid
  }">Register Account</a>`,
})
