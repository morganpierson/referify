// components/CopyToClipboardButton.js
// @ts-nocheck
import { useState, useEffect } from 'react'
import copy from 'clipboard-copy'
import { ClipboardDocumentIcon } from '@heroicons/react/24/outline'

import { CheckCircleIcon } from '@heroicons/react/20/solid'
import { Span } from 'next/dist/trace'

const CopyToClipboardButton = ({ text, className }) => {
  const [isCopied, setIsCopied] = useState(false)

  const handleCopyClick = async () => {
    try {
      await copy(text)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 3000)
    } catch (error) {
      console.error('Failed to copy text to clipboard', error)
    }
  }

  return (
    <button onClick={handleCopyClick}>
      {isCopied ? (
        <span>
          <CheckCircleIcon height={20} width={20} className={className} />{' '}
        </span>
      ) : (
        <ClipboardDocumentIcon height={20} width={20} />
      )}
    </button>
  )
}

export default CopyToClipboardButton
