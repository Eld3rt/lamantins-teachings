import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import jsonwebtoken from 'jsonwebtoken'
import { ConfirmEmailQuery, ConfirmEmailDocument } from '@/graphql/generated'
import { getClient } from '@/apollo/ApolloClient'

export const GET = async (req: NextRequest) => {
  const key = req.nextUrl.searchParams.get('key')

  const { data } = await getClient().query<ConfirmEmailQuery>({
    query: ConfirmEmailDocument,
    variables: { key },
  })

  if (data.confirmEmail?.user) {
    const secret = process.env.JWT_SECRET || 'lt.secret'
    const authToken = jsonwebtoken.sign(data.confirmEmail.user?.email, secret)
    cookies().set('sid', authToken, {
      maxAge: 60 * 60 * 24 * 7, // One week
    })

    return NextResponse.redirect('http://localhost:4000/user/settings')
  }
}
