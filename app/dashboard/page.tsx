import { getDictionary } from "app/(lang)/dictionaries"
import SideBar from "app/components/shared/SideBar"
import { headers } from "next/headers"
import Client from "./client"
import { getServerSession } from "next-auth"
import { authOptions } from "pages/api/auth/[...nextauth]"
import { redirect } from "next/navigation"
import { Params } from "app/settings/page"
import { updateUserSubscription } from "utils/helpers"
import { stripe } from "@/lib/stripe"

export const metadata = {
  title: "AI Dashboard",
}

export const dynamic = "force-dynamic"

interface SearchParamsWithSesId extends Params {
  session_id: string
}

export default async function Dashboard({
  searchParams,
}: {
  searchParams: SearchParamsWithSesId
}) {
  let stripeSession
  const { session_id } = searchParams
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/?referer=/dashboard")
  }
  if (searchParams.action === "subscription-deleted") {
    console.log("use is deleting their subscription")
    await updateUserSubscription(session.user.id, "", false)
  }
  if (session_id) {
    stripeSession = await stripe?.checkout?.sessions?.retrieve(session_id)
  }

  const headersList = headers()
  const lang =
    headersList &&
    headersList?.get("accept-language")?.split(",")[0].substring(0, 2)
  const dictionary = await getDictionary(lang)

  // const stripeData = await stripe.subscriptions.retrieve(
  //   "sub_1NXYSVKrxiA7kR6cFwedIMNp",
  // )
  // console.log("stripe subscription data: ", stripeData.items.data)

  return (
    <div className="flex bg-purple-900">
      <SideBar
        translations={dictionary.sidebar}
        menuTranslations={dictionary?.home?.header?.menu}
      />
      <div className="mx-auto w-full dark:bg-purple-900">
        <div className="flex w-screen items-center justify-center dark:bg-purple-900 sm:h-screen">
          <div className="absolute top-32 z-30 w-full bg-transparent sm:top-28">
            <h2 className="text-lg flex w-full items-center justify-center text-left text-3xl text-gray-200 sm:ml-28 sm:items-start sm:justify-start sm:pl-6 sm:text-3xl">
              {dictionary.dashboard.welcome}, {session.user.name}!
            </h2>
            <p className="flex justify-center pl-6 text-gray-200 sm:ml-28 sm:justify-start">
              Explore our features we have for you!
            </p>
          </div>
          <Client
            subscriptionId={stripeSession.subscription}
            isPremium={session?.user?.isPremium}
            session={session}
            translations={dictionary}
          />
        </div>
      </div>
    </div>
  )
}
