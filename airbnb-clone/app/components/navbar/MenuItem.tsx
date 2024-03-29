"use client";

interface MenuItemProp {
    onClick: () => void;
    label: string;
}

const MenuItem: React.FC<MenuItemProp> = ({ onClick, label }) => {
    return (
        <button
            className="relative px-4 py-3 hover:bg-neutral-100 transition font-semibold"
            onClick={onClick}
        >
            {label}
        </button>
    );
};

export default MenuItem;
