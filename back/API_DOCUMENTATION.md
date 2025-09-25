# Documentación de la API

Esta documentación detalla los endpoints disponibles en la API, sus métodos, y los formatos de entrada y salida necesarios para una comunicación correcta con el frontend.

## Endpoints

### 1. Estado de la API

Verifica si la API está en funcionamiento.

- **URL:** `/`
- **Método:** `GET`
- **Entrada:** Ninguna.
- **Salida (Éxito):**
  - **Código:** `200 OK`
  - **Cuerpo:** `API is running` (Texto plano)

---

### 2. Inicio de Sesión

Autentica a un usuario y crea una sesión.

- **URL:** `/login`
- **Método:** `GET`
- **Entrada:**
  - **Cabeceras (Headers):**
    - `data`: Un string JSON con las credenciales del usuario.
      ```json
      {
        "username": "nombre_de_usuario",
        "password": "tu_contraseña"
      }
      ```
- **Salida (Éxito):**
  - **Código:** `200 OK`
  - **Cuerpo:**
    ```json
    {
      "message": "Bienvenido nombre_de_usuario"
    }
    ```
- **Salida (Errores):**
  - **Código:** `401 Unauthorized` (Credenciales inválidas)
    ```json
    {
      "errorCode": 401,
      "message": "Credenciales inválidas"
    }
    ```
  - **Código:** `404 Not Found` (Usuario no encontrado)
    ```json
    {
      "errorCode": 404,
      "message": "Usuario no encontrado"
    }
    ```
  - **Código:** `500 Internal Server Error`
    ```json
    {
      "errorCode": 500,
      "message": "Error del servidor"
    }
    ```

---

### 3. Registro de Usuario

Registra un nuevo usuario en el sistema.

- **URL:** `/register`
- **Método:** `POST`
- **Entrada:**
  - **Cabeceras (Headers):**
    - `data`: Un string JSON con los datos del nuevo usuario.
      ```json
      {
        "username": "nuevo_usuario",
        "email": "correo@ejemplo.com",
        "password": "tu_contraseña"
      }
      ```
- **Salida (Éxito):**
  - **Código:** `200 OK`
  - **Cuerpo:** El cuerpo de la respuesta contiene un mensaje que a su vez es un objeto JSON anidado como string, indicando que el inicio de sesión posterior al registro fue exitoso.
    ```json
    {
      "message": "{\"message\":\"Bienvenido nuevo_usuario\"}"
    }
    ```
- **Salida (Errores):**
  - **Código:** `400 Bad Request` (Contraseña no proporcionada)
    ```json
    {
      "errorCode": 400,
      "message": "La contraseña es obligatoria"
    }
    ```
  - **Código:** `500 Internal Server Error` (Error durante el registro o el inicio de sesión automático)
    ```json
    {
      "errorCode": 500,
      "message": "Error al registrar usuario"
    }
    ```
    o
    ```json
    {
      "errorCode": 500,
      "message": "Error al iniciar sesión"
    }
    ```

---

### 4. Cierre de Sesión

Cierra la sesión del usuario actual.

- **URL:** `/logout`
- **Método:** `GET`
- **Entrada:** Ninguna (la sesión se identifica a través de la cookie de sesión).
- **Salida (Éxito):**
  - **Código:** `200 OK`
  - **Cuerpo:**
    ```json
    {
      "message": "Cerrar sesión"
    }
    ```
- **Salida (Error):**
  - **Código:** `500 Internal Server Error`
    ```json
    {
      "errorCode": 500,
      "message": "Error al cerrar sesión"
    }
    ```
