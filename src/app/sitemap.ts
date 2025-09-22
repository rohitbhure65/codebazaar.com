import { MetadataRoute } from "next"
import db from "db"
import { WEBSITE_URL } from "@/lib/constants"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = `${WEBSITE_URL}`
  const currentDate = new Date()
  // type SitemapFile = Array<{
  //     url: string;
  //     lastModified?: string | Date;
  //     changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  //     priority?: number;
  //     alternates?: {
  //         languages?: Languages<string>;
  //     };
  // }>;
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
      where: { isApproved: true, visibility: "PUBLIC" },
      select: { slug: true, updatedAt: true },
      orderBy: { updatedAt: "desc" },
    })

    const projectPages: MetadataRoute.Sitemap = projects.map((project) => ({
      url: `${baseUrl}/projects/${project.slug}`,
      lastModified: project.updatedAt ?? currentDate,
      changeFrequency: "always",
      priority: 0.7,
    }))

    return [...staticPages, ...projectPages]
  } catch (error) {
    console.error("Error generating sitemap:", error)
    return staticPages
  }
}
