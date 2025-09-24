import db from "db"

export default async function getTags(_: null) {
  const tags = await db.tags.findMany({
    select: { id: true, tag: true },
  })

  return tags
}
