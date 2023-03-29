"use client"

import Link from "next/link"
import { useSignInModal } from "./modals/SignInModal"
import { AnimatePresence, motion } from "framer-motion"
import { FADE_IN_ANIMATION_SETTINGS, LSConfig } from "@/lib/constants"
import useScroll from "hooks/use-scroll"
import UserDropdown from "app/components/auth/UserDropdown"
import { useEffect } from "react"
import useLocalStorage from "hooks/use-localstorage"
import Image from "next/image"
import { Rubik } from "next/font/google"

const rubik = Rubik({
  variable: "--font-rubik",
  weight: ["400", "300", "600"],
})

export default function Header({ session }) {
  const { SignInModal, setShowSignInModal } = useSignInModal()
  const scrolled = useScroll(50)
  const [userId, setUserId] = useLocalStorage(LSConfig.user.userId, "")
  useEffect(() => {
    setUserId(session?.user?.id)
  }, [userId, setUserId])
  return (
    <>
      <SignInModal />
      <div
        className={`absolute top-0 z-30 w-full bg-transparent transition-all`}
      >
        <div className="flex max-w-screen-xl items-center justify-between xl:mx-auto">
          <div className="ml-7">
            <Link href="/" className="mx-auto mt-3 ml-7 flex sm:mx-0">
              <h1
                className={`${rubik.variable} text-lg sm:text-xl ml-2 font-rubik text-2xl font-bold leading-6 tracking-tight text-white dark:text-white max-md:pt-4 max-sm:pt-0`}
              >
                Code Genius
              </h1>
            </Link>
          </div>
          <div className="sm:text-4xl mt-2 flex">
            {!session ? (
              <motion.button
                className="text-sm rounded-full border border-white  bg-black p-1.5 px-4 font-medium text-mint"
                onClick={() => setShowSignInModal(true)}
              >
                Create Account
              </motion.button>
            ) : (
              <UserDropdown />
            )}
          </div>
        </div>
      </div>
    </>
  )
}
