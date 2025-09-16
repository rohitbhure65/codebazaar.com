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
          ? input.category.split(",").map((s) => s.trim())
          : input.category,
      techStack:
        typeof input.techStack === "string"
          ? input.techStack.split(",").map((s) => s.trim())
          : input.techStack,
      tags:
        typeof input.tags === "string" ? input.tags.split(",").map((s) => s.trim()) : input.tags,
    }
    const project = await db.project.create({ data })

    return project
  }
)
