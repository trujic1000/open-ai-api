import { authOptions } from "pages/api/auth/[...nextauth]"
import { getServerSession } from "next-auth"
import Client from "./client"
import { headers } from "next/headers"
import { getDictionary } from "app/(lang)/dictionaries"

export const metadata = {
  title: "Code Chat",
  description: "Code Chat is a fun way to learn how to code.",
}

export default async function Page() {
  const session = await getServerSession(authOptions)

  // if (!session) {
  //   redirect("/code-chat?action=signUp")
  // }

  const headersList = headers()
  const lang = headersList.get("accept-language")?.split(",")[0].substring(0, 2)
  const dictionary = await getDictionary(lang)

  return (
    <>
      <main className="flex min-h-screen w-screen px-4 text-center">
        <Client
          session={session}
          translations={dictionary?.chat}
          modalTranslations={dictionary?.modals?.moreCredits}
        />
      </main>
    </>
  )
}
