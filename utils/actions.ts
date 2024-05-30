'use server'
import { redirect } from 'next/navigation'
import { prisma } from './db'

export const fetchReferalCodes = async () => {
  const referalCodes = await prisma.referralCode.findMany({})
  return referalCodes
}

export const filterReferalCodes = async (
  prevState: { selectedFilters: [] },
  formData: FormData
) => {
  console.log('FILTERS ', formData.entries())
}

export const createReferalCode = async (
  prevState: {
    author: any
    url: string
    details: string
    category: string
    subCategory: string
    code: string
  },
  formData: FormData
) => {
  const user = await prisma.user.findUnique({
    where: {
      clerkId: formData.get('author') as string,
    },
  })
  const searchValue = formData.get('url') as string
  const url = `https://api.brandfetch.io/v2/search/${searchValue}`

  try {
    const res = await fetch(url)
    if (res.ok) {
      const brandData = await res.json()
      console.log('DATAAA ', brandData)
      const data = await prisma.referralCode.create({
        data: {
          author: {
            connect: {
              id: user?.id,
            },
          },
          companyName: brandData[0].name,
          companyUrl: brandData[0].domain,
          companyLogo: brandData[0].icon,
          details: formData.get('details') as string,
          category: formData.get('category') as string,
          subCategory: formData.get('subCategory') as string,
          code: formData.get('code') as string,
        },
      })
    }
  } catch (err) {
    console.log('Something went wrong, try again later.', err)
  }
  redirect('/')
}
