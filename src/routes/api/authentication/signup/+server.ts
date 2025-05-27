import { json } from "@sveltejs/kit";
import { db } from "$lib/server/db/index"
import { user } from "$lib/server/db/schema"
import { eq, and } from "drizzle-orm";
import argon2 from "argon2"
import jwt from "jsonwebtoken"
import { env } from '$env/dynamic/private';
import { serialize } from 'cookie'

export async function POST({ request }) {
  const { username, password } = await request.json()

  const privateKey = env.JWT_SECRET
  if(!privateKey) {
    return json({
      message: "Failed to fetch JWT Secret Key"
    }, { status: 400})
  }

  const foundUser =  db
    .select()
    .from(user)
    .where(eq(user.username, username))
    .get()

  if(foundUser) {
    return json(
      {
        message: `Username already exists`
      },
      {
        status: 400
      }
    )
  }
  try {
    const hashedPassword = await argon2.hash(password)
    if(!hashedPassword) {
      throw new Error
    }
    const insertedUser = await db
      .insert(user)
      .values({ username, password: hashedPassword })
      .returning()
    const newUser = {
      id: insertedUser[0].id,
      username: insertedUser[0].username
    }
    const token = jwt.sign({ id: newUser.id, username: newUser.username}, privateKey, { algorithm: "HS256"})

    return new Response(JSON.stringify({ newUser }), {
      status: 201,
      headers: {
        'Set-Cookie': serialize('token', token, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24, // 1 Day (24 hours)
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    })
      }
    })
  } catch(err) {
    return json(
      {
        message: "An error has occurred when signing up"
      },
      {
        status: 400
      }
    )
  }

}