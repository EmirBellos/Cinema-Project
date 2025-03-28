# Cinema-Project



## Resumen del Proyecto

**Sistema de Reservas para Cine**

Este proyecto implementa un sistema transaccional para reservar asientos en salas de cine utilizando una arquitectura moderna basada en servicios y tecnologías open-source.

### Tecnologías y Arquitectura

- **Frontend:**  
  - **React.js:** Interfaz de usuario dinámica y responsiva.  
  - Comunicación mediante **APIs REST**.

- **Backend:**  
  - **Python + Django:**  
    - Lógica de negocio implementada en Django.  
    - APIs REST desarrolladas con Django REST Framework.
  - **Orquestación de tareas asíncronas:**  
    - **Celery** para encadenar procesos críticos (validar pago, reservar asiento, enviar correo de confirmación).  
    - Broker de mensajes con **RabbitMQ** o **Redis**.

- **Base de Datos:**  
  - **PostgreSQL:** Utilizado para el almacenamiento de información (reservas, asientos y usuarios).  
  - Durante el desarrollo se puede optar por ejecutar PostgreSQL en un contenedor para optimizar costos.

- **Servicios Adicionales:**  
  - **Integración de Pagos:** Con APIs de terceros (por ejemplo, Stripe o PayPal) mediante llamadas REST.  
  - **Notificaciones:** Envío de correos de confirmación utilizando servicios gratuitos como SendGrid.

### Despliegue y Uso de Recursos en Azure

- **Entorno Local:**  
  - Uso de **Docker Compose** para levantar los servicios necesarios (Django, Celery, Broker y PostgreSQL).

- **Despliegue en Azure:**  
  - Aprovechamiento del crédito de $100 USD para estudiantes:  
    - Despliegue de una VM Linux (por ejemplo, una instancia B1S) para alojar los contenedores.  
    - Posibilidad de usar Azure Database for PostgreSQL o un contenedor para la base de datos.
  - **Optimización de recursos:**  
    - Monitoreo y escalado controlado mediante Azure Monitor.  
    - Uso eficiente de servicios mediante la activación y desactivación de componentes según la necesidad.
