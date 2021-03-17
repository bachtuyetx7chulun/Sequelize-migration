'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Message.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' })
      Message.belongsTo(models.Room, { foreignKey: 'room_id', as: 'room' })
    }
  }
  Message.init(
    {
      message: DataTypes.STRING,
      room_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Message',
    }
  )
  return Message
}
