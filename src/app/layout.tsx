import "./styles/globals.css"
import { BlitzProvider } from "./blitz-client"
import { Inter } from "next/font/google"
import Navbar from "@/components/Navbar"
const inter = Inter({ subsets: ["latin"] })
export const metadata = {
  title: "CodeBazaar.com",
  description: "Cobazaar.com online market place for developers",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <BlitzProvider>
          <Navbar />
          <div>{children}</div>
        </BlitzProvider>
      </body>
    </html>
  )
}