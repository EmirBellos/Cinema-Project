import React from "react";

export default function FormDataUsuario() {
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
            className="w-full py-2 px-4 rounded-lg border-2 border-blue-header"
          />
          <input
            type="text"
            placeholder="Apellidos"
            className="w-full py-2 px-4 rounded-lg border-2 border-blue-header"
          />
        </div>

        <input
          type="email"
          placeholder="Correo electronico"
          className="w-full py-2 px-4 rounded-lg border-2 border-blue-header"
        />
        <input
          type="number"
          placeholder="Teléfono"
          className="w-full py-2 px-4 rounded-lg border-2 border-blue-header"
        />

        {/* Datos de pago */}
        <h3 className="text-xl sm:text-2xl font-bold text-center">
          Método de pago
        </h3>
        <input
          type="number"
          placeholder="Número de tarjeta"
          className="w-full py-2 px-4 rounded-lg border-2 border-blue-header"
        />

        {/* Campos de CVC y fecha responsivos */}
        <div className="grid grid-cols-1 pb-2 sm:grid-cols-2 gap-4">
          <input
            type="number"
            placeholder="CVC"
            className="w-full py-2 px-4 rounded-lg border-2 border-blue-header"
          />
          <input
            type="number"
            placeholder="Fecha de expiración"
            className="w-full py-2 px-4 rounded-lg border-2 border-blue-header"
          />
        </div>

        {/* Botón centrado con estilo */}
        {/* <div className="flex justify-center pt-2">
          <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-full transition duration-300 ease-in-out">
            Cancelar compra
          </button>
        </div> */}
      </form>
    </div>
  );
}
