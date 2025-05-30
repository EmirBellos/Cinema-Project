import React, { useEffect, useContext, useState } from "react";
import { ListMoviesContext } from "../../Context/ListMoviesContext";

const cities = ["Cancún", "Chetumal", "Playa del Carmen", "Mérida", "Campeche"];

export default function SelecCiudadBar() {
  const { handleCityChange, selectedCity } = useContext(ListMoviesContext);

  return (
    <>
      <div className="relative z-10">
        <select
          autoFocus
          value={selectedCity || ""}
          onChange={(e) => {
            const selectedValue = e.target.value === "" ? null : e.target.value;
            handleCityChange(selectedValue);
          }}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 
                          appearance-none bg-white focus:outline-none focus:ring-2 
                          focus:ring-red-500 cursor-pointer text-base sm:text-sm"
        >
          <option value="">Selecciona tu ciudad...</option>
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
    </>
  );
}
