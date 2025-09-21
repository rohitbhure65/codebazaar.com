import { features } from "process"
import { z } from "zod"

export const CreateProjectSchema = z.object({
  userId: z.number(),
  title: z.string(),
  description: z.string(),
  category: z.preprocess(
    (val) => (typeof val === "string" ? val.split(",").map((s) => s.trim()) : val),
    z.array(z.string())
  ),
  tags: z.preprocess(
    (val) => (typeof val === "string" ? val.split(",").map((s) => s.trim()) : val),
    z.array(z.string())
  ),
  techStack: z.preprocess(
    (val) => (typeof val === "string" ? val.split(",").map((s) => s.trim()) : val),
    z.array(z.string())
  ),
  projectImages: z.preprocess(
    (val) => (typeof val === "string" ? val.split(",").map((s) => s.trim()) : val),
    z.array(z.string())
  ),
  projectImage: z.string(),
  fileUrl: z.string(),
  videoUrl: z.string().default(""),
  slug: z.string(),
  features: z.string(),
  requirements: z.string(),
  price: z.number(),
  isResellAllowed: z.boolean().default(true),
  isApproved: z.boolean().default(true),
  views: z.number().default(0),
  downloads: z.number().default(0),
  version: z.string().default("1.0.0"),
  featured: z.boolean().default(false),
  metaTitle: z.string().default(""),
  metaDescription: z.string().default(""),
  metaKeywords: z.string().default(""),
  robots: z.string().default("index,follow"),
  demoUrl: z.string().default(""),
  repositoryUrl: z.string().default(""),
  visibility: z.string().default("public"),
})

export const UpdateProjectSchema = CreateProjectSchema.merge(
  z.object({
    id: z.number(),
    userId: z.number(),
  })
)

export const DeleteProjectSchema = z.object({
  id: z.number(),
})
