import Image from "next/image";
import Logo from "@/public/images/logo.png";

const Logotipo = () => {
    return (
        <>
            <Image src={Logo} alt="Logo" width={100} height={100} />
        </>
    );
};

export default Logotipo;
