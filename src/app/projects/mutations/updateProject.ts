import { resolver } from "@blitzjs/rpc"
import db from "db"
import { UpdateProjectSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(UpdateProjectSchema),
  resolver.authorize(),
  async ({ id, categoryIds, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant

    // First, delete existing category relationships
    await db.projectCategory.deleteMany({
      where: { projectId: id }
    })

    // Then update the project with new data
    const project = await db.project.update({
      where: { id },
      data: {
        ...data as any,
        ProjectCategory: categoryIds && categoryIds.length > 0 ? {
          create: categoryIds.map(categoryId => ({
            categoryId: categoryId
          }))
        } : undefined
      }
    })

    return project
  }
)
