import { json } from "@sveltejs/kit";
import { db } from "$lib/server/db/index"
import { user } from "$lib/server/db/schema"
import { eq, and } from "drizzle-orm";
import argon2 from "argon2"
import jwt from "jsonwebtoken"
import { env } from '$env/dynamic/private';

export async function POST({ request }) {
  const { username, password } = await request.json()

  const privateKey = env.JWT_SECRET
  if(!privateKey) {
    return json({
      message: "Failed to fetch JWT Secret Key"
    }, { status: 400})
  }

  const foundUser = db
    .select()
    .from(user)
    .where(eq(user.username, username))
    .get()

  if(!foundUser) {
    return json(
      {
        message: "Failed to find a user with username: ", username
      },
      {
        status: 400
      }
    )
  }

}