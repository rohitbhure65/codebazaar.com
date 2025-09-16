"use client"
import { usePaginatedQuery, useMutation } from "@blitzjs/rpc"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { usePathname } from "next/navigation"
import getTasks from "../queries/getTasks"
import { useSearchParams } from "next/navigation"
import { Route } from "next"
import deleteTask from "../mutations/deleteTask"
import { TaskStatus } from "db"
import TextField from "@mui/material/TextField"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import Hero from "@/components/"


const ITEMS_PER_PAGE = 5

export const TasksList = () => {
  const searchParams = useSearchParams()!
  const page = Number(searchParams.get("page")) || 0
  const urlStatusFilter = searchParams.get("status")
  const urlSearchTerm = searchParams.get("search") || ""

  const [statusFilter, setStatusFilter] = useState<string | null>(urlStatusFilter)
  const [searchTerm, setSearchTerm] = useState<string>(urlSearchTerm)

  const [{ tasks, hasMore, count }] = usePaginatedQuery(getTasks, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
    where: {
      ...(statusFilter ? { status: TaskStatus[statusFilter as keyof typeof TaskStatus] } : {}),
      ...(searchTerm
        ? {
          name: {
            contains: searchTerm,
            mode: "insensitive",
          },
        }
        : {}),
    },
  })

  const router = useRouter()
  const [deleteTaskMutation] = useMutation(deleteTask)
  const pathname = usePathname()

  // Update filters when URL params change
  useEffect(() => {
    setStatusFilter(urlStatusFilter)
    setSearchTerm(urlSearchTerm)
  }, [urlStatusFilter, urlSearchTerm])

  const goToPreviousPage = () => {
    if (page > 0) {
      const params = new URLSearchParams(searchParams)
      params.set("page", (page - 1).toString())
      router.push(`${pathname}?${params.toString()}` as Route)
    }
  }

  const goToNextPage = () => {
    if (hasMore) {
      const params = new URLSearchParams(searchParams)
      params.set("page", (page + 1).toString())
      router.push(`${pathname}?${params.toString()}` as Route)
    }
  }

  const handleStatusFilterChange = (event: any) => {
    const newStatus = event.target.value || null
    setStatusFilter(newStatus)

    const params = new URLSearchParams(searchParams)
    if (newStatus) {
      params.set("status", newStatus)
    } else {
      params.delete("status")
    }
    params.set("page", "0")
    router.push(`${pathname}?${params.toString()}` as Route)
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const params = new URLSearchParams(searchParams)
    if (searchTerm) {
      params.set("search", searchTerm)
    } else {
      params.delete("search")
    }
    params.set("page", "0")
    router.push(`${pathname}?${params.toString()}` as Route)
  }

  const handleDeleteTask = async (taskId: string) => {
    try {
      if (window.confirm("This task will be deleted")) {
        await deleteTaskMutation({ id: taskId })
        router.refresh()
      }
    } catch (error) {
      console.error("Failed to delete task", error)
      alert("There was an error deleting the task. Please try again.")
    }
  }

  const statusOptions = [
    { value: "Backlog", label: "Backlog" },
    { value: "ToDo", label: "To Do" },
    { value: "InProgress", label: "In Progress" },
    { value: "ReadyForReview", label: "Ready for Review" },
    { value: "BackForReview", label: "Back for Review" },
    { value: "Completed", label: "Completed" },
  ]

  return (
    <section className="mb-10">
      <div className="">
        <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
            <div className="w-full md:w-1/2">
              <form className="flex items-center" onSubmit={handleSearchSubmit}>
                <TextField
                  name="search"
                  label="Search"
                  placeholder="Search tasks..."
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  fullWidth
                  size="small"
                />

              </form>
            </div>
            <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
              <Link
                href="/tasks/new"
                className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-white bg-blue-500 rounded-lg border border-gray-200 hover:bg-blue-400 hover:text-primary-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-blue-300"
              >
                New Task
              </Link>
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel id="status-filter-label">Status</InputLabel>
                <Select
                  labelId="status-filter-label"
                  id="status-filter"
                  value={statusFilter || ""}
                  label="Status"
                  onChange={handleStatusFilterChange}
                >
                  <MenuItem value="">
                    <em>All Statuses</em>
                  </MenuItem>
                  {statusOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Task Type
                  </th>
                  <th scope="col" className="px-10 py-3">
                    Description
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Is Active
                  </th>
                  <th scope="col" className="px-4 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task.id} className="border-b dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {task.name}
                    </th>
                    <td className="px-4 py-3">{task.type}</td>
                    <td className="px-4 py-3">{task.description}</td>
                    <td className="px-4 py-3">{task.status}</td>
                    <td className="px-4 py-3">{task.isActive ? "Yes" : "No"}</td>
                    <td className="px-4 py-3 flex items-center justify-end relative">
                      <Link href={`/tasks/${task.id}/edit`}>
                        <button
                          type="button"
                          className="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2"
                        >
                          <svg
                            className="mr-2"
                            width="15"
                            height="15"
                            viewBox="0 0 15 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M0.5 10.5L0.146447 10.1464L0 10.2929V10.5H0.5ZM10.5 0.5L10.8536 0.146447C10.6583 -0.0488155 10.3417 -0.0488155 10.1464 0.146447L10.5 0.5ZM14.5 4.5L14.8536 4.85355C15.0488 4.65829 15.0488 4.34171 14.8536 4.14645L14.5 4.5ZM4.5 14.5V15H4.70711L4.85355 14.8536L4.5 14.5ZM0.5 14.5H0C0 14.7761 0.223858 15 0.5 15L0.5 14.5ZM0.853553 10.8536L10.8536 0.853553L10.1464 0.146447L0.146447 10.1464L0.853553 10.8536ZM10.1464 0.853553L14.1464 4.85355L14.8536 4.14645L10.8536 0.146447L10.1464 0.853553ZM14.1464 4.14645L4.14645 14.1464L4.85355 14.8536L14.8536 4.85355L14.1464 4.14645ZM4.5 14H0.5V15H4.5V14ZM1 14.5V10.5H0V14.5H1Z"
                              fill="#ffffff"
                            />
                          </svg>
                          Edit
                        </button>
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDeleteTask(task.id)}
                        className="text-white bg-[#ff0e0e] hover:bg-[#ff0e0e]/90 focus:ring-4 focus:outline-none focus:ring-[#ff0e0e]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2"
                      >
                        <svg
                          className="w-4 h-4 me-2"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M4 6h12v12H4V6z" />
                          <path d="M3 4h14a1 1 0 0 1 1 1v1H2V5a1 1 0 0 1 1-1zM5 8h10v10H5V8z" />
                        </svg>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {tasks.length === 0 && (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                No tasks found. {searchTerm || statusFilter ? "Try adjusting your search filters." : "Create a new task to get started."}
              </div>
            )}

            <nav
              className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0 p-4"
              aria-label="Table navigation"
            >
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                Showing{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                  {tasks.length > 0 ? page * ITEMS_PER_PAGE + 1 : 0}
                </span>
                {" - "}
                <span className="font-semibold text-gray-900 dark:text-white">
                  {page * ITEMS_PER_PAGE + tasks.length}
                </span>
                {" of "}
                <span className="font-semibold text-gray-900 dark:text-white">
                  {count}
                </span>
              </span>
              <ul className="inline-flex items-stretch -space-x-px">
                <li>
                  <button
                    className={`flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${page === 0 ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    onClick={goToPreviousPage}
                    disabled={page === 0}
                  >
                    <span className="sr-only">Previous</span>
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </li>
                <li>
                  <button
                    className={`flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${!hasMore ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    onClick={goToNextPage}
                    disabled={!hasMore}
                  >
                    <span className="sr-only">Next</span>
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </section>
  )
}