// import { invoke } from "./blitz-server"
// import getCurrentUser from "./users/queries/getCurrentUser"
import State from "components/State"
import Testimonial from "components/Testimonial"
import ProjectShowCase from "@/components/ProjectShowCase"
import Hero from "@/components/Hero"
import Team from "@/components/Team"
import Faq from "@/components/Faq"

export default async function Home() {
  // const currentUser = await invoke(getCurrentUser, null)

  return (
    <>
      <Hero />
      <State />
      <ProjectShowCase />
      <Team />
      <Testimonial />
      <Faq />
    </>
  )
}
