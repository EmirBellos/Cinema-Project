import React, { useContext, useState } from "react";
import {
  Button,
  Dialog,
  Heading,
  Input,
  Label,
  Modal,
  TextField,
  ModalOverlay,
} from "react-aria-components";
import { ListMoviesContext } from "../../Context/ListMoviesContext";
import { useNavigate } from "react-router-dom";
import "@ant-design/v5-patch-for-react-19"; // Importar versión compatible con React 19
import { notification } from "antd";

export default function SelecCantidadBoletos() {
  const { handleTicketsSelection } = useContext(ListMoviesContext);
  const [countAdultTickets, setCountAdultTickets] = useState(0);
  const [countKidTickets, setCountKidTickets] = useState(0);
  const [costAdultTickets, setCostAdultTickets] = useState(0);
  const [costKidTickets, setCostKidTickets] = useState(0);
  const [isOpen, setIsOpen] = useState(true);

  const navigate = useNavigate();
  const totalCostTickets = costAdultTickets + costKidTickets;

  const showNotification = () => {
    notification.error({
      message: "Acción No Permitida",
      description: "La cantidad de boletos excede lo indicado.",
      placement: "bottomLeft",
      style: {
        borderRadius: "5px",
        border: "2px solid #7a9787",
      },
    });
  };

  const handleTickets = () => {
    const totalTickets = countAdultTickets + countKidTickets;

    console.log("Adult tickets:", countAdultTickets);
    console.log("Kid tickets:", countKidTickets);
    console.log("Total:", totalTickets);

    if (totalTickets > 10) {
      showNotification();
      return;
    } else {
      setIsOpen(false);
      handleTicketsSelection(totalTickets);
    }
  };

  const handleCancelation = () => {
    console.log("Proceso cancelado... Redirigiendo a Cartelera");
    navigate("/Cartelera");
    setIsOpen(false);
  };

  return (
    <ModalOverlay
      isOpen={isOpen}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <Modal
        isOpen={isOpen}
        className="bg-white rounded-lg shadow-xl w-11/12 max-w-md mx-auto"
      >
        <Dialog className="p-6">
          {/* Encabezado */}
          <div className="flex justify-between items-center mb-4">
            <Heading slot="title" className="text-2xl font-bold text-gray-800">
              Selecciona tus Boletos
            </Heading>
          </div>

          {/* Contenido del Modal */}
          <form>
            <TextField className="w-full mt-4 mb-4 ">
              <div className="flex justify-between">
                <Label className="flex text-sm font-medium text-gray-700 mb-1">
                  Adulto:
                </Label>
                <Label className="flex text-sm font-medium text-gray-700 mb-1">
                  $80
                </Label>
              </div>
              <Input
                className="w-full px-3 py-2 border bg-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder="0"
                type="number"
                min="1"
                max="10"
                onChange={(e) => {
                  const value = parseInt(e.target.value) || 0;
                  setCountAdultTickets(value);
                  setCostAdultTickets(value * 80);
                }}
              />
            </TextField>
            <TextField className="w-full mt-4 mb-48">
              <div className="flex justify-between">
                <Label className="flex text-sm font-medium text-gray-700 mb-1">
                  Niño:
                </Label>
                <Label className="flex text-sm font-medium text-gray-700 mb-1">
                  $50
                </Label>
              </div>
              <Input
                className="w-full px-3 py-2 border bg-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder="0"
                type="number"
                min="1"
                max="10"
                onChange={(e) => {
                  const value = parseInt(e.target.value) || 0;
                  setCountKidTickets(value);
                  setCostKidTickets(value * 50);
                }}
              />
              <Label className="flex justify-end text-sm font-medium text-gray-700 pt-3">
                Total: ${totalCostTickets}
              </Label>
            </TextField>
            <Label className="flex justify-center font-mono text-gray-700 mb-1">
              Máximo 10 Boletos Por Compra
            </Label>

            {/* Botones de acción */}
            <div className="flex justify-end space-x-3 mt-6">
              <Button
                onClick={() => handleCancelation()}
                className="px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
              >
                Cancelar
              </Button>
              <Button
                className={`
                  px-4 py-2 rounded-md transition-colors
                  ${
                    countAdultTickets + countKidTickets === 0
                      ? "bg-gray-400 cursor-not-allowed opacity-50 text-gray-100"
                      : "bg-blue-header text-white hover:bg-blue-500 active:bg-blue-600"
                  }
                `}
                isDisabled={countAdultTickets + countKidTickets === 0}
                onClick={() => handleTickets()}
              >
                Confirmar
              </Button>
            </div>
          </form>
        </Dialog>
      </Modal>
    </ModalOverlay>
  );
}
