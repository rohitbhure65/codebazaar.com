import { resolver } from "@blitzjs/rpc"
import db from "db"
import { DeleteProjectSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(DeleteProjectSchema),
  resolver.authorize(),
  async ({ id }, ctx) => {
    // Ensure user owns the project
    const userId = ctx.session.userId

    // First, check if the project exists and get its details for better error messages
    const project = await db.project.findFirst({
      where: { id, userId },
      select: {
        id: true,
        title: true,
        _count: {
          select: {
            Review: true,
            ProjectCategory: true,
            ProjectTag: true,
            ProjectTechStack: true,
            SupportTicket: true,
          },
        },
      },
    })

    if (!project) {
      throw new Error(`Project with ID ${id} not found`)
    }

    // Delete the project - CASCADE will handle related records
    const deletedProject = await db.project.delete({
      where: { id, userId },
      select: {
        id: true,
        title: true,
        slug: true,
      },
    })

    return {
      ...deletedProject,
      relatedRecordsDeleted: {
        reviews: project._count.Review,
        categories: project._count.ProjectCategory,
        tags: project._count.ProjectTag,
        techStack: project._count.ProjectTechStack,
        supportTickets: project._count.SupportTicket,
      },
    }
  }
)
