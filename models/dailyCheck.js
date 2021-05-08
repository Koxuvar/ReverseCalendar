const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class DailyCheck extends Model{}

DailyCheck.init(
  {
   id:{
     type: DataTypes.INTEGER,
     allowNull: false,
     primaryKey: true,
     autoIncrement: true,
   },
   catagory_id:{
     type: DataTypes.STRING,
     allowNull: false,
   },
   day:{
     type: DataTypes.DATE,
     allowNull: false,
   },
   user_id:{
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
     model: 'user',
     key: 'id',
   },
  },
},
{
  sequelize,
  timestamps: false,
  freezeTableName: true,
  underscore: true,
  modelName: 'dailyCheck',
}
);

module.exports = DailyCheck;
