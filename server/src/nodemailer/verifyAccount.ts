import Mail from 'nodemailer/lib/mailer'

interface EmailInput {
  name: string
  email: string
  uuid: string
}

export const generateVerificationEmail = (credentials: EmailInput): Mail.Options => ({
  from: 'Test App <test-noreply@application.com>',
  to: credentials.email,
  subject: `Welcome to TestApp, ${credentials.name ?? 'user'}!`,
  html: `<h1> Verify your account!</h1>\
	<p>Please click the link below to verify your account</p>\
	<a href="${process.env.BASE_URL || 'http://localhost:4000'}/user/confirm/${credentials.uuid}">Register Account</a>`,
})
