import CreateCodeForm from "@/components/CreateCodeForm"
import { auth } from "@clerk/nextjs"

const NewCodePage = async () => {
    const { userId } = await auth()


    return (
        <CreateCodeForm user={userId}/>
    )
}

export default NewCodePage