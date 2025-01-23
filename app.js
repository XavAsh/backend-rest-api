const express = require("express");
const app = express();
const sequelize = require("./config/database");

app.use(express.json());

const authRoutes = require("./routes/auth.routes");
const cartRoutes = require("./routes/cart.routes");
const ordersRoutes = require("./routes/order.routes");
const productsRoutes = require("./routes/product.routes");

// Middlewares
// const authenticateToken = require("./middleware/auth.middleware"); // Middleware to authenticate token
// const isClient = require("./middleware/clentMiddleware"); // Middleware to check if the user is a client
// const isAdmin = require("./middleware/adminMiddleware"); // Middleware to check if the user is an admin

const Cart = require("./models/cart.model");
const Order = require("./models/order.model");
const User = require("./models/auth.model");
// const Product = require("./models/product.model");

app.use("/auth", authRoutes);
app.use("/cart", cartRoutes);
app.use("/orders", ordersRoutes);
app.use("/products", productsRoutes);

sequelize
  .sync({ alter: true })
  .then(() => console.log("All models synced successfully."))
  .catch((err) => console.error("Model syncing failed:", err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
