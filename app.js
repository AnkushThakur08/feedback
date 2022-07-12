const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const port = 8000;

const db = require("./dbConnection");
const myRoutes = require("./routes/auth");

// Middlewares
app.use(bodyParser.json());
app.use("/api", myRoutes);

app.get("/", () => {
  res.send("Home Page");
});

app.listen(port, (req, res) => {
  console.log(`App is running on port ${port}`);
});
