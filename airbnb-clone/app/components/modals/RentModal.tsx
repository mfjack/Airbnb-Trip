"use client";

import useRentModal from "@/app/hooks/useRentModal";
import Modal from "./Modal";
import { useMemo, useState } from "react";
import Heading from "../Heading";
import Categories, { categories } from "../navbar/Categories";
import CategoryInput from "../input/CategoryInput";
import { FieldValues, useForm } from "react-hook-form";
import CountrySelect from "../input/CountrySelect";
import dynamic from "next/dynamic";
import Counter from "../input/Counter";

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

   const [step, setStep] = useState(STEPS.CATEGORY);

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

   const actionLabel = useMemo(() => {
      if (step === STEPS.PRICE) {
         return "Create";
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

   return (
      <Modal
         isOpen={rentModal.isOpen}
         onClose={rentModal.onClose}
         onSubmit={onNext}
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
