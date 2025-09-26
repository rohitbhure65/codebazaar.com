"use client"
import { useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export function useGsapBlocks() {
  useEffect(() => {
    if (typeof window === "undefined") return
    // Safe to call multiple times; GSAP ignores duplicate registrations
    gsap.registerPlugin(ScrollTrigger)

    const fadeUps = gsap.utils.toArray<HTMLElement>(".block-appear")
    const fadeLefts = gsap.utils.toArray<HTMLElement>(".block-appear-left")
    const fadeRights = gsap.utils.toArray<HTMLElement>(".block-appear-right")

    const anims: gsap.core.Tween[] = []

    fadeUps.forEach((el) => {
      anims.push(
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 30 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        )
      )
    })

    fadeLefts.forEach((el) => {
      anims.push(
        gsap.fromTo(
          el,
          { autoAlpha: 0, x: -20 },
          {
            autoAlpha: 1,
            x: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        )
      )
    })

    fadeRights.forEach((el) => {
      anims.push(
        gsap.fromTo(
          el,
          { autoAlpha: 0, x: 20 },
          {
            autoAlpha: 1,
            x: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        )
      )
    })

    return () => {
      anims.forEach((a) => a.kill())
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [])
}
