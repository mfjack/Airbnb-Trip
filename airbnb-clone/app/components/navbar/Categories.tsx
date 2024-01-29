"use client";

import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import Container from "../Container";
import {
    GiBoatFishing,
    GiCactus,
    GiCastle,
    GiCaveEntrance,
    GiForestCamp,
    GiIsland,
    GiWindmill,
} from "react-icons/gi";
import { BsSnow } from "react-icons/bs";
import { FaSkiing } from "react-icons/fa";
import { MdOutlineVilla } from "react-icons/md";
import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";
import { IoDiamond } from "react-icons/io5";

export const categories = [
    {
        label: "Praia",
        icon: TbBeach,
        description: "Está propriedade fica perto da praia",
    },
    {
        label: "Moinho",
        icon: GiWindmill,
        description: "Está propriedade tem moinhos de vento",
    },
    {
        label: "Moderna",
        icon: MdOutlineVilla,
        description: "Está propriedade é moderna",
    },
    {
        label: "Interior",
        icon: TbMountain,
        description: "Está propriedade fica no interior",
    },
    {
        label: "Piscina",
        icon: TbPool,
        description: "Está propriedade tem piscina",
    },
    {
        label: "Ilha",
        icon: GiIsland,
        description: "Está propriedade é na ilha",
    },
    {
        label: "Lagoa",
        icon: GiBoatFishing,
        description: "Está propriedade é próxima da lagoa",
    },
    {
        label: "Neve",
        icon: FaSkiing,
        description: "Está propriedade tem actividade de Ski",
    },
    {
        label: "Castelo",
        icon: GiCastle,
        description: "Está propriedade é um castelo",
    },
    {
        label: "Acampamento",
        icon: GiForestCamp,
        description: "Está propriedade é um acampamento",
    },
    {
        label: "Ártico",
        icon: BsSnow,
        description: "Está propriedade é no Ártico",
    },
    {
        label: "Caverna",
        icon: GiCaveEntrance,
        description: "Está propriedade fica na caverna",
    },
    {
        label: "Deserto",
        icon: GiCactus,
        description: "Está propriedade fica no deserto",
    },
    {
        label: "Luxo",
        icon: IoDiamond,
        description: "Está propriedade é luxuosa",
    },
];

const Categories = () => {
    const params = useSearchParams();
    const category = params?.get("category");
    const pathname = usePathname();

    const isMainPage = pathname === "/";

    if (!isMainPage) {
        return null;
    }

    return (
        <Container>
            <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
                {categories.map((item) => (
                    <CategoryBox
                        key={item.label}
                        label={item.label}
                        selected={category === item.label}
                        icon={item.icon}
                    />
                ))}
            </div>
        </Container>
    );
};

export default Categories;
