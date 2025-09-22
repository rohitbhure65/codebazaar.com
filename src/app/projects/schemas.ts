import { z } from "zod"

export const CreateProjectSchema = z.object({
  userId: z.number(),
  title: z.string(),
  description: z.string(),
  category: z.preprocess(
    (val) => (typeof val === "string" ? val.split(",").map((s) => s.trim()) : val),
    z.array(z.string()).optional().nullable()
  ),
  tags: z.preprocess(
    (val) => (typeof val === "string" ? val.split(",").map((s) => s.trim()) : val),
    z.array(z.string()).optional().nullable()
  ),
  techStack: z.preprocess(
    (val) => (typeof val === "string" ? val.split(",").map((s) => s.trim()) : val),
    z.array(z.string()).optional().nullable()
  ),
  projectImages: z.preprocess(
    (val) => (typeof val === "string" ? val.split(",").map((s) => s.trim()) : val),
    z.array(z.string()).optional().nullable()
  ),
  projectImage: z.string().min(1, "Project image is required"),
  fileUrl: z.string().optional().nullable(),
  videoUrl: z.string().optional().nullable(),
  slug: z.string().min(1, "Slug is required"),
  features: z.string().optional().nullable(),
  requirements: z.string().optional().nullable(),
  price: z.number().min(0).default(0),
  isResellAllowed: z.boolean().default(true),
  isApproved: z.boolean().default(true),
  views: z.number().min(0).default(0),
  downloads: z.number().min(0).default(0),
  version: z.string().default("1.0.0"),
  featured: z.boolean().default(false),
  metaTitle: z.string().optional().nullable(),
  metaDescription: z.string().optional().nullable(),
  metaKeywords: z.string().optional().nullable(),
  robots: z.string().default("index,follow"),
  demoUrl: z.string().optional().nullable(),
  repositoryUrl: z.string().optional().nullable(),
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
