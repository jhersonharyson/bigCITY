"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://big-city-42:big-city-42@ds251598.mlab.com:51598/big-city",
  { useNewUrlParser: true }
);

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const routers = require("../routes");
const data = require("./constants");
// console.log(data)

app.all("/*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.use("/api/v1/ws/", routers);

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
