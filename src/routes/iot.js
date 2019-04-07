const router = require('express').Router()

router.post('/iot', require('./../controller/iot').post)
router.get('/iot',  require('./../controller/iot').get)

module.exports =  router


