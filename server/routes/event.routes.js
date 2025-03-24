const {Router} = require('express');
const { auth, isOrganizer, isAdmin } = require("../middlewares/auth.middlewares");
const {createEvent,getEvent, participantRegistration, participantDeregistration, updateEvent, deleteEvent, getAllRegisterVolunteer, getEventById, getRecommendedEvents}=require("../controllers/event.controller");

const router = Router();

// Public routes
router.route("/get-events").get(getEvent);
router.route("/:eventId").get(getEvent);

// Protected routes
router.route("/create-event").post(auth, isOrganizer, createEvent);
router.route("/participant-registration").post(participantRegistration);
router.route("/participant-deregistration").post(participantDeregistration);
router.route("/update-event").post(auth, isOrganizer, updateEvent);
router.route("/delete-event").post(auth, isOrganizer, deleteEvent);
router.route("/get-all-register-volunteer").post(auth,isOrganizer, getAllRegisterVolunteer);
router.route("/get-events-by-id").post(auth,isOrganizer,getEventById);
router.route("/get-recommended-events").get(auth, getRecommendedEvents);

module.exports = router;