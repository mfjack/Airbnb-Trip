"use client";

import Image from "next/image";
import ProfileAvatar from "@/public/images/placeholder.jpg";

interface AvatarProps {
    src: string | null | undefined 
}

const Avatar: React.FC<AvatarProps> = ({ src }) => {
    return (
        <>
            <Image
                className="rounded-full"
                src={src || ProfileAvatar}
                alt="Avatar"
                width={30}
                height={30}
            />
        </>
    );
};

export default Avatar;
