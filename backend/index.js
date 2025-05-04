
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;
require('dotenv').config()

// middleware
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true
}))

// routes
const merchandiseRoutes = require('./src/merchandises/merchandise.route');
const orderRoutes = require("./src/orders/order.route")
const userRoutes =  require("./src/users/user.route")
const adminRoutes = require("./src/stats/admin.stats")

app.use("/api/merchandises", merchandiseRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/auth", userRoutes)
app.use("/api/admin", adminRoutes)
app.use(express.json());
// MongoDB Connection
console.log("Starting server...");
console.log("Environment:", process.env.NODE_ENV || 'development');
console.log("Port:", port);
console.log("MongoDB URL:", process.env.DB_URL);

// Connect to MongoDB
mongoose.connect(process.env.DB_URL)
  .then(() => {
    console.log('MongoDB Connected Successfully!');
    // Start the server only after successful database connection
    app.listen(port, () => {
      console.log(`Backend server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB Connection Error:', error);
    process.exit(1);
  });

// Basic route to test server
app.get("/", (req, res) => {
    res.send("ECE Store Server is running!");
});