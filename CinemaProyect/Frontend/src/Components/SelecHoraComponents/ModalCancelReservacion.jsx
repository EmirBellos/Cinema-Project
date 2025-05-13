import React, { useState, useContext } from "react";
import { Dialog, Heading, Modal, ModalOverlay } from "react-aria-components";
import { ListMoviesContext } from "../../Context/ListMoviesContext";

export default function ModalCancelReservacion() {
  const { cleanSelection, showCancelationModal, handleModalCancelReserva } =
    useContext(ListMoviesContext);

  const handleCancelReserva = () => {
    handleModalCancelReserva(false);
    cleanSelection();
    //navigate("/");
  };

  const handleBackToReserva = () => {
    handleModalCancelReserva(false);
  };

  return (
    <>
      <ModalOverlay
        isOpen={showCancelationModal}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        <Modal
          isOpen={showCancelationModal}
          className="bg-white rounded-lg shadow-xl w-11/12 max-w-md mx-auto"
          isKeyboardDismissDisabled
        >
          <Dialog className="p-6">
            <Heading
              slot="title"
              className="text-red-500 text-2xl flex justify-center font-bold mb-2"
            >
              Cancelar reserva
            </Heading>
            <div className="flex justify-center font-thin">
              Perderás todo tu progreso si continuas con esta acción.
            </div>
            <div className="flex justify-end mx-3 my-2 space-x-3">
              <button
                slot="close"
                onClick={() => handleCancelReserva()}
                className="py-1 px-2 bg-transparent rounded-md text-red-500 hover:"
              >
                Continuar
              </button>
              <button
                slot="close"
                onClick={() => handleBackToReserva()}
                className="py-1 px-4 bg-blue-header hover:bg-blue-500 active:bg-blue-600 rounded-md text-white"
              >
                Volver
              </button>
            </div>
          </Dialog>
        </Modal>
      </ModalOverlay>
    </>
  );
}
