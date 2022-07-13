const express = require("express");
const bodyParser = require("body-parser");
const db = require("./dbConnection");

const app = express();

const port = 8000;

const authRoutes = require("./routes/auth");
const feedbackRoutes = require("./routes/feedback");

// Middlewares
app.use(bodyParser.json());
app.use("/api", authRoutes);
app.use("/api", feedbackRoutes);

app.get("/", () => {
  res.send("Home Page");
});

app.listen(port, (req, res) => {
  console.log(`App is running on port ${port}`);
});
