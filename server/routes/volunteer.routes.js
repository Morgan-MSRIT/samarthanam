const {Router} = require('express');
const {createVolunteer, getVolunteers, getVolunteer, updateVolunteer, deleteVolunteer} = require('../controllers/volunteer.controllers');
const { auth, isOrganizer, isAdmin } = require("../middlewares/auth.middlewares");


const router = Router();

router.route('/create-volunteer').post(auth,createVolunteer);
router.route('/update-volunteer').post(auth,updateVolunteer);
router.route('/delete-volunteer').post(auth,deleteVolunteer);
router.route('/get-volunteers').post(auth,isOrganizer,getVolunteers);
//To get a single volunteer
// router.route('/get-volunteer').post(auth,isOrganizer,getVolunteer);


module.exports = router;
