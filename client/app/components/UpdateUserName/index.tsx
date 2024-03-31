'use client'

import { useState } from 'react'
import { Form, Formik } from 'formik'
import { ApolloError } from '@apollo/client'
import * as Yup from 'yup'
import { useUpdateUserNameMutation } from '@/graphql/generated'
import FormInput from '../forms/FormInput'

interface Props {
  currentName?: string | null
}
interface FormikValues {
  name: string
}

const UpdateUserName: React.FC<Props> = ({ currentName }) => {
  const [updateUserName] = useUpdateUserNameMutation({
    notifyOnNetworkStatusChange: true,
  })
  const [errMsg, setErrMsg] = useState<string | undefined>()
  const [statusMsg, setStatusMsg] = useState<string | undefined>()

  const handleSubmit = async (values: FormikValues) => {
    const { name } = { ...values }
    try {
      const { data } = await updateUserName({
        variables: {
          newName: name,
        },
      })
      setStatusMsg(data?.updateUserName?.message)
      console.log(statusMsg)
    } catch (error) {
      setErrMsg((error as ApolloError).message)
    }
  }

  return (
    <Formik
      initialValues={{ name: currentName || '' }}
      validationSchema={Yup.object({ name: Yup.string().max(200, 'Name too long') })}
      onSubmit={handleSubmit}
    >
      <div className="loginForm">
        <Form>
          <FormInput name="name" type="text" label="Name" placeholder={currentName || ''} />

          <button className="btn" type="submit">
            Save
          </button>
          <p className="status-text">{errMsg}</p>
        </Form>
      </div>
    </Formik>
  )
}

export default UpdateUserName
