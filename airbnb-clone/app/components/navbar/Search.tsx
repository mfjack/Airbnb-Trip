"use client";

import { BiSearch } from "react-icons/bi";

const Search = () => {
    return (
        <div className="hidden sm:block border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer">
            <div className="flex flex-row items-center justify-between px-1">
                <div className="hidden sm:block selection:text-sm font-semibold px-6">
                    Em qualquer lugar
                </div>

                <div className="hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center">
                    Qualquer semana
                </div>

                <div className="hidden sm:block text-sm pl-6 pr-2 text-gray-600">
                    Adicionar Pessoas
                </div>

                <div className="hidden sm:block p-2 mx-5 bg-rose-500 rounded-full text-white">
                    <BiSearch size={18} />
                </div>
            </div>
        </div>
    );
};

export default Search;
