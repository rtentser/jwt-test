import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

export default User;
