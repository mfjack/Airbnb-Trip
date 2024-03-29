"use client";

import useRentModal from "@/app/hooks/useRentModal";
import Modal from "./Modal";
import { useMemo, useState } from "react";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategoryInput from "../input/CategoryInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import CountrySelect from "../input/CountrySelect";
import dynamic from "next/dynamic";
import Counter from "../input/Counter";
import ImageUpload from "../input/ImageUpload";
import Input from "../input/Input";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5,
}

const RentModal = () => {
    const rentModal = useRentModal();
    const router = useRouter();

    const [step, setStep] = useState(STEPS.CATEGORY);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
        reset,
    } = useForm<FieldValues>({
        defaultValues: {
            category: "",
            location: null,
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            imageSrc: "",
            price: 1,
            title: "",
            description: "",
        },
    });

    const category = watch("category");
    const location = watch("location ");
    const guestCount = watch("guestCount");
    const roomCount = watch("roomCount");
    const bathroomCount = watch("bathroomCount");
    const imageSrc = watch("imageSrc");

    const Map = useMemo(
        () =>
            dynamic(() => import("@/app/components/Map"), {
                ssr: false,
            }),
        [location]
    );

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
        });
    };

    const onBack = () => {
        setStep((value) => value - 1);
    };

    const onNext = () => {
        setStep((value) => value + 1);
    };

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (step !== STEPS.PRICE) {
            return onNext();
        }
        setIsLoading(true);

        axios
            .post("/api/listings", data)
            .then(() => {
                toast.success("Lista criada");
                router.refresh();
                reset();
                setStep(STEPS.CATEGORY);
                rentModal.onClose();
            })
            .catch(() => {
                toast.error("Algo deu errado");
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const actionLabel = useMemo(() => {
        if (step === STEPS.PRICE) {
            return "Criar";
        }

        return "Próximo";
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.CATEGORY) {
            return undefined;
        }

        return "Voltar";
    }, [step]);

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
                title="Qual desse lugar te descreve melhor?"
                subtitle="Escolha uma categoria"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
                {categories.map((item) => (
                    <div className="col-span-1" key={item.label}>
                        <CategoryInput
                            onClick={(category) => setCustomValue("category", category)}
                            selected={category === item.label}
                            label={item.label}
                            IconComponent={item.icon}
                        />
                    </div>
                ))}
            </div>
        </div>
    );

    if (step === STEPS.LOCATION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Onde fica sua localização?"
                    subtitle="Ajude os hóspedes a encontrar você!"
                />
                <CountrySelect
                    value={location}
                    onChange={(value) => setCustomValue("location", value)}
                />
                <Map center={location?.latlng} />
            </div>
        );
    }

    if (step === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Compartilha informações básica da sua casa"
                    subtitle="Quantos quartos você tem?"
                />
                <Counter
                    title="Convidados"
                    subtitle="Qual o número máximo de convidados?"
                    value={guestCount}
                    onChange={(value) => setCustomValue("guestCount", value)}
                />
                <hr />
                <Counter
                    title="Quartos"
                    subtitle="Quantidades de quarto que tem?"
                    value={roomCount}
                    onChange={(value) => setCustomValue("roomCount", value)}
                />
                <hr />
                <Counter
                    title="Banheiros"
                    subtitle="Quantidades de banheiro que tem?"
                    value={bathroomCount}
                    onChange={(value) => setCustomValue("bathroomCount", value)}
                />
            </div>
        );
    }

    if (step === STEPS.IMAGES) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Adicione uma foto"
                    subtitle="Mostre aos hóspedes seu imóvel"
                />
                <ImageUpload
                    value={imageSrc}
                    onChange={(value) => setCustomValue("imageSrc", value)}
                />
            </div>
        );
    }

    if (step === STEPS.DESCRIPTION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Como você descreve o seu lugar?"
                    subtitle="Pequeno e aconchegante"
                />
                <Input
                    id="title"
                    label="Título"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <hr />
                <Input
                    id="description"
                    label="Descrição"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        );
    }

    if (step === STEPS.PRICE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title="Defina o valor" subtitle="Qual o valor da diária?" />

                <Input
                    id="price"
                    label="Preço"
                    formatPrice={true}
                    type="number"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        );
    }

    return (
        <Modal
            isOpen={rentModal.isOpen}
            onClose={rentModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
            title="Airbnb Home"
            body={bodyContent}
            disabled={false}
        />
    );
};

export default RentModal;
