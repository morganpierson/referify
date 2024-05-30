// @ts-nocheck
import DeployButton from '../components/DeployButton'
import AuthButton from '../components/AuthButton'
import { createClient } from '@/utils/supabase/server'
import Header from '@/components/Header'
import { UserButton, auth } from '@clerk/nextjs'
import { prisma } from '@/utils/db'
import { fetchReferalCodes, filterReferalCodes } from '@/utils/actions'
import Link from 'next/link'
import { CodeCard } from '@/components/CodeCard'
import CodeFilter from '@/components/CodeFilter'

export default async function Index() {
  const canInitSupabaseClient = () => {
    // This function is just for the interactive tutorial.
    // Feel free to remove it once you have Supabase connected.
    try {
      createClient()
      return true
    } catch (e) {
      return false
    }
  }

  const isSupabaseConnected = canInitSupabaseClient()

  const referalCodes = await fetchReferalCodes()

  console.log('REFERAL CODES ', referalCodes)

  const { userId } = await auth()
  let match
  let userOrg
  if (userId) {
    match = await prisma.user.findUnique({
      where: {
        clerkId: userId as string,
      },
    })
  }

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
  ]

  const brandOptions: string[] = []

  referalCodes.forEach((code) => {
    brandOptions.includes(code.companyName)
      ? null
      : brandOptions.push(code.companyName)
  })

  let href = match ? `/codes/create` : '/new-user'
  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center bg-cyan-400">
      <div className="border border-gray-500 rounded-md bg-white mt-16 mx-12 px-4 py-4  min-w-[70%] shadow-lg shadow-cyan-600">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-medium text-xl text-black">
              Share and discover referal codes
            </p>
            <p className="text-gray-500 font-light">
              Unlock discounts, cash back, rewards, and more.
            </p>
          </div>
          <div>
            <Link href={href}>
              <button
                type="button"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Post a Code
              </button>
            </Link>
          </div>
        </div>

        <CodeFilter
          categoryFilters={categoryOptions}
          brandOptions={brandOptions}
          Select={filterReferalCodes}
        />

        {referalCodes.map((code) => (
          <CodeCard key={code.id} code={code} />
        ))}
      </div>
    </div>
  )
}
