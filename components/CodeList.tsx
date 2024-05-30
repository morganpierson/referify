'use client'

import { CodeCard } from './CodeCard'
import CodeFilter from './CodeFilter'
import { useState } from 'react'

const CodeList = ({ referalCodes }) => {
  const [state, setState] = useState({
    selectedFilters: [],
    codeList: referalCodes,
  })
  return (
    <div>
      <CodeFilter
        filters={categoryOptions}
        Select={filterReferalCodes}
        handleFilterSelect={(e) => {
          setState({ ...state, selectedFilters: e.target.value })
        }}
      />
      {codeList.map((code) => (
        <CodeCard key={code.id} code={code} />
      ))}
    </div>
  )
}

export default CodeList
