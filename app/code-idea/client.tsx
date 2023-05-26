"use client"

import Editor from "react-simple-code-editor"
import { highlight, languages } from "prismjs/components/prism-core"
import "prismjs/components/prism-clike"
import "prismjs/components/prism-javascript"

import Modal from "app/components/Modal"
import tailwindConfig from "tailwind.config.js"
import React, { ChangeEvent, useEffect, useMemo, useRef, useState } from "react"
import {
  LandElementType,
  libTestingElementType,
  TestingElementType,
} from "app/components/DropDown"
import FooterSection from "./footer-section"
import { getCodeGeniusPlaceHolder } from "utils/strings"
import { CREDITS_MODAL_COPY } from "@/lib/constants"
import { Code, CurlyBraces, FileCode, Rocket } from "lucide-react"
import { generateCode } from "utils/generateCode"
import { CombinedMessages } from "app/components/shared/Messages"
import Image from "next/image"

let libElements: LandElementType[] = ["React", "Vue", "Angular"]
let langElements: LandElementType[] = ["Typescript", "Javascript"]

let testFrameworkElements: TestingElementType[] = [
  "Jest",
  "Mocha",
  "Chai",
  "Jasmine",
]
let testLibElements: libTestingElementType[] = ["React Testing"]

const colors: any = tailwindConfig.theme?.extend?.colors

