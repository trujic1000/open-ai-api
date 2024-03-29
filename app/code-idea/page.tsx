import { getDictionary } from "app/(lang)/dictionaries"
import { getServerSession } from "next-auth/next"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { authOptions } from "pages/api/auth/[...nextauth]"
import Container from "./container"
import { Roboto_Mono } from "next/font/google"

export const metadata = {
  title: "Code Idea",
}

export const dynamic = "force-dynamic"

const roboto_mono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-mono",
})

export default async function Page() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/?referer=/code-idea")
  }

  const headersList = headers()
  const lang = headersList.get("accept-language")?.split(",")[0].substring(0, 2)
  const dictionary = await getDictionary(lang)

  return (
    <main
      className={`min-h-screen  w-full flex-1 flex-row flex-nowrap items-start justify-start overflow-hidden bg-purple-900 font-sans ${roboto_mono.variable}`}
    >
      <Container translations={dictionary} session={session} />
    </main>
  )
}
