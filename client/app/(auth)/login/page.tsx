import Link from 'next/link'
import SignIn from '../../components/SignIn'

interface Props {}

const Page: React.FC<Props> = () => {
  return (
    <>
      <h1>Login Page</h1>
      <SignIn />
      <Link href="/reset">Reset Password</Link>
    </>
  )
}

export default Page
