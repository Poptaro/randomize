import { serialize } from 'cookie'

export async function POST() {
  return new Response(JSON.stringify({ message: "Logged out and removed cookie from browser "}), {
    status: 200,
    headers: {
      'Set-cookie': serialize('token', '', {
        httpOnly: true,
        path: '/',
        maxAge: 0,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
      }),
      'Content-Type': 'application/json'
    }
  })
}