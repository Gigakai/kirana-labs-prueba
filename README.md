# Requisitos Previos

Antes de iniciar el proyecto asegúrate de tener:

* **Node.js** versión 16+ o superior
* **MySQL** instalado y en ejecución
* **NPM** o **Yarn**

---

# Configuración de la Base de Datos


Crea la base de datos manualmente:

```sql
CREATE DATABASE contact_db;
```

> 🔹 Si usas otro nombre, deberás definirlo en las variables de entorno.

---

# Variables de Entorno (Backend)

Crea un archivo **server/.env** con las siguientes claves:

```env
DB_NAME=contact_db
DB_USER=root
DB_PASSWORD=admin
DB_HOST=localhost
PORT=4000
```

Si alguna variable falta, el backend usará los valores *default* que están en el código
---

# Iniciar el servidor

1. Ir al directorio:

```bash
cd server
```

2. Instalar dependencias:

```bash
npm install
```

3. Inicia el servidor:

```bash
node index.js
```

# Cómo iniciar el cliente (Frontend)

1. Navega al directorio:

```bash
cd client
```

2. Instala dependencias:

```bash
npm install
```

3. Ejecuta el entorno de desarrollo:

```bash
npm run dev
```
