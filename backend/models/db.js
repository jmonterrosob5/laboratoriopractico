// backend/models/db.js
// Conexión a PostgreSQL usando pg y dotenv

const { Pool } = require('pg');
require('dotenv').config();

// Crear un pool de conexiones usando la URL de la base de datos
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Exportar el pool para usarlo en otros módulos
module.exports = pool;
