import DeployButton from "../components/DeployButton";
import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import ConnectSupabaseSteps from "@/components/tutorial/ConnectSupabaseSteps";
import SignUpUserSteps from "@/components/tutorial/SignUpUserSteps";
import Header from "@/components/Header";
import { UserButton, auth } from "@clerk/nextjs";
import { prisma } from "@/utils/db"; 
import { fetchReferalCodes } from "@/utils/actions";
import Link from "next/link";

export default async function Index() {

  const canInitSupabaseClient = () => {
    // This function is just for the interactive tutorial.
    // Feel free to remove it once you have Supabase connected.
    try {
      createClient();
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();

  const referalCodes =  await fetchReferalCodes();

  const { userId } = await auth()
  console.log('USER ID ', userId)
  let match
  let userOrg
  if (userId) {
    match = await prisma.user.findUnique({
      where: {
        clerkId: userId as string,
      },
    })
    
  }

  let href = match ? `/codes/create` : '/new-user'
  console.log("REFERAL CODES ", referalCodes)
  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center bg-cyan-100">
      <div className="flex justify-end w-[80%] mt-6">
        <UserButton afterSignOutUrl="/" />
      </div>
      <div className="border border-gray-500 rounded-md bg-white mx-12 px-4 py-4  min-w-[80%]">
      
        <div className="flex justify-between items-center">
        <p className="font-medium text-xl">Post Codes. Get Paid.</p>
        
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
      <input
          type="email"
          name="email"
          id="email"
          className="rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 min-w-96 px-3 h-12 mt-6"
          placeholder="Credit card, clothing, sports & outdoors, etc."
        />
        {referalCodes.map((code) => (
        <div>
          {code.company}
        </div>
      ))}
      </div>
      
    </div>
  );
}
