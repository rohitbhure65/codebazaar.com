import { z } from "zod";

export const CreateProjectSchema = z.object({
  userId: z.undefined(),
  title: z.string(),
  description: z.string(),
  category: z.string(),
  techStack: z.string(),
  fileUrl: z.string(),
  price: z.number(),
  isResellAllowed: z.boolean(),
  isApproved: z.boolean(),
  id: z.string(),
  // template: __fieldName__: z.__zodType__(),
});
export const UpdateProjectSchema = CreateProjectSchema.merge(
  z.object({
    id: z.number(),
    userId: z.undefined(),
  })
);

export const DeleteProjectSchema = z.object({
  id: z.number(),
});
