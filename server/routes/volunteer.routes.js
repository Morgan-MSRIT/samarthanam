const {Router} = require('express');
const {createVolunteer, getVolunteers, getVolunteer, updateVolunteer, deleteVolunteer} = require('../controllers/volunteer.controllers');

const router = Router();

router.route('/create-volunteer').post(createVolunteer);
router.route('/update-volunteer').post(updateVolunteer);
router.route('/delete-volunteer').post(deleteVolunteer);
router.route('/get-volunteers').post(getVolunteers);
router.route('/get-volunteer').post(getVolunteer);


module.exports = router;
