import React, { useContext, useEffect, useState } from "react";
import BannerHorarios from "../Components/SelecHoraComponents/BannerHorarios";
import SelecCiudadBar from "../Components/SelecHoraComponents/SelecCiudadBar";
import SeccionFechaYHora from "../Components/SelecHoraComponents/SeccionFechaYHora";
import SeccionAsientos from "./SeccionAsientos";
import { ListMoviesContext } from "../Context/ListMoviesContext";
import { useNavigate } from "react-router-dom";

export default function SeleccionHorarios() {
  const { clearSelection, showChangeData, } = useContext(ListMoviesContext);

  /* const handleChangeSection = (value) => {
    setChangeSection(value);
  }; */

   /* useEffect(() => {
    // Si no hay película seleccionada, redirige a Cartelera
    if (!hasValidMovieSelection()) {
      console.log("No hay película seleccionada. Redirigiendo a Cartelera...");
      navigate('/Cartelera');
    }
  }, [hasValidMovieSelection, navigate]); */

  // Limpia la búsqueda cuando el componente se desmonta
   useEffect(() => {
    return () => {
      // Solo limpia la selección si el usuario está abandonando el proceso completo
      // No si solo está cambiando entre diferentes estados dentro del proceso
      if (window.location.pathname !== "/SeleccionHorarios") {
        clearSelection();
      }
    };
  }, [clearSelection]);

  return (
    <>
      {showChangeData ? (
        <SeccionAsientos />
      ) : (
        <div>
          <BannerHorarios />
          <div className="min-h-screen pt-4 lg:pt-6 px-2 sm:px-6 lg:px-8 pb-10 bg-gray-background">
            {/** Contenido de la página SeleccionHorarios */}
            <div className="max-w-7xl mx-auto">
              {/* Título de la sección */}
              <h2 className="text-2xl sm:text-3xl font-bold text-light-black my-6 sm:my-8 text-center">
                Horarios
              </h2>
              <div className="w-full max-w-auto mx-auto mb-8">
                <SelecCiudadBar />
                {/** Sección de horarios disponibles */}
                <SeccionFechaYHora />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
