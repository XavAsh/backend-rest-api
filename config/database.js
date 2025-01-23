const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("backend_rest_api", "root", "root", {
  host: "localhost",
  port: 8889, // MAMP's default MySQL port
  dialect: "mysql", // Or the database dialect you're using
});

module.exports = sequelize;
