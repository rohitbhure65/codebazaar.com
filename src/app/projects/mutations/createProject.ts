import { resolver } from "@blitzjs/rpc";
import db from "db";
import { CreateProjectSchema } from "../schemas";

export default resolver.pipe(
  resolver.zod(CreateProjectSchema),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const data = {
      ...input,
      techStack: typeof input.techStack === 'string' ? input.techStack.split(',').map(s => s.trim()) : input.techStack,
    };
    const project = await db.project.create({ data });

    return project;
  }
);
