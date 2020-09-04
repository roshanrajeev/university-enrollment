const { Sequelize, DataTypes } = require("sequelize")
const sequelize = require("../db/sequelize")

const uniDetails = sequelize.define(
  "uniDetail",
  {
    uid: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    uni_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    reg_date: {
      type: DataTypes.DATEONLY,
      defaultValue: Sequelize.NOW,
    },
    exp_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    imgurl: {
      type: DataTypes.STRING,
    },
    no_of_students: {
      type: DataTypes.INTEGER,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    weburl: {
      type: DataTypes.STRING,
    },
    contact_no: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATEONLY,
    },
    updatedAt: {
      type: DataTypes.DATEONLY,
    },
  },
  {
    tableName: "uniDetails",
  }
)

;(async () => {
  await sequelize.sync()
})()

module.exports = uniDetails
