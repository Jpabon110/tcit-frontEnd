# TCIT Frontend Challenge

Este proyecto es un frontend desarrollado con **React + Redux + Vite** para consumir el backend del challenge.  
La aplicación permite iniciar sesión con un usuario de prueba y visualizar posts desde el backend.

[prueba de challenge.webm](https://github.com/user-attachments/assets/56e0ce42-fcb9-487f-8667-e2044ba572e3)


---

## 🚀 **Requisitos previos**

Antes de correr este proyecto, asegúrate de tener:

- **Node.js 18.x o 20.x (recomendado 18 LTS)**  
  - Verifica tu versión con:
    ```bash
    node -v
    ```
- **npm 9.x o superior**  
  - Verifica tu versión con:
    ```bash
    npm -v
    ```
- Acceso al backend en ejecución (consulta el README del backend).

---

✅ **Solución aplicada**: se ha fijado la versión estable de **Vite 5.4.10** y **@vitejs/plugin-react 4.3.1**, que funcionan correctamente en todos los entornos.

1. **Colocar variables de entorno**
 Crea un archivo .env en la raiz del proyecto y agregale la siguiente variable
 VITE_URL_SIGNIN=http://localhost:3000

2. **Instalar dependencias**  
  npm install

3. **correr el proyecto**  
  npm run dev

---
