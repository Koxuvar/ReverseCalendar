const User = require('./User');
const dailyCheck = require('./dailyCheck');
const catagory = require('./catagory');

User.hasMany(dailyCheck,{
  foreignKey: 'user_id'
});

dailyCheck.belongsTo(User,{
  foreignKey: 'user_id'
});

catagory.belongsTo(User,{
  foreignKey: 'user_id'

})

module.exports = { User,catagory,dailyCheck };