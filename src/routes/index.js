const router = require('express').Router()

router.get('/', require('./../controller/index'))

router.use('/', require('./iot'))

module.exports =  router