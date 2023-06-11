"use client"

import Modal from "app/components/Modal"
import { KeyboardEvent, useState, useRef, useEffect } from "react"
import Chat from "app/components/shared/Chat"
import Header from "app/components/Header"
import { useSignInModal } from "app/components/modals/SignInModal"
import { generateCodeCompletion } from "utils/generateCode"
import InputChat from "app/components/shared/InputChat"
import { CREDITS_MODAL_COPY } from "@/lib/constants"

export default function Client({ session }) {
  const [creditsModaIsOpen, setCreditsModaIsOpen] = useState(false)
  const { setShowSignInModal } = useSignInModal({})
  const [reader, setReader] =
    useState<ReadableStreamDefaultReader<Uint8Array> | null>(null)
  const [codeSentence, setCodeSentence] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [generatedCode, setGeneratedCode] = useState<string>("")
  // const [showSavePromptModal, setShowSavePromptModal] = useState(false)
  // const [questionName, setQuestionName] = useState("")
  const userId = session && session.user?.id
  const userCredits = session && session.user?.credits
  // const controller = new AbortController()
  const inputRef = useRef<any>(null)
  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus()
    }
  }, [])
  useEffect(() => {
    if (!userCredits || userCredits === 0) {
      setCreditsModaIsOpen(true)
    }
  }, [userCredits])

  const codeMessages = useRef([
    {
      role: "system",
      content:
        "You are a robust and cleaver programming software assistant specializing in Javascript and Typescript. But your knowledge extends to a wide variety of programming skills. Follow user instructions to the letter.",
    },
  ])

  const onArrowPress = () => {
    setIsLoading(true)
    if (!userCredits || userCredits === 0) {
      setCreditsModaIsOpen(true)
      return false
    }
    codeMessages.current = [
      ...codeMessages.current,
      {
        role: "user",
        content: codeSentence,
      },
    ]
    setCodeSentence("")
    generateCodeCompletion(
      setReader,
      setGeneratedCode,
      codeMessages,
      userId,
      setIsLoading,
    )
  }

  const onCodeGeneration = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    setIsLoading(true)
    if (!userCredits || userCredits === 0) {
      setCreditsModaIsOpen(true)
      return false
    }

    if (codeSentence.length === 0 || codeSentence === "") {
      return false
    }
    if (e.key === "Enter") {
      codeMessages.current = [
        ...codeMessages.current,
        {
          role: "user",
          content: codeSentence,
        },
      ]
      setCodeSentence("")
      //Generate Code funciton
      generateCodeCompletion(
        setReader,
        setGeneratedCode,
        codeMessages,
        userId,
        setIsLoading,
      )
    }
  }

  const generatedMessages = generatedCode.split("<>").filter((i) => i !== "")

  return (
    <>
      <Header session={session} setShowSignInModal={setShowSignInModal} />

      {/* Chat Container */}
      <Chat
        generatedResponse={generatedMessages}
        setCodeSentence={setCodeSentence}
      />

      {/* Chat Input at the bottom */}
      <InputChat
        inputRef={inputRef}
        codeSentence={codeSentence}
        setCodeSentence={setCodeSentence}
        onCodeGeneration={onCodeGeneration}
        onArrowPress={onArrowPress}
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
    </>
  )
}

{
  /* <Modal
        body="Our servers are taking longer than expected. We suggest
        rewording your instruction or input to get a faster result."
        isOpen={modaIsOpen}
        buttonText="Ok"
        setIsOpen={setModaIsOpen}
      />
      <Modal
        body="What should we call this question?"
        onSave={onSaveQuestionModal}
        isOpen={showSavePromptModal}
        propmptName={questionName}
        handleInputChange={handleInputChange}
        savePropmptName
        buttonText="Save"
        setIsOpen={setShowSavePromptModal}
      /> */
}
