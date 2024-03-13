'use client'

import React, { useState } from 'react'
import { Form, Formik, FormikHelpers } from 'formik'
import { ApolloError } from '@apollo/client'
import { usePathname } from 'next/navigation'
import { useSignUpMutation } from '@/graphql/generated'
import { authValidation } from '@/utils/authValidation'
import FormInput from '../forms/FormInput'

interface Props {}
interface FormikValues {
  name: string
  email: string
  password: string
}

const SignUp: React.FC<Props> = () => {
  const [signUp] = useSignUpMutation({
    // notifyOnNetworkStatusChange: true,
  })
  const [errMsg, setErrMsg] = useState<string | undefined>()
  const [statusMsg, setStatusMsg] = useState<string | undefined>()
  const path = usePathname()

  const handleSubmit = async (values: FormikValues, actions: FormikHelpers<FormikValues>) => {
    const creds = { ...values }
    actions.resetForm()
    try {
      const { data } = await signUp({
        variables: {
          name: creds.name,
          email: creds.email,
          password: creds.password,
          path: path,
        },
      })
      setStatusMsg(data?.signUp?.message)
      console.log(statusMsg)
    } catch (error) {
      setErrMsg((error as ApolloError).message)
      console.log(errMsg)
    }
  }
  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
      }}
      validationSchema={authValidation}
      onSubmit={handleSubmit}
    >
      <div className="loginForm">
        <Form>
          <FormInput name="name" type="text" label="Name" />
          <FormInput name="email" type="email" label="Email" />
          <FormInput name="password" type="password" label="Password" />

          <button className="btn" type="submit">
            Sign Up
          </button>
        </Form>
      </div>
    </Formik>
  )
}

export default SignUp
