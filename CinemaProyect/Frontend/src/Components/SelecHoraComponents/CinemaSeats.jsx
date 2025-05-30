import { useState, useContext, useEffect } from "react";
import { FaCheck } from "react-icons/fa6";
import { ListMoviesContext } from "../../Context/ListMoviesContext";
import { notification } from "antd";

export default function CinemaSeats() {
  const { handleShowsFormDataUser, totalTickets, saveSelectedSeats } = useContext(ListMoviesContext);
  
  // Configuración del mapa de asientos (filas y columnas)
  const rows = 8;
  const cols = 12;

  // Generar algunos asientos ocupados aleatoriamente para demostración
  const generateOccupiedSeats = () => {
    const occupied = {};
    for (let i = 0; i < 15; i++) {
      const row = String.fromCharCode(65 + Math.floor(Math.random() * rows));
      const col = Math.floor(Math.random() * cols) + 1;
      occupied[`${row}${col}`] = true;
    }
    return occupied;
  };

  // Estados
  const [occupiedSeats] = useState(generateOccupiedSeats());
  const [selectedSeats, setSelectedSeats] = useState({});
  const [exceedLimitWarning, setExceedLimitWarning] = useState(false);
  
  // Mostrar advertencia cuando se intenta seleccionar más asientos de lo permitido
  const showExceedLimitNotification = () => {
    if (!exceedLimitWarning) {
      notification.warning({
        message: "Límite de asientos alcanzado",
        description: `Solo puedes seleccionar ${totalTickets} asiento(s) según los boletos comprados.`,
        placement: "top",
        duration: 3,
        style: {
          borderRadius: "5px",
          border: "2px solid #E6A23C",
        },
      });
      setExceedLimitWarning(true);
      
      // Restablecer la bandera después de un tiempo para permitir mostrar otra notificación
      setTimeout(() => {
        setExceedLimitWarning(false);
      }, 3000);
    }
  };

  // Maneja cuando se hace clic en un asiento
  const handleSeatClick = (seatId) => {
    if (occupiedSeats[seatId]) return; // No permitir seleccionar asientos ocupados

    setSelectedSeats((prev) => {
      const updated = { ...prev };
      
      // Si el asiento ya está seleccionado, permite deseleccionarlo
      if (updated[seatId]) {
        delete updated[seatId]; // Deseleccionar
        return updated;
      }
      
      // Verificar si ya se alcanzó el límite de boletos
      const currentSelectedCount = Object.keys(updated).length;
      if (currentSelectedCount >= totalTickets) {
        // Mostrar advertencia y no permitir seleccionar más asientos
        showExceedLimitNotification();
        return prev; // Mantener la selección anterior sin cambios
      }
      
      // Si hay espacio disponible, seleccionar el asiento
      updated[seatId] = true;
      return updated;
    });
  };

  // Efecto para mostrar información de la selección de asientos en la consola
  useEffect(() => {
    const selectedIds = Object.keys(selectedSeats);
    console.log("Asientos seleccionados:", selectedIds);
  }, [selectedSeats]);

  // Obtener el estado de un asiento
  const getSeatStatus = (seatId) => {
    if (selectedSeats[seatId]) return "selected";
    if (occupiedSeats[seatId]) return "occupied";
    return "available";
  };

  // Renderizar un asiento individual
  const renderSeat = (row, col) => {
    const seatId = `${row}${col}`;
    const status = getSeatStatus(seatId);

    let bgColor = "bg-gray-200 hover:bg-blue-300"; // Disponible
    if (status === "occupied") bgColor = "bg-gray-500 cursor-not-allowed";
    if (status === "selected") bgColor = "bg-blue-500";

    return (
      <div
        key={seatId}
        className={`w-8 h-8 m-1 rounded-t-lg flex items-center justify-center cursor-pointer transition-colors ${bgColor}`}
        onClick={() => handleSeatClick(seatId)}
        aria-label={`Asiento ${seatId} (${
          status === "available"
            ? "disponible"
            : status === "occupied"
            ? "ocupado"
            : "seleccionado"
        })`}
        role="button"
        tabIndex={0}
      >
        <span className="text-xs font-bold">{seatId}</span>
      </div>
    );
  };

  // Renderizar la pantalla del cine
  const renderScreen = () => (
    <div className="mb-8 relative">
      <div className="h-4 bg-gray-300 rounded-lg w-3/4 mx-auto"></div>
      <div className="text-center text-sm mt-2 text-gray-600">PANTALLA</div>
    </div>
  );

  // Renderizar la leyenda (disponible, seleccionado y ocupado)
  const renderLegend = () => (
    <div className="flex justify-center gap-4 mb-6 mt-8">
      <div className="flex items-center">
        <div className="w-4 h-4 bg-gray-200 rounded-t mr-2"></div>
        <span className="text-sm">Disponible</span>
      </div>
      <div className="flex items-center">
        <div className="w-4 h-4 bg-blue-500 rounded-t mr-2"></div>
        <span className="text-sm">Seleccionado</span>
      </div>
      <div className="flex items-center">
        <div className="w-4 h-4 bg-gray-500 rounded-t mr-2"></div>
        <span className="text-sm">Ocupado</span>
      </div>
    </div>
  );

  // Renderizar la información de los asientos seleccionados
  const renderSelectedInfo = () => {
    const selectedIds = Object.keys(selectedSeats);
    return (
      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <h3 className="font-semibold mb-2">
          Asientos seleccionados: {selectedIds.length} de {totalTickets}
        </h3>
        {selectedIds.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {selectedIds.map((id) => (
              <div
                key={id}
                className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
              >
                {id}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-600">No hay asientos seleccionados</p>
        )}

        {selectedIds.length > 0 && (
          <button
            className={`mt-4 ${selectedIds.length === parseInt(totalTickets) 
              ? "bg-green-500 hover:bg-green-600" 
              : "bg-gray-400 cursor-not-allowed"} 
              text-white py-2 px-4 rounded flex items-center justify-center gap-2`}
            onClick={() => {
              if (selectedIds.length === parseInt(totalTickets)) {
                // Guardar los asientos seleccionados en el contexto
                if (saveSelectedSeats) {
                  saveSelectedSeats(selectedIds);
                }
                
                // Avanzar al siguiente paso
                handleShowsFormDataUser(true);
                scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              } else {
                notification.warning({
                  message: "Selección Incompleta",
                  description: `Por favor selecciona exactamente ${totalTickets} asiento(s).`,
                  placement: "top",
                });
              }
            }}
            disabled={selectedIds.length !== parseInt(totalTickets)}
          >
            <FaCheck size={16} />
            <span>Confirmar selección</span>
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      {renderLegend()}
      {renderScreen()}

      <div className="flex justify-center mb-8">
        <div className="bg-gray-100 p-4 rounded-lg">
          {/* Generamos filas y columnas de asientos */}
          {Array.from({ length: rows }).map((_, rowIndex) => {
            const rowLabel = String.fromCharCode(65 + rowIndex);
            return (
              <div key={rowLabel} className="flex justify-center mb-2">
                <div className="w-6 h-8 flex items-center justify-center font-bold text-gray-600">
                  {rowLabel}
                </div>
                <div className="flex">
                  {Array.from({ length: cols }).map((_, colIndex) => {
                    const colNum = colIndex + 1;
                    // Añadir un pasillo en el medio (después de la columna 6)
                    if (colIndex === 6) {
                      return (
                        <div key={`gap-${rowLabel}`} className="w-8 mx-2"></div>
                      );
                    }
                    return renderSeat(rowLabel, colNum);
                  })}
                </div>
                <div className="w-6 h-8 flex items-center justify-center font-bold text-gray-600">
                  {rowLabel}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {renderSelectedInfo()}
    </div>
  );
}