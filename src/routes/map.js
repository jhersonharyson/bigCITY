const router = require("express").Router();

router.get("/data-map", require("./../controller/map").get);

module.exports = router;
