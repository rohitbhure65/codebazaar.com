"use client"
import { useQuery } from "@blitzjs/rpc"
import Link from "next/link"
import getProject from "../queries/getProject"
import { Badge } from "@/components/ui/badge"
import CurrencyRupeeRoundedIcon from "@mui/icons-material/CurrencyRupeeRounded"
import CodeRoundedIcon from "@mui/icons-material/CodeRounded"
import TextSnippetRoundedIcon from "@mui/icons-material/TextSnippetRounded"
import Breadcrumbs from "@mui/material/Breadcrumbs"
import HomeRoundedIcon from "@mui/icons-material/HomeRounded"
import Reviews from "@/components/reviews"
import CloudDownloadRoundedIcon from '@mui/icons-material/CloudDownloadRounded';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import Image from "next/image";
import ProfileCard from "@/components/ProfileCard"
import { WEBSITE_URL, WEBSITE_NAME } from "@/lib/constants"

// Constants
const SCHEMA_CONTEXT = "https://schema.org/"
const DATE_OPTIONS = {
  year: "numeric",
  month: "long",
  day: "numeric",
} as const

// Types
interface ProjectProps {
  projectSlug: string
}

interface SchemaItem {
  "@type": string
  position: number
  name: string
  item: string
}

// Helper Components
const StatItem = ({ icon: Icon, label, value, href }: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string | number
  href?: string
}) => (
  <div className="flex items-center space-x-2 text-sm">
    <Icon className="w-4 h-4 text-gray-500" />
    <span className="text-gray-600 dark:text-gray-400">
      {label}:
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-1 underline hover:text-gray-800 dark:hover:text-gray-200 font-light"
        >
          {value}
        </a>
      ) : (
        <span className="ml-1 font-medium text-gray-800 dark:text-gray-200">
          {value}
        </span>
      )}
    </span>
  </div>
)

const PriceDisplay = ({ price }: { price: number }) => {
  if (price === 0) {
    return (
      <button
        type="button"
        className="flex items-center gap-3 px-4 py-2 bg-red-600 text-white font-bold rounded-full shadow-lg hover:scale-105 transform transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-300"
      >
        <span className="animate-pulse">Free</span>
        <span className="relative flex h-4 w-4">
          <span className="absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-50 animate-[ping_1.5s_linear_infinite]"></span>
          <span className="relative inline-flex h-4 w-4 rounded-full bg-red-500 shadow-md"></span>
        </span>
      </button>
    )
  }

  return (
    <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-full shadow-md text-gray-900 dark:text-gray-100">
      <CurrencyRupeeRoundedIcon className="text-gray-700 dark:text-gray-300" />
      {price.toLocaleString()}
    </div>
  )
}

const TagSection = ({
  icon: Icon,
  label,
  items
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  items: Array<{ tag?: { id: number; tag: string }; techstack?: { id: number; techstack: string }; category?: string }>
}) => {
  if (!items || items.length === 0) return null

  return (
    <p className="text-gray-700 dark:text-gray-300">
      <span className="flex flex-wrap gap-2">
        <Icon />
        <span className="text-sm font-bold">{label}</span>:
        {items.map((item, index) => (
          <Badge key={index} variant="outline">
            {item.tag?.tag || item.techstack?.techstack || item.category}
          </Badge>
        ))}
      </span>
    </p>
  )
}

const ContentSection = ({
  icon: Icon,
  title,
  content
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  content: string
}) => {
  if (!content) return null

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md mt-5 p-6 border border-gray-200 dark:border-gray-600">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
        <Icon /> {title}
      </h3>
      <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{content}</p>
    </div>
  )
}

