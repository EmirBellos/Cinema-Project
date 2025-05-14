# Cinema-Project

## Resumen del Proyecto

**Sistema de Reservas para Cine**

Este proyecto implementa un sistema transaccional para reservar asientos en salas de cine utilizando una arquitectura moderna basada en servicios y tecnologías open-source.

### Tecnologías y Arquitectura

- **Frontend:**  
  - **React.js:** 
    - Interfaz de usuario dinámica y responsiva.  
    - Comunicación mediante **APIs REST**.
  - [Descripción](./CinemaProyect/Frontend/README.md)

- **Backend:**  
  - **Python + Django:**  
    - Lógica de negocio implementada en Django.  
    - APIs REST desarrolladas con Django REST Framework.
  - [Descripción](./CinemaProyect/Backend/README.md)

- **Base de Datos:**  
  - **PostgreSQLlite:** Utilizado para el almacenamiento de información (reservas, asientos, etc.).  

- **Servicios Adicionales:**  
  - **Integración de Pagos:** Con APIs de terceros (por ejemplo, Stripe o PayPal) mediante llamadas REST.  
  - **Notificaciones:** Envío de correos de confirmación utilizando servicios gratuitos como SendGrid.

