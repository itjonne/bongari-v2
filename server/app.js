const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");
require("express-async-errors");

const config = require("./util/config");
const middleware = require("./util/middleware");
const usersRouter = require("./controllers/users");
const objectsRouter = require("./controllers/objects");
const authRouter = require("./controllers/auth");
const findsRouter = require("./controllers/finds");

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("error connection to MongoDB:", error);
  });

const app = express();
app.use(express.json());
app.use(morgan("common"));
app.use(cors());
app.use(helmet());

// ... other app.use middleware
app.use(express.static(path.join(__dirname, "frontend", "build")));

// ...
// Right before your app.listen(), add this:
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
});

app.use(middleware.tokenExtractor);
app.use(middleware.userExtractor);

app.use("/api/users", usersRouter);
app.use("/api/objects", objectsRouter);
app.use("/api/auth", authRouter);
app.use("/api/finds", findsRouter);

app.use(middleware.errorHandler);
app.use(middleware.unknownEndpoint);

module.exports = app;
