import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';

const File = sequelize.define('File', {
  name: DataTypes.STRING,
  ext: DataTypes.STRING,
  mime: DataTypes.STRING,
  size: DataTypes.INTEGER,
  stored_name: DataTypes.STRING,
});

export default File;
