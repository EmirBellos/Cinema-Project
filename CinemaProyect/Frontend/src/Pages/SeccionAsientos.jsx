import React, { useContext } from "react";
import SelecCantidadBoletos from "../Components/SelecHoraComponents/SelecCantidadBoletos";
import { ListMoviesContext } from "../Context/ListMoviesContext";

export default function SeccionAsientos() {
  const { selectedMovie } = useContext(ListMoviesContext);
  return (
    <>
      <SelecCantidadBoletos />
      <div className="absolute inset-0 pt-12 lg:pt-16 pb-10 bg-gray-background">
        <div className="max-w-7xl mx-auto">
          {/* Título de la sección */}
          <h2 className="text-2xl sm:text-3xl font-bold text-light-black  mt-20 mb-6 sm:mt-22 sm:mb-12 text-center">
            Selecciona tus Asientos
          </h2>
        </div>
      </div>
    </>
  );
}
