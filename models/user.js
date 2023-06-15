const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('prueba_jah', 'postgres', '1234', {
  host: 'localhost',
  dialect: 'postgres',
});

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
  },
});

User.sync()
  .then(() => {
    console.log('Modelo de usuario sincronizado correctamente');
  })
  .catch((error) => {
    console.error('Error al sincronizar el modelo de usuario:', error);
  });

module.exports = User;
