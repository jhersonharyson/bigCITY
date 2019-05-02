const router = require("express").Router();

router.get("/", require("./../controller/index"));

router.use("/", require("./analytics"));

router.use("/", require("./iot"));

router.use("/", require("./map"));

module.exports = router;
