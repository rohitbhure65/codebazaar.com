import db from "db"

export default async function getCategory(_: null) {
  const category = await db.category.findMany({
    select: { id: true, category: true },
  })

  return category
}
