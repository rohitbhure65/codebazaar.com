// import { invoke } from "./blitz-server"
// import getCurrentUser from "./users/queries/getCurrentUser"
import State from "components/State"
import Testimonial from "components/Testimonial"
import ProjectShowCase from "@/components/ProjectShowCase"
import Hero from "@/components/Hero"
// import Team from "@/components/Team"
import Faq from "@/components/Faq"
import Features from "@/components/Features"
import Video from "@/components/video"
import Cloud from "@/components/Cloud"
import { MarqueeDemo } from "@/components/marque"
import { WEBSITE_URL, WEBSITE_NAME } from "@/lib/constants"
import AnimatedFeature from "@/components/AnimatedFeature"

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "Website",
  "name": `${WEBSITE_NAME}`,
  "url": `${WEBSITE_URL}`,
  "potentialAction": {
    "@type": "SearchAction",
    "target": `https://www.google.com/search?q=${WEBSITE_NAME}`,
    "query-input": `required name=${WEBSITE_NAME}`
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
      <MarqueeDemo />
      <AnimatedFeature />
      <Cloud />
      <Features />
      <State />
      <ProjectShowCase />
      {/* <Team /> */}
      <Testimonial />
      <Faq />
    </>
  )
}
