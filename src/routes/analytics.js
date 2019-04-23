const router = require('express').Router()

router.get('/analytics', require('../controller/analytics').mean_analytics)

router.get('/analytics/:limit', require('../controller/analytics').mean_analytics_limit)

module.exports =  router