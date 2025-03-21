const {Router} = require('express');
const {createTask, getTasks, deleteTask} = require('../controllers/task.controllers');


const router = Router();

router.route('/create-task').post(createTask);
router.route('/get-task').post(getTasks);
router.route('/delete-task').post(deleteTask);

module.exports = router;