export const Project = ({ projectSlug }: ProjectProps) => {
  const [project] = useQuery(getProject, { slug: projectSlug })

  // Schema Generation
  const breadcrumbSchema = {
    "@context": SCHEMA_CONTEXT,
    "@type": "BreadcrumbList" as const,
    "itemListElement": [
      {
        "@type": "ListItem" as const,
        "position": 1,
        "name": "Home",
        "item": WEBSITE_URL
      },
      {
        "@type": "ListItem" as const,
        "position": 2,
        "name": "projects",
        "item": `${WEBSITE_URL}/projects/`
      },
      {
        "@type": "ListItem" as const,
        "position": 3,
        "name": project.title,
        "item": `${WEBSITE_URL}/projects/${project.slug}`
      }
    ]
  }

  const projectSchema = {
    "@context": SCHEMA_CONTEXT,
    "@type": "Product" as const,
    "name": project.title,
    "description": project.description,
    "image": project.projectImage,
    "sku": `project-${project.id}`,
    "brand": {
      "@type": "Brand" as const,
      "name": WEBSITE_NAME
    },
    "offers": {
      "@type": "Offer" as const,
      "url": `${WEBSITE_URL}/projects/${project.slug}`,
      "priceCurrency": "INR" as const,
      "priceValidUntil": "2099-12-31",
      "price": project.price,
      "availability": "https://schema.org/InStock" as const,
      "seller": {
        "@type": "Organization" as const,
        "name": WEBSITE_NAME
      },
      "shippingDetails": {
        "@type": "OfferShippingDetails" as const,
        "shippingRate": {
          "@type": "MonetaryAmount" as const,
          "value": "0",
          "currency": "INR"
        },
        "shippingDestination": {
          "@type": "DefinedRegion" as const,
          "addressCountry": "IN"
        },
        "deliveryTime": {
          "@type": "ShippingDeliveryTime" as const,
          "handlingTime": {
            "@type": "QuantitativeValue" as const,
            "minValue": "0",
            "maxValue": "0"
          },
          "transitTime": {
            "@type": "QuantitativeValue" as const,
            "minValue": "0",
            "maxValue": "0"
          }
        }
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating" as const,
      "ratingValue": project._count?.Review > 0 ? '5' : '0',
      "reviewCount": `${project._count?.Review || 0}`,
      "bestRating": "5",
      "worstRating": "4"
    },
  }

  const renderSchemaScript = (schema: object) => (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )

  return (
    <div className="max-w-6xl mx-auto border border-gray-200 dark:border-gray-600 my-10 rounded-md p-6 md:p-10 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {renderSchemaScript(projectSchema)}
      {renderSchemaScript(breadcrumbSchema)}

      {/* Breadcrumbs */}
      <Breadcrumbs aria-label="breadcrumb" className="text-gray-700 dark:text-gray-300 mb-4">
        <Link href="/" className="flex items-center gap-1 font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100">
          <HomeRoundedIcon className="w-4 h-4" />
          Home
        </Link>
        <Link href="/projects" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100">
          Projects
        </Link>
        <span className="text-gray-600 dark:text-gray-400 truncate max-w-[200px]">
          {project.title}
        </span>
      </Breadcrumbs>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Image Section */}
        <div className="lg:w-1/2 relative h-80 md:h-96">
          <Image
            className="rounded-lg"
            src={project.projectImage}
            alt={project.title}
            fill
            style={{ objectFit: 'cover' }}
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        {/* Details Section */}
        <div className="lg:w-1/2 space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold leading-tight">{project.title}</h1>

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <span>Posted {new Date(project.createdAt).toLocaleDateString("en-US", DATE_OPTIONS)}</span>
            <span>|</span>
            <span>Updated {new Date(project.updatedAt).toLocaleDateString("en-US", DATE_OPTIONS)}</span>
            <span>⭐ {project._count?.Review || 0} Reviews</span>
          </div>

          {/* Price */}
          <div className="py-4">
            <PriceDisplay price={project.price} />
          </div>

          {/* Project Details Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Project Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <StatItem
                icon={RemoveRedEyeRoundedIcon}
                label="Views"
                value={project.views || 0}
              />
              <StatItem
                icon={CloudDownloadRoundedIcon}
                label="Downloads"
                value={project.downloads || 0}
              />

              {project.demoUrl && (
                <StatItem
                  icon={RemoveRedEyeRoundedIcon}
                  label="Demo"
                  value="Link"
                  href={project.demoUrl}
                />
              )}

              {project.repositoryUrl && (
                <StatItem
                  icon={CodeRoundedIcon}
                  label="Repository"
                  value="Link"
                  href={project.repositoryUrl}
                />
              )}

              <StatItem
                icon={ArticleRoundedIcon}
                label="Resell Allowed"
                value={project.isResellAllowed ? "Yes" : "No"}
              />

              <StatItem
                icon={ArticleRoundedIcon}
                label="Approved"
                value={project.isApproved ? "Yes" : "No"}
              />

              {project.version && (
                <StatItem
                  icon={ArticleRoundedIcon}
                  label="Version"
                  value={project.version}
                />
              )}

              {project.ProjectCategory?.length > 0 && (
                <div className="md:col-span-2">
                  <StatItem
                    icon={ArticleRoundedIcon}
                    label="Category"
                    value={project.ProjectCategory.map(c => c.category.category).join(", ")}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Tags and Tech Stack */}
          <div className="space-y-4">
            <TagSection
              icon={TextSnippetRoundedIcon}
              label="Tags"
              items={project.ProjectTag || []}
            />
            <TagSection
              icon={CodeRoundedIcon}
              label="Tech Stack"
              items={project.ProjectTechStack || []}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 flex-wrap">
            {project.demoUrl ? (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition inline-flex items-center gap-2"
              >
                <RemoveRedEyeRoundedIcon /> Live Preview
              </a>
            ) : (
              <span className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-400 dark:text-gray-500 cursor-not-allowed inline-flex items-center gap-2">
                <RemoveRedEyeRoundedIcon /> Live Preview
              </span>
            )}

            <Link
              href="#download"
              className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition inline-flex items-center gap-2"
            >
              <CloudDownloadRoundedIcon /> Download Now
            </Link>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <ContentSection
        icon={ArticleRoundedIcon}
        title="Features"
        content={project.features}
      />

      {/* Video Section */}
      {project.videoUrl && (
        <div className="relative w-full pb-[56.25%] mt-5 h-0 overflow-hidden rounded-xl shadow-md">
          <iframe
            src={`https://www.youtube.com/embed/${project.videoUrl.split("youtu.be/")[1]}`}
            title={project.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full"
            loading="lazy"
          />
        </div>
      )}

      <ContentSection
        icon={ArticleRoundedIcon}
        title="Description"
        content={project.description}
      />

      <ContentSection
        icon={ArticleRoundedIcon}
        title="Requirements"
        content={project.requirements}
      />

      {/* User Profile and Reviews */}
      <ProfileCard user={project.user} />
      <Reviews review={project.Review} />
    </div>
  )
}