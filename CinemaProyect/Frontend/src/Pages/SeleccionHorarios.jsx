import React, { useState } from "react";
import BannerHorarios from "../Components/SelecHoraComponents/BannerHorarios";

const cities = ["Cancún", "Chetumal", "Playa del Carmen", "Mérida", "Campeche"];

export default function SeleccionHorarios() {
  const [selectedCity, setSelectedCity] = useState("");

  const handleCityChange = (value) => {
    setSelectedCity(value);
    console.log("Ciudad Seleccionada:", value);
  };

  return (
    <>
      <BannerHorarios />
      <div className="min-h-screen pt-4 lg:pt-6 px-2 sm:px-6 lg:px-8 pb-10 bg-red-300">
        {/** Contenido de la página SeleccionHorarios */}
        <div className="max-w-7xl mx-auto">
          {/* Título de la sección */}
          <h2 className="text-2xl sm:text-3xl font-bold text-light-black my-6 sm:my-8 text-center">
            Horarios
          </h2>
          <div className="w-full max-w-auto mx-auto mb-8">
            <div className="relative z-10">
              <select
                onChange={(e) => handleCityChange(e.target.value)}
                value={selectedCity}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 
                          appearance-none bg-white focus:outline-none focus:ring-2 
                          focus:ring-red-500 cursor-pointer text-base sm:text-sm"
              >
                <option value="" disabled>
                  Selecciona tu ciudad...
                </option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
