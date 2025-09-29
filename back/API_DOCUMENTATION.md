
# Documentación de la API

Esta documentación detalla los endpoints disponibles en la API, sus métodos, y los formatos de entrada y salida necesarios para una comunicación correcta con el frontend.

**Advertencia General:** Todos los datos de entrada para los endpoints que los requieren se envían a través de la cabecera `data` como un string JSON, o en el body como JSON. Las respuestas incluyen mensajes, códigos de error y redirecciones cuando aplica. El registro y recuperación de contraseña usan validaciones estrictas.

---

## Notas generales
- Todas las rutas aceptan datos en el body o en el header `data` como JSON.
- Las respuestas incluyen mensajes, códigos de error y redirecciones cuando aplica.
- El registro y recuperación de contraseña usan validaciones estrictas.



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
    Un string JSON con las credenciales del usuario.
    - `data`: 
      ```json
      {
        "username": "nombre_de_usuario",
        "password": "tu_contraseña"
      }
      ```

  **EJEMPLO FUNCIONAL  (debe enviarse como string)**
  - `data`: ```{
    "username": "Wisso124214",
    "password": "QWEqwe123·",
  }```



- **Salida (ÉXITO):** **---------------------------------**
  - **Código:** `200 OK`
  - **Cuerpo:**
    ```json
    {
      "message": "Bienvenido nombre_de_usuario"
    }
    ```

- **Salida (ADVERTENCIA - Sesión existente):** **---------------------------------**
  - **Código:** `200 OK`
  - **Cuerpo:**
    ```json
    {
      "message": "Ya has iniciado sesión. Cierra la sesión para continuar.",
      "redirect": "/home"
    }
    ```

- **Salida (ERRORES):** **---------------------------------**
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
    Un string JSON con los datos del nuevo usuario.
    - `data`: 
      ```json
      {
        "username": "nuevo_usuario",
        "email": "correo@ejemplo.com",
        "password": "tu_contraseña",
        "confirmPassword": "tu_contraseña"
      }
      ```

  **EJEMPLO FUNCIONAL  (debe enviarse como string)**
  - `data`: ```{
    "username": "user123",
    "email": "luisdavidbustosnunez@gmail.com",
    "password": "QWEqwe123·",
    "confirmPassword": "QWEqwe123·"
  }```



- **Salida (ÉXITO):** **---------------------------------**
  - **Código:** `200 OK`
  - **Cuerpo:** El cuerpo de la respuesta contiene un mensaje que a su vez es un objeto JSON anidado como string, indicando que el inicio de sesión posterior al registro fue exitoso.
    ```json
    {
      "message": "{\"message\":\"Bienvenido nuevo_usuario\"}"
    }
    ```

