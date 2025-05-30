import { json } from "@sveltejs/kit";
import { db } from "$lib/server/db/index"
import { user } from "$lib/server/db/schema"
import { eq, and } from "drizzle-orm";
import argon2 from "argon2"
import jwt from "jsonwebtoken"
import { env } from '$env/dynamic/private';
import {fail, redirect, type Actions } from "@sveltejs/kit";

export const actions: Actions = {
  default: async ({ request, cookies }) => {
    
    const formData = await request.formData()
    const username = formData.get("username") as string
    const password = formData.get("password") as string
    
    if(!username || !password) {
      return fail(400, { message: "Need to input password or username" })
    }
    const privateKey = env.JWT_SECRET
    if(!privateKey) {
      return fail(500, { message: "Failed to acquire ENV JWT Key"})
    }
    
    const foundUser = await db
    .select()
    .from(user)
    .where(eq(user.username, username))
    .get()
    
    if(!foundUser) {
      return fail(400, { message: `Username does not exist or password is incorrect`})
    }
    try {
      const verifiedPassword = await argon2.verify(foundUser.password, password)
      if(!verifiedPassword) {
        throw new Error("Username or password incorrect")
      }
      
      const token = jwt.sign({ id: foundUser.id, username: foundUser.username}, privateKey, { algorithm: "HS256"})
      
      cookies.set('token', token, {
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60 * 24,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production'
      })

      return ({ message: "Successfully logged in"})
      
    } catch(err) {
      if(err instanceof Error) {
        return fail(500, { message: err.message})
      }
      return fail(500, { message: "Server error occurred. Please try again"})
    }
  }

}