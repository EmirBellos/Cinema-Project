import React, { useContext } from "react";
import { RiSearchLine } from "react-icons/ri";
import { ListMoviesContext } from "../Context/ListMoviesContext";

export default function SearchBar() {
  const { searchMovies } = useContext(ListMoviesContext);
  return (
    <div className="w-full max-w-auto mx-auto mb-8">
      <div className="relative">
        <input
          type="text"
          placeholder="Buscador.."
          onChange={(e) => searchMovies(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
        ></input>
        <RiSearchLine className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
      </div>
    </div>
  );
}
