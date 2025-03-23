const {Router} = require('express');
const { auth, isOrganizer, isAdmin } = require("../middlewares/auth.middlewares");
const {createEvent,getEvent, participantRegistration, participantDeregistration, updateEvent, deleteEvent, getAllRegisterVolunteer, getEventById}=require("../controllers/event.controllers");

const router = Router();

// Public routes
router.route("/get-events").get(getEvent);
router.route("/:eventId").get(getEvent);

// Protected routes
router.route("/create-event").post(auth, isOrganizer, createEvent);
<<<<<<< HEAD
=======

>>>>>>> 87e9c047caf54e0f569bd504a0cb21a9ab4b3764
router.route("/participant-registration").post(participantRegistration);
router.route("/participant-deregistration").post(participantDeregistration);
router.route("/update-event").post(auth, isOrganizer, updateEvent);
router.route("/delete-event").post(auth, isOrganizer, deleteEvent);
router.route("/get-all-register-volunteer").post(auth,isOrganizer, getAllRegisterVolunteer);
module.exports = router;
