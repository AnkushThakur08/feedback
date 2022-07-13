const express = require("express");
const bodyParser = require("body-parser");
const db = require("./dbConnection");

const app = express();

const port = 8000;

const authRoutes = require("./routes/auth");
const feedbackRoutes = require("./routes/feedback");

// SWAGGER
const swaggerUi = require("swagger-ui-express");

const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Middlewares
app.use(bodyParser.json());
app.use("/api/v1", authRoutes);
app.use("/api/v1", feedbackRoutes);

app.get("/", () => {
  res.send("Home Page");
});

app.listen(port, (req, res) => {
  console.log(`App is running on port ${port}`);
});
