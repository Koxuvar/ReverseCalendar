const User = require('./user');
const DailyCheck = require('./DailyCheck');
const Catagory = require('./Catagory');

//user & catagory relationship
User.hasMany(Catagory,{
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});
Catagory.belongsTo(User,{
  foreignKey: 'user_id'
});

//user & dailyCheck relationship
User.hasMany(DailyCheck,{
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

DailyCheck.belongsTo(User,{
  foreignKey: 'user_id'
});




module.exports = { User,Catagory,DailyCheck };