import Link from 'next/link'

export default function AccessDenied() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-6">
            <h1 className="text-9xl font-bold text-red-500">403</h1>
            <h2 className="mt-4 text-2xl font-semibold">Access Denied</h2>
            <p className="mt-2 text-gray-400 text-center">
                You don&#39;t have permission to access this resource. You can only edit projects that you own.
            </p>
            <div className="mt-6 flex gap-4">
                <Link
                    href="/projects"
                    className="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium shadow hover:bg-blue-700 transition"
                >
                    View Projects
                </Link>
                <Link
                    href="/"
                    className="px-6 py-3 rounded-lg bg-gray-600 text-white font-medium shadow hover:bg-gray-700 transition"
                >
                    Go Home
                </Link>
            </div>
        </div>
    )
}
