import { resolver } from "@blitzjs/rpc"
import db from "db"
import { CreateProjectSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(CreateProjectSchema),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const data = {
      ...input,
      category:
        typeof input.category === "string"
          ? (input.category as string).split(",").map((s) => s.trim())
          : Array.isArray(input.category)
            ? input.category
            : [],
      techStack:
        typeof input.techStack === "string"
          ? (input.techStack as string).split(",").map((s: string) => s.trim())
          : Array.isArray(input.techStack)
            ? input.techStack as string[]
            : [],
      tags:
        typeof input.tags === "string"
          ? (input.tags as string).split(",").map((s) => s.trim())
          : Array.isArray(input.tags)
            ? input.tags as string[]
            : [],
    }
    const project = await db.project.create({ data })

    return project
  }
)
