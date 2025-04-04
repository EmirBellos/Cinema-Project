import React from "react";
import { Link } from "react-router-dom";
import KarateKid from "../assets/KarateKid.png";

// Array de películas provicional 
const mock_Movies = [
  {
    id: 1,
    title: "Karate Kid",
    imageUrl: KarateKid,
    release_date: "2024-01-01",
    rating: 8.5,
    overview: "Descripción de la película 1",
  },
  {
    id: 2,
    title: "Película 2",
    imageUrl: "/url-imagen-1.jpg",
    release_date: "2024-01-01",
    rating: 8.5,
    overview: "Descripción de la película 2",
  },
  {
    id: 3,
    title: "Película 3",
    imageUrl: "/url-imagen-1.jpg",
    release_date: "2024-01-01",
    rating: 8.5,
    overview: "Descripción de la película 3",
  },
  {
    id: 4,
    title: "Película 4",
    imageUrl: "/url-imagen-1.jpg",
    release_date: "2024-01-01",
    rating: 8.5,
    overview: "Descripción de la película 4",
  },
  {
    id: 5,
    title: "Película 5",
    imageUrl: "/url-imagen-1.jpg",
    release_date: "2024-01-01",
    rating: 8.5,
    overview: "Descripción de la película 5",
  },
  // ... más películas
];

export default function Cartelera() {
  return (
    <div className="min-h-screen pt-28 lg:pt-32 px-4 sm:px-6 lg:px-8 mb-10"> {/* Ajustado pt-28/32 para compensar el header */}
      <div className="max-w-7xl mx-auto">
        {/* Título de la sección */}
        <h2 className="text-3xl font-bold text-light-black mb-8 text-center">
          Cartelera
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {mock_Movies.map((movie) => (
            <div
              key={movie.id}
              className="flex flex-col bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative pt-[150%]">{/* Aspect ratio fijo */}
                <img
                  src={movie.imageUrl}
                  alt={movie.title}
                  className="absolute top-0 left-0 w-full h-full object-cover rounded-t-lg"
                />
              </div>
              <div className="p-4 flex flex-col flex-grow">
                <h2 className="text-xl font-bold">{movie.title}</h2>
                <div className="flex items-center justify-between mt-2">
                <div className="flex items-center">
                    <span className="text-yellow-500">★</span>
                    <span className="ml-1 text-gray-600">{movie.rating}</span>
                  </div>
                  <p className="text-sm text-gray-600">{movie.release_date}</p>
                </div>
                <Link to="/DatosReserva" className="mt-4">
                  <button className="w-full px-4 py-2 mt-3 bg-green-800 text-white rounded-full hover:bg-button-green transition-colors duration-300">
                    Info
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
