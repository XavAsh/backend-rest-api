const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
// const User = require("./user.model");

const Order = sequelize.define(
  "Order",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    shippingAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Pending",
    },
  },
  {
    tableName: "orders",
    timestamps: true,
  }
);
// Order.belongsTo(User, {
//   foreignKey: "userId",
//   as: "user",
// });
module.exports = Order;
