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

// Obtener los detalles de un usuario específico
router.get('/:id', (req, res) => {
  const userId = req.params.id;

  User.findByPk(userId)
    .then((user) => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: 'Usuario no encontrado' });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error al obtener los detalles del usuario' });
    });
});

// Actualizar los detalles de un usuario específico
router.put('/:id', (req, res) => {
  const userId = req.params.id;
  const { name, email, image } = req.body;

  User.findByPk(userId)
    .then((user) => {
      if (user) {
        user.name = name;
        user.email = email;
        user.image = image;
        return user.save();
      } else {
        res.status(404).json({ error: 'Usuario no encontrado' });
      }
    })
    .then((updatedUser) => {
      res.json(updatedUser);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error al actualizar los detalles del usuario' });
    });
});

// Eliminar un usuario específico
router.delete('/:id', (req, res) => {
  const userId = req.params.id;

  User.findByPk(userId)
    .then((user) => {
      if (user) {
        return user.destroy();
      } else {
        res.status(404).json({ error: 'Usuario no encontrado' });
      }
    })
    .then(() => {
      res.json({ message: 'Usuario eliminado correctamente' });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error al eliminar el usuario' });
    });
});

module.exports = router;
