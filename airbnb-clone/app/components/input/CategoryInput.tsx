"use client";

interface CategoryInputProps {
   IconComponent: React.FC<{ size: number }>;
   label: string;
   selected?: boolean;
   onClick: (value: string) => void;
}

const CategoryInput: React.FC<CategoryInputProps> = ({
   IconComponent,
   label,
   selected,
   onClick,
}) => {
   return (
      <div
         onClick={() => onClick(label)}
         className={` rounded-xl border-2 p-4 flex flex-col gap-3 hover:border-black transition cursor-pointer ${selected ? "border-black" : "border-neutral-200"}
   `}
      >
         <IconComponent size={25} />
         <div className="font-semibold">{label}</div>
      </div>
   );
};

export default CategoryInput;
