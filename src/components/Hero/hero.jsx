import React from 'react';
import BG from '/src/assets/immo.jpg';
import { IoIosMail } from "react-icons/io";

const Hero = () => {
  return (
    <>
      <div
        className="bg-cover bg-center h-[800px] flex items-center"
        style={{
          backgroundImage: `url(${BG})`,
        }}
      >
        <div className="container mx-auto flex flex-col items-center justify-center h-full">
          <div className="w-11/12 sm:w-2/3 lg:flex justify-center items-center flex-col mb-5 sm:mb-10">
            <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
              <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Immo</span>Coin
            </h1>
            <p className="px-8 text-white text-center font-extrabold mt-8 mb-12 text-lg">
              L'immobilier à votre service !
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
