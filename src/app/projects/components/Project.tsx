"use client"

import { useMutation, useQuery } from "@blitzjs/rpc"
import Link from "next/link"
import { useRouter } from "next/navigation"
import deleteProject from "../mutations/deleteProject"
import getProject from "../queries/getProject"

export const Project = ({ projectSlug }: { projectSlug: string }) => {
  const router = useRouter()
  const [deleteProjectMutation] = useMutation(deleteProject)
  const [project] = useQuery(getProject, { slug: projectSlug })

  return (
    <div className="max-w-6xl mx-auto p-10">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2 space-y-4 ">
          <img className="rounded-lg" src={project.projectImage} alt="" />
        </div>

        <div className="md:w-1/2 space-y-6">
          <h1 className="text-2xl font-bold">{project.title}</h1>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span>Updated on {new Date(project.updatedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</span>
            <span>⭐ 39 Reviews</span>
          </div>

          <p className="text-gray-700">
            {project.description || "No description available."}
          </p>

            <h1 className="font-bold text-3xl ">$ {project.price}</h1>

          <div className="flex gap-4 mt-4">
            <Link href="/" className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition">
              Live Preview
            </Link>
            <Link href="/" className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition">
              Purchase Now
            </Link>
          </div>

          <div className="flex gap-4 mt-6">
            <Link href={`/projects/${project.slug}/edit`} className="text-blue-500 hover:underline">
              Edit
            </Link>
            <button
              type="button"
              onClick={async () => {
                if (window.confirm("This will be deleted")) {
                  await deleteProjectMutation({ id: project.id })
                  router.push("/projects")
                }
              }}
              className="text-red-500 hover:underline"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
