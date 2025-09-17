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
    <>
      <div>
       

        <Link href={`/projects/${project.slug}/edit`}>Edit</Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteProjectMutation({ id: project.id })
              router.push("/projects")
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}
