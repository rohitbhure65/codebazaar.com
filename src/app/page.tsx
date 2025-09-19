// import { invoke } from "./blitz-server"
// import getCurrentUser from "./users/queries/getCurrentUser"
import State from "components/State"
import Testimonial from "components/Testimonial"
import ProjectShowCase from "@/components/ProjectShowCase"
import Hero from "@/components/Hero"
import Team from "@/components/Team"
import Faq from "@/components/Faq"
import Features from "@/components/Features"
import Video from "@/components/video"
import Cloud from "@/components/Cloud"

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": 'CodeBazaar',
  "url": "https://google.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://google.com/search?q=codebazaaer",
    "query-input": "required name=codebazaar"
  }
};

export default async function Home() {
  // const currentUser = await invoke(getCurrentUser, null)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <Hero />
      <Video />
      <Features />
      <Cloud />
      <State />
      <ProjectShowCase />
      <Team />
      <Testimonial />
      <Faq />
    </>
  )
}
