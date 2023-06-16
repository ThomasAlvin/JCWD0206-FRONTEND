const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const PORT = process.env.PORT;
const routes = require("./routes");
app.use(cors());
app.use(express.json());

const db = require("./models/");
db.sequelize.sync({ alter: true });

app.get("/", (req, res) => res.send("sequelize"));

app.use("/category", routes.categoryRoutes);
app.use("/employee", routes.employeeRoutes);
app.use("/order", routes.orderRoutes);
app.use("/orderdetail", routes.orderDetailRoutes);
app.use("/ingredient", routes.ingredientRoutes);
app.use("/ingredienthistory", routes.ingredientHistoryRoutes);
app.use("/menudishes", routes.menuDishesRoutes);

// app.use("/auth", routes.userRoutes);
app.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`);
});
