import React, { useState, useContext } from "react";
import { ListMoviesContext } from "../../Context/ListMoviesContext";
import MovieInfoCard from './MovieInfoCard';

export default function SeccionFechaYHora() {
  const { selectedMovie } = useContext(ListMoviesContext);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

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
            <h3 className="text-lg font-semibold flex justify-center">Fechas disponibles</h3>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {selectedMovie.showTimes.map((dateOption) => (
                <button
                  key={dateOption.id}
                  onClick={() => setSelectedDate(dateOption)}
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
          </div>

          {/* Horarios */}
          {selectedDate && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex justify-center">Horarios disponibles</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {selectedDate.times.map((timeSlot) => (
                  <button
                    key={timeSlot.id}
                    onClick={() => setSelectedTime(timeSlot)}
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

          {/* Botón de continuar (añadir lógica para continuar)*/}
          {selectedTime && (
            <div className="pt-6">
              <button className="w-full sm:w-auto px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                Continuar a selección de asientos
              </button>
            </div>
          )}
        </div>

        {/* Información de la película (derecha) */}
        <div className="lg:w-1/3">
          <MovieInfoCard movie={selectedMovie} />
        </div>
      </div>
    </div>
  );
}
