/* eslint-disable no-undef */
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const database = require("./config/databse");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/User");
const cors = require("cors");
dotenv.config();
const PORT = process.env.PORT || 4000;

database.connect();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.get("/", (req, res) => {
  res.send("hi");
});
app.use("/api/v1", userRoute);

app.listen(PORT, () => {
  console.log(`App is running at ${PORT}`);
});
