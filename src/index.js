require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRoutes = require("./routers/user");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use("/api/users", userRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() =>
    app.listen(port, () => console.log(`Server running on port ${port}`))
  )
  .catch((err) => console.log(err));
