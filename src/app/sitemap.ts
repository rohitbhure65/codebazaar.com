import { MetadataRoute } from "next"
import db from "db"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://codebazaar.com"
  const currentDate = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "hourly",
      priority: 1,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.8,
    },
  ]

  try {
    const projects = await db.project.findMany({
      where: { isApproved: true, visibility: "public" },
      select: { slug: true, updatedAt: true },
      orderBy: { updatedAt: "desc" },
    })

    const projectPages: MetadataRoute.Sitemap = projects.map((project) => ({
      url: `${baseUrl}/projects/${project.slug}`,
      lastModified: project.updatedAt ?? currentDate,
      changeFrequency: "weekly",
      priority: 0.7,
    }))

    return [...staticPages, ...projectPages]
  } catch (error) {
    console.error("Error generating sitemap:", error)
    return staticPages
  }
}
