import db from "db"
import { SecurePassword } from "@blitzjs/auth/secure-password"

export default async function signup(input: {
  password: string
  email: string
  name?: string
  dateOfBirth?: string
  address?: string
  age?: number
  city?: string
  state?: string
  phone?: string
  gender?: "MALE" | "FEMALE" | "OTHER" | ""
  country?: string
  postalCode?: string
  profilePic?: string
  bio?: string
}, ctx: any) {
  const blitzContext = ctx
  const hashedPassword = await SecurePassword.hash((input.password as string) || "test-password")
  const email = (input.email as string) || "test" + Math.random() + "@test.com"

  // Create user profile data
  const userProfileData: any = {
    dateOfBirth: input.dateOfBirth ? new Date(input.dateOfBirth) : null,
    address: input.address,
    age: input.age,
    city: input.city,
    state: input.state,
    phone: input.phone,
    gender: input.gender || null,
    country: input.country,
    postalCode: input.postalCode,
    profilePic: input.profilePic,
    bio: input.bio,
    walletBalance: 0, // Default value
  }

  // Create user first
  const user = await db.user.create({
    data: {
      email,
      hashedPassword,
      name: input.name,
    },
  })

  // Create user profile separately with error handling
  let userProfile
  try {
    userProfile = await db.userProfile.create({
      data: {
        ...userProfileData,
        userProfileId: user.id,
      },
    })
  } catch (profileError) {
    // If profile creation fails, delete the user to maintain data integrity
    await db.user.delete({
      where: { id: user.id },
    })
    throw new Error(`Failed to create user profile: ${profileError.message}`)
  }

  await blitzContext.session.$create({
    userId: user.id,
    role: "user",
  })

  return {
    userId: blitzContext.session.userId,
    ...user,
    email: input.email,
    userProfile: userProfile
  }
}
