import React, { useState, useContext, useEffect } from "react";
import "@ant-design/v5-patch-for-react-19"; // Importar versión compatible con React 19
import { App, Button } from "antd";
import { ListMoviesContext } from "../../Context/ListMoviesContext";
import { useNavigate } from "react-router-dom";
import ModalCancelReservacion from "./ModalCancelReservacion";

const BlockPayAlert = () => {
  const { notification } = App.useApp();

  const showNotification = () => {
    notification.error({
      message: "Acción No Permitida",
      description: "Complete su reserva antes de continuar.",
      placement: "bottomLeft",
      style: {
        borderRadius: "5px",
        border: "2px solid #7a9787",
      },
    });
  };
  return (
    <Button block type="default" shape="round" onClick={showNotification}>
      PAGAR
    </Button>
  );
};

export default function () {
  const {
    selectedMovie,
    selectedDate,
    selectedTime,
    selectedCity,
    totalTickets,
    handleModalCancelReserva,
    showCancelationModal,
    showChangeData,
    showFormDataUser,
  } = useContext(ListMoviesContext);

  const navigate = useNavigate();
  //const [showCancelationModal, setShowCancelationModal] = useState(false);

 /*  useEffect(() => {
    setShowCancelationModal(false);
  }, []); */

  return (
    <>
      <div className="bg-white rounded-lg shadow-xl">
        <div className="bg-blue-header text-white py-3 px-4 rounded-t-lg">
          <h2 className="text-lg font-semibold">Resumen de la Compra</h2>
        </div>

        {/** Contenido del Card */}
        <div className="p-4">
          <div className="flex gap-4">
            {/* Imagen a la izquierda */}
            <div className="w-1/3">
              <img
                src={selectedMovie.imageUrl}
                alt={selectedMovie.title}
                className="w-full h-auto rounded-lg"
              />
            </div>

            {/** Info de la película y de la reserva */}
            {/* Información a la derecha */}
            <div className="w-2/3 space-y-4">
              {/* Título y detalles básicos */}
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  {selectedMovie.title}
                </h3>
                <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                  <span>{selectedMovie.runtime}</span>
                  <span>|</span>
                  <span>{selectedMovie.category}</span>
                </div>
              </div>

              {/* Detalles de la reserva */}
              <div className="space-y-3">
                {/* Lugar */}
                <div>
                  <p className="text-sm text-gray-500 font-bold">Lugar</p>
                  <p className="font-medium">
                    {/* Pendiente selección */}
                    <span className="text-gray-400 italic">
                      {showChangeData ? selectedCity : "Por seleccionar"}
                    </span>
                  </p>
                </div>

                {/* Fecha */}
                <div>
                  <p className="text-sm text-gray-500 font-bold">Fecha</p>
                  <p className="font-medium">
                    <span className="text-gray-400 italic">
                      {showChangeData ? selectedDate.date : "Por seleccionar"}
                    </span>
                  </p>
                </div>

                {/* Horario */}
                <div>
                  <p className="text-sm text-gray-500 font-bold">Horario</p>
                  <p className="font-medium">
                    <span className="text-gray-400 italic">
                      {showChangeData ? selectedTime.time : "Por seleccionar"}
                    </span>
                  </p>
                </div>

                {/* Cantidad de boletos */}
                <div>
                  <p className="text-sm text-gray-500 font-bold">Boletos</p>
                  <p className="font-medium">
                    <span className="text-gray-400 italic">
                      {showChangeData ? totalTickets : "Por seleccionar"}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-12 pb-2">
            <button
              className="w-full bg-transparent border-2 border-dotted hover:border-solid border-gray-500 rounded-full py-1 text-black hover:bg-gray-300"
              onClick={() => handleModalCancelReserva(true)}
              >
              Cancelar
            </button>
          </div>
          {/** Botón para acceder a la página de pago (inhabilitado) */}
          <div className="pt-4 pb-2 inset-x-0 bottom-0">
            {showFormDataUser ? (
              <button
              className="w-full bg-red-600 hover:bg-red-700 rounded-full py-1 text-white"
              onClick={() => {
                //cleanSelection();
                // Necesito validar que todos los campos del formulario hayan sido completados, utilizar funciones en el context, después añadir modal para mostrar mensaje de éxito
              }}
              >
                Pagar
              </button>
            ) : (
              <App>
                <BlockPayAlert />
              </App>
            )}
          </div>

          {/** Pruebas de contenido MovieCard */}
        </div>
      </div>
      {showCancelationModal && <ModalCancelReservacion />}
    </>
  );
}
