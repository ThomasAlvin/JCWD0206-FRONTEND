const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const PORT = process.env.PORT;
const routes = require("./routes");
app.use(cors());
app.use(express.json());
const db = require("./models");
// db.sequelize.sync({ alter: true });

app.use("/commentLike", routes.commentLikeRoutes);
app.use("/comment", routes.commentRoutes);
app.use("/like", routes.likeRoutes);
app.use("/post", routes.postRoutes);
app.use("/auth", routes.userRoutes);

app.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`);
});
