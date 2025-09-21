"use client"
import { Suspense } from "react"
import updateProject from "../mutations/updateProject"
import getProject from "../queries/getProject"
import { UpdateProjectSchema } from "../schemas"
import { FORM_ERROR, ProjectForm } from "./ProjectForm"
import { useMutation, useQuery } from "@blitzjs/rpc"
import { useRouter } from "next/navigation"
import Loader from "@/components/ui/loader"

export const EditProject = ({ projectSlug }: { projectSlug: string }) => {
  const [project, { setQueryData }] = useQuery(
    getProject,
    { slug: projectSlug },
    { staleTime: Infinity }
  )
  const [updateProjectMutation] = useMutation(updateProject)
  const router = useRouter()
  return (
    <>
      <div>
        <Suspense fallback={<Loader />}>
          <ProjectForm
            submitText="Update"
            schema={UpdateProjectSchema}
            initialValues={{ ...project }}
            onSubmit={async (values) => {
              try {
                const updated = await updateProjectMutation({
                  ...values,
                  id: project.id,
                })
                await setQueryData({ ...project, ...updated })
                router.push(`/projects/${updated.slug}`)
              } catch (error: any) {
                console.error(error)
                return {
                  [FORM_ERROR]: error.toString(),
                }
              }
            }}
          />
        </Suspense>
      </div>
    </>
  )
}
