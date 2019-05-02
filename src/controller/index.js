"use strict";
const index = (req, res, next) => {
  const response = {
    api: "bigCITY api",
    version: "2.0.0",
    status: "OK"
  };
  console.log("GET status ok");
  res.send(response);
};
module.exports = index;
