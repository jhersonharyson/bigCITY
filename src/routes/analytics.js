const router = require('express').Router()

router.get('/analytics', require('../controller/analytics'))

module.exports =  router