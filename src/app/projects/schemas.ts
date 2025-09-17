import { z } from "zod";

export const CreateProjectSchema = z.object({
  userId: z.number(),
  title: z.string(),
  description: z.string(),
  category: z.preprocess((val) =>
    typeof val === "string" ? val.split(",").map(s => s.trim()) : val,
    z.array(z.string())
  ),
  tags: z.preprocess((val) =>
    typeof val === "string" ? val.split(",").map(s => s.trim()) : val,
    z.array(z.string())
  ),
  techStack: z.preprocess((val) =>
    typeof val === "string" ? val.split(",").map(s => s.trim()) : val,
    z.array(z.string())
  ),
  projectImages: z.preprocess((val) =>
    typeof val === "string" ? val.split(",").map(s => s.trim()) : val,
    z.array(z.string())
  ),
  fileUrl: z.string(),
  slug: z.string(),
  price: z.number(),
  isResellAllowed: z.boolean().default(true),
  isApproved: z.boolean().default(true),
  views: z.number().default(0),
  downloads: z.number().default(0),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  metaKeywords: z.string().optional(),
  ogTitle: z.string().optional(),
  ogDescription: z.string().optional(),
  ogImage: z.string().optional(),
  twitterTitle: z.string().optional(),
  twitterDescription: z.string().optional(),
  twitterImage: z.string().optional(),
  canonicalUrl: z.string().optional(),
  robots: z.string().optional(),
  demoUrl: z.string().optional(),
  repositoryUrl: z.string().optional(),
  visibility: z.string().default("public"),
});

export const UpdateProjectSchema = CreateProjectSchema.merge(
  z.object({
    slug: z.string(),
    userId: z.number(),
  })
);

export const DeleteProjectSchema = z.object({
  slug: z.string(),
});
