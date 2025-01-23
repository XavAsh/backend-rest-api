const express = require("express");
const app = express();
const sequelize = require("./config/database");

app.use(express.json());

const authRoutes = require("./routes/auth.routes");
const cartRoutes = require("./routes/cart.routes");
const ordersRoutes = require("./routes/order.routes");
const productsRoutes = require("./routes/product.routes");
const tagRoutes = require("./routes/tag.routes");

const authenticateToken = require("./middlewares/auth.middleware"); // Middleware to authenticate token
const isClient = require("./middlewares/clientMiddleware"); // Middleware to check if the user is a client
const isAdmin = require("./middlewares/clientMiddleware"); // Middleware to check if the user is an admin
// app.use("/client-route", authenticateToken, isClient, (req, res) => {
//     res.json({ message: "This is a client-only route." });
//   });

//   app.use("/admin-route", authenticateToken, isAdmin, (req, res) => {
//     res.json({ message: "This is an admin-only route." });
//   });

const Cart = require("./models/cart.model");
const Order = require("./models/order.model");
const User = require("./models/auth.model");
const Product = require("./models/product.model");
const Tag = require("./models/tag.model");
// Routes
app.use("/auth", authRoutes);
app.use("/cart", cartRoutes);
app.use("/orders", ordersRoutes);
app.use("/products", productsRoutes);

// //Admin routes
// app.use("/admin/products", authenticateToken, isAdmin, productsRoutes);
// app.use(
//   "/admin/tags",
//   authenticateToken,
//   isAdmin,
//   require("./routes/tag.routes")
// );

sequelize
  .sync({ alter: true })
  .then(() => console.log("All models synced successfully."))
  .catch((err) => console.error("Model syncing failed:", err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
