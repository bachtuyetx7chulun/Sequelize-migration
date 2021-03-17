'use strict'

const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const basename = path.basename(__filename)
const env = process.env.NODE_ENV || 'development'
const config = require(__dirname + '/../config/database.json')[env]
const db = {}
const roomModel = require('./room')
const messageModel = require('./message')
const userModel = require('./user')

let sequelize
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config)
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  )
}

fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    )
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    )
    db[model.name] = model
  })

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

const Room = roomModel(sequelize, Sequelize.DataTypes)
const User = userModel(sequelize, Sequelize.DataTypes)
const Message = messageModel(sequelize, Sequelize.DataTypes)
const models = {
  Room,
  User,
  Message,
}

Room.associate(models)
Message.associate(models)
User.associate(models)


db.sequelize = sequelize
db.Sequelize = Sequelize
db.Room = Room
db.User = User
db.Message = Message

module.exports = db
