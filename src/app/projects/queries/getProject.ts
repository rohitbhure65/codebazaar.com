import { NotFoundError } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const GetProject = z.object({
  slug: z.string().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(
  resolver.zod(GetProject),
  // resolver.authorize(),
  async ({ slug }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const project = await db.project.findFirst({
      where: { slug },
      include: {
        Review: {
          select: {
            createdAt:true,
            rating: true,
            comment: true,
            user: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
        ProjectCategory: { select: { category: { select: { category: true } } } },
        ProjectTag: { select: { tag: { select: { tag: true } } } },
        ProjectTechStack: { select: { techstack: { select: { techstack: true } } } },
        _count: {
          select: {
            Review: true,
          },
        },
      },
    })

    if (!project) throw new NotFoundError()

    return project
  }
)
