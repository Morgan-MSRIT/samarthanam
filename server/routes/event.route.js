const {Router} = require('express');
const { auth, isOrganizer, isAdmin } = require("../middlewares/auth.middlewares");
const {createEvent,getEvent, participantRegistration, participantDeregistration, updateEvent, deleteEvent, getAllRegisterVolunteer}=require("../controllers/event.controllers");

const router = Router();

// router.route("/create-event").post(auth,isOrganizer,createEvent);
//testing/
router.route("/create-event").post(createEvent);
router.route("/get-event").get(auth,getEvent);
router.route("/participant-registration").post(auth,participantRegistration);
router.route("/participant-deregistration").post(auth,participantDeregistration);
router.route("/update-event").put(auth,isOrganizer,updateEvent);
router.route("/delete-event").delete(auth,isOrganizer,deleteEvent);
router.route("/get-all-register-volunteer").get(auth,getAllRegisterVolunteer);

module.exports = router;
