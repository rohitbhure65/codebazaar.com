export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative">
        <div className="h-16 w-16 rounded-full border-4 border-gray-700"></div>
        <div className="absolute inset-0 h-16 w-16 rounded-full border-4 border-t-blue-500 animate-spin"></div>
      </div>
    </div>
  )
}
