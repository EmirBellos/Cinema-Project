import React, { useState, useEffect, useContext } from "react";
import Nav from "./Nav";
import { NavLink } from "react-router-dom";

//Iconos utilizados en el Navegador
import { MdOutlineLocalMovies } from "react-icons/md";
import { FaBars } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { ListMoviesContext } from "../Context/ListMoviesContext";

export default function Header() {
  const [scrolled, setScrolled] = useState(false); // Hook para el scrolleo del navegador
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {clearSelection, cleanSelection} = useContext(ListMoviesContext);

  const handleNavigation = () => {
    setIsMenuOpen(false);
    cleanSelection();
    clearSelection();

  };

  useEffect(() => {
    const handleScroll = () => {
      // Cambia el estado cuando el scroll supera 50px
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-blue-header transition-all duration-300 ${
        scrolled ? "py-2 shadow-md" : "py-4"
      }`}
    >
      {/**Logotipo y nombre del cinema */}
      <div className="container mx-auto px-4 flex items-center justify-between">
        <NavLink to="/" className="flex items-center">
          <MdOutlineLocalMovies
            className="size-16 sm:size-14 md:size-14 lg:size-16 xl:size-18 
                        text-secondary-purple transition-all duration-300 hover:scale-110"
          />
          <h1 className="text-2xl md:text-2xl lg:text-3xl font-bold text-white">
            CinedePelículas
          </h1>
        </NavLink>

        {/**Área de Navegación */}
        <div className="flex items-center">
          {/**En pantallas lg o mayores muestra el nav predeterminado */}
          <div className="hidden lg:block mr-4">
            <Nav />
          </div>
          {/**En pantallas menores a lg se muestra el ícono menú sandwich */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white text-2xl focus:outline-none"
            >
              <FaBars />
            </button>
          </div>
        </div>
      </div>

      {/**Menú desplegable para celulares */}
      {isMenuOpen && (
        <div
          className={`fixed top-0 right-0 z-50 h-full w-64 bg-blue-header transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/**Contenedor para el botón cerrar */}
          <div className="flex justify-end p-4">
            <button
              onClick={() => handleNavigation()}
              className="text-white hover:text-gray-300 transition-colors"
            >
              <IoMdClose className="h-6 w-6"/>
            </button>
          </div>

          {/**Lista de navegación */}
          <ul className="flex flex-col space-y-4 p-4 text-white text-lg">
            <li>
              <NavLink
                to="/"
                onClick={() => handleNavigation()}
                className="block hover:text-gray-300 transition-colors"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/Cartelera"
                onClick={() => handleNavigation()}
                className="block hover:text-gray-300 transition-colors"
              >
                Cartelera
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/EditarReserva"
                onClick={() => handleNavigation()}
                className="block hover:text-gray-300 transition-colors"
              >
                Editar Reserva
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
