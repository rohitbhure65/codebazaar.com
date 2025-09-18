import "./styles/globals.css"
import { BlitzProvider } from "./blitz-client"
import { Inter } from "next/font/google"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Script from "next/script";

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
          <Footer />
        </BlitzProvider>
      </body>

      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=G-W6LGMJG0YR`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-W6LGMJG0YR');
          `}
      </Script>

    </html>
  )
}