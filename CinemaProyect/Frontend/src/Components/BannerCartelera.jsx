import React, { useContext } from "react";
import KarateKid from "../assets/KarateKid.png";
import { Link } from "react-router-dom";
import { ListMoviesContext } from "../Context/ListMoviesContext";

export default function BannerCartelera() {
  const { getMovieById } = useContext(ListMoviesContext);
  const featuredMovie = getMovieById(2);

  // Manejo de estados de carga y error
  if (!featuredMovie) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="relative w-full pt-16 sm:pt-20">
      {/* Contenedor principal con aspect ratio */}
      <div className="relative aspect-[4/3] sm:aspect-[16/9] md:aspect-[2/1] lg:aspect-[2.5/1]">
        <img
          src={featuredMovie.imageUrl}
          alt={featuredMovie.title}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/** Overlay con gradientes para que la info se vizualice correctamente */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent">
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        </div>

        {/** Info del Banner */}
        <div className="absolute inset-0 flex items-end ">
          <div className="w-full px-4 sm:px-6 lg:px-8 pb-4 sm:pb-8 md:pb-12">
            <div className="max-w-xl space-y-2 sm:space-y-4">
              <span className="inline-block px-2 sm:px-3 py-1 sm:py-2 bg-red-600 text-white text-xs sm:text-sm rounded-full">
                Destacada
              </span>

              {/** Titulo de la Película */}
              <h3 className="text-2x1 sm:text-3xl md:text-4xl lg:text-5xl text-white font-bold tracking-tight">
                {featuredMovie.title}
              </h3>

              {/** Año, clasificación y duración */}
              <div className="flex items-center gap-2 sm:gap-4 text-sm sm:text-base text-white/90">
                <span>{featuredMovie.release_date}</span>
                <span>|</span>
                <span>PG</span>
                <span>|</span>
                <span>126 min</span>
              </div>

              {/** Sinopsís */}
              <p className="text-white/80 text-xs sm:text-sm md:text-base max-w-prose line-clamp-2 sm:line-clamp-none">
                {featuredMovie.overview}
              </p>

              <div className="flex gap-2 sm:gap-4 pt-2 sm:pt-4">
                <Link to="/DatosReserva">
                  <button className="px-3 sm:px-6 py-1.5 sm:py-2 text-sm sm:text-base bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                    Ver Detalles
                  </button>
                </Link>
                <a
                  href="https://www.youtube.com/watch?v=r_8Rw16uscg&pp=ygUUa2FyYXRlIGtpZCAxIHRyYWlsZXPSBwkJfgkBhyohjO8%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="px-3 sm:px-6 py-1.5 sm:py-2 text-sm sm:text-base bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors">
                    Ver Trailer
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
