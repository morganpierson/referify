'use client'

import Image from 'next/image'
import copy from 'clipboard-copy'
import { useEffect, useState } from 'react'
import { ClipboardDocumentIcon } from '@heroicons/react/24/outline'
import CopyToClipboardButton from './CopyClipboardButton'

export const CodeCard = ({ code, parentStyle }) => {
  console.log('CODE ', code)

  const [isCopied, setIsCopied] = useState(false)

  const handleCopyClick = async ({ text }) => {
    try {
      await copy(text)
      setIsCopied(true)
    } catch (error) {
      console.error('Failed to copy text to clipboard', error)
    }
  }

  return (
    <div className="text-black flex  border border-gray-200 gap-4 items-center justify-between mt-4 py-4 px-4 rounded-md sm:max-w-[90%] mx-auto hover:border-gray-400 hover:shadow-sm">
      <div className="flex items-center gap-2">
        <Image
          src={code.companyLogo}
          alt={code.company}
          width={48}
          height={48}
          className="rounded-full"
        />
        <h2 className="font-semibold">{code.companyName}</h2>-
        <p className="font-thin">{code.details}</p>
      </div>
      <div className="flex items-center gap-2 text-indigo-600 hover:cursor-pointer">
        <p
          className={`font-semibold ${
            isCopied ? 'visibility:hidden' : 'visibile'
          }`}
        >
          {code.code}
        </p>
        {/* <ClipboardDocumentIcon height={20} width={20} /> */}
        <CopyToClipboardButton text={code.code} className={'fill-green-600'} />
      </div>
    </div>
  )
}
