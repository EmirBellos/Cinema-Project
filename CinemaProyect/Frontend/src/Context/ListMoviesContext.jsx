import { createContext, useEffect, useState, useCallback } from "react";
import { mock_Movies as data } from "../Data/mock_Movies";

export const ListMoviesContext = createContext();

export function ListMoviesContextProvider(props) {
  // Inicialización de estados con persistencia desde localStorage
  // Los estados se inicializan desde localStorage si existen, o con valores por defecto si no
  const [moviesList, setMoviesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Estado con persistencia para la película seleccionada
  const [selectedMovie, setSelectedMovie] = useState(() => {
    const saved = localStorage.getItem("selectedMovie");
    return saved ? JSON.parse(saved) : "";
  });

  // Estado con persistencia para la ciudad seleccionada
  const [selectedCity, setSelectedCity] = useState(() => {
    const saved = localStorage.getItem("selectedCity");
    return saved || "";
  });

  // Estado con persistencia para la fecha seleccionada
  const [selectedDate, setSelectedDate] = useState(() => {
    const saved = localStorage.getItem("selectedDate");
    return saved ? JSON.parse(saved) : "";
  });

  // Estado con persistencia para la hora seleccionada
  const [selectedTime, setSelectedTime] = useState(() => {
    const saved = localStorage.getItem("selectedTime");
    return saved ? JSON.parse(saved) : "";
  });

  // Estado con persistencia para el total de boletos
  const [totalTickets, setTotalTickets] = useState(() => {
    const saved = localStorage.getItem("totalTickets");
    return saved ? JSON.parse(saved) : "";
  });

  // Estado con persistencia para el costo de boletos
  const [costTickets, setCostTickets] = useState(() => {
    const saved = localStorage.getItem("costTickets");
    return saved ? parseFloat(saved) : 0;
  });

  // Estado con persistencia para los datos del usuario
  const [userData, setUserData] = useState(() => {
    const saved = localStorage.getItem("userData");
    return saved ? JSON.parse(saved) : null;
  });

  // Estado con persistencia para los asientos seleccionados
  const [selectedSeatsIds, setSelectedSeatsIds] = useState(() => {
    const saved = localStorage.getItem("selectedSeatsIds");
    return saved ? JSON.parse(saved) : [];
  });

  // Estado para rastrear el paso actual del proceso de reserva
  const [bookingStep, setBookingStep] = useState(() => {
    return localStorage.getItem("bookingStep") || "none";
  });

  // UseStates para cambios de formularios dentro de la misma página
  const [showChangeData, setShowChangeData] = useState(false);
  const [showFormDataUser, setShowFormDataUser] = useState(false);
  const [showCancelationModal, setShowCancelationModal] = useState(false);
  const [showButtonPay, setShowButtonPay] = useState(false);

  // Estado para manejar errores en el proceso de reserva
  const [bookingError, setBookingError] = useState(null);

  // Efectos para persistir los estados en localStorage cuando cambian

  // Persistencia de película seleccionada
  useEffect(() => {
    if (selectedMovie) {
      localStorage.setItem("selectedMovie", JSON.stringify(selectedMovie));
      // Actualizar el paso del proceso si estamos avanzando
      if (bookingStep === "none") {
        setBookingStep("movie-selected");
        localStorage.setItem("bookingStep", "movie-selected");
      }
    } else {
      localStorage.removeItem("selectedMovie");
    }
  }, [selectedMovie, bookingStep]);

  // Persistencia de ciudad seleccionada
  useEffect(() => {
    if (selectedCity) {
      localStorage.setItem("selectedCity", selectedCity);
    } else {
      localStorage.removeItem("selectedCity");
    }
  }, [selectedCity]);

  // Persistencia de fecha seleccionada
  useEffect(() => {
    if (selectedDate) {
      localStorage.setItem("selectedDate", JSON.stringify(selectedDate));
    } else {
      localStorage.removeItem("selectedDate");
    }
  }, [selectedDate]);

  // Persistencia de hora seleccionada
  useEffect(() => {
    if (selectedTime) {
      localStorage.setItem("selectedTime", JSON.stringify(selectedTime));
      // Actualizar el paso del proceso si estamos avanzando
      if (bookingStep === "movie-selected") {
        setBookingStep("schedule-selected");
        localStorage.setItem("bookingStep", "schedule-selected");
      }
    } else {
      localStorage.removeItem("selectedTime");
    }
  }, [selectedTime, bookingStep]);

  // Persistencia de total de boletos
  useEffect(() => {
    if (totalTickets) {
      localStorage.setItem("totalTickets", JSON.stringify(totalTickets));
      // Actualizar el paso del proceso si estamos avanzando
      if (bookingStep === "schedule-selected") {
        setBookingStep("tickets-selected");
        localStorage.setItem("bookingStep", "tickets-selected");
      }
    } else {
      localStorage.removeItem("totalTickets");
    }
  }, [totalTickets, bookingStep]);

  // Persistencia de costo de boletos
  useEffect(() => {
    if (costTickets > 0) {
      localStorage.setItem("costTickets", costTickets.toString());
    } else {
      localStorage.removeItem("costTickets");
    }
  }, [costTickets]);

  // Persistencia de asientos seleccionados
  useEffect(() => {
    if (selectedSeatsIds.length > 0) {
      localStorage.setItem(
        "selectedSeatsIds",
        JSON.stringify(selectedSeatsIds)
      );
    } else {
      localStorage.removeItem("selectedSeatsIds");
    }
  }, [selectedSeatsIds]);

  // Persistencia de datos del usuario
  useEffect(() => {
    if (userData) {
      localStorage.setItem("userData", JSON.stringify(userData));
      // Actualizar el paso del proceso si estamos avanzando
      if (bookingStep === "tickets-selected") {
        setBookingStep("user-data-provided");
        localStorage.setItem("bookingStep", "user-data-provided");
      }
    } else {
      localStorage.removeItem("userData");
    }
  }, [userData, bookingStep]);

  // Función centralizada para reiniciar todo el proceso de reserva
  // Esta función limpia todos los estados relacionados con la reserva y el localStorage
  const resetEntireBookingProcess = () => {
    // Limpiar estados de selección
    setSelectedMovie("");
    setSelectedCity("");
    setSelectedDate("");
    setSelectedTime("");
    setTotalTickets("");
    setCostTickets(0);
    setUserData(null);
    setSelectedSeatsIds([]);
    localStorage.removeItem("selectedSeatsIds");

    // Limpiar estado del paso de reserva
    setBookingStep("none");

    // Limpiar estados de UI
    setShowChangeData(false);
    setShowFormDataUser(false);
    setShowCancelationModal(false);
    setShowButtonPay(false);

    // Limpiar errores
    setBookingError(null);

    // Limpiar localStorage relacionado con la reserva
    localStorage.removeItem("selectedMovie");
    localStorage.removeItem("selectedCity");
    localStorage.removeItem("selectedDate");
    localStorage.removeItem("selectedTime");
    localStorage.removeItem("totalTickets");
    localStorage.removeItem("costTickets");
    localStorage.removeItem("userData");
    localStorage.removeItem("bookingStep");

    console.log("Proceso de reserva reiniciado completamente");
  };

  // Función para limpiar búsqueda (Importante: Definirla antes de todas las funciones antes del return)
  const clearSearch = () => {
    setSearchTerm("");
    setSearchResults([]);
  };

  // Función para limpiar la selección de película
  const cleanSelection = () => {
    setSelectedMovie("");
    localStorage.removeItem("selectedMovie");

    // Si estamos limpiando la película seleccionada, también debemos limpiar los pasos posteriores
    clearSelection();

    // Actualizar el paso del proceso
    setBookingStep("none");
    localStorage.setItem("bookingStep", "none");
  };

  // Función para limpiar la selección de datos de Reserva (Ciudad, Fecha y Hora)
  const clearSelection = () => {
    setSelectedCity("");
    setSelectedDate("");
    setSelectedTime("");
    setTotalTickets("");
    setCostTickets(0);

    // Limpiar localStorage relacionado
    localStorage.removeItem("selectedCity");
    localStorage.removeItem("selectedDate");
    localStorage.removeItem("selectedTime");
    localStorage.removeItem("totalTickets");
    localStorage.removeItem("costTickets");

    // Si hay una película seleccionada, actualizar el paso del proceso
    if (selectedMovie) {
      setBookingStep("movie-selected");
      localStorage.setItem("bookingStep", "movie-selected");
    }
  };

  // Función para limpiar los estados de UI relacionados con el proceso de reserva
  const cleanShowsProcess = () => {
    setShowChangeData(false);
    setShowFormDataUser(false);
    setShowCancelationModal(false);
    setShowButtonPay(false);
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
  const handleMovieSelection = useCallback(
    (movieId) => {
      console.log("Buscando película con ID:", movieId);
      try {
        const movie = moviesList.find((movie) => movie.id === movieId);
        console.log("Película encontrada:", movie);

        if (!movie) {
          setBookingError("No se pudo encontrar la película seleccionada");
          return;
        }

        setSelectedMovie(movie);
        setBookingError(null);
      } catch (error) {
        console.error("Error al seleccionar película:", error);
        setBookingError("Error al seleccionar la película");
      }
    },
    [moviesList]
  );

  // Funciones que actualizan el estado global de la reserva (Lugar, Fecha y Hora)
  // 1.- Función para manejar la ciudad seleccionada
  const handleCityChange = useCallback((value) => {
    try {
      setSelectedCity(value);
      console.log("Ciudad Seleccionada:", value);
      setBookingError(null);
    } catch (error) {
      console.error("Error al seleccionar ciudad:", error);
      setBookingError("Error al seleccionar la ciudad");
    }
  }, []);

  // 2.- Función para manejar la fecha seleccionada
  const handleDateSelection = useCallback((date) => {
    try {
      setSelectedDate(date);
      console.log("Fecha seleccionada:", date);
      setBookingError(null);
    } catch (error) {
      console.error("Error al seleccionar fecha:", error);
      setBookingError("Error al seleccionar la fecha");
    }
  }, []);

  // 3.- Función para manejar la hora seleccionada
  const handleTimeSelection = useCallback((time) => {
    try {
      setSelectedTime(time);
      console.log("Horario seleccionado:", time);
      setBookingError(null);
    } catch (error) {
      console.error("Error al seleccionar horario:", error);
      setBookingError("Error al seleccionar el horario");
    }
  }, []);

  // 4.- Función para manejar la seleccion de boletos
  const handleTicketsSelection = useCallback((tickets, costTotal) => {
    try {
      setTotalTickets(tickets);
      setCostTickets(costTotal);
      console.log("Total de Boletos seleccionados:", tickets);
      console.log("Costo total de Boletos seleccionados:", costTotal);
      setBookingError(null);
    } catch (error) {
      console.error("Error al seleccionar boletos:", error);
      setBookingError("Error al seleccionar los boletos");
    }
  }, []);

  // 5.- Función para manejar la selección de asientos
  const saveSelectedSeats = (seatsIds) => {
    setSelectedSeatsIds(seatsIds);
    localStorage.setItem("selectedSeatsIds", JSON.stringify(seatsIds));
    console.log("Asientos guardados en el contexto:", seatsIds);

    // Actualizar el paso del proceso si estamos avanzando
    if (bookingStep === "tickets-selected") {
      setBookingStep("seats-selected");
      localStorage.setItem("bookingStep", "seats-selected");
    }
  };

  // Funciones para manejar el ingreso de datos personales y pago
  // Función para guardar los datos del usuario
  const saveUserData = (data) => {
    try {
      setUserData(data);
      console.log("Datos del usuario guardados:", data);
      setBookingError(null);
      // Aquí puedes realizar cualquier otra acción con los datos
      // como enviarlos a una API, etc.
    } catch (error) {
      console.error("Error al guardar datos del usuario:", error);
      setBookingError("Error al guardar los datos personales");
    }
  };

  // Funciones para manejar el cambio de formularios dentro de la misma página
  const handleChangeMovieInfoCard = (change) => {
    setShowChangeData(change);
  };

  const handleShowsFormDataUser = (show) => {
    setShowFormDataUser(show);
  };

  const handleModalCancelReserva = (show) => {
    setShowCancelationModal(show);
  };

  const handleShowButtonPay = (show) => {
    setShowButtonPay(show);
  };

  // Funciones para verificar el estado de selección para protección de rutas

  // Verifica si hay una película válida seleccionada
  const hasValidMovieSelection = useCallback(() => {
    return Boolean(selectedMovie && selectedMovie.id);
  }, [selectedMovie]);

  // Verifica si hemos completado la selección de horario
  const hasValidScheduleSelection = useCallback(() => {
    return (
      hasValidMovieSelection() && selectedCity && selectedDate && selectedTime
    );
  }, [hasValidMovieSelection, selectedCity, selectedDate, selectedTime]);

  // Verifica si hemos completado la selección de boletos
  const hasValidTicketsSelection = useCallback(() => {
    return hasValidScheduleSelection() && totalTickets && costTickets > 0;
  }, [hasValidScheduleSelection, totalTickets, costTickets]);

  useEffect(() => {
    try {
      console.log("Cargando películas...");
      setMoviesList(data);
      setLoading(false);
    } catch (error) {
      console.error("Error loading movies:", error);
      setLoading(false);
      setBookingError("Error al cargar el catálogo de películas");
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

  // Función para guardar los datos Especificos de la Reserva
  const saveBooked = (movie, city, date, time, tickets) => {
    try {
      // correo, "asientos, total", nombre, hora, fecha y películas. movie, showtimeid, date, name, email, total.
      const bookedData = {
        movie: movie.title,
        city: city,
        date: date.date,
        time: time.time,
        room: time.room,
        tickets: tickets,
        seats: selectedSeatsIds, // Añadir los asientos seleccionados
        total_cost: costTickets,
        customer_name: userData?.fullName,
        customer_email: userData?.email,
      };

      console.log(bookedData);

      // Actualizar el paso del proceso
      setBookingStep("booking-completed");
      localStorage.setItem("bookingStep", "booking-completed");

      // Aquí podrías enviar los datos a una API o realizar otras acciones

      return bookedData;
    } catch (error) {
      console.error("Error al finalizar la reserva:", error);
      setBookingError("Error al procesar la reserva");
      return null;
    }
  };

  // Función para validar que todos los datos necesarios estén seleccionados
  const areSelectionsComplete = useCallback(() => {
    return (
      selectedMovie &&
      selectedCity &&
      selectedDate &&
      selectedTime &&
      totalTickets
    );
  }, [selectedMovie, selectedCity, selectedDate, selectedTime, totalTickets]);

  return (
    <ListMoviesContext.Provider
      value={{
        moviesList,
        loading,
        clearSearch,
        clearSelection,
        cleanSelection,
        cleanShowsProcess,
        resetEntireBookingProcess, // Nueva función para limpiar todo
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
        totalTickets,
        costTickets,
        handleChangeMovieInfoCard,
        showChangeData,
        handleShowsFormDataUser,
        showFormDataUser,
        handleModalCancelReserva,
        showCancelationModal,
        saveBooked,
        handleShowButtonPay,
        showButtonPay,
        saveUserData,
        userData,
        bookingError, // Nuevo estado para manejar errores
        bookingStep, // Nuevo estado para rastrear el paso del proceso
        hasValidMovieSelection, // Nuevas funciones para protección de rutas
        hasValidScheduleSelection,
        hasValidTicketsSelection,
        selectedSeatsIds,
        saveSelectedSeats,
      }}
    >
      {props.children}
    </ListMoviesContext.Provider>
  );
}
