const router = require("express").Router();

router.get("/data-map/:limit", require("./../controller/map").get);

module.exports = router;
