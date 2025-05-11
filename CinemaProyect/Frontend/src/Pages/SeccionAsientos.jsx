import React, { useContext } from "react";
import SelecCantidadBoletos from "../Components/SelecHoraComponents/SelecCantidadBoletos";
import { ListMoviesContext } from "../Context/ListMoviesContext";
import MovieInfoCard from "../Components/SelecHoraComponents/MovieInfoCard";
import CinemaSeats from "../Components/SelecHoraComponents/CinemaSeats";

export default function SeccionAsientos() {
  // Corregir error: al salir a la seccion de asientos (utilizando el header, o la navegación en chrome), no se borra el id de la ultimá pelicula seleccionada y eso crea un conflicto.
  const { selectedMovie } = useContext(ListMoviesContext);
  return (
    <>
      <SelecCantidadBoletos />
        {/* Título de la sección */}
        <div className="min-h-screen pt-4 lg:pt-6 px-2 sm:px-6 lg:px-8 pb-10 bg-gray-background">
        <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-light-black  mt-20 mb-6 sm:mt-22 sm:mb-12 text-center">
          Selecciona tus Asientos
        </h2>
      <div className="container mx-auto px-4 py-8">

          <div className="w-full max-w-auto mx-auto mb-8">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="lg:w-2/3 space-y-6">
                <div className="space-y-4">
                  {/**Cambiar estilos para añadir el nuevo componente */}
                  <CinemaSeats />
                </div>
                {/* Información de la película (derecha) */}
              </div>
              <div className="lg:w-1/3">
                <MovieInfoCard />
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
