import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Importar todas las rutas
import Layout from "./Components/Layout";
import Home from "./Pages/Home";
import Cartelera from "./Pages/Cartelera";
import EditarReserva from "./Pages/EditarReserva";
import DatosReserva from "./Pages/DatosReserva";

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
          path="/DatosReserva"
          element={
            <Layout>
              <DatosReserva />
            </Layout>
          }
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
