import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'

export const middleware = async (request: NextRequest) => {
  const authToken = cookies().get('sid')?.value
  const res = await fetch('http://localhost:3000/graphql', {
    method: 'POST',
    headers: {
      Cookie: `${authToken ? `sid=${authToken}` : ''}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: 'query Me { me { id name email }}',
    }),
  })

  const {
    data: { me },
  } = await res.json()

  const isLoggedIn = !!me

  if (isLoggedIn) {
    return NextResponse.next()
  }

  return NextResponse.redirect(new URL('/login', request.url))
}

export const config = {
  matcher: '/user/:path*',
}
