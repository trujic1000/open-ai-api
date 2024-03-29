import { getServerSession } from "next-auth"
import { headers } from "next/headers"

import { authOptions } from "pages/api/auth/[...nextauth]"

import Client from "./client"
import { getDictionary } from "./(lang)/dictionaries"

export const metadata = {
  title: "Code Genius | Enhance your coding skills with the help of AI",
  description:
    "Code Genius is the AI tool that will help you find solutions quickly and avoid repetitive tasks. Use it to improve code quality and chat with an expert coding assistant.",
}

export default async function Page() {
  const session = await getServerSession(authOptions)

  const headersList = headers()
  const lang = headersList.get("accept-language")?.split(",")[0].substring(0, 2)
  const dictionary = await getDictionary(lang)

  return (
    <>
      <main>
        <Client translations={dictionary} session={session} />
      </main>
    </>
  )
}
