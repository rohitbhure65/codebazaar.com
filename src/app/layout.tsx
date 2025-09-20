import "./styles/globals.css"
import { BlitzProvider } from "./blitz-client"
import { Nunito } from "next/font/google"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Script from "next/script";
import SmoothScrollProvider from "@/components/ui/SmoothScrollProvider";
import { ThemeModeProvider } from "@/components/ui/ThemeProvider";
import { WEBSITE_URL, WEBSITE_NAME, GA_ID, WEBSITE_DESCRIPTION, WEBSITE_KEYWORDS } from "@/lib/constants"


const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito" })

export const metadata = {
  title: `${WEBSITE_NAME} - Buy and Sell Code Snippets, Templates, and More`,
  description: `${WEBSITE_DESCRIPTION}`,
  keywords: `${WEBSITE_KEYWORDS}`,
  robots: 'index, follow',
  openGraph: {
    title: `${WEBSITE_NAME}`,
    description: `${WEBSITE_DESCRIPTION}`,
    images: [
      {
        url: `${WEBSITE_URL}/og-image.png`,
        width: 800,
        height: 600,
        alt: `${WEBSITE_NAME}`,
      },
    ],
    type: 'website',
    url: `${WEBSITE_URL}`,
    siteName: `${WEBSITE_NAME}`,
    countryName: 'India',
    locale: 'en_IN'
  },
  twitter: {
    card: 'summary_large_image',
    title: `${WEBSITE_NAME}`,
    description: `${WEBSITE_DESCRIPTION}`,
    images: [
      {
        url: `${WEBSITE_URL}/og-image.png`,
        width: 800,
        height: 600,
        alt: `${WEBSITE_NAME}`,
      },
    ],
  },
  alternates: { canonical: `${WEBSITE_URL}` },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${nunito.className} font-sans`}>
        <BlitzProvider>
          <ThemeModeProvider>
            <Navbar />
            <SmoothScrollProvider>
              {children}
            </SmoothScrollProvider>
            <Footer />
          </ThemeModeProvider>
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