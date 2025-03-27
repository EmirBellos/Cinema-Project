import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineLocalMovies } from "react-icons/md";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      {/**Contenedor de todo el menú */}
      <div className="max-w-md w-full p-6 space-y-8">
        {/**Contenido de todo el menú */}
        {/* Logo */}
        <div className="flex justify-center">
          <MdOutlineLocalMovies className="size-16 sm:size-20 md:size-24 lg:size-32 xl:size-40"/>
        </div>

        {/* Slogan */}
        <h2 className="text-center text-2xl font-semibold text-gray-800">
          Vive la mejor experiencia
        </h2>
        {/**Div contenedor de botones */}
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center">
          <Link to="/Cartelera" className="inline-flex justify-center">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
              Ver Cartelera
            </button>
          </Link>
          <Link to="/EditarReserva" className="inline-flex justify-center">
            <button className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
              Editar Reserva
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
