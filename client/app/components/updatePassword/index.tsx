'use client'

import { useState } from 'react'
import { Form, Formik, FormikHelpers } from 'formik'
import { ApolloError } from '@apollo/client'
import * as Yup from 'yup'
import { useUpdatePasswordMutation } from '@/graphql/generated'
import FormInput from '../forms/FormInput'

interface Props {}
interface FormikValues {
  oldPassword: string
  newPassword: string
}

const UpdatePassword: React.FC<Props> = () => {
  const [updatePassword] = useUpdatePasswordMutation({
    notifyOnNetworkStatusChange: true,
  })
  const [errMsg, setErrMsg] = useState<string | undefined>()
  const [statusMsg, setStatusMsg] = useState<string | undefined>()

  const handleSubmit = async (values: FormikValues, actions: FormikHelpers<FormikValues>) => {
    const { oldPassword, newPassword } = { ...values }
    actions.resetForm()
    try {
      const { data } = await updatePassword({
        variables: {
          oldPassword: oldPassword,
          newPassword: newPassword,
        },
      })
      setStatusMsg(data?.updatePassword?.message)
      console.log(statusMsg)
    } catch (error) {
      setErrMsg((error as ApolloError).message)
    }
  }

  return (
    <Formik
      initialValues={{
        oldPassword: '',
        newPassword: '',
      }}
      validationSchema={Yup.object({
        newPassword: Yup.string().min(6, 'Password too short').max(200, 'Password too long'),
      })}
      onSubmit={handleSubmit}
    >
      <div className="loginForm">
        <Form>
          <FormInput name="oldPassword" type="password" label="Old password" />
          <FormInput name="newPassword" type="password" label="New password" />

          <button className="btn" type="submit">
            Save
          </button>
          <p className="status-text">{errMsg}</p>
        </Form>
      </div>
    </Formik>
  )
}

export default UpdatePassword
