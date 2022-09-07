const { join } = require("path");
const express = require("express");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const routes = require("./routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression());
app.use(cookieParser());

app.use(express.static(join(__dirname, "..", "public")));

app.use(routes);

module.exports = app;
