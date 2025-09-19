import { MetadataRoute } from "next";
import { invoke } from "src/app/blitz-server";
import getProjects from "src/app/projects/queries/getProjects";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://codebazaar.com";
  const currentDate = new Date();

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
  ];

  // try {
  //   const projects = await invoke(getProjects, {});

  //   const projectPages: MetadataRoute.Sitemap = projects.map(
  //     (project: { slug: string; updatedAt?: string | Date }) => ({
  //       url: `${baseUrl}/projects/${project.slug}`,
  //       lastModified: project.updatedAt
  //         ? new Date(project.updatedAt)
  //         : currentDate,
  //       changeFrequency: "weekly",
  //       priority: 0.7,
  //     })
  //   );

    return [
      ...staticPages,
      // ...projectPages
      ];
  // } catch (error) {
  //   console.error("Error generating sitemap:", error);
  //   return staticPages;
  // }
}
