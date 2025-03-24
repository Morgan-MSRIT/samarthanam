const {Router} = require('express');
const {createTask, getTasks, deleteTask, updateVolunteerTask} = require('../controllers/task.controllers');
const { auth, isOrganizer, isAdmin, isVolunteer } = require("../middlewares/auth.middlewares");


const router = Router();

router.route('/create-task').post(auth,isOrganizer,createTask);
router.route('/get-tasks').post(getTasks);
router.route('/delete-task').post(auth,isOrganizer,deleteTask);
router.route('/update-volunteer-task').post(auth, isVolunteer, updateVolunteerTask);

module.exports = router;