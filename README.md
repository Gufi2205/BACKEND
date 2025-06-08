# Gestor de Almacenes - Backend con Express.js y PostgreSQL

## Propósito

Este proyecto es un backend para un **gestor de almacenes**. Permite registrar usuarios, iniciar sesión, y gestionar productos en un almacén (crear, actualizar, cambiar estado, etc.). El acceso a la gestión de productos está protegido mediante autenticación JWT, asegurando que solo usuarios registrados puedan operar sobre el inventario.

---

## Características

- **Registro de usuarios** con contraseña encriptada.
- **Login de usuarios** y generación de token JWT.
- **Protección de rutas**: solo usuarios autenticados pueden acceder a la gestión de productos.
- **Gestión de productos**: crear productos, actualizar cantidad y estado (Disponible / No hay Stock).
- **Frontend básico** con formularios HTML para registro, login y gestión de productos.
- **Persistencia de datos** en PostgreSQL.

---

## Tecnologías y Librerías

- **Node.js**: Entorno de ejecución.
- **Express.js**: Framework para el servidor HTTP y rutas.
- **pg**: Cliente PostgreSQL para Node.js.
- **dotenv**: Manejo de variables de entorno.
- **bcryptjs**: Encriptación de contraseñas.
- **jsonwebtoken**: Generación y verificación de tokens JWT.
- **nodemon**: Recarga automática en desarrollo.

---

## Estructura de Carpetas

```
src/
│
├── app.js
├── db/
│   └── index.js
├── controllers/
│   ├── authController.js
│   └── productController.js
├── middleware/
│   └── authMiddleware.js
├── routes/
│   ├── authRoutes.js
│   └── productRoutes.js
public/
│   ├── form.html
│   ├── login.html
│   └── register.html
.env
package.json
```

---

## Instalación y Uso

1. **Clona el repositorio y entra en la carpeta:**
   ```bash
   git clone <repo-url>
   cd <carpeta-del-proyecto>
   ```

2. **Instala las dependencias:**
   ```bash
   npm install
   ```

3. **Configura la base de datos PostgreSQL:**
   - Crea la base de datos y las tablas según el esquema proporcionado.
   - Crea un usuario y otorga permisos.

4. **Configura el archivo `.env`:**
   ```
   DB_USER=admin
   DB_PASSWORD=admin
   DB_HOST=localhost
   DB_PORT=5432
   DB_DATABASE=storage
   JWT_SECRET=miclaveultrasecreta123
   ```

5. **Inicia el servidor:**
   ```bash
   npm run dev
   ```

6. **Accede a los formularios:**
   - Registro: [http://localhost:3000/register.html](http://localhost:3000/register.html)
   - Login: [http://localhost:3000/login.html](http://localhost:3000/login.html)
   - Gestión de productos: [http://localhost:3000/form.html](http://localhost:3000/form.html) (requiere login)

---

## Endpoints principales

- `POST /auth/register` — Registro de usuario.
- `POST /auth/login` — Login de usuario (devuelve JWT).
- `POST /products/create` — Crear producto (requiere JWT).
- `GET /products/all` — Listar productos (puedes agregar este endpoint para pruebas).

---

## Notas

- El frontend es básico y sirve para pruebas rápidas.
- Puedes usar Thunder Client o Postman para probar los endpoints.
- El token JWT se almacena en `localStorage` y se usa para proteger el acceso a la gestión de productos.

---

## Autor

- Gufi

---
