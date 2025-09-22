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
      projectImages:
        typeof input.projectImages === "string"
          ? (input.projectImages as string).split(",").map((s) => s.trim())
          : Array.isArray(input.projectImages)
          ? input.projectImages
          : [],
    }
    const project = await db.project.create({ data: data as any })

    return project
  }
)
