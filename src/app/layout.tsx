import type React from "react"
import "@/app/globals.css"

export const metadata = {
  title: "Jishnu Duhan — AI Engineer & Creative Developer",
  description: "Portfolio of Jishnu Duhan, an AI engineer and creative developer building intelligent products and immersive digital experiences.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
