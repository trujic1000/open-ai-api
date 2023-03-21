"use client"

import { usePathname } from "next/navigation"

export default function Footer() {
  const pathName = usePathname()
  const showFooter = pathName !== "/code-chat"
  return showFooter ? (
    <footer className="flex h-16 w-full flex-col items-center  space-y-3 bg-gradient-to-b from-purple-800 via-purple-700 to-purple-600 px-3 text-white">
      <div className="m-auto content-center">
        <p>AI - Intelligent Code ®</p>
      </div>
    </footer>
  ) : null
}
