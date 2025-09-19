const { withBlitz } = require("@blitzjs/next")

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
  images: {
    domains: ["images.builderservices.io", "d33wubrfki0l68.cloudfront.net", "cdn.rareblocks.xyz", "imgs.search.brave.com"],
  },
}

module.exports = withBlitz(nextConfig)
