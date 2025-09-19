"use client"
import { useEffect, useRef } from "react"
import type { ReactNode } from "react"
import LocomotiveScroll from "locomotive-scroll"
import "locomotive-scroll/dist/locomotive-scroll.css"

interface SmoothScrollProviderProps {
    children: ReactNode
}

export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
    const containerRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if (!containerRef.current) return

        const scroll: any = new (LocomotiveScroll as unknown as any)({
            el: containerRef.current,
            smooth: true,
            multiplier: 1,
            smartphone: { smooth: true },
            tablet: { smooth: true },
        } as any)

        const refresh = () => scroll?.update?.()
        window.addEventListener("resize", refresh)

        return () => {
            window.removeEventListener("resize", refresh)
            scroll?.destroy?.()
        }
    }, [])

    return (
        <div ref={containerRef} data-scroll-container>
            {children}
        </div>
    )
}


