import db from "db"

export default async function getTechStack(_: null) {
  const techStacks = await db.techStack.findMany({
    select: { id: true, techstack: true },
  })

  return techStacks
}
