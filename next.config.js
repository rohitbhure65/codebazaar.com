const { withBlitz } = require("@blitzjs/next")

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
  images: {
    remotePatterns: [
      { hostname: "images.builderservices.io" },
      { hostname: "d33wubrfki0l68.cloudfront.net" },
      { hostname: "cdn.rareblocks.xyz" },
      { hostname: "imgs.search.brave.com" },
    ],
  },
}

module.exports = withBlitz(nextConfig)
