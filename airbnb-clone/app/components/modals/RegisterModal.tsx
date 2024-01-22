"use client";

import axios from "axios";

import useRegisterModal from "@/app/hooks/useREgisterModal";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Modal from "./Modal";
import Heading from "../Heading";

const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading title='Bem-vindo(a) ao Airbnb' subtitle="Criar conta" />
        </div>
    );

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios
            .post("api/register", data)
            .then(() => {
                registerModal.onClose();
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <Modal
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title="Registro"
            actionLabel="Continue"
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
        />
    );
};

export default RegisterModal;
