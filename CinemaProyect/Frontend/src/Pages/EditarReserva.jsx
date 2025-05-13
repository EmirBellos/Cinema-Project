import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import VerificarReservaModal from "../Components/VerificarReservaModal";

export default function EditarReserva() {
  const navigate = useNavigate();
  const { id } = useParams();
  
  // Estados para manejar los datos de la reserva
  const [reservaData, setReservaData] = useState({
    pelicula: "Kung Fu Panda",
    usuario: "Luis Javier Quintana",
    email: "ejemplo@ejemplo.com",
    boletotol: "4",
    city: "Cancún",
    hora: "18:30",
    fecha: "2023-12-15",
    asientos: ["A1", "A2", "A3", "A4"]
  });
  
  // Estados para controlar la apertura/cierre de los desplegables
  const [horaOpen, setHoraOpen] = useState(false);
  const [fechaOpen, setFechaOpen] = useState(false);
  const [asientosOpen, setAsientosOpen] = useState(false);
  
  // Opciones para los desplegables
  const horasDisponibles = ["16:00", "18:30", "21:00"];
  const fechasDisponibles = ["2023-12-15", "2023-12-16", "2023-12-17"];
  
  // Función para actualizar la hora seleccionada
  const seleccionarHora = (hora) => {
    setReservaData({ ...reservaData, hora });
    setHoraOpen(false);
  };
  
  // Función para actualizar la fecha seleccionada
  const seleccionarFecha = (fecha) => {
    setReservaData({ ...reservaData, fecha });
    setFechaOpen(false);
  };
  
  // Función para confirmar la edición
  const confirmarEdicion = () => {
    // Aquí iría la lógica para guardar los cambios en la reserva
    console.log("Reserva actualizada:", reservaData);
    alert("Cambio exitoso"); // Modificado para mostrar "Cambio exitoso"
    navigate("/"); // Modificado para redireccionar a Home
  };
  
  // Función para cancelar la edición
  const cancelarEdicion = () => {
    navigate("/"); // También cambiamos esto para que vaya a Home
  };
  
  // Función para eliminar la reserva
  const eliminarReserva = () => {
    if (window.confirm("¿Estás seguro que deseas eliminar esta reserva?")) {
      // Aquí iría la lógica para eliminar la reserva
      console.log("Reserva eliminada:", id);
      alert("Reserva eliminada con éxito");
      navigate("/"); // También cambiamos esto para que vaya a Home
    }
  };

  return (
    <>
      {/* Incluir el modal de verificación */}
      <VerificarReservaModal />
      
      <div className="min-h-screen flex justify-center items-center px-4 py-8 bg-gray-100">
        <div className="w-full max-w-2xl bg-gray-200 rounded-lg p-6 shadow-md">
          <h2 className="text-2xl font-bold text-center mb-6">Editar reserva</h2>
          
          {/* Información de la reserva */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Primera columna */}
            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Película</label>
                <input 
                  type="text" 
                  value={reservaData.pelicula} 
                  disabled 
                  className="w-full p-2 bg-gray-300 rounded border-0"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Boletotol</label>
                <input 
                  type="text" 
                  value={reservaData.boletotol} 
                  disabled 
                  className="w-full p-2 bg-gray-300 rounded border-0"
                />
              </div>
            </div>
            
            {/* Segunda columna */}
            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Usuario</label>
                <input 
                  type="text" 
                  value={reservaData.usuario} 
                  disabled 
                  className="w-full p-2 bg-gray-300 rounded border-0"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">City</label>
                <input 
                  type="text" 
                  value={reservaData.city} 
                  disabled 
                  className="w-full p-2 bg-gray-300 rounded border-0"
                />
              </div>
            </div>
            
            {/* Email en toda la fila */}
            <div className="md:col-span-2 mb-4">
              <label className="block text-sm font-medium mb-1">Email</label>
              <input 
                type="email" 
                value={reservaData.email} 
                disabled 
                className="w-full p-2 bg-gray-300 rounded border-0"
              />
            </div>
          </div>
          
          {/* Sección de desplegables */}
          <div className="space-y-3 mb-8">
            {/* Desplegable de Hora */}
            <div className="relative">
              <button 
                onClick={() => setHoraOpen(!horaOpen)} 
                className="w-full bg-white p-3 rounded flex justify-between items-center shadow-sm"
              >
                <span>Hora(s): {reservaData.hora}</span>
                <IoIosArrowDown className={`transition-transform ${horaOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {horaOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white shadow-lg rounded-md p-2">
                  {horasDisponibles.map((hora) => (
                    <div 
                      key={hora} 
                      onClick={() => seleccionarHora(hora)}
                      className={`p-2 hover:bg-gray-100 cursor-pointer rounded ${reservaData.hora === hora ? 'bg-gray-200' : ''}`}
                    >
                      {hora}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Desplegable de Fecha */}
            <div className="relative">
              <button 
                onClick={() => setFechaOpen(!fechaOpen)} 
                className="w-full bg-white p-3 rounded flex justify-between items-center shadow-sm"
              >
                <span>Fecha: {reservaData.fecha}</span>
                <IoIosArrowDown className={`transition-transform ${fechaOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {fechaOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white shadow-lg rounded-md p-2">
                  {fechasDisponibles.map((fecha) => (
                    <div 
                      key={fecha} 
                      onClick={() => seleccionarFecha(fecha)}
                      className={`p-2 hover:bg-gray-100 cursor-pointer rounded ${reservaData.fecha === fecha ? 'bg-gray-200' : ''}`}
                    >
                      {fecha}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Desplegable de Seleccionar asientos nuevamente */}
            <div className="relative">
              <button 
                onClick={() => setAsientosOpen(!asientosOpen)} 
                className="w-full bg-white p-3 rounded flex justify-between items-center shadow-sm"
              >
                <span>Seleccionar asientos nuevamente</span>
                <IoIosArrowDown className={`transition-transform ${asientosOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {asientosOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white shadow-lg rounded-md p-2">
                  <div className="p-3">
                    <p className="mb-2 font-medium">Asientos actuales:</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {reservaData.asientos.map((asiento) => (
                        <span key={asiento} className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          {asiento}
                        </span>
                      ))}
                    </div>
                    <button 
                      onClick={() => {
                        navigate(`/SeleccionAsientos/${id}`);
                      }}
                      className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                    >
                      Ir a selección de asientos
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Botones de acción */}
          <div className="flex flex-col sm:flex-row justify-between gap-3">
            <button 
              onClick={eliminarReserva}
              className="bg-red-700 hover:bg-red-800 text-white py-2 px-4 rounded"
            >
              Eliminar reserva
            </button>
            
            <div className="flex gap-3">
              <button 
                onClick={cancelarEdicion}
                className="bg-gray-700 hover:bg-gray-800 text-white py-2 px-4 rounded"
              >
                Cancelar edición
              </button>
              
              <button 
                onClick={confirmarEdicion}
                className="bg-blue-800 hover:bg-blue-900 text-white py-2 px-4 rounded"
              >
                Confirmar edición
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}