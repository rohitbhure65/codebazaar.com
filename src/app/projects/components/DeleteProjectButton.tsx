"use client"
import { useState, useMemo } from "react"
import { useMutation } from "@blitzjs/rpc"
import { useRouter } from "next/navigation"
import deleteProject from "../mutations/deleteProject"
import DeleteIcon from "@mui/icons-material/Delete"
import WarningIcon from "@mui/icons-material/Warning"
import { useCurrentUser } from "../../users/hooks/useCurrentUser"

interface DeleteProjectButtonProps {
  projectId: number
  projectTitle: string
  projectSlug: string
  relatedRecordsCount?: {
    reviews: number
    categories: number
    tags: number
    techStack: number
    supportTickets: number
  }
}

export const DeleteProjectButton = ({
  projectId,
  projectTitle,
  projectSlug,
  relatedRecordsCount,
}: DeleteProjectButtonProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [deleteProjectMutation] = useMutation(deleteProject)
  const router = useRouter()
  const currentUser = useCurrentUser()

  const handleDelete = async () => {
    setIsDeleting(true)
    setErrorMessage(null)
    try {
      await deleteProjectMutation({ id: projectId })
      router.push("/projects")
    } catch (error: any) {
      setErrorMessage(error.message)
    } finally {
      setIsDeleting(false)
    }
  }

  const totalRelatedRecords = useMemo(() =>
    (relatedRecordsCount?.reviews || 0) +
    (relatedRecordsCount?.categories || 0) +
    (relatedRecordsCount?.tags || 0) +
    (relatedRecordsCount?.techStack || 0) +
    (relatedRecordsCount?.supportTickets || 0),
    [relatedRecordsCount]
  )

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50"
        disabled={isDeleting}
      >
        <DeleteIcon className="h-4 w-4" />
        Delete Project
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center gap-3 mb-4">
              <WarningIcon className="h-6 w-6 text-yellow-500" />
              <h3 className="text-lg font-semibold">Delete Project</h3>
            </div>

            <p className="text-gray-600 mb-4">
              Are you sure you want to delete {`"${projectTitle}"`}? This action cannot be undone.
            </p>

            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-6">
              <div className="flex items-start gap-3">
                <WarningIcon className="h-5 w-5 text-yellow-400 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-yellow-800 mb-2">
                    This will also delete related data
                  </h4>
                  <div className="text-sm text-yellow-700">
                    <p className="mb-2">
                      Deleting this project will permanently remove:
                    </p>
                    <ul className="list-disc list-inside space-y-1">
                      {relatedRecordsCount && totalRelatedRecords > 0 ? (
                        <>
                          {relatedRecordsCount.reviews > 0 && (
                            <li>{relatedRecordsCount.reviews} review(s)</li>
                          )}
                          {relatedRecordsCount.categories > 0 && (
                            <li>{relatedRecordsCount.categories} category association(s)</li>
                          )}
                          {relatedRecordsCount.tags > 0 && (
                            <li>{relatedRecordsCount.tags} tag(s)</li>
                          )}
                          {relatedRecordsCount.techStack > 0 && (
                            <li>{relatedRecordsCount.techStack} tech stack association(s)</li>
                          )}
                          {relatedRecordsCount.supportTickets > 0 && (
                            <li>{relatedRecordsCount.supportTickets} support ticket(s)</li>
                          )}
                        </>
                      ) : (
                        <li>All associated data and relationships</li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {errorMessage && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
                <div className="flex items-start gap-3">
                  <WarningIcon className="h-5 w-5 text-red-400 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-red-800 mb-2">
                      Error deleting project
                    </h4>
                    <p className="text-sm text-red-700">{errorMessage}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50"
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete Project"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
