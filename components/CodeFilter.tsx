'use client'

import { Fragment, use, useEffect, useState } from 'react'
import { useFormState } from 'react-dom'

import { Disclosure, Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon, FunnelIcon } from '@heroicons/react/20/solid'
import { filterReferalCodes } from '@/utils/actions'

export default function CodeFilter({
  categoryFilters,
  handleFilterSelect,
  applyFilters,
  brandOptions,
}: {
  categoryFilters: any
  handleFilterSelect: any
  applyFilters: any
  brandOptions: any
}) {
  // const [selectedFilters, setSelectedFilters] = useState([])
  // const [prevState, formAction] = useFormState<typeof prevState, FormData>(
  //   filterReferalCodes,
  //   {
  //     selectedFilters: selectedFilters,
  //   }
  // )

  // useEffect(() => {
  //   console.log('SELECTED FILTERS ', selectedFilters)
  // }, [selectedFilters])

  return (
    <div className="bg-white mt-6">
      <Disclosure
        as="section"
        aria-labelledby="filter-heading"
        className="relative z-10 grid items-center border-b border-t border-gray-200 "
      >
        <h2 id="filter-heading" className="sr-only">
          Filters
        </h2>
        <div className="flex col-start-1 row-start-1 py-4 justify-between items-center px-6">
          <div>
            <Disclosure.Button className="group flex items-center font-medium text-gray-700">
              <FunnelIcon
                className="mr-2 h-5 w-5 flex-none text-gray-400 group-hover:text-gray-500"
                aria-hidden="true"
              />
              Filters
            </Disclosure.Button>
          </div>
        </div>
        <Disclosure.Panel className="border-t border-gray-200 pb-10">
          <div className="mx-auto gap-x-4 px-4 text-sm sm:px-6 md:gap-x-6 lg:px-8">
            <div className="auto-rows-min gap-y-4 md:grid-cols-2 md:gap-x-6 grid">
              <fieldset>
                <div className="space-y-2 pt-2 sm:space-y-4 sm:pt-4 grid grid-cols-1 overflow-auto sm:max-h-52">
                  <span className="font-semibold text-md">Category</span>

                  {categoryFilters.map((option: any, optionIdx: number) => (
                    <div
                      key={option.value}
                      className="flex items-center text-base sm:text-sm"
                    >
                      <input
                        id={`price-${optionIdx}`}
                        name={option}
                        defaultValue={option}
                        type="checkbox"
                        className="h-4 w-4 flex-shrink-0 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        // defaultChecked="false"
                        onChange={handleFilterSelect}
                      />
                      <label
                        htmlFor={`price-${optionIdx}`}
                        className="ml-3 min-w-0 flex-1 text-gray-600"
                      >
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>
              <fieldset>
                <div className="space-y-2 pt-2 sm:space-y-4 sm:pt-4 grid grid-cols-1 sm:max-h-64 overflow-scroll">
                  <span className="font-semibold text-md">Brand</span>
                  {brandOptions.map((option: any, optionIdx: number) => (
                    <div
                      key={option.value}
                      className="flex items-center text-base sm:text-sm"
                    >
                      <input
                        id={`price-${optionIdx}`}
                        name={option}
                        defaultValue={option}
                        type="checkbox"
                        className="h-4 w-4 flex-shrink-0 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        // defaultChecked="false"
                        onChange={handleFilterSelect}
                      />
                      <label
                        htmlFor={`price-${optionIdx}`}
                        className="ml-3 min-w-0 flex-1 text-gray-600"
                      >
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>
            </div>
          </div>
          <div className="flex mt-10 ml-8">
            <button
              type="button"
              className="text-gray-500 mr-4 text-sm font-semibold hover:underline"
            >
              Clear all
            </button>

            <button
              type="button"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={applyFilters}
            >
              Apply Filters
            </button>
          </div>
        </Disclosure.Panel>
      </Disclosure>
    </div>
  )
}
