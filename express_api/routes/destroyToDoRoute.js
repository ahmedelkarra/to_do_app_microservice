const { destroyToDoController } = require('../controller/destroyToDoController')

const router = require('express').Router()


router.delete('/destroy', destroyToDoController)


module.exports = router