'use client'

import React, { useState } from 'react'
import { Form, Formik, FormikHelpers } from 'formik'
import { ApolloError } from '@apollo/client'
import { useSignInMutation } from '@/graphql/types_and_hooks'
import { authValidation } from '@/utils/authValidation'
import FormInput from '../forms/FormInput'

interface Props {}
interface FormikValues {
  email: string
  password: string
}

const SignIn: React.FC<Props> = () => {
  const [signIn] = useSignInMutation({
    notifyOnNetworkStatusChange: true,
  })
  const [errMsg, setErrMsg] = useState<string | undefined>()

  const handleSubmit = async (values: FormikValues, actions: FormikHelpers<FormikValues>) => {
    const creds = { ...values }
    actions.resetForm()
    try {
      const { data } = await signIn({
        variables: {
          email: creds.email,
          password: creds.password,
        },
      })
      console.log(data?.signIn?.existingUser)
    } catch (error) {
      setErrMsg((error as ApolloError).message)
      console.log(errMsg)
    }
  }
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={authValidation}
      onSubmit={handleSubmit}
    >
      <div className="loginForm">
        <Form>
          <FormInput name="email" type="email" label="Email" />
          <FormInput name="password" type="password" label="Password" />

          <button className="btn" type="submit">
            Sign In
          </button>
        </Form>
      </div>
    </Formik>
  )
}

export default SignIn
