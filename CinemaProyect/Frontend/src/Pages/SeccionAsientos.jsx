import React, { useContext } from "react";
import SelecCantidadBoletos from "../Components/SelecHoraComponents/SelecCantidadBoletos";
import { ListMoviesContext } from "../Context/ListMoviesContext";
import MovieInfoCard from "../Components/SelecHoraComponents/MovieInfoCard";

export default function SeccionAsientos() {
  const { selectedMovie } = useContext(ListMoviesContext);
  return (
    <>
      <SelecCantidadBoletos />
        <div className="container mx-auto px-4 py-8">
          {/* Título de la sección */}
          <h2 className="text-2xl sm:text-3xl font-bold text-light-black  mt-20 mb-6 sm:mt-22 sm:mb-12 text-center">
            Selecciona tus Asientos
          </h2>
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3 space-y-6 flex justify-center items-center">
              {/**Cambiar estilos para añadir el nuevo componente */}
              <h1>seccion con asientos dinamicos</h1>
            </div>
            {/* Información de la película (derecha) */}
            <div className="lg:w-1/3">
              <MovieInfoCard />
            </div>
          </div>
        </div>
      
    </>
  );
}
