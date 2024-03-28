"use server"
import { redirect } from 'next/navigation'
import { prisma } from './db'
import { getUserByClerkID } from './auth'
import { revalidatePath } from 'next/cache'

export const fetchReferalCodes = async () => {
    const referalCodes = await prisma.referralCode.findMany({})
    return referalCodes
}

export const createReferalCode = async (prevState: {
    author: any,
    url: string,
    details: string,
    category: string,
    subCategory: string,
    code: string,
}, formData: FormData) => {
    const user = await prisma.user.findUnique({
        where: {
            clerkId: formData.get('author') as string,
        },
    })
    const searchValue = formData.get('url') as string
    const url = `https://api.brandfetch.io/v2/search/${searchValue}`

    try {

        const res = await fetch(url);
        if (res.ok) {
            const data = await res.json();
            console.log("DATAAA ", data)
          }
    }
    catch (err) {
        console.log("Something went wrong, try again later.");
      }
    console.log("USER ", user)
    // const data = await prisma.referralCode.create({
    //     data: {
    //         author: {
    //             connect: {
    //                 id: user?.id
    //             }
    //         },
    //         company: formData.get('url') as string,
    //         details: formData.get('details') as string,
    //         category: formData.get('category') as string,
    //         subCategory: formData.get('subCategory') as string,
    //         code: formData.get('code') as string,
    //     }
        
    // })
    console.log("PREV STATE ", prevState)
    console.log("FORM DATA ", formData)
    // redirect('/')
}