export default function Client({
  testFrameworkElement,
  setTestLib,
  setTestFrameworkElement,
  userId,
  userCredits,
  lib,
  mode,
  prompt,
  setLib,
  langElement,
  testLibElement,
  codeSentence,
  testSelected,
  smartSelected,
  docSelected,
  setLangElement,
  setCodeSentence,
  improveSelected,
}) {
  const [loading, setLoading] = useState(false)
  const [modaIsOpen, setModaIsOpen] = useState(false)
  const [creditsLeft, setCreditsLeft] = useState(userCredits)
  const [creditsModaIsOpen, setCreditsModaIsOpen] = useState(false)
  const [showSavePromptModal, setShowSavePromptModal] = useState(false)
  const [userHasAResponse, setUserHasAResponse] = useState(false)
  const [reader, setReader] =
    useState<ReadableStreamDefaultReader<Uint8Array> | null>(null)
  const [questionName, setQuestionName] = useState("")
  const [generatedCode, setGeneratedCode] = useState<String>("")
  const controller = new AbortController()
  const [scrollHeight, setScrollHeight] = useState(0)
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const placeHolderText = getCodeGeniusPlaceHolder(mode)
  const codeMessages = useRef([
    {
      role: "system",
      content: "",
    },
  ])
  //SET SYSTEM MESSAGES.
  useEffect(() => {
    switch (mode) {
      case "smart":
        codeMessages.current[0].content = `You are an AI software development assistant which is specialized in providing code ideas/suggestions. Make sure tu use ${langElement} and ${lib}.`
        break
      case "test":
        codeMessages.current[0].content = `You are a helpful and specialized AI software assistant with experience in unit testing, integration testing and e2e testing. 
        Make sure tu use ${langElement} and ${lib}, ${testFrameworkElement} and ${testLibElement}.
        Never add code comments at the end of the line. If a comment has more than 10 words, continue in the next line.`
        break
      case "improve":
        codeMessages.current[0].content =
          "You are a helpful and specialized AI software assistant which is specialized in code performance and customization."
        break
      case "docs":
        codeMessages.current[0].content =
          "You are an AI software assistant which is specialized in providing code documentation. Requeriments: Use short sentences to make it easy to read (max 20 words per line)."
        break

      default:
        codeMessages.current[0].content =
          "You are an AI software development assistant which is specialized in providing code ideas/suggestions."

        break
    }
  }, [langElement, lib, mode, testFrameworkElement, testLibElement])
  useEffect(() => {
    if (chatContainerRef && chatContainerRef.current) {
      setScrollHeight(chatContainerRef.current?.scrollHeight)
      chatContainerRef.current?.scrollTo({
        top: scrollHeight - chatContainerRef.current.offsetHeight,
        behavior: "smooth",
      })
    }
  }, [chatContainerRef, chatContainerRef?.current?.scrollHeight, scrollHeight])

  //Clean up previous code responses
  useEffect(() => {
    if (generatedCode.length > 0 && !reader && !userHasAResponse) {
      setGeneratedCode("")
    }
  }, [generatedCode, reader, setGeneratedCode, userHasAResponse])

  useEffect(() => {
    const editorPanel = document.getElementById("code-editor")
    if (editorPanel) {
      editorPanel.focus()
    }
  }, [])

  useEffect(() => {
    if (!userCredits || userCredits === 0) {
      setCreditsModaIsOpen(true)
    }
  }, [userCredits])

  const generateCompletion = async () => {
    // setLoading(true)

    codeMessages.current = [
      ...codeMessages.current,
      {
        role: "user",
        content: prompt,
      },
    ]
    console.log("codeMessages.current:", codeMessages.current)

    setCodeSentence("")
    generateCode(
      setLoading,
      setReader,
      setGeneratedCode,
      codeMessages,
      userId,
      setUserHasAResponse,
      setCreditsLeft,
      setCreditsModaIsOpen,
    )
  }

  const onCodeGeneration = () => {
    if (!creditsLeft || creditsLeft === 0) {
      setCreditsModaIsOpen(true)
      return false
    }
    generateCompletion()
  }
  const onSaveCode = () => {
    setShowSavePromptModal(true)
  }

  const onSaveQuestionModal = () => {
    const payload = {
      userId,
      questionName,
      prompt: generatedCode,
    }
    fetch("/api/prompt/save", {
      method: "POST",
      body: JSON.stringify(payload),
    }).then((res) => console.log("res:", res))
  }

  function getCodeGeniusMode() {
    if (smartSelected) {
      return (
        <div className="inline-flex">
          <Code size={18} color={colors.mint} className="mr-1.5  " />
          <span className="text-mint">Code suggestion mode</span>{" "}
        </div>
      )
    } else if (testSelected) {
      return (
        <div className="inline-flex">
          <CurlyBraces size={18} color={colors.mint} className="mr-1.5  " />
          <span className="text-mint">Test generation mode</span>{" "}
        </div>
      )
    } else if (improveSelected) {
      return (
        <div className="inline-flex">
          <Rocket size={18} color={colors.mint} className="mr-1.5  " />
          <span className="text-mint">Improvements mode</span>{" "}
        </div>
      )
    } else if (docSelected) {
      return (
        <div className="inline-flex">
          <FileCode size={18} color={colors.mint} className="mr-1.5  " />
          <span className="text-mint">Documentation mode</span>{" "}
        </div>
      )
    }
  }

  const stopGeneration = async () => {
    setLoading(false)
    controller.abort()
    if (!reader) {
      return
    }
    try {
      await reader.cancel()
      // setReader(null);
    } catch (error: any) {
    } finally {
      setReader(null)
    }
  }
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuestionName(event.target.value)
  }

  const generatedMessages = useMemo(
    () => generatedCode.split("<>").filter((i) => i !== ""),
    [generatedCode],
  )
  const LogoCodeGenius = useMemo(
    () => (
      <Image
        src={"/logo/code-genius.svg"}
        width={32}
        height={32}
        className={"right-8"}
        alt="Code Genius"
      />
    ),
    [],
  )

  return (
    <div className="w-full sm:ml-10">
      <div
        ref={chatContainerRef}
        id="container"
        className="ml-0 mt-16 flex max-h-[90vh] flex-col items-start justify-start overflow-y-scroll pb-24 sm:ml-8 sm:justify-between"
      >
        <div className="w-full">
          <div className="sm:text-1xl mx-auto w-full border-b-[1px] border-gray-400 text-center text-[13px] uppercase ">
            {getCodeGeniusMode()}
          </div>
          <Editor
            padding={20}
            textareaId="code-editor"
            placeholder={placeHolderText}
            className="max-h[500px] mb-8 w-full rounded-lg border-none bg-purple-900 pb-6 pt-4 font-mono text-gray-200 focus:border-none focus:shadow-none focus:ring-0 focus:ring-purple-700 active:border-purple-700 "
            value={codeSentence}
            highlight={(code) => highlight(code, languages.js)}
            onValueChange={(code) => setCodeSentence(code)}
          />
          {generatedMessages && (
            <CombinedMessages
              logoCodeGenius={LogoCodeGenius}
              generatedMessages={generatedMessages}
            />
          )}
        </div>
      </div>
      <FooterSection
        testFrameworkElements={testFrameworkElements}
        testLibElements={testLibElements}
        testLibElement={testLibElement}
        setTestLib={setTestLib}
        setTestFrameworkElement={setTestFrameworkElement}
        testFrameworkElement={testFrameworkElement}
        mode={mode}
        setUserHasAResponse={setUserHasAResponse}
        generatedCode={generatedCode}
        onSaveCode={onSaveCode}
        langElement={langElement}
        libElements={libElements}
        langElements={langElements}
        loading={loading}
        setLangElement={setLangElement}
        lib={lib}
        setLib={setLib}
        onCodeGeneration={onCodeGeneration}
      />
      <Modal
        title={CREDITS_MODAL_COPY.title}
        isCreditsModal
        body={CREDITS_MODAL_COPY.description}
        isOpen={creditsModaIsOpen}
        buttonText={CREDITS_MODAL_COPY.callToAction}
        buttonLink="/pricing"
        setIsOpen={setCreditsModaIsOpen}
      />
      <Modal
        body="Our servers are taking longer than expected. We suggest
        rewording your instruction or input to get a faster result."
        isOpen={modaIsOpen}
        buttonText="Ok"
        setIsOpen={setModaIsOpen}
      />
      <Modal
        savePropmptName
        isPromptModal
        body="What should we call this question?"
        onSave={onSaveQuestionModal}
        isOpen={showSavePromptModal}
        propmptName={questionName}
        handleInputChange={handleInputChange}
        buttonText="Save"
        setIsOpen={setShowSavePromptModal}
      />
    </div>
  )
}
