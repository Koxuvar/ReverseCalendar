const sequelize = require('../config/connection');
const userSeedData = require('./userSeedData.json');
const catagorySeedData = require('./catagorySeedData.json');
dailyCheckSeedData = require('./dailyCheckSeedData.json');
const { User, Catagory, DailyCheck } = require('../models');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  const users = await User.bulkCreate(userSeedData, {individualHooks: true, returning: true});
  const catagorys = await Catagory.bulkCreate(catagorySeedData);
  const dailyChecks = await DailyCheck.bulkCreate(dailyCheckSeedData);

  process.exit(0);
};

seedAll();