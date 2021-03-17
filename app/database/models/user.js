'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Message, { foreignKey: 'user_id', as: 'userMessage' })
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      age: DataTypes.NUMBER,
      address: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    }
  )
  return User
}
