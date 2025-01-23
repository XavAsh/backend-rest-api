const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("backend_rest_api", "root", "root", {
  host: "127.0.0.1",
  port: 8889, // MAMP's default MySQL port
  dialect: "mysql", // Or the database dialect you're using
});

// Test connection
sequelize
  .authenticate()
  .then(() => {
    console.log(
      "Connection to the database has been established successfully."
    );
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = sequelize;
