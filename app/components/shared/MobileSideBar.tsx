import {
  MessageSquare,
  Code2,
  Rocket,
  CurlyBraces,
  FileCode,
  Menu,
  ArrowLeft,
  LogOut,
  Home,
  Gem,
} from "lucide-react"
import { signOut } from "next-auth/react"

import Link from "next/link"
import { useState } from "react"

export default function MobileSideBar({
  pathname,
  colors,
  mode,
  translations,
}) {
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  return (
    <div
      className={`absolute left-0 top-0 z-50 h-full rounded-r-lg font-sans duration-100 ${
        showMobileMenu ? "w-80  bg-purple-700 " : "w-16 bg-none"
      } flex-row items-start `}
    >
      <div
        onClick={() => {
          setShowMobileMenu((prevState) => !prevState)
        }}
        className="cursor-pointer"
      >
        <div className="p-3">
          {!showMobileMenu ? (
            <Menu color="white" className="ml-2 mt-2" />
          ) : (
            <div className="flex justify-between">
              <ArrowLeft className="ml-4 mt-5" color="white" />
            </div>
          )}
        </div>
      </div>
      <div
        className={`flex flex-col items-start justify-start ${
          showMobileMenu ? "block" : "hidden"
        }`}
      >
        <Link
          href="/dashboard"
          onClick={() => {
            setShowMobileMenu((prevState) => !prevState)
          }}
          className={`w-[100%] ${
            pathname === "/dashboard" ? "bg-purple-500" : "bg-none"
          } cursor-pointer`}
        >
          <div className="ml-4 mt-5 inline-flex h-[50px] w-auto items-start justify-start rounded-md pr-2">
            <Home
              width={26}
              height={26}
              color={pathname === "/dashboard" ? colors.mint : "white"}
              className="ml-1.5"
            />
            <p className="text-sm ml-4 pt-1 text-white">
              {translations?.dashboard}
            </p>
          </div>
        </Link>
        <Link
          href="/code-chat"
          onClick={() => {
            setShowMobileMenu((prevState) => !prevState)
          }}
          className={`w-full cursor-pointer  ${
            pathname === "/code-chat" ? "bg-purple-500" : "bg-none"
          }`}
        >
          <div className="ml-4 mt-5 inline-flex h-[50px] w-full items-start justify-start rounded-md pr-2">
            <MessageSquare
              width={26}
              height={26}
              color={pathname === "/code-chat" ? colors.mint : "white"}
              className="ml-1.5 text-white"
            />
            <p className="text-sm ml-4 pb-1 text-white">{translations?.chat}</p>
          </div>
        </Link>
        <div
          className={`w-[100%] cursor-pointer ${
            pathname === "/code-idea" && mode === "smart"
              ? "bg-purple-500"
              : "bg-none"
          }`}
        >
          <Link
            href="/code-idea?mode=smart"
            onClick={() => {
              setShowMobileMenu((prevState) => !prevState)
            }}
            className=" ml-4 mt-5 inline-flex h-[50px] w-full items-start justify-start rounded-md pr-2"
          >
            <Code2
              width={26}
              height={26}
              color={mode === "smart" ? colors.mint : "white"}
              className={`ml-1.5 cursor-pointer border-purple-300`}
            />
            <p className="text-sm ml-4 pb-1 text-white">
              {translations.mode.smart}
            </p>
          </Link>
        </div>
        <div
          className={`w-[100%] cursor-pointer ${
            pathname === "/code-idea" && mode === "improve"
              ? "bg-purple-500"
              : "bg-none"
          }`}
        >
          <Link
            href="/code-idea?mode=improve"
            onClick={() => {
              setShowMobileMenu((prevState) => !prevState)
            }}
            className="ml-4 mt-5 inline-flex h-[50px] w-full items-start justify-start rounded-md pr-2"
          >
            <Rocket
              color={mode === "improve" ? colors.mint : "white"}
              width={26}
              height={26}
              className={`ml-1.5 cursor-pointer`}
            />
            <p className="text-sm ml-4 pb-1 text-white">
              {translations.mode.improve}
            </p>
          </Link>
        </div>
        <div
          className={`w-[100%] cursor-pointer ${
            pathname === "/code-idea" && mode === "test"
              ? "bg-purple-500"
              : "bg-none"
          }`}
        >
          <Link
            href="/code-idea?mode=test"
            onClick={() => {
              setShowMobileMenu((prevState) => !prevState)
            }}
            className="ml-4 mt-5 inline-flex h-[50px] w-full items-start justify-start rounded-md pr-2"
          >
            <CurlyBraces
              size={26}
              color={mode === "test" ? colors.mint : "white"}
              className={`ml-1.5 cursor-pointer`}
            />
            <p className="text-sm ml-4 pb-1 text-white">
              {translations.mode.test}
            </p>
          </Link>
        </div>
        <div
          className={`w-[100%] cursor-pointer ${
            pathname === "/code-idea" && mode === "docs"
              ? "bg-purple-500"
              : "bg-none"
          }`}
        >
          <Link
            href="/code-idea?mode=docs"
            onClick={() => {
              setShowMobileMenu((prevState) => !prevState)
            }}
            className={`ml-4 mt-5 inline-flex h-[50px] w-full items-start justify-start rounded-md pr-2`}
          >
            <FileCode
              size={26}
              color={mode === "docs" ? colors.mint : "white"}
              className={`ml-1.5 cursor-pointer`}
            />
            <p className="text-sm ml-4 pb-1 text-white">
              {translations.mode.docs}
            </p>
          </Link>
        </div>
        <div
          className={`w-full cursor-pointer ${
            pathname === "/pricing" ? "bg-purple-500" : "bg-none"
          }`}
        >
          <Link
            href="/pricing"
            onClick={() => {
              setShowMobileMenu((prevState) => !prevState)
            }}
            className={`ml-4 mt-5 inline-flex h-[50px] w-full items-start justify-start rounded-md pr-2`}
          >
            <Gem
              size={26}
              color={pathname === "/pricing" ? colors.mint : "white"}
              className={`ml-1.5 cursor-pointer`}
            />
            <p className="text-sm ml-4 pb-1 text-white">
              {translations.pricing}
            </p>
          </Link>
        </div>
        <div
          className={`absolute bottom-2 left-4 w-[100%] cursor-pointer text-white ${
            pathname === "/code-idea" && mode === "docs"
              ? "bg-purple-500"
              : "bg-none"
          }`}
        >
          <div
            onClick={() => signOut()}
            className={`flex w-full cursor-pointer items-center justify-start`}
          >
            <LogOut size={26} className={`ml-1.5 cursor-pointer `} />
            <span className="text-sm ml-2  text-white">
              {translations.logOut}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
