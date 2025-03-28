import React from "react";
import { MdOutlineLocalMovies } from "react-icons/md";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full py-4 mt-auto bg-secondary-purple">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col items-center space-y-6">
          {/* Logo */}
          <MdOutlineLocalMovies className="size-8 hover:text-blue-600" />

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-6">
            {/* GitHub Repository */}
            <a
              href="https://github.com/EmirBellos/Cinema-Project"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-blue-600 transition-colors"
            >
              <FaGithub className="size-5" />
              <span>Repositorio</span>
            </a>

            {/* LinkedIn Links */}
            <a
              href="www.linkedin.com/in/emir-bellos"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-blue-600 transition-colors"
            >
              <FaLinkedin className="size-5" />
              <span>EmirBellos</span>
            </a>

            <a
              href="https://www.linkedin.com/in/quintalui01"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-blue-600 transition-colors"
            >
              <FaLinkedin className="size-5" />
              <span>LuisQuintana</span>
            </a>
          </div>

          {/* Copyright */}
          <div className="text-sm text-gray-600 mt-8 pt-4 border-t w-full border-white/20 text-center">
            © {new Date().getFullYear()} Cinema Project. Todos los derechos
            reservados.
          </div>
        </div>
      </div>
    </footer>
  );
}
