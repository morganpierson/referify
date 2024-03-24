import Image from "next/image"

export const CodeCard = ({code}) => {
 return (
    <div>
        <Image src={code.image} alt={code.company} width={200} height={200} />
    </div>
 )
}