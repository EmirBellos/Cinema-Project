import React from 'react'
import {useLocation} from 'react-router-dom'
import Header from './Header'
import Footer from './Footer';
//importar los path a cada componente

export default function Layout({children}) {
    const location = useLocation();//Hook de router-dom (utilizar para forzar animaciones y ubicaciones de la vista.)
  return (
    <div className="min-h-screen flex flex-col">
      {/**insertar componentes */}
      <Header />
      <main className='flex-grow'>{children}</main>
      <Footer/>
    </div>
  )
}
