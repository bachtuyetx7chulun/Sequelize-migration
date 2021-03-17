'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Room.hasMany(models.Message, {
        foreignKey: 'room_id',
        as: 'message',
      })
    }
  }
  Room.init(
    {
      room: DataTypes.STRING,
      limit: DataTypes.NUMBER,
    },
    {
      sequelize,
      modelName: 'Room',
    }
  )
  return Room
}
