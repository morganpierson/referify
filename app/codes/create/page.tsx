import CreateCodeForm from '@/components/CreateCodeForm'
import { auth } from '@clerk/nextjs'

const NewCodePage = async () => {
  const { userId } = await auth()

  return (
    <div className="flex m-auto bg-cyan-400 w-full min-h-screen">
      <CreateCodeForm user={userId} />
    </div>
  )
}

export default NewCodePage
