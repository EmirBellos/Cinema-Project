import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ListMoviesContext } from "../Context/ListMoviesContext";
import BannerCartelera from "../Components/BannerCartelera";
import SearchBar from "../Components/SearchBar";

// Icons
import { FaTheaterMasks } from "react-icons/fa";
import { HiTicket } from "react-icons/hi2";

export default function Cartelera() {
  const {
    moviesList,
    searchTerm,
    searchResults,
    handleMovieSelection,
    clearSearch,
    cleanShowsProcess,
  } = useContext(ListMoviesContext);

  // Determina la lista de películas a mostrar: resultados de búsqueda o catálogo completo
  const moviesToDisplay = searchTerm ? searchResults : moviesList;

  const navigate = useNavigate();

  // Limpia la búsqueda cuando el componente se desmonta
  useEffect(() => {
    return () => {
      clearSearch();
      cleanShowsProcess();
    };
  }, []);

  return (
    <>
      {/** Banner con imagen de la película destacada aleatoria */}
      <BannerCartelera />

      {/* Ajustado pt-28/32 para compensar el header */}
      <div className="min-h-screen pt-4 lg:pt-6 px-2 sm:px-6 lg:px-8 pb-10 bg-gray-background">
        <div className="max-w-7xl mx-auto">
          {/* Título de la sección */}
          <h2 className="text-2xl sm:text-3xl font-bold text-light-black my-6 sm:my-8 text-center">
            Cartelera
          </h2>
          <SearchBar />

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {moviesToDisplay.map((movie) => (
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
                  </div>

                  <button
                    className="w-full flex justify-center items-center mt-2 sm:mt-4 px-2 sm:px-4 py-1 sm:py-2 bg-green-800 text-white text-sm sm:text-base rounded-full hover:bg-button-green transition-colors duration-300"
                    onClick={() => handleMovieSelection(movie.id, navigate)}
                  >
                    <HiTicket className="mr-2" />
                    Horarios
                  </button>
                </div>
              </div>
            ))}
          </div>
          {/** Mensaje cuando se encuentran resultados */}
          {searchTerm && searchResults.length === 0 && (
            <div className="flex-col flex items-center">
              <div className="text-center pt-8 pb-4">
                <p className="text-second-blue lg:text-xl md:text-sm capitalize">
                  La película que buscas no se encuentra disponible.
                </p>
              </div>
              <FaTheaterMasks className="text-second-blue size-16 lg:size-24" />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
