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
      query: 'query Me { me { id }}',
    }),
  })

  const {
    data: { me },
  } = await res.json()

  const isLoggedIn = !!me

  if (isLoggedIn) {
    const isOnUserPath = request.nextUrl.pathname.endsWith('/user')

    if (isOnUserPath) {
      return NextResponse.redirect(new URL('/user/dashboard', request.url))
    }

    return NextResponse.next()
  }

  return NextResponse.redirect(new URL('/login', request.url))
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|login|register|favicon.ico|robots.txt|courses|user/confirm|$).*)'],
}
