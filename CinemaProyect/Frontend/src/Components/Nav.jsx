import React, {useContext} from "react";
import { NavLink, Link } from "react-router-dom";
import { ListMoviesContext } from "../Context/ListMoviesContext";

export default function Nav() {

   const {clearSelection, cleanSelection, cleanShowsProcess} = useContext(ListMoviesContext);
  
    const handleNavigation = () => {
      //setIsMenuOpen(false);
      cleanSelection();
      cleanShowsProcess();
      clearSelection();
    };
  return (
    <div>
      <ul className="hidden md:flex items-center justify-end gap-8 text-lg text-white">
        <li>
          <NavLink
            to="/" onClick={() => handleNavigation()}
            className={({ isActive }) =>
              isActive ? "text-cinema-yellow" : "hover:text-gray-300"
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/Cartelera" onClick={() => handleNavigation()}
            className={({ isActive }) =>
              isActive ? "text-cinema-yellow" : "hover:text-gray-300"
            }
          >
            Cartelera
          </NavLink>
        </li>
        <li>
          <Link to="/EditarReserva" onClick={() => handleNavigation()}>
            <button className="px-6 py-3 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
              Editar Reserva
            </button>
          </Link>
        </li>
      </ul>
    </div>
  );
}
