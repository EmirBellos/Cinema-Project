import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import {useContext} from 'react';
import {ListMoviesContext} from './Context/ListMoviesContext';
// Importar todas las rutas
import Layout from "./Components/Layout";
import Home from "./Pages/Home";
import Cartelera from "./Pages/Cartelera";
import EditarReserva from "./Pages/EditarReserva";
import SeleccionHorarios from "./Pages/SeleccionHorarios";

function ProtectedRoute({ children }) {
  const { selectedMovie } = useContext(ListMoviesContext);

  if (!selectedMovie) {
    return <Navigate to="/Cartelera" replace />;
  }

  return children;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        ></Route>
        <Route
          path="/Cartelera"
          element={
            <Layout>
              <Cartelera />
            </Layout>
          }
        ></Route>
        <Route
          path="/EditarReserva"
          element={
            <Layout>
              <EditarReserva />
            </Layout>
          }
        ></Route>
        <Route
          path="/SeleccionHorarios"
          element={
            <ProtectedRoute>
              <Layout>
                <SeleccionHorarios />
              </Layout>
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
