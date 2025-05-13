import React, { useState, useEffect, useContext, useRef } from "react";
import { ListMoviesContext } from "../../Context/ListMoviesContext";
import MovieInfoCard from "./MovieInfoCard";
import "@ant-design/v5-patch-for-react-19";
import { notification } from "antd";

export default function SeccionFechaYHora() {
  const {
    selectedMovie,
    handleDateSelection,
    selectedDate,
    handleTimeSelection,
    selectedTime,
    selectedCity,
    handleChangeMovieInfoCard,
    loadDates,
    loadTimes,
    loading,
    error,
  } = useContext(ListMoviesContext);
  const [fechas, setFechas] = useState([]);
  const [horarios, setHorarios] = useState([]);
  const scrollPosRef = useRef(0);
  // Cargar fechas si es necesario
  useEffect(() => {
    if (selectedMovie?.id) {
      const fetchDates = async () => {
        try {
          // Usar fechas de la API si están disponibles
          if (selectedMovie.showTimes && selectedMovie.showTimes.length > 0) {
            console.log(
              "Usando fechas del objeto película:",
              selectedMovie.showTimes
            );
            setFechas(selectedMovie.showTimes);
          } else if (
            selectedMovie.show_dates &&
            selectedMovie.show_dates.length > 0
          ) {
            // API puede usar show_dates en lugar de showTimes
            console.log(
              "Usando show_dates del objeto película:",
              selectedMovie.show_dates
            );
            setFechas(selectedMovie.show_dates);
          } else {
            // Cargar fechas con función específica
            console.log("Cargando fechas desde API...");
            const dates = await loadDates(selectedMovie.id);
            console.log("Fechas cargadas:", dates);
            setFechas(dates || []);
          }
        } catch (err) {
          console.error("Error al cargar fechas:", err);
        }
      };

      fetchDates();
    }
  }, [selectedMovie, loadDates]);

  // Actualizar horarios cuando se selecciona una fecha
  useEffect(() => {
    if (selectedDate?.id && selectedMovie?.id) {
      const fetchTimes = async () => {
        try {
          // Si selectedDate ya tiene times, usarlos
          if (selectedDate.times && selectedDate.times.length > 0) {
            setHorarios(selectedDate.times);
            return;
          }

          if (selectedDate.show_times && selectedDate.show_times.length > 0) {
            setHorarios(selectedDate.show_times);
            return;
          }

          // Si no, cargarlos desde la API
          console.log("Cargando horarios desde API...");
          const times = await loadTimes(selectedMovie.id, selectedDate.id);
          console.log("Horarios cargados:", times);
          setHorarios(times || []);
        } catch (err) {
          console.error("Error al cargar horarios:", err);
        }
      };

      fetchTimes();
    } else {
      setHorarios([]);
    }
  }, [selectedDate, selectedMovie, loadTimes]);

  const showNotification = () => {
    notification.warning({
      message: "Sección Faltante",
      description: "Seleccione su ciudad antes de continuar.",
      placement: "topLeft",
      style: {
        borderRadius: "5px",
        border: "2px solid #D5A021",
      },
    });
  };

  const handleReservation = () => {
    if (!selectedCity) {
      showNotification();
    } else {
      handleChangeMovieInfoCard(true);
      scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  if (loading) {
    return <div className="text-center py-8">Cargando información...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  if (!selectedMovie) {
    return <div>No hay película seleccionada</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Contenido principal (izquierda) */}
        <div className="lg:w-2/3 space-y-6">
          {/* Selector de fechas */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex justify-center">
              Fechas disponibles
            </h3>
            {fechas && fechas.length > 0 ? (
              <div className="flex gap-4 overflow-x-auto pb-2">
                {fechas.map((dateOption) => (
                  <button
                    key={dateOption.id}
                    onClick={(e) => {
                      // Guardar la posición actual del scroll
                      scrollPosRef.current = window.scrollY;

                      // Cambiar la fecha
                      handleDateSelection(dateOption);

                      // Restaurar la posición del scroll después de renderizar
                      setTimeout(() => {
                        window.scrollTo({
                          top: scrollPosRef.current,
                          behavior: "auto", // No usar "smooth" aquí para evitar animación visible
                        });
                      }, 0);
                    }}
                    className={`px-4 py-2 rounded-lg flex-shrink-0 ${
                      selectedDate?.id === dateOption.id
                        ? "bg-red-600 text-white"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    {new Date(dateOption.date).toLocaleDateString("es-ES", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 bg-gray-100 rounded-lg">
                No hay fechas disponibles para esta película
              </div>
            )}
          </div>

          {/* Horarios */}
          {selectedDate && horarios.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex justify-center">
                Horarios disponibles
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {horarios.map((timeSlot) => (
                  <button
                    key={timeSlot.id}
                    onClick={() => handleTimeSelection(timeSlot)}
                    className={`p-4 rounded-lg border shadow-md ${
                      selectedTime?.id === timeSlot.id
                        ? "border-red-600 bg-red-50"
                        : "border-gray-200 hover:border-red-300 bg-white"
                    }`}
                  >
                    <div className="text-lg font-semibold">{timeSlot.time}</div>
                    <div className="text-sm text-gray-600">{timeSlot.room}</div>
                    <div className="text-sm text-gray-600">
                      {timeSlot.format}
                    </div>
                    <div className="text-sm text-gray-600">
                      {timeSlot.availableSeats} asientos disponibles
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Botón de continuar */}
          {selectedTime && (
            <div className="pt-6">
              <button
                className="w-full sm:w-auto px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                onClick={() => handleReservation()}
              >
                Continuar a selección de asientos
              </button>
            </div>
          )}
        </div>

        {/* Información de la película (derecha) */}
        <div className="lg:w-1/3">
          <MovieInfoCard />
        </div>
      </div>
    </div>
  );
}
