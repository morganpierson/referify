'use client'

import { ChangeEvent, useCallback, FormEvent, useEffect, useState } from 'react'
//   import {
//     SWrapper,
//     SProvidedBy,
//     SQueriesWrapper,
//     SQueries,
//     SQueryImage,
//     SQueryDomain,
//     SNotFoundIcon,
//     SQueryName,
//     SQuery,
//     SLabelPrefix,
//     SLabelSuffix,
//     SNotFound,
//     SInput
//   } from "./Autocomplete.style";
//   import { faMagnifyingGlass, faTimes } from "@fortawesome/free-solid-svg-icons";
//   import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/20/solid'

type TQuery = {
  name: string
  domain: string
  icon: string
}

export type TAutocomplete = {
  value: string
  query?: TQuery
  queries: TQuery[]
}

interface IAutocomplete {
  // onSubmit: ({ value, queries, query }: TAutocomplete) => void;
  placeholder: string
  id: string
  name: string
}

export const SearchBar = ({ placeholder, id, name }: IAutocomplete) => {
  const [value, setValue] = useState({ text: '', active: false })
  const [queries, setQueries] = useState<TQuery[]>([])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    const text = queries?.[0]?.domain || value.text
    //   onSubmit({ value: text, query: undefined, queries });
    setValue({ text, active: false })
    setQueries([])
  }

  const handleClick = (query: TQuery) => {
    //   onSubmit({ value: value.text, query, queries });
    setValue({ text: query.domain, active: false })
  }

  const reset = () => {
    setQueries([])
    setValue({ text: '', active: false })
  }

  const getQueries = useCallback(async (searchValue: string) => {
    if (searchValue !== '') {
      try {
        const url = `https://api.brandfetch.io/v2/search/${searchValue}`

        const res = await fetch(url)
        if (res.ok) {
          const data = await res.json()
          setQueries(data)
        }
      } catch (err) {
        console.log('Something went wrong, try again later.')
      }
      return
    }

    setQueries([])
  }, [])

  useEffect(() => {
    getQueries(value.text)
  }, [getQueries, value.text])

  return (
    <div>
      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
        <input
          placeholder={placeholder}
          value={value.text}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setValue({ text: e.target.value, active: true })
          }
          className="p-1.5 block flex-1 rounded-md ring-gray-300 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 border"
          id={id}
          name={name}
        />
      </div>
      {value.text !== '' && (
        <label
          onClick={() => reset()}
          className="mr-3 absolute cursor-pointer mt-3"
        >
          <XMarkIcon />
        </label>
      )}

      {value.active && value.text !== '' && (
        <div className="sm:max-w-md mt-2">
          {queries.length ? (
            <div className="flex flex-col gap-2 overflow-scroll z-10 absolute bg-white">
              {queries.map((query, i) => (
                <div
                  key={i}
                  onClick={() => handleClick(query)}
                  className="flex items-center justify-between sm:max-w-md hover:bg-gray-300 hover:cursor-pointer px-4 py-2"
                >
                  <div className="rounded-md flex items-center gap-2">
                    <img
                      src={query.icon}
                      alt={query.name}
                      className="rounded-full"
                    />

                    <p>{query.name || query.domain}</p>
                  </div>
                  <p>{query.domain}</p>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <div>
                <MagnifyingGlassIcon height={4} width={4} />
              </div>

              <p className="bold">Nothing found...</p>

              <br />

              <p>Search by entering it’s website URL for better result.</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
