import { HttpLink } from '@apollo/client'
import { NextSSRInMemoryCache, NextSSRApolloClient } from '@apollo/experimental-nextjs-app-support/ssr'
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc'
import { cookies } from 'next/headers'

export const { getClient } = registerApolloClient(() => {
  let authToken = cookies().get('sid')?.value

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link: new HttpLink({
      uri: 'http://localhost:3000/graphql',
      headers: { Cookie: `${authToken ? `sid=${authToken}` : ''}` },
    }),
  })
})
