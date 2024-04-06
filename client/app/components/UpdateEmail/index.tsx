'use client'

import { useState } from 'react'
import { Form, Formik } from 'formik'
import { ApolloError } from '@apollo/client'
import * as Yup from 'yup'
import { useUpdateEmailMutation } from '@/graphql/generated'
import FormInput from '../forms/FormInput'

interface Props {
  currentEmail: string
}
interface FormikValues {
  email: string
}

const UpdateEmail: React.FC<Props> = ({ currentEmail }) => {
  const [updateEmail] = useUpdateEmailMutation({
    notifyOnNetworkStatusChange: true,
  })
  const [errMsg, setErrMsg] = useState<string | undefined>()
  const [statusMsg, setStatusMsg] = useState<string | undefined>()

  const handleSubmit = async (values: FormikValues) => {
    const { email } = { ...values }
    try {
      const { data } = await updateEmail({
        variables: {
          email: email,
        },
      })
      setStatusMsg(data?.updateEmail?.message)
      console.log(statusMsg)
    } catch (error) {
      setErrMsg((error as ApolloError).message)
    }
  }

  return (
    <Formik
      initialValues={{ email: currentEmail }}
      validationSchema={Yup.object({
        email: Yup.string().required('Email is required').email('Invalid email').max(200, 'Email too long'),
      })}
      onSubmit={handleSubmit}
    >
      <div className="loginForm">
        <Form>
          <FormInput name="email" type="text" label="Name" />

          <button className="btn" type="submit">
            Save
          </button>
          <p className="status-text">{errMsg}</p>
        </Form>
      </div>
    </Formik>
  )
}

export default UpdateEmail
