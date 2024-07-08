"use server";
import bcrypt from "bcrypt";
import { RegisterSchema } from "@/schemas";
import * as z from "zod";
import { db } from "@/lib/db";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }
  const { email, password, name } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  //email not taken
  const existingUser=await db.user.findUnique({
    where:{
        email,
    }
  })
  if (existingUser) {
    return{error:"Email already existing my friend!"}
    
  }
  await db.user.create({
    data:{
        name,
        email,
        password:hashedPassword,
    }
  })


  //todo send verify email!!!

  return { success: "Email sent!" };
};
