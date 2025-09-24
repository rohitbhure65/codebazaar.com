import { z } from "zod"

export const email = z
  .string()
  .email()
  .transform((str) => str.toLowerCase().trim())

export const password = z
  .string()
  .min(10)
  .max(100)
  .transform((str) => str.trim())

export const Signup = z.object({
  email,
  password,
  name: z.string().min(1, "Name is required").optional(),
  dateOfBirth: z.string().optional().refine((val) => {
    if (!val) return true
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/
    return dateRegex.test(val)
  }, "Date of birth must be in YYYY-MM-DD format"),
  address: z.string().optional(),
  age: z.number().min(1).max(150).optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  phone: z.string().min(10, "Phone number must be at least 10 digits").optional(),
  gender: z.enum(["MALE", "FEMALE", "OTHER", ""]).optional(),
  country: z.string().optional(),
  postalCode: z.string().optional(),
  profilePic: z.string().optional(),
  bio: z.string().optional(),
})

export const Login = z.object({
  email,
  password: z.string(),
})

export const ForgotPassword = z.object({
  email,
})

export const ResetPassword = z
  .object({
    password: password,
    passwordConfirmation: password,
    token: z.string().optional(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ["passwordConfirmation"], // set the path of the error
  })

export const ChangePassword = z.object({
  currentPassword: z.string(),
  newPassword: password,
})
