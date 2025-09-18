import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api"], // block private routes
      },
    ],
    sitemap: "http://localhost:3000/sitemap.xml",
    host: "http://localhost:3000",
  };
}
