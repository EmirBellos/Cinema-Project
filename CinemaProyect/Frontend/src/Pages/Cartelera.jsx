import React from "react";
import { Link } from "react-router-dom";
import KarateKid from "../assets/KarateKid.png";
import BannerCartelera from '../Components/BannerCartelera';

// Array de películas provicional
const mock_Movies = [
  {
    id: 1,
    title: "The Social Network",
    imageUrl: "https://m.media-amazon.com/images/M/MV5BMjlkNTE5ZTUtNGEwNy00MGVhLThmZjMtZjU1NDE5Zjk1NDZkXkEyXkFqcGc@._V1_SX300.jpg",
    release_date: "2010-10-01",
    rating: 7.8,
    overview: "Descripción de la película 1",
  },
  {
    id: 2,
    title: "Better Man",
    imageUrl: "https://m.media-amazon.com/images/M/MV5BYWU3YzU0NTItMGVlYi00YTFmLWE5MmQtNjg4ODQ3ZWYyNjRkXkEyXkFqcGc@._V1_SX300.jpg",
    release_date: "2024-01-01",
    rating: 9.5,
    overview: "Descripción de la película 2",
  },
  {
    id: 3,
    title: "Mulholland Drive",
    imageUrl: "https://m.media-amazon.com/images/M/MV5BNjliY2UwMjQtYjVlNi00NzExLTg1MDMtMjE2OTYwYjI0NTcxXkEyXkFqcGc@._V1_SX300.jpg",
    release_date: "2001-01-01",
    rating: 9.8,
    overview: "Descripción de la película 3",
  },
  {
    id: 4,
    title: "Dogville",
    imageUrl: "https://m.media-amazon.com/images/M/MV5BMTkwNTg2MTI1NF5BMl5BanBnXkFtZTcwMDM1MzUyMQ@@._V1_SX300.jpg",
    release_date: "2003-04-03",
    rating: 8.0,
    overview: "Descripción de la película 4",
  },
  {
    id: 5,
    title: "Reservoir Dogs",
    imageUrl: "https://m.media-amazon.com/images/M/MV5BMmMzYjg4NDctYWY0Mi00OGViLWIzMTMtYWNlZGY5ZDJmYjk3XkEyXkFqcGc@._V1_SX300.jpg",
    release_date: "1997-09-02",
    rating: 8.3,
    overview: "Descripción de la película 5",
  },
  {
    id: 6,
    title: "La La Land",
    imageUrl: "https://m.media-amazon.com/images/M/MV5BMzUzNDM2NzM2MV5BMl5BanBnXkFtZTgwNTM3NTg4OTE@._V1_SX300.jpg",
    release_date: "2016-12-25",
    rating: 8.0,
    overview: "Descripción de la película 5",
  },
  {
    id: 7,
    title: "The Thing",
    imageUrl: "https://m.media-amazon.com/images/M/MV5BYTA3NDU5MWEtNTk4Yy00ZDNkLThmZTQtMjU3ZGVhYzAyMzU4XkEyXkFqcGc@._V1_SX300.jpg",
    release_date: "1982-06-25",
    rating: 8.2,
    overview: "Descripción de la película 5",
  },
  {
    id: 8,
    title: "Titane",
    imageUrl: "https://m.media-amazon.com/images/M/MV5BM2ZhZjE2MDEtY2EwNS00MzA5LTkxZTctOGQ5MDE0NTQ2YzdmXkEyXkFqcGc@._V1_SX300.jpg",
    release_date: "2021-10-01",
    rating: 6.5,
    overview: "Descripción de la película 5",
  },
  {
    id: 9,
    title: "The Maze Runner",
    imageUrl: "https://m.media-amazon.com/images/M/MV5BMjUyNTA3MTAyM15BMl5BanBnXkFtZTgwOTEyMTkyMjE@._V1_SX300.jpg",
    release_date: "2014-09-19",
    rating: 6.8,
    overview: "Descripción de la película 5",
  },
  {
    id: 10,
    title: "How To Train Your Dragon",
    imageUrl: "https://m.media-amazon.com/images/M/MV5BMjA5NDQyMjc2NF5BMl5BanBnXkFtZTcwMjg5ODcyMw@@._V1_SX300.jpg",
    release_date: "2010-03-26",
    rating: 8.1,
    overview: "Descripción de la película 5",
  },
  {
    id: 11,
    title: "Kung Fu Panda 2",
    imageUrl: "https://m.media-amazon.com/images/M/MV5BYmIxMGYzMTUtZDQzYy00ODc4LWE1YzQtZGMwYTc0YTYyYTE0XkEyXkFqcGc@._V1_SX300.jpg",
    release_date: "2011-05-26",
    rating: 7.3,
    overview: "Descripción de la película 5",
  },
  {
    id: 12,
    title: "500 Days Of Summer",
    imageUrl: "https://m.media-amazon.com/images/M/MV5BMTk5MjM4OTU1OV5BMl5BanBnXkFtZTcwODkzNDIzMw@@._V1_SX300.jpg",
    release_date: "2009-08-07",
    rating: 7.7,
    overview: "Descripción de la película 5",
  },
  // ... más películas
];

export default function Cartelera() {
  return (
    <>
      {/** Banner con imagen de la película más reciente o mejor rankeada */}
      <BannerCartelera />

      {/* Ajustado pt-28/32 para compensar el header */}
      <div className="min-h-screen pt-14 lg:pt-16 px-2 sm:px-6 lg:px-8 pb-10 bg-gray-background">
        <div className="max-w-7xl mx-auto">
          {/* Título de la sección */}
          <h2 className="text-2xl sm:text-3xl font-bold text-light-black my-6 sm:my-8 text-center">
            Cartelera
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {mock_Movies.map((movie) => (
              <div
                key={movie.id}
                className="flex flex-col bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="relative pt-[150%]">
                  {/* Aspect ratio fijo */}
                  <img
                    src={movie.imageUrl}
                    alt={movie.title}
                    className="absolute top-0 left-0 w-full h-full object-cover rounded-t-lg"
                  />
                </div>
                <div className="p-2 sm:p-4 flex flex-col flex-grow">
                  <h2 className="text-sm sm:text-xl font-bold truncate">
                    {movie.title}
                  </h2>
                  <div className="flex items-center justify-between mt-1 sm:mt-2">
                    <div className="flex items-center">
                      <span className="text-yellow-500">★</span>
                      <span className="ml-1 text-xs sm:text-sm text-gray-600">
                        {movie.rating}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600">
                      {movie.release_date}
                    </p>
                  </div>
                  <Link to="/DatosReserva" className="mt-2 sm:mt-4">
                    <button className="w-full px-2 sm:px-4 py-1 sm:py-2 bg-green-800 text-white text-sm sm:text-base rounded-full hover:bg-button-green transition-colors duration-300">
                      Info
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
