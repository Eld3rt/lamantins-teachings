import type { Metadata } from 'next'
import Header from '../components/Header'
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
          <SessionProvider>
            <Header />
            {children}
          </SessionProvider>
        </ApolloWrapper>
      </body>
    </html>
  )
}

export default RootLayout
