import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-6">
            <h1 className="text-9xl font-bold text-blue-500">404</h1>
            <h2 className="mt-4 text-2xl font-semibold">Oops! Page not found</h2>
            <p className="mt-2 text-gray-400 text-center">
                The page you’re looking for doesn’t exist or has been moved.
            </p>
            <Link
                href="/"
                className="mt-6 px-6 py-3 rounded-lg bg-blue-600 text-white font-medium shadow hover:bg-blue-700 transition"
            >
                Go Back Home
            </Link>
        </div>
    )
}