const {Router} = require('express');
const {createTask, getTasks, deleteTask} = require('../controllers/task.controllers');
const { auth, isOrganizer, isAdmin } = require("../middlewares/auth.middlewares");


const router = Router();

router.route('/create-task').post(auth,isOrganizer,createTask);
router.route('/get-task').post(getTasks);
router.route('/delete-task').post(auth,isOrganizer,deleteTask);

module.exports = router;