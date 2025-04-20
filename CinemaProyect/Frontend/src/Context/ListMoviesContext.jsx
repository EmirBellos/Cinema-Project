import { createContext, useEffect, useState, useCallback } from "react";
import { mock_Movies as data } from "../Data/mock_Movies";

export const ListMoviesContext = createContext();

export function ListMoviesContextProvider(props) {
  const [moviesList, setMoviesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [totalTickets, setTotalTickets] = useState(null);

  // Función para limpiar búsqueda (Importante: Definirla anted de todas las funciones antes del return)
  const clearSearch = () => {
    setSearchTerm("");
    setSearchResults([]);
  };
  // Función para limpiar la selección de película
  const cleanSelection = () => {
    setSelectedMovie(null);
  };
  // Función para limpiar la selección de datos de Reserva (Ciudad, Fecha y Hora)
  const clearSelection = () => {
    setSelectedCity(null);
    setSelectedDate(null);
    setSelectedTime(null)
    setTotalTickets(null);
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
  const handleMovieSelection = useCallback((movieId) => {
    console.log("Buscando película con ID:", movieId);
    const movie = moviesList.find((movie) => movie.id === movieId);
    console.log("Película encontrada:", movie);
    setSelectedMovie(movie);
  });


  // Funciones que actualizan el estado global de la reserva (Lugar, Fecha y Hora)
  // 1.- Función para manejar la ciudad seleccionada
  const handleCityChange = useCallback((value) => {
    setSelectedCity(value);
    console.log("Ciudad Seleccionada:", value);
  }, []);
  // 2.- Función para manejar la fecha seleccionada
  const handleDateSelection = useCallback((date) => {
    setSelectedDate(date);
    console.log("Fecha seleccionada:", selectedDate);
  }, []);
  // 3.- Función para manejar la hora seleccionada
  const handleTimeSelection = useCallback((time) => {
    setSelectedTime(time);
    console.log("Horario seleccionado:", selectedTime);
  }, []);
  // 4.- Función para manejar la seleccion de boletos
  const handleTicketsSelection = useCallback((tickets) => {
    setTotalTickets(tickets);
    console.log("Total de Boletos seleccionados:", totalTickets);
  }, []);

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

  // Efecto para monitorear cambios en los estados
  useEffect(() => {
    console.log({
      movie: selectedMovie,
      city: selectedCity,
      date: selectedDate,
      time: selectedTime,
      tickets: totalTickets,
    });
  }, [selectedMovie, selectedCity, selectedDate, selectedTime, totalTickets]);

  // Función para validar que todos los datos necesarios estén seleccionados
  const areSelectionsComplete = useCallback(() => {
    return selectedMovie && selectedCity && selectedDate && selectedTime && totalTickets;
  }, [selectedMovie, selectedCity, selectedDate, selectedTime, totalTickets]);

  return (
    <ListMoviesContext.Provider
      value={{
        moviesList,
        loading,
        clearSearch,
        clearSelection,
        cleanSelection,
        searchMovies,
        searchResults,
        searchTerm,
        selectedMovie,
        handleMovieSelection,
        selectedCity,
        handleCityChange,
        handleDateSelection,
        selectedDate,
        handleTimeSelection,
        selectedTime,
        areSelectionsComplete,
        handleTicketsSelection,
      }}
    >
      {props.children}
    </ListMoviesContext.Provider>
  );
}
