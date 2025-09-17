"use client"
import { Suspense } from "react"
import updateProject from "../mutations/updateProject"
import getProject from "../queries/getProject"
import { UpdateProjectSchema } from "../schemas"
import { FORM_ERROR, ProjectForm } from "./ProjectForm"
import { useMutation, useQuery } from "@blitzjs/rpc"
import { useRouter } from "next/navigation"

export const EditProject = ({ projectSlug }: { projectSlug: string }) => {
  const [project, { setQueryData }] = useQuery(
    getProject,
    { slug: projectSlug },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateProjectMutation] = useMutation(updateProject)
  const router = useRouter()
  return (
    <>
      <div>
        <h1>Edit Project {project.id}</h1>
        <pre>{JSON.stringify(project, null, 2)}</pre>
        <Suspense fallback={<div>Loading...</div>}>
          <ProjectForm
            submitText="Update Project"
            schema={UpdateProjectSchema}
            initialValues={{
              ...project,
              metaTitle: project.metaTitle || undefined,
              metaDescription: project.metaDescription || undefined,
              metaKeywords: project.metaKeywords || undefined,
              ogTitle: project.ogTitle || undefined,
              ogDescription: project.ogDescription || undefined,
              ogImage: project.ogImage || undefined,
              twitterTitle: project.twitterTitle || undefined,
              twitterDescription: project.twitterDescription || undefined,
              twitterImage: project.twitterImage || undefined,
              canonicalUrl: project.canonicalUrl || undefined,
              robots: project.robots || undefined,
              demoUrl: project.demoUrl || undefined,
              repositoryUrl: project.repositoryUrl || undefined,
            }}
            onSubmit={async (values) => {
              try {
                const updated = await updateProjectMutation({
                  ...values,
                  id: project.id,
                })
                await setQueryData(updated)
                router.refresh()
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
