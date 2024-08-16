const toDoController = require('../controller/toDoController')
const router = require('express').Router()


router.get('/todo', toDoController.getAllTasks)
router.post('/todo', toDoController.addToDo)
router.put('/todo/:id', toDoController.updateToDo)
router.delete('/todo/:id', toDoController.deleteToDo)


module.exports = router