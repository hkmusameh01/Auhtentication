const { join } = require("path");
const express = require("express");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const routes = require("./routes");

const {notFoundError, serverError} = require('./controllers')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression());
app.use(cookieParser());

app.use(express.static(join(__dirname, "..", "public")));

app.use(routes);

app.use(notFoundError, serverError)

module.exports = app;
