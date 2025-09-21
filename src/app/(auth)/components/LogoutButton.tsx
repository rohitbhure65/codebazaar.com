"use client"
import logout from "../mutations/logout"
import { useRouter } from "next/navigation"
import { useMutation } from "@blitzjs/rpc"

export function LogoutButton() {
  const router = useRouter()
  const [logoutMutation] = useMutation(logout)
  return (
    <>
      <button
        className="px-3 py-2 rounded-xl border border-gray-300 text-gray-900 transition hover:bg-gray-100"
        onClick={async () => {
          await logoutMutation()
          router.refresh()
        }}
      >
        Logout
      </button>
    </>
  )
}
