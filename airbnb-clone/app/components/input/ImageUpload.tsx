"use client";

import { Value } from "@prisma/client/runtime/library";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";

declare global {
    var cloudinary: any;
}

interface ImageUploadProps {
    onChange: (Value: string) => void;
    value: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
    const handleUpload = useCallback((result: any) => {
        onChange(result.info.secure_url);
    }, []);

    return (
        <CldUploadWidget
            onUpload={handleUpload}
            uploadPreset="ui3q4ljo"
            options={{ maxFiles: 1 }}
        >
            {({ open }: { open?: () => void }) => (
                <>
                    <div
                        className="relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600"
                        onClick={() => open?.()}
                    >
                        <TbPhotoPlus size={40} />
                        <div className="font-semibold text-lg">
                            Adicionar imagem
                        </div>
                        {value && (
                            <div className="absolute inset-0 w-full h-full">
                                <Image
                                    src={value}
                                    alt="Upload"
                                    style={{ objectFit: "cover" }}
                                    fill
                                />
                            </div>
                        )}
                    </div>
                </>
            )}
        </CldUploadWidget>
    );
};

export default ImageUpload;
