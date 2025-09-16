import { Ctx } from "blitz"
import db from "db"

export default async function getUsersWithoutProjects(_: null, ctx: Ctx) {
  // Optional: check if user is authenticated or is an admin
  if (!ctx.session.userId) {
    throw new Error("You must be logged in to view users")
  }

  const users = await db.user.findMany({
    where: {
      projects: {
        none: {}
      }
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  })

  return users
}
