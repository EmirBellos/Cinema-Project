import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import { NavLink } from "react-router-dom";
import { MdOutlineLocalMovies } from "react-icons/md";

export default function Header() {
  const [scrolled, setScrolled] = useState(false); // Hook para el scrolleo del navegador

  useEffect(() => {
    const handleScroll = () => {
      // Cambia el estado cuando el scroll supera 50px
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-primary-purple transition-all duration-300 ${
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
          <Nav />
        </div>
      </div>
    </header>
  );
}
