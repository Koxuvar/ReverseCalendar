const User = require('./user');
const dailyCheck = require('./dailyCheck');
const catagory = require('./catagory');

User.hasMany(dailyCheck,{
  foreignKey: 'user_id'
});
User.hasMany(catagory,{
  foreignKey: 'user_id'
});

dailyCheck.belongsTo(User,{
  foreignKey: 'user_id'
});

catagory.belongsTo(User,{
  foreignKey: 'user_id'

})


module.exports = { User,catagory,dailyCheck };