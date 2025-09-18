import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const GetReviews = z.object({
  projectId: z.number(),
  skip: z.number().optional().default(0),
  take: z.number().optional().default(10),
})

export default resolver.pipe(
  resolver.zod(GetReviews),
  async ({ projectId, skip, take }) => {
    const reviews = await db.review.findMany({
      where: { projectId },
       include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    const total = await db.review.count({
      where: { projectId },
    })

    return {
      reviews,
      total,
      hasMore: skip + take < total,
    }
  }
)
