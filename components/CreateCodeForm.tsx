'use client'

import { createReferalCode } from '@/utils/actions'
import { stat } from 'fs'
import { useState } from 'react'
import { useFormState } from 'react-dom'
import { SearchBar } from './SearchBar'

const categoryOptions = [
  'Credit Cards',
  'Fashion',
  'Travel',
  'Gaming',
  'Home & Garden',
  'Health & Fitness',
  'Food & Drink',
  'Entertainment',
  'Automotive',
  'Other',
  'Business',
  'Gifts',
  'Pets',
  'Kids',
  'Insurance',
  'Crypto',
].sort()

const subCategory = {
  'Credit Cards': [
    'Travel Rewards',
    'Cash Back',
    'Balance Transfer',
    '0% APR',
    'Business',
    'Student',
    'Secured',
    'Prepaid',
    'Charge Cards',
    'Other',
  ],
  Fashion: ['Discounts', 'Cash Back', 'Free Shipping', 'Other'],
  Travel: [
    'Hotels',
    'Flights',
    'Car Rentals',
    'Vacation Packages',
    'Cruises',
    'Travel Insurance',
    'Other',
  ],
  Electronics: [
    'Computers',
    'Cell Phones',
    'TVs',
    'Cameras',
    'Headphones',
    'Speakers',
    'Other',
  ],
  'Home & Garden': [
    'Furniture',
    'Appliances',
    'Home Decor',
    'Gardening',
    'Other',
  ],
  'Health & Fitness': [
    'Gym Memberships',
    'Fitness Equipment',
    'Supplements',
    'Healthy Foods',
    'Other',
  ],
  'Food & Drink': ['Restaurants', 'Groceries', 'Meal Kits', 'Alcohol', 'Other'],
  Entertainment: [
    'Movies',
    'Concerts',
    'Sporting Events',
    'Streaming Services',
    'Other',
  ],
  Education: ['Online Courses', 'Books', 'School Supplies', 'Other'],
  Automotive: [
    'Car Insurance',
    'Car Loans',
    'Car Parts',
    'Car Rentals',
    'Other',
  ],
  Other: ['Other'],
  Business: ['Software', 'Marketing', 'Web Hosting', 'Other'],
  Pets: ['Pet Food', 'Pet Supplies', 'Pet Insurance', 'Other'],
  Kids: ['Toys', 'Clothes', 'Books', 'Other'],
  Insurance: ['Auto', 'Home', 'Life', 'Health', 'Other'],
  Crypto: ['Transfer Rewards', 'Cash Back', 'Other'],
}

const CreateCodeForm = ({ user }: { user: any }) => {
  const [state, setState] = useState({
    author: user,
    url: '',
    details: '',
    category: categoryOptions[0],
    subCategory: subCategory[categoryOptions[0]][0],
    code: '',
  })
  const [prevState, formAction] = useFormState<typeof prevState, FormData>(
    createReferalCode,
    {
      author: user,
      url: '',
      details: '',
      category: state.category,
      subCategory: state.subCategory,
      code: '',
    }
  )

  // const url = `https://api.brandfetch.io/v2/search/${searchValue}`

  const handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    setState({
      ...state,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="bg-white p-12 m-auto rounded-lg sm:max-w-2xl shadow-lg border border-gray-800 shadow-cyan-600">
      <form action={formAction}>
        <div className="border-grey-300 flex items-center flex-col sm:m-w-md sm:max-h-lg">
          <input type="hidden" name="author" value={user} />
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Share Your Code
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Spread the love. Share your code. Get that bread.
              </p>

              <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="url"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Business URL
                  </label>

                  <div className="mb-2 flex mt-2">
                    <SearchBar placeholder="chase" id={'url'} name={'url'} />
                    {/* <input
                  type="text"
                  name="url"
                  id="url"
                  className="p-1.5 block flex-1 border-0 rounded-md ring-gray-300 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="chase.com"
                /> */}
                  </div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Code
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="text"
                        name="code"
                        id="code"
                        className="p-1.5 block flex-1 rounded-md ring-gray-300 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 border"
                        placeholder="MYCODE1234"
                      />
                    </div>
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Code Benefits Details
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="details"
                      name="details"
                      rows={3}
                      className="p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder={
                        'Earn 10,000 points when you spend $1000 or more in the first 3 months of opening your account.'
                      }
                    />
                  </div>
                </div>
                <div className="flex gap-6">
                  <div>
                    <label
                      htmlFor="category"
                      className="text-sm font-medium leading-6 text-gray-900"
                    >
                      Code Category
                    </label>
                    <select
                      id="category"
                      name="category"
                      className="mt-2 rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={handleChange}
                    >
                      {categoryOptions.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="subCategory"
                      className="text-sm font-medium leading-6 text-gray-900"
                    >
                      Sub-Category
                    </label>
                    <select
                      id="subCategory"
                      name="subCategory"
                      className="mt-2 rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      defaultValue={subCategory[state['category']]}
                      onChange={handleChange}
                    >
                      {subCategory[state.category].map((subcat) => (
                        <option key={subcat} value={subcat}>
                          {subcat}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6 w-full">
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default CreateCodeForm