- **Salida (ERRORES):** **---------------------------------**
  - **Código:** `400 Bad Request` (Campos faltantes o inválidos). El mensaje de error varía según el campo.
    ```json
    {
      "errorCode": 400,
      "message": "Por favor llene todos los campos"
    }
    ```
    o
    ```json
    {
      "errorCode": 400,
      "message": "<Mensaje de error de validación específico>"
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


- **Salida (ÉXITO):** **---------------------------------**
  - **Código:** `200 OK`
  - **Cuerpo:**
    ```json
    {
      "message": "Cerrar sesión"
    }
    ```

- **Salida (ADVERTENCIA - Sin sesión):** **---------------------------------**
  - **Código:** `200 OK`
  - **Cuerpo:**
    ```json
    {
      "message": "No has iniciado sesión.",
      "redirect": "/login"
    }
    ```

- **Salida (ERROR):** **---------------------------------**
  - **Código:** `500 Internal Server Error`
    ```json
    {
      "errorCode": 500,
      "message": "Error al cerrar sesión"
    }
    ```

---

### 5. Página de Inicio

Página protegida que requiere una sesión activa.

- **URL:** `/home`
- **Método:** `GET`
- **Entrada:** Ninguna (la sesión se identifica a través de la cookie de sesión).


- **Salida (ÉXITO):** **---------------------------------**
  - **Código:** `200 OK`
  - **Cuerpo:**
    ```json
    {
      "message": "Bienvenido a la página principal, nombre_de_usuario",
      "sessionData": {
        "username": "nombre_de_usuario"
      }
    }
    ```

- **Salida (ERROR - Sin sesión):** **---------------------------------**
  - **Código:** `200 OK`
  - **Cuerpo:**
    ```json
    {
      "message": "Debes iniciar sesión para acceder a esta página.",
      "redirect": "/login"
    }
    ```

---

### 6. Olvido de Contraseña

Inicia el proceso de recuperación de contraseña para un usuario.

- **URL:** `/forgotPassword`
- **Método:** `GET`
- **Entrada:**
  - **Cabeceras (Headers):**
    - `data`: Un string JSON con el email del usuario.
      ```json
      {
        "email": "correo@ejemplo.com"
      }
      ```
      
  **EJEMPLO FUNCIONAL  (debe enviarse como string)**
  - `data`: ```{
    "email": "luisdavidbustosnunez@gmail.com",
  }```



- **Salida (ÉXITO):** **---------------------------------**
  - **Código:** `200 OK`
  - **Cuerpo:**
    ```json
    {
      "message": "Se ha emulado el envío del email de recuperación"
    }
    ```

- **Salida (ERRORES):** **---------------------------------**
  - **Código:** `400 Bad Request` (Email no proporcionado o inválido).
    ```json
    {
      "errorCode": 400,
      "message": "Por favor ingrese su email"
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
      "message": "Error al buscar usuario"
    }
    ```

---

### 7. Restablecer Contraseña

Restablece la contraseña de un usuario utilizando un token de recuperación.

- **URL:** `/resetPassword`
- **Método:** `GET`
- **Entrada:**
  - **Cabeceras (Headers):**
    - `data`: Un string JSON con el token, la nueva contraseña y el ID del usuario.
      ```json
      {
        "userId": "id_del_usuario",
        "token": "token_de_recuperacion",
        "password": "nueva_contraseña",
        "confirmPassword": "nueva_contraseña",
      }
      ```

      
  **EJEMPLO FUNCIONAL  (debe enviarse como string)**
  - `data`: ```{
    "userId":"68d29510ae0ee799136de05d",
    "password":"QWEqwe123·",
    "confirmPassword":"QWEqwe123·",
    "token":"...",  (requiere un token válido)
  }```


- **Salida (ÉXITO):** **---------------------------------**
  - **Código:** `200 OK`
  - **Cuerpo:**
    ```json
    {
      "message": "Contraseña actualizada correctamente para el usuario . Por favor inicie sesión con su nueva contraseña.",
      "redirect": "/login"
    }
    ```
- **Salida (ERRORES):** **---------------------------------**
  - **Código:** `400 Bad Request` (Campos faltantes, contraseñas no coinciden o token inválido).
    ```json
    {
      "errorCode": 400,
      "message": "<Mensaje de error específico>"
    }
    ```
  - **Código:** `500 Internal Server Error`
    ```json
    {
      "errorCode": 500,
      "message": "Error al actualizar la contraseña"
    }
    ```

---

### 8. Buscar Usuarios

Busca usuarios que coincidan con los criterios proporcionados.

- **URL:** `/findUsers`
- **Método:** `GET`
- **Entrada:**
  - **Cabeceras (Headers):**
    - `data`: Un string JSON con uno o más criterios de búsqueda. La búsqueda es parcial (usa `includes`).
      ```json
      {
        "username": "user",
        "..."
      }
      ó
      {
        "email": "ejemplo.com",
        "..."
      }      
      ```

**EJEMPLO FUNCIONAL  (debe enviarse como string)**
  - `data`: ```{
    "email": "luisdavidbustosnunez@gmail.com",
  }```

```COMENTARIO```
  **Este método puede buscar cualquier propiedad de un usuario**
  **Si por ejemplo un usuario posee un campo {"asd":"123"},**
  **este método conseguirá la coincidencia y lo devolverá**


```IMPORTANTE```
  **Este endpoint NO devuelve únicamente los datos de UN usuario**
  **Devuelve los datos de todos los usuarios con esa coincidencia**

- **Salida (ÉXITO):** **---------------------------------**
  - **Código:** `200 OK`
  - **Cuerpo:**
    ```json
    {
      "users": [
        {
          "_id": "...",
          "username": "user123",
          "email": "test@ejemplo.com",
          "password": "...",
          "..."
        }
      ]
    }
    ```
    
- **Salida (ERROR):** **---------------------------------**
  - **Código:** `400 Bad Request` (Sin criterios de búsqueda).
    ```json
    {
      "errorCode": 400,
      "message": "Por favor ingrese al menos un criterio de búsqueda"
    }
    ```
