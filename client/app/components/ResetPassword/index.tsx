'use client'

import { useState } from 'react'
import { Form, Formik, FormikHelpers } from 'formik'
import { ApolloError } from '@apollo/client'
import * as Yup from 'yup'
import Link from 'next/link'
import { useResetPasswordMutation } from '@/graphql/generated'
import FormInput from '../forms/FormInput'

interface Props {}
interface FormikValues {
  email: string
}

const ResetPassword: React.FC<Props> = () => {
  const [resetPassword] = useResetPasswordMutation({
    notifyOnNetworkStatusChange: true,
  })
  const [errMsg, setErrMsg] = useState<string | undefined>()
  const [statusMsg, setStatusMsg] = useState<string | undefined>()

  const handleSubmit = async (values: FormikValues, actions: FormikHelpers<FormikValues>) => {
    const { email } = { ...values }
    actions.resetForm()
    try {
      const { data } = await resetPassword({
        variables: {
          email: email,
        },
      })
      setStatusMsg(data?.resetPassword?.message)
      console.log(statusMsg)
    } catch (error) {
      setErrMsg((error as ApolloError).message)
    }
  }
  return (
    <Formik
      initialValues={{
        email: '',
      }}
      validationSchema={Yup.object({
        email: Yup.string().email('Invalid email'),
      })}
      onSubmit={handleSubmit}
    >
      <div className="resetPasswordForm">
        <Form>
          <FormInput name="email" type="email" label="Email" />

          <button className="btn" type="submit">
            Reset Password
          </button>
          <p className="status-text">{errMsg}</p>
          <Link href={'/login'}>Return to Sign In</Link>
        </Form>
      </div>
    </Formik>
  )
}

export default ResetPassword
