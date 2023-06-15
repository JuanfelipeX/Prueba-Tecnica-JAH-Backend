const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

// Obtener la lista completa de usuarios
router.get('/', (req, res) => {
  User.findAll()
    .then((users) => {
      res.json(users);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error al obtener la lista de usuarios' });
    });
});

// Crear un nuevo usuario
router.post('/', (req, res) => {
  const { name, email, image } = req.body;

  User.create({ name, email, image })
    .then((user) => {
      res.json(user);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error al crear un nuevo usuario' });
    });
});

// Resto de los endpoints y lógica de la API

module.exports = router;
