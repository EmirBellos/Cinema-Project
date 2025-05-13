import React, { useState } from "react";
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
import { useNavigate } from "react-router-dom";
import "@ant-design/v5-patch-for-react-19"; // Importar versión compatible con React 19
import { notification } from "antd";

export default function VerificarReservaModal() {
  const [email, setEmail] = useState("");
  const [reservaId, setReservaId] = useState("");
  const [isOpen, setIsOpen] = useState(true);

  const navigate = useNavigate();

  const showNotification = () => {
    notification.error({
      message: "Verificación Fallida",
      description: "Por favor, ingresa un email e ID de reserva válidos.",
      placement: "bottomLeft",
      style: {
        borderRadius: "5px",
        border: "2px solid #7a9787",
      },
    });
  };

  const handleVerificar = () => {
    if (!email || !reservaId) {
      showNotification();
      return;
    }
    
    // Aquí solo cerramos el modal sin implementar lógica real de verificación
    setIsOpen(false);
    // En un caso real, aquí verificarías los datos y cargarías la información de la reserva
  };

  const handleCancelar = () => {
    console.log("Verificación cancelada... Redirigiendo a Home");
    navigate("/");
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
              Verificar Reservación
            </Heading>
          </div>

          {/* Contenido del Modal */}
          <form>
            <TextField className="w-full mt-4 mb-4">
              <Label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </Label>
              <Input
                className="w-full px-3 py-2 border bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="ejemplo@correo.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </TextField>
            
            <TextField className="w-full mt-4 mb-8">
              <Label className="block text-sm font-medium text-gray-700 mb-1">
                ID de Reserva
              </Label>
              <Input
                className="w-full px-3 py-2 border bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ej: RES-123456"
                type="text"
                value={reservaId}
                onChange={(e) => setReservaId(e.target.value)}
              />
            </TextField>
            
            <div className="text-center text-xs text-gray-500 mt-6 mb-6">
              Ingresa tu email y el ID de reserva para verificar tu reservación
            </div>

            {/* Botones de acción */}
            <div className="flex justify-center space-x-3 mt-6">
              <Button
                onPress={handleCancelar}
                className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors flex-1"
              >
                Cancelar
              </Button>
              <Button
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex-1"
                onPress={handleVerificar}
              >
                Verificar
              </Button>
            </div>
          </form>
        </Dialog>
      </Modal>
    </ModalOverlay>
  );
}