const sequelize = require('../config/connection');
// const seedDays = require('./daysData');
const userSeedData = require('./userSeedData.json');
const catagorySeedData = require('./catagorySeedData.json');
dailyCheckSeedData = require('./dailyCheckSeedData.json');
const { User, Catagory, DailyCheck } = require('../models');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  const users = await User.bulkCreate(userSeedData);
  const catagorys = await Catagory.bulkCreate(catagorySeedData);
  const dailyChecks = await DailyCheck.bulkCreate(dailyCheckSeedData);


  // await seedDays();

  process.exit(0);
};

seedAll();