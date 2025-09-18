import "./styles/globals.css"
import { BlitzProvider } from "./blitz-client"
import { Inter } from "next/font/google"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Script from "next/script";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

const inter = Inter({ subsets: ["latin"] })
export const metadata = {
  title: "CodeBazaar.com",
  description: "Cobazaar.com online market place for developers",
  keywords: [
    "CodeBazaar",
    "Code Bazaar",
    "CodeBazaar.com",
    "Code Bazaar.com",
    "Code Marketplace",
    "Rohit Bhure Code Bazaar",
    "Rohit Bhure CodeBazaar.com"],
  robots: 'index, follow',
  openGraph: {
    title: 'CodeBazaar.com',
    description: 'Cobazaar.com online market place for developers',
    images: [
      {
        url: 'https://codebazaar.com/og-image.png',
        width: 800,
        height: 600,
        alt: 'CodeBazaar.com',
      },
    ],
    type: 'website',
    url: 'https://codebazaar.com',
    siteName: 'CodeBazaar',
    countryName: 'India',
    locale: 'en_IN'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CodeBazaar.com',
    description: 'Cobazaar.com online market place for developers',
    images: [
      {
        url: 'https://codebazaar.com/og-image.png',
        width: 800,
        height: 600,
        alt: 'CodeBazaar.com',
      },
    ],
  },
  alternates: { canonical: 'https://codebazaar.com' },
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
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
      </Script>
    </html>
  )
}