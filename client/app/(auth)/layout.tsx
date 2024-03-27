import type { Metadata } from 'next'
import SessionProvider from '../providers/SessionProvider'
import { ApolloWrapper } from '../../apollo/ApolloWrapper'

export const metadata: Metadata = {
  title: 'Lamantins teachings',
}

interface Props {
  children: React.ReactNode
}

const RootLayout: React.FC<Props> = async ({ children }) => {
  return (
    <html lang="en">
      <body>
        <ApolloWrapper>
          <SessionProvider>{children}</SessionProvider>
        </ApolloWrapper>
      </body>
    </html>
  )
}

export default RootLayout
