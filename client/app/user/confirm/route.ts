import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import jsonwebtoken from 'jsonwebtoken'
import { ConfirmAccountQuery, ConfirmAccountDocument } from '@/graphql/generated'
import { getClient } from '@/apollo/ApolloClient'

export const GET = async (req: NextRequest) => {
  const key = req.nextUrl.searchParams.get('key')

  const { data } = await getClient().query<ConfirmAccountQuery>({
    query: ConfirmAccountDocument,
    variables: { key },
  })

  if (data.confirmAccount) {
    const secret = process.env.JWT_SECRET || 'lt.secret'
    const authToken = jsonwebtoken.sign(data.confirmAccount.user.email, secret)
    cookies().set('sid', authToken, {
      maxAge: 60 * 60 * 24 * 7, // One week
    })

    return NextResponse.redirect(`http://localhost:4000${data.confirmAccount?.path ?? ''}`)
  }
}