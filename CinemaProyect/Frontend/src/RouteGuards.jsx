import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ListMoviesContext } from './Context/ListMoviesContext';

export function MovieSelectionGuard({ children }) {
  const { hasValidMovieSelection } = useContext(ListMoviesContext);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!hasValidMovieSelection()) {
      console.log("No hay película seleccionada. Redirigiendo a Cartelera...");
      navigate('/Cartelera', { replace: true });
    }
  }, [hasValidMovieSelection, navigate]);
  
  return children;
}

// Otros protectores similares para diferentes etapas
export function ScheduleSelectionGuard({ children }) {
  const { hasValidScheduleSelection } = useContext(ListMoviesContext);
  const location = useLocation();
  
  if (!hasValidScheduleSelection()) {
    return <Navigate to="/SeleccionHorarios" state={{ from: location }} replace />;
  }
  
  return children;
}

export function TicketsSelectionGuard({ children }) {
  const { hasValidTicketsSelection } = useContext(ListMoviesContext);
  const location = useLocation();
  
  if (!hasValidTicketsSelection()) {
    return <Navigate to="/SeleccionAsientos" state={{ from: location }} replace />;
  }
  
  return children;
}