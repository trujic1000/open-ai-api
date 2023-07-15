"use client"

import { ReactNode } from "react"

type ShowCaseCardProps = {
  image?: any
  title: string
  description?: string
  button?: ReactNode
  videoSrc?: string
}

export default function ShowCaseCard({
  title,
  description,
  videoSrc,
  image,
  button,
}: ShowCaseCardProps) {
  return (
    <div className="relative  mx-auto flex h-auto  w-full items-center overflow-hidden rounded-2xl border border-mint/70 bg-purple-700 p-6 text-center font-sans shadow-xl outline-none focus-visible:ring-2 sm:min-h-[404px] sm:w-[80%] md:h-[5.625rem]">
      <div className="flex w-full flex-col pr-2 sm:flex-row">
        <div className="w-full">
          <h3 className="absolute top-8 mx-auto mb-8 flex w-full items-center justify-center bg-gradient-to-r from-mint to-blue bg-clip-text p-2 text-center text-4xl font-bold leading-[44px] text-transparent sm:ml-0 sm:w-full sm:pl-3 sm:text-5xl">
            {title}
          </h3>
          <p className="mx-2 mt-28 p-2 text-center text-2xl text-gray-200 sm:mt-20 sm:text-left sm:text-3xl">
            {description}
          </p>
          {button && (
            <div className="ml-4 mt-4 flex justify-center sm:items-start sm:justify-start">
              {button}
            </div>
          )}
        </div>
        {videoSrc && (
          <video
            className="mx-auto mt-16 mr-6"
            width="400"
            height="321"
            poster="static/codevspilot.svg"
            controls
          >
            <source src={videoSrc} type="video/mp4"></source>
          </video>
        )}
        {image && (
          <div className="mr-6 hidden  sm:absolute sm:right-40 sm:mb-20 sm:block">
            {image}
          </div>
        )}
      </div>
    </div>
  )
}
