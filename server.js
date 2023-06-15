const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const app = express();
const PORT = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'prueba_jah',
    password: '1234',
    port: 5432, // puerto por defecto de PostgreSQL
});

// Prueba de conexión a la base de datos
pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error al conectar a la base de datos:', err);
    }
    console.log('Conexión exitosa a la base de datos');
    release(); // liberar el cliente de la conexión
  });

app.listen(PORT, () => {
    console.log(`Servidor Express escuchando en el puerto ${PORT}`);
  });
  