import React from "react";

export default function ({ movie }) {
  return (
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
              src={movie.imageUrl}
              alt={movie.title}
              className="w-full h-auto rounded-lg"
            />
          </div>

          {/** Info de la película y de la reserva */}
          {/* Información a la derecha */}
          <div className="w-2/3 space-y-4">
            {/* Título y detalles básicos */}
            <div>
              <h3 className="text-xl font-bold text-gray-900">{movie.title}</h3>
              <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                <span>{movie.runtime}</span>
                <span>|</span>
                <span>{movie.category}</span>
              </div>
            </div>

            {/* Detalles de la reserva */}
            <div className="space-y-3">
              {/* Lugar */}
              <div>
                <p className="text-sm text-gray-500 font-bold">Lugar</p>
                <p className="font-medium">
                  {/* Pendiente selección */}
                  <span className="text-gray-400 italic">Por seleccionar</span>
                </p>
              </div>

              {/* Fecha */}
              <div>
                <p className="text-sm text-gray-500 font-bold">Fecha</p>
                <p className="font-medium">
                  <span className="text-gray-400 italic">Por seleccionar</span>
                </p>
              </div>

              {/* Horario */}
              <div>
                <p className="text-sm text-gray-500 font-bold">Horario</p>
                <p className="font-medium">
                  <span className="text-gray-400 italic">Por seleccionar</span>
                </p>
              </div>

              {/* Cantidad de boletos */}
              <div>
                <p className="text-sm text-gray-500 font-bold">Boletos</p>
                <p className="font-medium">
                  <span className="text-gray-400 italic">Por seleccionar</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/** Botón para acceder a la página de pago (inhabilitado) */}
        <div className="pt-12 pb-2 inset-x-0 bottom-0">
          <button className="bg-red-600 w-full flex justify-center items-center rounded-lg text-white/80 hover:bg-red-400 ">
            PAGAR
          </button>
        </div>
      </div>
    </div>
  );
}
