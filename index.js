const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

require("dotenv").config();

const connectionString = process.env.CONNECTION_STRING;

// Routers list
const personRouter = require("./routes/person");
const customerRouter = require("./routes/customer");

app.use(bodyParser.json());

// Middleware Logging
app.use((request, response, next) => {
  console.log(`${new Date().toString()} => ${request.originalUrl}`);
  next();
});

app.use(personRouter);
app.use(customerRouter);
app.use(express.static("public"));

// Middleware handles 404
app.use((request, response, next) => {
  response.status(404).send("We think you are lost!");
});

// Middleware handles 500
app.use((error, request, response, next) => {
  console.log(error.stack);

  response.sendFile(path.join(__dirname, "./public/500.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});

// Connect to MongoDB
mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connect to MongoDB successfully!");
  })
  .catch((error) => {
    console.log("Connect to MongoDB fail!");
  });
