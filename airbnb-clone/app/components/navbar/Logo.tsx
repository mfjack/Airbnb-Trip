"use client";

import Image from "next/image";
import Logo from "@/public/images/logo.png";
import { useRouter } from "next/navigation";

const Logotipo = () => {
   const router = useRouter();

   return (
      <>
         <Image
            className="cursor-pointer hidden md:block"
            onClick={() => router.push("/")}
            src={Logo}
            alt="Logo"
            width={100}
            height={100}
         />
      </>
   );
};

export default Logotipo;
