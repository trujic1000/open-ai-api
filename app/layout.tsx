import "../styles/globals.css"
import SessionProvider from "./provider"
import { Inter, Roboto_Mono } from "next/font/google"
import { Metadata } from "next"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
})
const roboto_mono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-mono",
})

export const metadata: Metadata = {
  title: {
    default: "Code Genius",
    template: "%s | Code Genius",
  },
  openGraph: {
    title: "Code Genius",
    description:
      "Code Genius helps developers and companies reach their goals sooner.",
    url: "https://code-genius.dev",
    siteName: "Code Genius ",
    // images: [
    //   {
    //     url: "https://leerob.io/og.jpg",
    //     width: 1920,
    //     height: 1080,
    //   },
    // ],
    locale: "en-US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    shortcut: "/favicon.ico",
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <html lang="en" className={`${inter.variable} ${roboto_mono.variable}`}>
        <head>
          <link rel="icon" href="/favicon.ico" />
          <link rel="canonical" href="https://www.code-genius.dev"></link>
          <link
            rel="alternate"
            hrefLang="en-US"
            href="https://www.code-genius.dev"
          ></link>
          <link
            rel="alternate"
            media="only screen and (max-width: 640px)"
            href="https://www.code-genius.dev"
          ></link>
        </head>
        <body suppressHydrationWarning={true} className="bg-purple-900">
          <SessionProvider>
            <div className="flex min-h-screen flex-nowrap">{children}</div>
          </SessionProvider>
        </body>
      </html>
    </>
  )
}
