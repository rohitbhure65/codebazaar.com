import { resolver } from "@blitzjs/rpc"
import db from "db"
import { CreateProjectSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(CreateProjectSchema),
  resolver.authorize(),
  async (input, ctx) => {
    // Ensure user owns the project
    const userId = ctx.session.userId
    const { categoryIds, tagIds, techStackIds, ...projectData } = input

    const data = {
      ...projectData,
      projectImages:
        typeof projectData.projectImages === "string"
          ? (projectData.projectImages as string).split(",").map((s) => s.trim())
          : Array.isArray(projectData.projectImages)
          ? projectData.projectImages
          : [],
    }

    const project = await db.project.create({
      data: {
        ...data as any,
        userId,
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
