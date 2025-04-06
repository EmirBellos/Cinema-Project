import { createContext, useEffect, useState } from "react";
import { mock_Movies as data } from "../Data/mock_Movies";

export const ListMoviesContext = createContext();

export function ListMoviesContextProvider(props) {
  const [moviesList, setMoviesList] = useState([]);
  const [loading, setLoading] = useState(true);

  const getMovieById = (id) => {
    return moviesList.find((movie) => movie.id === id) || null;
  };

  useEffect(() => {
    try {
      setMoviesList(data);
      setLoading(false);
    } catch (error) {
      console.error("Error loading movies:", error);
      setLoading(false);
    }
  }, []);

  return (
    <ListMoviesContext.Provider value={{ moviesList, getMovieById, loading }}>
      {props.children}
    </ListMoviesContext.Provider>
  );
}
