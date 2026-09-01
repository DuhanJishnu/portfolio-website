"use client"

import { useEffect, useRef } from "react"

export default function InterfaceEffects() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)")
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (!finePointer.matches || reducedMotion.matches) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let targetX = window.innerWidth / 2
    let targetY = window.innerHeight / 2
    let ringX = targetX
    let ringY = targetY
    let frame = 0

    const render = () => {
      ringX += (targetX - ringX) * 0.16
      ringY += (targetY - ringY) * 0.16
      dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`
      frame = requestAnimationFrame(render)
    }

    const onMove = (event: PointerEvent) => {
      targetX = event.clientX
      targetY = event.clientY
      document.documentElement.style.setProperty("--cursor-x", `${event.clientX}px`)
      document.documentElement.style.setProperty("--cursor-y", `${event.clientY}px`)
      document.body.classList.add("cursor-ready")
      const interactive = (event.target as HTMLElement).closest("a, button, [data-cursor]")
      document.body.classList.toggle("cursor-hover", Boolean(interactive))
    }
    const onDown = () => document.body.classList.add("cursor-down")
    const onUp = () => document.body.classList.remove("cursor-down")
    const onLeave = () => document.body.classList.remove("cursor-ready", "cursor-hover", "cursor-down")

    window.addEventListener("pointermove", onMove, { passive: true })
    window.addEventListener("pointerdown", onDown, { passive: true })
    window.addEventListener("pointerup", onUp, { passive: true })
    document.documentElement.addEventListener("mouseleave", onLeave)
    frame = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerdown", onDown)
      window.removeEventListener("pointerup", onUp)
      document.documentElement.removeEventListener("mouseleave", onLeave)
      document.body.classList.remove("cursor-ready", "cursor-hover", "cursor-down")
    }
  }, [])

  return (
    <>
      <svg className="liquid-filter-defs" aria-hidden="true">
        <defs>
          <filter id="liquid-glass-filter" x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.009 0.035" numOctaves="2" seed="7" result="crystalNoise" />
            <feGaussianBlur in="crystalNoise" stdDeviation="1.2" result="softNoise" />
            <feDisplacementMap in="SourceGraphic" in2="softNoise" scale="24" xChannelSelector="R" yChannelSelector="B" result="bentGlass" />
            <feColorMatrix in="bentGlass" type="saturate" values="1.25" />
          </filter>
          <filter id="liquid-glass-soft" x="-15%" y="-15%" width="130%" height="130%" colorInterpolationFilters="sRGB">
            <feTurbulence type="turbulence" baseFrequency="0.012 0.05" numOctaves="1" seed="11" result="ripple" />
            <feDisplacementMap in="SourceGraphic" in2="ripple" scale="11" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>
      <div className="cursor-aurora" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true"><span /></div>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  )
}
