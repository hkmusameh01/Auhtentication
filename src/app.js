const {join} = require('path')
const express = require('express');
const compression = require('compression');
const routes = require('./routes')

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(compression())

app.use(express.static(join((__dirname), '..', 'public')))

app.use(routes);

module.exports = app;