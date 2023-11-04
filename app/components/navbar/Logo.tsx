'use client';

import Image from "next/image"
import { useRouter } from "next/navigation";


type Props = {}

const Logo = (props: Props) => {
  return (
    <Image alt="Logo" className="hidden md:block cursor-pointer" height={100} width={100} src="/images/logo.png">
        
    </Image>
  )
}

export default Logo