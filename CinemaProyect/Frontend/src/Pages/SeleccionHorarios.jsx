import React, { useState } from "react";
import BannerHorarios from "../Components/SelecHoraComponents/BannerHorarios";
import SelecCiudadBar from "../Components/SelecHoraComponents/SelecCiudadBar";
import SeccionFechaYHora from '../Components/SelecHoraComponents/SeccionFechaYHora';

export default function SeleccionHorarios() {
  
  return (
    <>
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
    </>
  );
}
