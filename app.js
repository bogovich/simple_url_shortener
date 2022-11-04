const express = require("express");
const app = express();
const connectDB = require("./db/connect");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Home");
});

app.listen(PORT, () => console.log(`server started, listening PORT ${PORT}`));
