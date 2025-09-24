import { resolver } from "@blitzjs/rpc"
import db from "db"
import { UpdateProjectSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(UpdateProjectSchema),
  resolver.authorize(),
  async ({ id, categoryIds, tagIds, techStackIds, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant

    // First, delete existing category relationships
    await db.projectCategory.deleteMany({
      where: { projectId: id }
    })

    // Delete existing tag relationships
    await db.projectTag.deleteMany({
      where: { projectId: id }
    })

    // Delete existing tech stack relationships
    await db.projectTechStack.deleteMany({
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
        } : undefined,
        ProjectTag: tagIds && tagIds.length > 0 ? {
          create: tagIds.map(tagId => ({
            tagId: tagId
          }))
        } : undefined,
        ProjectTechStack: techStackIds && techStackIds.length > 0 ? {
          create: techStackIds.map(techStackId => ({
            techStackId: techStackId
          }))
        } : undefined
      }
    })

    return project
  }
)
