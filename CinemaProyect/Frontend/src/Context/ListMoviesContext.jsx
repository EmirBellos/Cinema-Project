import { createContext, useEffect, useState, useCallback } from "react";
import { movieService, cityService, reservationService } from "../services/api";
// Importar los datos simulados como respaldo en caso de fallo de la API
import { mock_Movies as fallbackData } from "../Data/mock_Movies";

export const ListMoviesContext = createContext();

export function ListMoviesContextProvider(props) {
  // Mantenemos todos tus estados existentes
  const [moviesList, setMoviesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);  // Agregamos estado de error
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMovie, setSelectedMovie] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [totalTickets, setTotalTickets] = useState("");
  const [costTickets, setCostTickets] = useState(0);
  const [userData, setUserData] = useState(null);
  
  // UseStates para cambios de formularios dentro de la misma página
  const [showChangeData, setShowChangeData] = useState(false);
  const [showFormDataUser, setShowFormDataUser] = useState(false);
  const [showCancelationModal, setShowCancelationModal] = useState(false);
  const [showButtonPay, setShowButtonPay] = useState(false);
  
  
  // Nuevo estado para asientos
  const [selectedSeatsIds, setSelectedSeatsIds] = useState([]);
  
  // Nuevo estado para la reserva actual
  const [currentBooking, setCurrentBooking] = useState(null);

  // Función para limpiar búsqueda (mantenemos la función existente)
  const clearSearch = () => {
    setSearchTerm("");
    setSearchResults([]);
  };
  
  // Función para limpiar la selección de película (mantenemos la función existente)
  const cleanSelection = () => {
    setSelectedMovie("");
  };
  
  // Función para limpiar la selección de datos de Reserva (mantenemos la función existente)
  const clearSelection = useCallback(() => {
  console.log("Limpiando selección de reserva");
  setSelectedCity("");
  setSelectedDate("");
  setSelectedTime("");
  setTotalTickets("");
  setCostTickets(0);
  setSelectedSeatsIds([]);
}, []);

  // Función para limpiar los estados de UI (mantenemos la función existente)
  const cleanShowsProcess = () => {
    setShowChangeData(false);
    setShowFormDataUser(false);
    setShowCancelationModal(false);
    setShowButtonPay(false);
  };

  // Carga inicial de películas desde la API
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        console.log("Cargando películas desde la API...");
        const data = await movieService.getMovies();
        setMoviesList(data);
        setLoading(false);
      } catch (err) {
        console.error("Error loading movies from API:", err);
        // Usar datos de respaldo en caso de error
        console.log("Usando datos de respaldo...");
        setMoviesList(fallbackData);
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  // Función que maneja la búsqueda de películas (actualizada para usar API)
  const searchMovies = async (term) => {
    setSearchTerm(term);
    if (term.trim() === " " || !term.trim()) {
      setSearchTerm("");
      setSearchResults([]);
      return;
    }

    try {
      // Intentar buscar con la API
      const results = await movieService.searchMovies(term);
      setSearchResults(results);
    } catch (err) {
      console.error("Error en búsqueda de API:", err);
      // Fallback a búsqueda local
      const filtered = moviesList.filter(
        (movie) =>
          movie.title.toLowerCase().includes(term.toLowerCase()) ||
          movie.release_date.toLowerCase().includes(term.toLowerCase())
      );
      setSearchResults(filtered);
    }
  };

  // Función para seleccionar película (actualizada para usar API)
  const handleMovieSelection = useCallback((movieId, navigate) => {
  try {
    setLoading(true);
    setError(null);
    console.log("Buscando película con ID:", movieId);
    
    // Buscar la película en la lista local primero (para respuesta instantánea)
    const localMovie = moviesList.find(m => m.id === movieId);
    if (localMovie) {
      console.log("Película encontrada en cache local:", localMovie);
      setSelectedMovie(localMovie);
      
      // Si se proporcionó función de navegación, usarla
      if (navigate) {
        navigate("/SeleccionHorarios");
      }
    }
    
    // Aún así, cargar desde la API para obtener datos actualizados
    const fetchFullMovie = async () => {
      try {
        const apiMovie = await movieService.getMovieById(movieId);
        console.log("Película actualizada desde API:", apiMovie);
        setSelectedMovie(apiMovie);
      } catch (apiError) {
        console.error("Error al obtener película de la API:", apiError);
        // Ya establecimos la película local, así que no hacemos nada adicional
      } finally {
        setLoading(false);
      }
    };
    
    fetchFullMovie();
  } catch (error) {
    console.error("Error completo al seleccionar película:", error);
    setError("No se pudo cargar la película seleccionada");
    setLoading(false);
  }
}, [moviesList]);

  // Funciones para ciudades, fechas y horarios (actualizadas para usar API)
  
  // Función para cargar ciudades
  const loadCities = useCallback(async () => {
    try {
      return await cityService.getCities();
    } catch (err) {
      console.error("Error al cargar ciudades:", err);
      // Retornar array vacío o datos de respaldo
      return [];
    }
  }, []);
  
  // Función para cargar fechas
  const loadDates = useCallback(async (movieId) => {
    try {
      return await movieService.getMovieDates(movieId);
    } catch (err) {
      console.error("Error al cargar fechas:", err);
      return [];
    }
  }, []);
  
  // Funciones existentes para manejo de selección (las mantenemos igual)
  const handleCityChange = useCallback((value) => {
    setSelectedCity(value);
    console.log("Ciudad Seleccionada:", value);
  }, []);
  
  const handleDateSelection = useCallback((date) => {
    setSelectedDate(date);
    console.log("Fecha seleccionada:", date);
  }, []);
  
  const handleTimeSelection = useCallback((time) => {
    setSelectedTime(time);
    console.log("Horario seleccionado:", time);
  }, []);
  
  const handleTicketsSelection = useCallback((tickets, costTotal) => {
    setTotalTickets(tickets);
    setCostTickets(costTotal);
    console.log("Total de Boletos seleccionados:", tickets);
    console.log("Costo total de Boletos seleccionados:", costTotal);
  }, []);

  // Nueva función para guardar asientos seleccionados
  const saveSelectedSeats = useCallback((seatsIds) => {
  console.log("Guardando asientos seleccionados:", seatsIds);
  setSelectedSeatsIds(seatsIds);
  
  // Opcionalmente, puedes guardar en localStorage para persistencia
  localStorage.setItem('selectedSeatsIds', JSON.stringify(seatsIds));
}, []);

  // Funciones para manejar el cambio de formularios (las mantenemos igual)
  const handleChangeMovieInfoCard = (change) => {
    setShowChangeData(change);
  }

  const handleShowsFormDataUser = (show) => {
    setShowFormDataUser(show);
  }

  const handleModalCancelReserva = (show) => {
    setShowCancelationModal(show);
  }

  const handleShowButtonPay = (show) => {
    setShowButtonPay(show);
  }

  // Función para guardar los datos del usuario
  const saveUserData = (data) => {
    setUserData(data);
    console.log("Datos del usuario guardados:", data);
    
  };

  const loadTimes = useCallback(async (movieId, dateId) => {
  try {
    setLoading(true);
    const times = await movieService.getDateTimes(movieId, dateId);
    return times;
  } catch (err) {
    console.error("Error al cargar horarios:", err);
    return [];
  } finally {
    setLoading(false);
  }
}, []);

  // Función para guardar los datos de la reserva (actualizada para usar API)
  const saveBooked = useCallback(async () => {
  if (!selectedMovie || !selectedDate || !selectedTime || !selectedSeatsIds.length || !userData) {
    notification.error({
      message: "Datos incompletos",
      description: "Faltan datos para completar la reserva",
      placement: "top"
    });
    return null;
  }
  
  try {
    setLoading(true);
    
    // Preparar los datos para la API
    const reservationData = {
      movie: selectedMovie.id,
      show_date_id: selectedDate.id,
      show_time_id: selectedTime.id,
      customer_name: userData.fullName,
      customer_email: userData.email,
      customer_phone: userData.phoneNumber || "",
      selected_seats: selectedSeatsIds,
      total_amount: costTickets
    };
    
    console.log("Enviando datos de reserva:", reservationData);
    
    // Enviar la petición al backend
    const response = await fetch('/api/reservations/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reservationData)
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error al crear la reserva');
    }
    
    const booking = await response.json();
    console.log("Reserva creada exitosamente:", booking);
    
    notification.success({
      message: "Reserva creada",
      description: "Tu reserva se ha creado exitosamente",
      placement: "top"
    });
    
    return booking;
  } catch (error) {
    console.error("Error al crear la reserva:", error);
    
    notification.error({
      message: "Error en la reserva",
      description: error.message || "No se pudo crear la reserva",
      placement: "top"
    });
    
    return null;
  } finally {
    setLoading(false);
  }
}, [selectedMovie, selectedDate, selectedTime, selectedSeatsIds, userData, costTickets]);

  // Función para completar el pago de una reserva
  const completePayment = async (paymentMethod = 'CREDIT_CARD') => {
    if (!currentBooking) {
      setError("No hay una reserva para procesar el pago");
      return false;
    }
    
    try {
      const paymentData = {
        payment_method: paymentMethod,
        transaction_id: `txn-${Date.now()}`
      };
      
      const result = await reservationService.completePayment(
        currentBooking.booking_id,
        paymentData
      );
      
      console.log("Pago completado:", result);
      return true;
    } catch (error) {
      console.error("Error al procesar el pago:", error);
      setError("No se pudo procesar el pago: " + error.message);
      return false;
    }
  };

  // Función para buscar una reserva por ID
  const findReservation = async (bookingId) => {
    try {
      const reservation = await reservationService.getReservation(bookingId);
      setCurrentBooking(reservation);
      return reservation;
    } catch (error) {
      console.error("Error al buscar la reserva:", error);
      setError("No se pudo encontrar la reserva: " + error.message);
      return null;
    }
  };
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


  // Función para validar que todos los datos necesarios estén seleccionados (mantenemos igual)
  const areSelectionsComplete = useCallback(() => {
    return selectedMovie && selectedCity && selectedDate && selectedTime && totalTickets;
  }, [selectedMovie, selectedCity, selectedDate, selectedTime, totalTickets]);

  // Funciones para protección de rutas
  const hasValidMovieSelection = useCallback(() => {
    return Boolean(selectedMovie && selectedMovie.id);
  }, [selectedMovie]);
  
  const hasValidScheduleSelection = useCallback(() => {
    return hasValidMovieSelection() && selectedCity && selectedDate && selectedTime;
  }, [hasValidMovieSelection, selectedCity, selectedDate, selectedTime]);
  
  const hasValidTicketsSelection = useCallback(() => {
    return hasValidScheduleSelection() && totalTickets && costTickets > 0;
  }, [hasValidScheduleSelection, totalTickets, costTickets]);

  return (
    <ListMoviesContext.Provider
      value={{
        // Mantenemos todos los valores originales
        moviesList,
        loading,
        error, // Nuevo
        clearSearch,
        clearSelection,
        cleanSelection,
        cleanShowsProcess,
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
        loadTimes,
        
        // Nuevos valores para la integración con API
        selectedSeatsIds,
        saveSelectedSeats,
        currentBooking,
        completePayment,
        findReservation,
        loadCities,
        loadDates,
        
        // Protección de rutas
        hasValidMovieSelection,
        hasValidScheduleSelection,
        hasValidTicketsSelection
      }}
    >
      {props.children}
    </ListMoviesContext.Provider>
  );
}