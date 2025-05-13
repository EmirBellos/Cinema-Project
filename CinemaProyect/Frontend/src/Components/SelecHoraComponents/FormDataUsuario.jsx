import React, {useState, useContext} from "react";
import { ListMoviesContext } from "../../Context/ListMoviesContext";
import "@ant-design/v5-patch-for-react-19"; // Importar versión compatible con React 19
import { notification } from "antd";

export default function FormDataUsuario() {
  const [saveName, setSaveName] = useState("");
  const [saveLastName, setSaveLastName] = useState("");
  const [saveEmail, setSaveEmail] = useState("");
  const [savePhoneNumber, setSavePhoneNumber] = useState("");
  const [saveCardNumber, setSaveCardNumber] = useState("");
  const [saveCVC, setSaveCVC] = useState("");
  const [saveExpirationDate, setSaveExpirationDate] = useState("");

  const {handleShowButtonPay, saveUserData} = useContext(ListMoviesContext);

  const showNotification = (type, message, description) => {
    notification[type]({
      message: message,
      description: description,
      placement: "top",
      style: {
        borderRadius: "5px",
        border: type === "warning" ? "2px solid #D5A021" : "2px solid #ff4d4f",
      },
    });
  };

  // Validar email con una expresión regular
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validar número de teléfono (solo dígitos y longitud mínima)
  const isValidPhone = (phone) => {
    return /^\d{8,15}$/.test(phone);
  };

  // Validar número de tarjeta (solo dígitos y longitud apropiada)
  const isValidCardNumber = (cardNumber) => {
    return /^\d{13,19}$/.test(cardNumber);
  };

  // Validar CVC (3-4 dígitos)
  const isValidCVC = (cvc) => {
    return /^\d{3,4}$/.test(cvc);
  };

  // Validar fecha de expiración (formato MMYY o MMYYYY)
  const isValidExpirationDate = (date) => {
    return /^\d{4,6}$/.test(date);
  };

  const handleSaveData = (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    // Verificar campos vacíos
    if (
      !saveName || 
      !saveLastName || 
      !saveEmail || 
      !savePhoneNumber || 
      !saveCardNumber || 
      !saveCVC || 
      !saveExpirationDate
    ) {
      showNotification("warning", "Sección Faltante", "Complete todos los campos antes de continuar.");
      return;
    }

    // Validar formato de email
    if (!isValidEmail(saveEmail)) {
      showNotification("error", "Email Inválido", "Por favor, introduzca una dirección de correo electrónico válida.");
      return;
    }

    // Validar número de teléfono
    if (!isValidPhone(savePhoneNumber)) {
      showNotification("error", "Teléfono Inválido", "Por favor, introduzca un número de teléfono válido (8-15 dígitos).");
      return;
    }

    // Validar número de tarjeta
    if (!isValidCardNumber(saveCardNumber)) {
      showNotification("error", "Número de Tarjeta Inválido", "Por favor, introduzca un número de tarjeta válido (13-19 dígitos).");
      return;
    }

    // Validar CVC
    if (!isValidCVC(saveCVC)) {
      showNotification("error", "CVC Inválido", "Por favor, introduzca un código CVC válido (3-4 dígitos).");
      return;
    }

    // Validar fecha de expiración
    if (!isValidExpirationDate(saveExpirationDate)) {
      showNotification("error", "Fecha de Expiración Inválida", "Por favor, introduzca una fecha de expiración válida (MMYY o MMYYYY).");
      return;
    }

    // Si todas las validaciones pasan, crear el objeto de datos del usuario
    const userData = {
      fullName: `${saveName} ${saveLastName}`,
      email: saveEmail,
      phoneNumber: savePhoneNumber,
      paymentInfo: {
        cardNumber: saveCardNumber,
        cvc: saveCVC,
        expirationDate: saveExpirationDate
      }
    };

    // Enviar datos al contexto (esta función deberás crearla en tu contexto)
    if (typeof saveUserData === 'function') {
      saveUserData(userData);
    } else {
      console.warn("La función saveUserData no está definida en el contexto");
    }
    
    // Notificar éxito y cerrar formulario o continuar al siguiente paso
    notification.success({
      message: "Datos Guardados",
      description: "Tus datos han sido guardados exitosamente.",
      placement: "top",
    });
    
    handleShowButtonPay(true); // Ocultar el formulario o avanzar al siguiente paso
  };

  return (
    <div className="flex justify-center w-full px-4 md:px-0">
      <form className="space-y-4 bg-gray-400 shadow-xl rounded-xl px-4 sm:px-8 py-4 w-full max-w-md">
        <h3 className="text-xl sm:text-2xl font-bold text-center">
          Datos Personales
        </h3>

        {/* Campos de nombre y apellidos responsivos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Nombre"
            value={saveName}
            onChange={(e) => setSaveName(e.target.value)}
            className="w-full py-2 px-4 rounded-lg border-2 border-blue-header"
          />
          <input
            type="text"
            placeholder="Apellidos"
            value={saveLastName}
            onChange={(e) => setSaveLastName(e.target.value)}
            className="w-full py-2 px-4 rounded-lg border-2 border-blue-header"
          />
        </div>

        <input
          type="email"
          placeholder="Correo electrónico"
          value={saveEmail}
          onChange={(e) => setSaveEmail(e.target.value)}
          className="w-full py-2 px-4 rounded-lg border-2 border-blue-header"
        />
        <input
          type="tel"
          placeholder="Teléfono"
          value={savePhoneNumber}
          onChange={(e) => setSavePhoneNumber(e.target.value)}
          className="w-full py-2 px-4 rounded-lg border-2 border-blue-header"
        />

        {/* Datos de pago */}
        <h3 className="text-xl sm:text-2xl font-bold text-center">
          Método de pago
        </h3>
        <input
          type="text"
          placeholder="Número de tarjeta"
          value={saveCardNumber}
          onChange={(e) => setSaveCardNumber(e.target.value)}
          maxLength={19}
          className="w-full py-2 px-4 rounded-lg border-2 border-blue-header"
        />

        {/* Campos de CVC y fecha responsivos */}
        <div className="grid grid-cols-1 pb-2 sm:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="CVC"
            value={saveCVC}
            onChange={(e) => setSaveCVC(e.target.value)}
            maxLength={4}
            className="w-full py-2 px-4 rounded-lg border-2 border-blue-header"
          />
          <input
            type="text"
            placeholder="Fecha de expiración (MMYY)"
            value={saveExpirationDate}
            onChange={(e) => setSaveExpirationDate(e.target.value)}
            maxLength={6}
            className="w-full py-2 px-4 rounded-lg border-2 border-blue-header"
          />
        </div>

        {/* Botón centrado con estilo */}
        <div className="flex justify-center pt-2">
          <button 
            type="button"
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-full transition duration-300 ease-in-out" 
            onClick={handleSaveData}
          >
            Confirmar Datos
          </button>
        </div>
      </form>
    </div>
  );
}