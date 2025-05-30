import { json } from "@sveltejs/kit";
import { db } from "$lib/server/db/index"
import { user } from "$lib/server/db/schema"
import { eq, and } from "drizzle-orm";
import argon2 from "argon2"
import jwt from "jsonwebtoken"
import { env } from '$env/dynamic/private';
import { serialize } from 'cookie'
import {fail, redirect, type Actions } from "@sveltejs/kit";
import { goto } from "$app/navigation";

export const actions: Actions = {
  default: async ({ request, cookies }) => {
    
    const formData = await request.formData()
    const username = formData.get("username") as string
    const password = formData.get("password") as string
    const confirmPassword = formData.get("confirmPassword") as string
    
    if(!username || !password) {
      return fail(400, { message: "Need to input password or username" })
    }
    if(password !== confirmPassword) {
      return fail(400, { message: "Passwords do not match"})
    }
    const privateKey = env.JWT_SECRET
    if(!privateKey) {
      throw fail(500, { message: "Failed to acquire ENV JWT Key"})
    }
    
    const foundUser = await db
    .select()
    .from(user)
    .where(eq(user.username, username))
    .get()
    
    if(foundUser) {
      return fail(409, { message: "Username/User already exists"})
    }
    try {
      const hashedPassword = await argon2.hash(password)
      if(!hashedPassword) {
        throw new Error("Failed to hash password")
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
      
      cookies.set('token', token, {
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60 * 24,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production'
      })

      return ({ message: "Successfully created an account"})
      
    } catch(err) {
      if(err instanceof Error) {
        return fail(500, { message: err.message})
      }
      return fail(500, { message: "Server error occurred. Please try again"})
    }
  }

}