
# Cinema-Project Backend

## Introducción

Este documento describe la arquitectura y desarrollo del backend para el sistema de reservas de cine en el proyecto Cinema-Project, implementado principalmente con Python y Django.

## Tecnologías Utilizadas

- **Python + Django:**  
  Base del desarrollo del backend para alojar la lógica de negocio y gestión de datos.

- **Django REST Framework:**  
  Facilita la creación de APIs REST para comunicación con el frontend.

## Configuración y Ejecución

1. Clona el repositorio del proyecto:
   ```bash
   git clone <url-del-repositorio>
*si ya lo has clonado ignora este paso*

2. Instala las dependencias necesarias:
    ```bash
    pip install -r requirements.txt
*Asegurate de estar dentro de la carpeta Backend en tu terminal*

3. Configura la base de datos PostgreSQLlite:

   * Asegúrate de tener PostgreSQLlite instalado y configurado correctamente.
   * Actualiza las configuraciones de base de datos en settings.py.

4. Ejecuta las migraciones de base de datos:
    ```bash
    python manage.py migrate

5. Inicia el servidor backend:
    ```bash
    python manage.py runserver