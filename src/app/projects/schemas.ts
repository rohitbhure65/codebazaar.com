import { z } from "zod";

export const CreateProjectSchema = z.object({
  userId: z.number(),
  title: z.string(),
  description: z.string(),
  category: z.preprocess((val) => typeof val === 'string' ? val.split(',').map(s => s.trim()) : val, z.array(z.string())),
  tags: z.preprocess((val) => typeof val === 'string' ? val.split(',').map(s => s.trim()) : val, z.array(z.string())),
  techStack: z.preprocess((val) => typeof val === 'string' ? val.split(',').map(s => s.trim()) : val, z.array(z.string())),
  projectImages: z.preprocess((val) => typeof val === 'string' ? val.split(',').map(s => s.trim()) : val, z.array(z.string())),
  fileUrl: z.string(),
  slug: z.string(),
  price: z.number(),
  isResellAllowed: z.boolean().default(true),
  isApproved: z.boolean().default(true),
  // template: __fieldName__: z.__zodType__(),
});
export const UpdateProjectSchema = CreateProjectSchema.merge(
  z.object({
    id: z.number(),
    userId: z.number(),
  })
);

export const DeleteProjectSchema = z.object({
  id: z.number(),
});
