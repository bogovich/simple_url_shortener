const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const path = require("path");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const start = () => {
  try {
    connectDB(process.env.MONGO_URI);
    app.listen(PORT, () =>
      console.log(`server started, listening PORT ${PORT}`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
