"use client";

import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";
import useRentModal from "@/app/hooks/useRentModal";

interface UserMenuProps {
   currentUser: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
   const registerModal = useRegisterModal();
   const loginModal = useLoginModal();
   const rentModal = useRentModal();
   const [isOpen, setIsOpen] = useState(false);

   const toggleOpen = useCallback(() => {
      setIsOpen((value) => !value);
   }, []);

   const onRent = useCallback(() => {
      if (!currentUser) {
         return loginModal.onOpen;
      }

      rentModal.onOpen();
   }, [currentUser, loginModal, rentModal]);

   return (
      <div className="relative">
         <div className="flex flex-row items-center gap-3">
            <button
               className="hidden md:block sm:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition"
               onClick={onRent}
            >
               Airbnb Home
            </button>
            <button
               className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full hover: shadow-md transition"
               onClick={toggleOpen}
            >
               <AiOutlineMenu />
               <div className="hidden md:block">
                  <Avatar src={currentUser?.image} />
               </div>
            </button>
         </div>
         {isOpen && (
            <div className="absolute rounded-xl shadow-md w-[40] md:w-32 bg-white overflow-hidden right-0 top-12 text-sm">
               <div className="flex flex-col cursor-pointer">
                  {currentUser ? (
                     <>
                        <MenuItem onClick={rentModal.onOpen} label="Airbnb Home" />
                        <MenuItem onClick={() => {}} label="Reserva" />
                        <MenuItem onClick={() => {}} label="Viagens" />
                        <MenuItem onClick={() => {}} label="Favorito" />
                        <MenuItem onClick={() => {}} label="Propriedade" />
                        <hr />
                        <MenuItem onClick={() => signOut()} label="Sair" />
                     </>
                  ) : (
                     <>
                        <MenuItem onClick={loginModal.onOpen} label="Entrar" />
                        <MenuItem onClick={registerModal.onOpen} label="Criar conta" />
                     </>
                  )}
               </div>
            </div>
         )}
      </div>
   );
};

export default UserMenu;
