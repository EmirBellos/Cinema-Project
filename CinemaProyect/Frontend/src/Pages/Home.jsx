import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineLocalMovies } from "react-icons/md";
import { ListMoviesContext } from "../Context/ListMoviesContext";

export default function Home() {
  const { cleanSelection, cleanShowsProcess } = useContext(ListMoviesContext);
  const navigate = useNavigate();
  
  // Limpia la selección de película 
  useEffect(() => {
    return () => {
      cleanSelection();
      cleanShowsProcess();
    };
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-background">
      {/**Contenedor de todo el menú */}
      <div className="w-[90%] sm:w-[85%] md:max-w-md mx-auto p-6 space-y-8 bg-white rounded-lg border-2 border-black">
        {/**Contenido de todo el menú */}
        {/* Logo */}
        <div className="flex justify-center">
          <MdOutlineLocalMovies
            className="size-16 sm:size-20 md:size-24 lg:size-32 xl:size-40 
                      text-primary-purple hover:text-secondary-purple
                        transition-all duration-300 hover:scale-110"
          />
        </div>

        {/* Slogan */}
        <h2 className="text-center text-2xl font-semibold text-gray-800">
          Vive la mejor experiencia
        </h2>
        {/**Div contenedor de botones */}
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center">
          <button
            className="px-6 py-3 bg-green-800 text-white rounded-lg hover:bg-button-green transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
            onClick={() => navigate("/Cartelera")}
          >
            Ver Cartelera
          </button>

          <button
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
            onClick={() => navigate("/EditarReserva")}
          >
            Editar Reserva
          </button>
        </div>
      </div>
    </div>
  );
}
