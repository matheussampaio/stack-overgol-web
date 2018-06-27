const express = require("express");
const path = require("path");
const morgan = require("morgan");
const errorHandler = require("errorhandler");
const helmet = require("helmet");
const Raven = require('raven');

const enableSentry = process.env.SENTRY_ENDPOINT != null

if (enableSentry) {
  Raven.config(process.env.SENTRY_ENDPOINT).install();
}

const port = process.env.PORT || 8080;
const app = express();

if (enableSentry) {
  app.use(Raven.requestHandler());
}

app.use(morgan("dev"))
app.use(express.static(path.resolve("dist")));
app.use(helmet());

if (enableSentry) {
  app.use(Raven.errorHandler());
}

app.use(errorHandler());

app.all("*", (req, res) => {
  res.sendFile(path.resolve("dist/index.html"));
});

app.listen(port, () => {
  console.log("listening on port", port); // eslint-disable-line no-console
});
