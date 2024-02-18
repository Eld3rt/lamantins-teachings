import type { Metadata } from 'next'
import Header from './components/Header'
import { ApolloWrapper } from '../lib/ApolloWrapper'

export const metadata: Metadata = {
  title: 'Lamantins teachings',
}

interface Props {
  children: React.ReactNode
}

const RootLayout: React.FC<Props> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <ApolloWrapper>
          <Header />
          {children}
        </ApolloWrapper>
      </body>
    </html>
  )
}

export default RootLayout
