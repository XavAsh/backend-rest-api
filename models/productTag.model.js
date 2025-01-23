const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const ProductTag = sequelize.define(
  "ProductTag",
  {
    productId: {
      type: DataTypes.INTEGER,
      references: {
        model: "products",
        key: "id",
      },
    },
    tagId: {
      type: DataTypes.INTEGER,
      references: {
        model: "tags",
        key: "id",
      },
    },
  },
  {
    tableName: "product_tags",
    timestamps: false,
  }
);

module.exports = ProductTag;
