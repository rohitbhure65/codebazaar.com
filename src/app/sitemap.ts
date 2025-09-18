import { MetadataRoute } from "next";

// Example: dynamic sitemap
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "http://localhost:3000"; // change to your domain

  // Example: Fetch all projects
  const projects = await fetch(`${baseUrl}/api/projects`).then(res => res.json());

  const projectUrls = projects.map((project: any) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: project.updatedAt ? new Date(project.updatedAt) : new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...projectUrls,
  ];
}
