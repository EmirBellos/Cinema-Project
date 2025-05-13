// src/services/api.js

const API_BASE_URL = 'http://localhost:8000/api';

/**
 * Función base para hacer llamadas a la API
 */
async function fetchFromApi(endpoint, options = {}) {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const defaultHeaders = {
      'Content-Type': 'application/json',
    };
    
    const config = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };
    
    const response = await fetch(url, config);
    
    // Si la respuesta no es exitosa, lanzar un error
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(
        errorData?.error || `Error ${response.status}: ${response.statusText}`
      );
    }
    
    // Intentar parsear la respuesta como JSON
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

/**
 * Servicios para películas
 */
export const movieService = {
  // Obtener lista de películas (cartelera)
  getMovies: async () => {
    return fetchFromApi('/movies/');
  },
  
  // Buscar películas por término
  searchMovies: async (term) => {
    return fetchFromApi(`/movies/?search=${encodeURIComponent(term)}`);
  },
  
  // Obtener detalles de una película
  getMovieById: async (movieId) => {
    return fetchFromApi(`/movies/${movieId}/`);
  },
  
  // Obtener fechas disponibles para una película
  getMovieDates: async (movieId) => {
    return fetchFromApi(`/movies/${movieId}/dates/`);
  },
  
  // Obtener horarios disponibles para una fecha específica
  getDateTimes: async (movieId, dateId) => {
    return fetchFromApi(`/movies/${movieId}/dates/${dateId}/times/`);
  }
};

/**
 * Servicios para ciudades
 */
export const cityService = {
  // Obtener lista de ciudades
  getCities: async () => {
    return fetchFromApi('/cities/');
  }
};

/**
 * Servicios para reservas
 */
export const reservationService = {
  // Crear una nueva reserva
  createReservation: async (reservationData) => {
    return fetchFromApi('/reservations/', {
      method: 'POST',
      body: JSON.stringify(reservationData)
    });
  },
  
  // Obtener detalles de una reserva
  getReservation: async (bookingId) => {
    return fetchFromApi(`/reservations/${bookingId}/`);
  },
  
  // Completar el pago de una reserva
  completePayment: async (bookingId, paymentData) => {
    return fetchFromApi(`/reservations/${bookingId}/complete_payment/`, {
      method: 'POST',
      body: JSON.stringify(paymentData)
    });
  }
};