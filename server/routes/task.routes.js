const {Router} = require('express');
const {createTask, getTasks, deleteTask, updateTask} = require('../controllers/task.controllers');
const { auth, isOrganizer, isAdmin } = require("../middlewares/auth.middlewares");


const router = Router();

router.route('/create-task').post(auth,isOrganizer,createTask);
router.route('/get-tasks').post(getTasks);
router.route('/delete-task').post(auth,isOrganizer,deleteTask);
router.route('/update-task').post(auth,isOrganizer,updateTask);
module.exports = router;