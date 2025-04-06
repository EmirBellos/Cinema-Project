import { createContext, useEffect, useState } from "react";
import { mock_Movies as data } from "../Data/mock_Movies";

export const ListMoviesContext = createContext();

export function ListMoviesContextProvider(props) {
  const [moviesList, setMoviesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const getMovieById = (id) => {
    return moviesList.find((movie) => movie.id === id) || null;
  };

  // Función para buscar películas
  const searchMovies = (term) => {
    setSearchTerm(term);
    if (term.trim() === " ") {
      setSearchTerm([]);
      return;
    }
    // Filtros de búsqueda
    const filtered = moviesList.filter(
      (movie) =>
        movie.title.toLowerCase().includes(term.toLowerCase()) ||
        movie.release_date.toLowerCase().includes(term.toLowerCase())
    );
    setSearchResults(filtered);
  };

  useEffect(() => setMoviesList(data), []);

  return (
    <ListMoviesContext.Provider
      value={{
        moviesList,
        loading,
        getMovieById,
        searchMovies,
        searchResults,
        searchTerm,
      }}
    >
      {props.children}
    </ListMoviesContext.Provider>
  );
}
