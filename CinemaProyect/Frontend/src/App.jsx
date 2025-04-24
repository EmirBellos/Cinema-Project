import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import {useContext, useEffect} from 'react';
import {ListMoviesContext} from './Context/ListMoviesContext';
// Importar todas las rutas
import Layout from "./Components/Layout";
import Home from "./Pages/Home";
import Cartelera from "./Pages/Cartelera";
import EditarReserva from "./Pages/EditarReserva";
import SeleccionHorarios from "./Pages/SeleccionHorarios";
import SeccionAsientos from './Pages/SeccionAsientos';

function ProtectedRoute({ children }) {
  const { selectedMovie } = useContext(ListMoviesContext);

  if (!selectedMovie) {
    return <Navigate to="/Cartelera" replace />;
  }

  return children;
}

// Función para scroll top con una animación suave en todas las páginas
function ScrollTop() {
  const {pathname} = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);
}

function App() {
  return (
    <Router>
      <ScrollTop />
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
        <Route
          path="/SeccionAsientos"
          element={
            <ProtectedRoute>
              <Layout>
                <SeccionAsientos />
              </Layout>
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
