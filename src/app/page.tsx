import Link from "next/link"
import { invoke } from "./blitz-server"
import { LogoutButton } from "./(auth)/components/LogoutButton"
import getCurrentUser from "./users/queries/getCurrentUser"
import State from "components/State"
import Testimonial from "components/Testimonial"
import ProjectShowCase from "@/components/ProjectShowCase"
import Hero from "@/components/Hero"

export default async function Home() {
  const currentUser = await invoke(getCurrentUser, null)

  return (
    <>
      <Hero />
      <State />
      <ProjectShowCase />
      <Testimonial />
    </>
  )
}
