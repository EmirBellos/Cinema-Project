import { createContext, useEffect, useState } from "react";
import { mock_Movies as data } from "../Data/mock_Movies";

export const ListMoviesContext = createContext();

export function ListMoviesContextProvider(props) {
  const [moviesList, setMoviesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  // Función para limpiar búsqueda (Importante: Definirla anted de todas las funciones antes del return)
  const clearSearch = () => {
    setSearchTerm("");
    setSearchResults([]);
  };
  const getMovieById = (id) => {
    return moviesList.find((movie) => movie.id === id) || null;
  };

  // Función que maneja la búsqueda de películas en tiempo real
  // Recibe el término de búsqueda como parámetro y actualiza los estados
  // searchTerm y searchResults. Si el término está vacío, limpia los resultados
  const searchMovies = (term) => {
    setSearchTerm(term);
    if (term.trim() === " ") {
      setSearchTerm("");
      setSearchResults([]);
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

  // Función que actualiza el estado global con la película seleccionada
  // Busca la película por ID en la lista y la guarda en el contexto
  const handleMovieSelection = (movieId) => {
    console.log("Buscando película con ID:", movieId);
    const movie = moviesList.find((movie) => movie.id === movieId);
    console.log("Película encontrada:", movie);
    setSelectedMovie(movie);
  };

  // Función para limpiar la selección de película
  const cleanSelection = () => {
    setSelectedMovie(null);
  };

  // Funciones que actualizan el estado global de la reserva (Lugar, Fecha y Hora)
  // 1.- Función para manejar la ciudad seleccionada
  const handleCityChange = (value) => {
    setSelectedCity(value);
    console.log("Ciudad Seleccionada:", value);
  };
  // 2.- Función para manejar la fecha seleccionada
  const handleDateSelection = (date) => {
    setSelectedDate(date);
    console.log("Fecha seleccionada:", selectedDate);
  };
  // 3.- Función para manejar la hora seleccionada
  const handleTimeSelection = (time) => {
    setSelectedTime(time);
    console.log("Horario seleccionado:", selectedTime);
  };

  useEffect(() => {
    try {
      console.log("Cargando películas...");
      setMoviesList(data);
      setLoading(false);
    } catch (error) {
      console.error("Error loading movies:", error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    console.log("Selected Movie actualizada:", selectedMovie);
    console.log("Selected City actualizada: ", selectedCity);
  }, [selectedMovie]);

  return (
    <ListMoviesContext.Provider
      value={{
        moviesList,
        loading,
        getMovieById,
        clearSearch,
        searchMovies,
        searchResults,
        searchTerm,
        selectedMovie,
        handleMovieSelection,
        cleanSelection,
        handleCityChange,
        handleDateSelection,
        selectedDate,
        handleTimeSelection,
        selectedTime,
      }}
    >
      {props.children}
    </ListMoviesContext.Provider>
  );
}
