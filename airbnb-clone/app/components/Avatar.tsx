"use client";

import Image from "next/image";
import ProfileAvatar from "@/public/images/placeholder.jpg";

const Avatar = () => {
    return (
        <>
            <Image className="rounded-full" src={ProfileAvatar} alt="Avatar" width={30} height={30} />
        </>
    );
};

export default Avatar;
