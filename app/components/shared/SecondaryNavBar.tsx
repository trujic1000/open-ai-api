"use client"

import { Code, Rocket, FileCode, CurlyBraces } from "lucide-react"
import { useEffect, useState } from "react"
import tailwindConfig from "tailwind.config"

const colors: any = tailwindConfig.theme?.extend?.colors
//write type definitions for the bellow component props
export default function SecondaryNavBar({
  mode,
  isCodeModeSelected,
  setGeneratedCode,
  setOpenSecondayNavBar,
  openSecondayNavBar,
  improveSelected,
  setImproveSelected,
  smartSelected,
  setSmartSelected,
  docSelected,
  setDocSelected,
  testSelected,
  setTestSelected,
}) {
  const [sidebarOpen, setSidebarOpen] = useState(openSecondayNavBar)
  //   const [searchTerm, setSearchTerm] = useState("")
  //   const userIsSearching = searchTerm !== ""

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Escape") {
        setOpenSecondayNavBar((prev) => !prev)
      }
    }
    document.addEventListener("keydown", handleKeyPress)
    return () => {
      document.removeEventListener("keydown", handleKeyPress)
    }
  }, [setOpenSecondayNavBar])

  return (
    <div
      id="secondary-sidebar"
      className={`${isCodeModeSelected ? "hidden" : "block"}
      ${sidebarOpen ? "block" : "hidden"}
      absolute top-0 left-[64px] z-40 h-auto min-h-screen flex-col
      items-start bg-purple-800 pl-0 transition-transform duration-700
        sm:flex sm:translate-x-0`}
    >
      {/* <SearchBar
        userIsSearching={userIsSearching}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      /> */}

      <div
        className="mt-3 inline-flex"
        onClick={() => {
          setSidebarOpen(!sidebarOpen)
          setOpenSecondayNavBar((prev) => !prev)
          if (!smartSelected) {
            setSmartSelected(!smartSelected)
          }
          setTestSelected(false)
          setDocSelected(false)
          setImproveSelected(false)
          setGeneratedCode("")
        }}
      >
        <div className="inline-flex h-auto cursor-pointer rounded-md py-3 pl-4 hover:bg-purple-500">
          <Code
            size={26}
            color={smartSelected && mode === "smart" ? colors.mint : "white"}
            className="cursor-pointer border-purple-300"
          />
          <p
            className={`ml-4 w-[200px] ${sidebarOpen ? "block" : "hidden"} ${
              smartSelected && mode === "smart" ? "text-mint" : "text-white"
            } `}
          >
            Smart Suggestions
          </p>
        </div>
      </div>
      <div
        className="mt-0 inline-flex"
        onClick={() => {
          setSidebarOpen(!sidebarOpen)
          setOpenSecondayNavBar((prev) => !prev)
          if (!testSelected) {
            setTestSelected(!testSelected)
          }
          setSmartSelected(false)
          setDocSelected(false)
          setImproveSelected(false)
          setGeneratedCode("")
        }}
      >
        <div className="inline-flex h-auto cursor-pointer rounded-md py-3 pl-4 hover:bg-purple-500">
          <CurlyBraces
            size={26}
            color={testSelected && mode === "test" ? colors.mint : "white"}
          />
          <p
            className={`ml-4 w-[200px] ${sidebarOpen ? "block" : "hidden"} ${
              testSelected && mode === "test" ? "text-mint" : "text-white"
            } `}
          >
            Test Generation
          </p>
        </div>
      </div>
      <div
        className="mt-0 inline-flex "
        onClick={() => {
          setSidebarOpen(!sidebarOpen)
          setOpenSecondayNavBar((prev) => !prev)
          if (!improveSelected) {
            setImproveSelected(!improveSelected)
          }
          setSmartSelected(false)
          setTestSelected(false)
          setDocSelected(false)
          setGeneratedCode("")
        }}
      >
        <div className="inline-flex h-auto cursor-pointer rounded-md py-3 pl-4 hover:bg-purple-500">
          <Rocket
            color={
              improveSelected && mode === "improve" ? colors.mint : "white"
            }
            size={26}
            className="cursor-pointer border-purple-300 "
          />
          <p
            className={`ml-4 w-[200px] ${sidebarOpen ? "block" : "hidden"}  ${
              improveSelected && mode === "improve" ? "text-mint" : "text-white"
            }`}
          >
            Improve Code
          </p>
        </div>
      </div>
      <div
        className="mt-0 inline-flex "
        onClick={() => {
          setSidebarOpen(!sidebarOpen)
          setOpenSecondayNavBar((prev) => !prev)
          if (!docSelected) {
            setDocSelected(!docSelected)
          }
          setSmartSelected(false)
          setTestSelected(false)
          setImproveSelected(false)
          setGeneratedCode("")
        }}
      >
        <div className="inline-flex h-auto cursor-pointer rounded-md py-3 pl-4 hover:bg-purple-500">
          <FileCode
            size={26}
            color={docSelected && mode === "docs" ? colors.mint : "white"}
          />
          <p
            className={`ml-4 w-[200px] ${
              docSelected && mode === "docs" ? "text-mint" : "text-white"
            } ${sidebarOpen ? "block" : "hidden"} `}
          >
            Docs Generation
          </p>
        </div>
      </div>
    </div>
  )
}
