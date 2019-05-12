const router = require("express").Router();

router.get("/analytics", require("../controller/analytics").mean_analytics);

router.get(
  "/analytics/:limit",
  require("../controller/analytics").mean_analytics_limit
);

router.get(
  "/last-interval/:hours",
  require("../controller/analytics").mean_analytics_last_interval
);

module.exports = router;
