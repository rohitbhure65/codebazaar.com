import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const CreateReview = z.object({
  projectId: z.number(),
  rating: z.number().min(1).max(5),
  comment: z.string().min(1).max(1000),
})

export default resolver.pipe(
  resolver.zod(CreateReview),
  resolver.authorize(),
  async ({ projectId, rating, comment }, ctx) => {
    const userId = ctx.session.userId

    // Check if user has already reviewed this project
    const existingReview = await db.review.findFirst({
      where: {
        projectId,
        userId,
      },
    })

    if (existingReview) {
      throw new Error("You have already reviewed this project")
    }

    // Check if project exists
    const project = await db.project.findUnique({
      where: { id: projectId },
    })

    if (!project) {
      throw new Error("Project not found")
    }

    // Create the review
    const review = await db.review.create({
      data: {
        projectId,
        userId,
        rating,
        comment,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })

    return review
  }
)
