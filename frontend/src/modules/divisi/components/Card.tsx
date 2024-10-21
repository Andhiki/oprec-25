import React from 'react';

interface CardProps {
  variant: string;
  title: string;
}

const Card: React.FC<CardProps> = ({ variant, title }) => {
  return (
    <div className="bg-custom-gray-dark rounded-lg p-4 w-80">
      <div className={`text-xs bg-custom-black rounded-sm px-2 py-1 w-fit ${variant === "omahti" ? 'text-custom-orange' : 'text-custom-lavender'}`}>
        {variant === "omahti" ? "OmahTI" : "Himakom"}
      </div>

      <div className="text-5xl text-custom-silver font-bold mt-4 w-fit">
        {title}
      </div>

      <button className="bg-custom-gray text-custom-silver font-medium mt-6 py-2 px-4 w-full rounded-md">
        Selengkapnya
      </button>
    </div>
  );
};

export default Card;
