import React, { useContext, useEffect, useState } from "react";
import { ListMoviesContext } from "../../Context/ListMoviesContext";
import { useNavigate } from "react-router-dom";
import { PiTrophyLight } from "react-icons/pi";

export default function BannerHorarios() {
  const { loading, selectedMovie } = useContext(ListMoviesContext);
  //const featuredMovie = getMovieById(2);
  const navigate = useNavigate();

  // Manejo de estados de carga y error
  if (loading) {
    return <div>Cargando...</div>;
  }

  /*// Effect que verifica si hay una película seleccionada
  // Si no existe, redirige al usuario a la cartelera
  useEffect(() => {
    console.log("Componente SeleccionHorarios montado");
    console.log("Selected Movie en SeleccionHorarios:", selectedMovie);

    if (!selectedMovie) {
      console.log("No hay película seleccionada, redirigiendo...");
      navigate("/Cartelera");
    }
  }, [selectedMovie, navigate]);*/

  if (!selectedMovie) {
    navigate("/Cartelera");
    return null;
  }

  return (
    <div className="relative w-full pt-16 sm:pt-20">
      {/* Contenedor principal con aspect ratio */}
      <div className="relative aspect-[4/3] sm:aspect-[16/9] md:aspect-[2/1] lg:aspect-[2.5/1]">
        <img
          src={selectedMovie.secondaryImage}
          alt={selectedMovie.title}
          className="absolute inset-0 w-full h-full  object-cover"
        />
        {/**Añadir nuevas imagenes para el banner. */}

        {/** Overlay con gradientes para que la info se vizualice correctamente */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent">
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        </div>

        {/** Info del Banner */}
        <div className="absolute inset-0 flex items-end ">
          <div className="w-full px-4 sm:px-6 lg:px-8 pb-4 sm:pb-8 md:pb-12">
            <div className="max-w-xl space-y-2 sm:space-y-4">
              {/** Titulo de la Película */}
              <h3 className="text-2x1 sm:text-3xl md:text-4xl lg:text-5xl text-white font-bold tracking-tight">
                {selectedMovie.title}
              </h3>

              {/** Año, clasificación y duración */}
              <div className="flex items-center gap-2 sm:gap-4 text-sm sm:text-base text-white/90">
                <span>{selectedMovie.release_date}</span>
                <span>|</span>
                <span>{selectedMovie.category}</span>
                <span>|</span>
                <span>{selectedMovie.runtime}</span>
              </div>

              {/** Sinopsís */}
              <p className="text-white/80 text-xs sm:text-sm md:text-base max-w-prose line-clamp-2 sm:line-clamp-none capitalize">
                {selectedMovie.overview}
              </p>

              <div className="flex flex-col pt-1 sm:pt-2 text-white/80 text-xs sm:text-sm md:text-base capitalize">
                <p>Genre: {selectedMovie.genre}</p>
                <p>Director: {selectedMovie.director}</p>
                <p>Actors: {selectedMovie.actors}</p>

                <a
                  href={selectedMovie.awards}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <PiTrophyLight className="hover:text-red-500 transition-colors mt-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
