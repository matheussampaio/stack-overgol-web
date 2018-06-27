const express = require("express");
const path = require("path");
const morgan = require("morgan");
const errorHandler = require("errorhandler");
const helmet = require("helmet");

const port = process.env.PORT || 8080;
const app = express();

app.use(morgan("dev"))
// serve static assets normally
app.use(express.static(path.resolve("dist")));
app.use(errorHandler());
app.use(helmet());

// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
app.all("*", (req, res) => {
  res.sendFile(path.resolve("dist/index.html"));
});

app.listen(port, () => {
  console.log("listening on port", port); // eslint-disable-line no-console
});
