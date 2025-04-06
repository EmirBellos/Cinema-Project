import { createContext, useEffect, useState } from "react";
import { mock_Movies as data } from "../Data/mock_Movies";

export const ListMoviesContext = createContext();

export function ListMoviesContextProvider(props) {
  const [moviesList, setMoviesList] = useState([]);
  useEffect(() => setMoviesList(data), []);

  //Posibilidad de crear una función para añadir nuevas películas

  return (
    <ListMoviesContext.Provider value={{ moviesList }}>
      {props.children}
    </ListMoviesContext.Provider>
  );
}
