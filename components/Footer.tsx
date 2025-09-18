"use client"

export default function Footer() {
  return (
    <footer className="bottom-0 w-full bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="border-t border-gray-700 pt-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} MyBrand. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
