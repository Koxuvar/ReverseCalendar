const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class Catagory extends Model{}

Catagory.init(
  {
   id:{
     type: DataTypes.INTEGER,
     allowNull: false,
     primaryKey: true,
     autoIncrement: true,
   },
   name:{
     type: DataTypes.STRING,
     allowNull: false,
   },
   color:{
     type: DataTypes.INTEGER,
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
  modelName: 'catagory',
}
);

module.exports = Catagory;
