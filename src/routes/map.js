const router = require("express").Router();

router.get("/data-map/:limit", require("./../controller/map").get);

router.get("/data-map/:data/:limit", require("./../controller/map").getData);

module.exports = router;
