'use client'

import { useState } from 'react'
import { Form, Formik, FormikHelpers } from 'formik'
import { ApolloError } from '@apollo/client'
import * as Yup from 'yup'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useConfirmPasswordMutation } from '@/graphql/generated'
import FormInput from '../forms/FormInput'

interface Props {}
interface FormikValues {
  password: string
}

const ConfirmPassword: React.FC<Props> = () => {
  const searchParams = useSearchParams()
  const key = searchParams.get('key')
  const router = useRouter()
  const [confirmPassword] = useConfirmPasswordMutation({
    notifyOnNetworkStatusChange: true,
  })
  const [errMsg, setErrMsg] = useState<string | undefined>()
  const [statusMsg, setStatusMsg] = useState<string | undefined>()

  const handleSubmit = async (values: FormikValues, actions: FormikHelpers<FormikValues>) => {
    const { password } = { ...values }
    actions.resetForm()
    try {
      if (!key) return null
      const { data } = await confirmPassword({
        variables: {
          key: key,
          password: password,
        },
      })
      router.push('/login')
      setStatusMsg(data?.confirmPassword?.message)
      console.log(statusMsg)
    } catch (error) {
      setErrMsg((error as ApolloError).message)
    }
  }

  return (
    <Formik
      initialValues={{
        password: '',
      }}
      validationSchema={Yup.object({
        password: Yup.string().min(6, 'Password too short').max(200, 'Password too long'),
      })}
      onSubmit={handleSubmit}
    >
      <div className="confirmPasswordForm">
        <Form>
          <FormInput name="password" type="password" label="New password" />

          <button className="btn" type="submit">
            Save New Password
          </button>
          <p className="status-text">{errMsg}</p>
        </Form>
      </div>
    </Formik>
  )
}

export default ConfirmPassword
