export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Files', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      name: Sequelize.STRING,
      ext: Sequelize.STRING,
      mime: Sequelize.STRING,
      size: Sequelize.INTEGER,
      stored_name: Sequelize.STRING,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('Files');
  }
};
