"use client"
import { Suspense, useEffect } from "react"
import updateProject from "../mutations/updateProject"
import getProject from "../queries/getProject"
import { UpdateProjectSchema } from "../schemas"
import { FORM_ERROR, ProjectForm } from "./ProjectForm"
import { useMutation, useQuery } from "@blitzjs/rpc"
import { useRouter } from "next/navigation"
import Loader from "@/components/ui/loader"
import { useCurrentUser } from "../../users/hooks/useCurrentUser"
import type { Route } from "next"

export const EditProject = ({ projectSlug }: { projectSlug: string }) => {
  const [project, { setQueryData }] = useQuery(
    getProject,
    { slug: projectSlug },
    { staleTime: Infinity }
  )
  const [updateProjectMutation] = useMutation(updateProject)
  const router = useRouter()
  const currentUser = useCurrentUser()

  // Check authorization: only allow editing if current user owns the project
  useEffect(() => {
    if (currentUser && project && currentUser.id !== project.userId) {
      router.push('/access-denied' as Route)
    }
  }, [currentUser, project, router])

  // Show loading while checking authorization
  if (!currentUser || !project) {
    return <Loader />
  }

  // If user doesn't own the project, don't render the form
  if (currentUser.id !== project.userId) {
    return null
  }
  return (
    <>
      <div>
        <Suspense fallback={<Loader />}>
          <ProjectForm
            submitText="Update"
            schema={UpdateProjectSchema}
            initialValues={{...project}}
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
