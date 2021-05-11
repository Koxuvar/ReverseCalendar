const User = require('./user');
const DailyCheck = require('./dailyCheck');
const Catagory = require('./catagory');

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