import type React from "react"
import type { Metadata } from "next"
import { Barlow_Condensed } from "next/font/google"
import "./globals.css"

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-barlow-condensed",
})

export const metadata: Metadata = {
  title: "G1 - Proactive Web3 Investor",
  description: "G1 is a proactive investor redefining web3 investing",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${barlowCondensed.variable} font-sans`}>
      <body>{children}</body>
    </html>
  )
}



import './globals.css'