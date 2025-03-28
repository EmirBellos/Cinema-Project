import React from "react";
import { NavLink, Link } from "react-router-dom";

export default function Nav() {
  return (
    <>
      <ul className="hidden md:flex items-center justify-end gap-8 text-lg text-white">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-cinema-yellow" : "hover:text-gray-300"
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/Cartelera"
            className={({ isActive }) =>
              isActive ? "text-cinema-yellow" : "hover:text-gray-300"
            }
          >
            Cartelera
          </NavLink>
        </li>
        <li>
          <Link to="/EditarReserva">
            <button className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
              Editar Reserva
            </button>
          </Link>
        </li>
        {/** <li>
                <NavLink></NavLink>
            </li> */}
      </ul>
    </>
  );
}
