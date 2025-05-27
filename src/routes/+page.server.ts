import jwt from 'jsonwebtoken'
import { env } from '$env/dynamic/private'
import { db } from "$lib/server/db/index"
import { list } from "$lib/server/db/schema"
import { eq } from 'drizzle-orm'

export const load = async ({ cookies }) => {
  const token = cookies.get('token')

  if(!token) {
    return { user: null}
  }
  try {
    const user = jwt.verify(token, env.JWT_SECRET) as { id: number, username: string }
    const lists = await db
      .select()
      .from(list)
      .where(eq(list.userId, user.id))
      .all()
    console.log(lists)
    return { 
      user,
      lists
     }
  } catch(err) {
    return { user: null}
  }
}