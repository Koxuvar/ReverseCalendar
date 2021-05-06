const sequelize = require('../config/connection');
const seedDays = require('./daysData');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedDays();

  process.exit(0);
};

seedAll();