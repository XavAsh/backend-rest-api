const express = require("express");
const app = express();
const sequelize = require("./config/database");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const adminRoutes = require("./routes/admin.routes");
const authRoutes = require("./routes/auth.routes");
const cartRoutes = require("./routes/cart.routes");
const ordersRoutes = require("./routes/order.routes");
const productsRoutes = require("./routes/product.routes");

const Cart = require("./models/cart.model");
const Order = require("./models/order.model");
const Admin = require("./models/admin.model");

app.use("/admin", adminRoutes);
app.use("/auth", authRoutes);
app.use("/cart", cartRoutes);
app.use("/orders", ordersRoutes);
app.use("/products", productsRoutes);

sequelize
  .authenticate()
  .then(() => console.log("Database connected successfully."))
  .catch((err) => console.error("Unable to connect to database:", err));

// Sync models
sequelize
  .sync({ alter: true })
  .then(() => console.log("All models synced successfully."))
  .catch((err) => console.error("Model syncing failed:", err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
