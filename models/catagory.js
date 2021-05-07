const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class catagory extends Model{
  checkUser(user_id) {
    return user_id.compareSync(user_id,this.user);
  }
}

catagory.init(
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

module.exports = catagory;
