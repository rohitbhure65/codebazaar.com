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

export const Project = ({ projectSlug }: { projectSlug: string }) => {
  const [project] = useQuery(getProject, { slug: projectSlug })

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": 'projects',
        "item": `${WEBSITE_URL}/projects/`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": project.title,
        "item": `${WEBSITE_URL}/projects/${project.slug}`
      }
    ]
  };

  const projectSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": project.title,
    "description": project.description,
    "image": project.projectImage,
    "sku": `project-${project.id}`,
    "brand": {
      "@type": "Brand",
      "name": WEBSITE_NAME
    },
    "offers": {
      "@type": "Offer",
      "url": `${WEBSITE_URL}/projects/${project.slug}`,
      "priceCurrency": 'INR',
      "priceValidUntil": "2099-12-31",
      "price": project.price,
      "availability": `https://schema.org/InStock`,
      "seller": {
        "@type": "Organization",
        "name": WEBSITE_NAME
      },
      "shippingDetails": {
        "@type": "OfferShippingDetails",
        "shippingRate": {
          "@type": "MonetaryAmount",
          "value": "0",
          "currency": "INR"
        },
        "shippingDestination": {
          "@type": "DefinedRegion",
          "addressCountry": "IN"
        },
        "deliveryTime": {
          "@type": "ShippingDeliveryTime",
          "handlingTime": {
            "@type": "QuantitativeValue",
            "minValue": "0",
            "maxValue": "0"
          },
          "transitTime": {
            "@type": "QuantitativeValue",
            "minValue": "0",
            "maxValue": "0"
          }
        }
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": project._count?.Review > 0 ? '5' : '0',
      "reviewCount": `${project._count?.Review || 0}`,
      "bestRating": "5",
      "worstRating": "4"
    },
  };
  return (
    <div className="max-w-6xl mx-auto border my-10 rounded-md p-10" >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" href="/">
          <HomeRoundedIcon /> Home
        </Link>
        <Link color="inherit" href="/projects">
          Project
        </Link>
        <Link color="inherit" href={`/projects/${project.slug}`}>
          {project.title}
        </Link>
      </Breadcrumbs>
      <div className="flex flex-col mt-4 md:flex-row gap-8">
        <div className="md:w-1/2 space-y-4 relative h-80 md:h-96">
          <Image
            className="rounded-lg"
            src={project.projectImage}
            alt={project.title}
            fill
            style={{ objectFit: 'cover' }}
            loading="lazy"
          />
        </div>

        <div className="md:w-1/2 space-y-2">
          <h1 className="text-5xl font-bold">{project.title}</h1>

          <div className="flex items-center space-x-2 text-xs text-gray-500">
            <span>
              Posted on
              {new Date(project.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span>
              | Updated on
              {new Date(project.updatedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span>⭐ {project._count?.Review || 0} Reviews</span>
          </div>

          <div className="font-bold py-4 my-4 text-3xl">
            {project.price === 0 ? (
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
            ) : (
              <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full shadow-md text-gray-900">
                <CurrencyRupeeRoundedIcon className="text-gray-700" />
                {project.price.toLocaleString()}
              </div>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Project Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <svg
                  className="w-4 h-4 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                <span className="text-gray-600">
                  Views: <span className="font-medium text-gray-800">{project.views || 0}</span>
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <svg
                  className="w-4 h-4 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <span className="text-gray-600">
                  Downloads:
                  <span className="font-medium ml-1 text-gray-800">{project.downloads || 0}</span>
                </span>
              </div>
              {project.demoUrl && (
                <div className="flex items-center space-x-2">
                  <svg
                    className="w-4 h-4 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                  <span className="text-gray-600">
                    Demo:
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 ml-1 underline hover:text-gray-800 font-light"
                    >
                      Link
                    </a>
                  </span>
                </div>
              )}
              {project.repositoryUrl && (
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  <span className="text-gray-600">
                    Repository:
                    <a
                      href={project.repositoryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 ml-1 underline hover:text-gray-800 font-light"
                    >
                      Link
                    </a>
                  </span>
                </div>
              )}
              <div className="flex items-center space-x-2">
                <svg
                  className="w-4 h-4 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5H19M7 13v8a2 2 0 002 2h10a2 2 0 002-2v-3"
                  />
                </svg>
                <span className="text-gray-600">
                  Resell Allowed:
                  <span
                    className={`font-medium`}
                  >
                    {project.isResellAllowed ? " Yes" : " No"}
                  </span>
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <svg
                  className="w-4 h-4 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-gray-600">
                  Approved:
                  <span
                    className={`font-medium`}
                  >
                    {project.isApproved ? " Yes" : " No"}
                  </span>
                </span>
              </div>

              {project.version && (
                <div className="flex items-center space-x-2">
                  <svg
                    className="w-4 h-4 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-gray-600">
                    Version:
                    <span
                      className={`ml-1 font-medium`}
                    >
                      {project.version}
                    </span>
                  </span>
                </div>
              )}
            </div>
            <div className="mt-2">
              {project.ProjectCategory && project.ProjectCategory.length > 0 && (
                <div className="flex items-center space-x-2">
                  <svg
                    className="w-4 h-4 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-gray-600">
                    Category:
                    <span className="ml-1 font-medium">
                      {project.ProjectCategory?.map((c) => c.category.category).join(", ")}
                    </span>
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="my-4 py-4 space-y-4">
            <p className="text-gray-700">
              {project.ProjectTag && project.ProjectTag.length > 0 && (
                <span className="flex flex-wrap gap-2">
                  <TextSnippetRoundedIcon />
                  <span className="text-sm font-bold">Tags</span>:
                  {project.ProjectTag.map((t, index) => (
                    <Badge key={index} variant="outline">
                      {t.tag.tag}
                    </Badge>
                  ))}
                </span>
              )}

            </p>
            <p className="text-gray-700">
              {project.ProjectTechStack && project.ProjectTechStack.length > 0 && (
                <span className="flex flex-wrap gap-2">
                  <CodeRoundedIcon />
                  <span className="text-sm font-bold">Tech Stack</span>:
                  {project.ProjectTechStack.map((t, index) => (
                    <Badge key={index} variant="outline">
                      {t.techstack.techstack}
                    </Badge>
                  ))}
                </span>
              )}

            </p>
          </div>

          <div className="flex gap-4 mt-4 flex-wrap">
            {project.demoUrl ? (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition inline-block"
              >
                <RemoveRedEyeRoundedIcon />  Live Preview
              </a>
            ) : (
              <span className="px-6 py-2 border border-gray-300 rounded-md text-gray-400 cursor-not-allowed inline-block">
                <RemoveRedEyeRoundedIcon />  Live Preview
              </span>
            )}
            <Link
              href="/"
              className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
            >
              <CloudDownloadRoundedIcon />  Download Now
            </Link>
          </div>
        </div>
      </div>


      {project.features && (
        <div className="bg-white rounded-lg shadow-md mt-5 p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4"><ArticleRoundedIcon /> Features</h3>
          <p className="mb-4">{project.features}</p>
        </div>
      )}

      {project.videoUrl && (
        <div className="relative w-full pb-[56.25%] mt-5 h-0 overflow-hidden rounded-xl shadow-md">
          <iframe
            src={`https://www.youtube.com/embed/${project.videoUrl.split("youtu.be/")[1]}`}
            title={project.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full"
          ></iframe>

          {/* <iframe
            className="w-full h-full absolute"
            src={String(project.videoUrl)}
            title="YouTube video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe> */}

        </div>
      )
      }

      {
        project.description && (
          <div className="bg-white rounded-lg shadow-md mt-5 p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4"><ArticleRoundedIcon /> Description</h3>
            <p className="mb-4">{project.description}</p>
          </div>
        )
      }

      {
        project.requirements && (
          <div className="bg-white rounded-lg shadow-md mt-5 p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4"><ArticleRoundedIcon /> requirements</h3>
            <p className="mb-4">{project.requirements}</p>
          </div>
        )
      }

      <ProfileCard user={project.user} />

      <Reviews review={project.Review} />
    </div >
  )
}
