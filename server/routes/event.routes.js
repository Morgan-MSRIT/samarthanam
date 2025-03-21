const {Router} = require('express');
const { auth, isOrganizer, isAdmin } = require("../middlewares/auth.middlewares");
const {createEvent,getEvent, participantRegistration, participantDeregistration, updateEvent, deleteEvent, getAllRegisterVolunteer}=require("../controllers/event.controllers");

const router = Router();

// router.route("/create-event").post(auth,isOrganizer,createEvent);
//testing/
router.route("/create-event").post(auth, isOrganizer, createEvent);
router.route("/get-events").get(auth,getEvent);
router.route("/participant-registration").post(participantRegistration);
router.route("/participant-deregistration").post(participantDeregistration);
router.route("/update-event").post(auth,isOrganizer,updateEvent);
router.route("/delete-event").post(auth,isOrganizer,deleteEvent);
router.route("/get-all-register-volunteer").post(auth,isOrganizer, getAllRegisterVolunteer);

module.exports = router;
