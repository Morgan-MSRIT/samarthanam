const {Router} = require("express");
const {isAdmin, isOrganizer, auth} = require("../middlewares/auth.middlewares");
const {signup, login, sendotp, changePassword, organizerSignup, organizerChangePassword ,verifyOtp, getOrganizers, removeOrganizer} = require("../controllers/auth.controllers");


const router = Router();

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/changepassword").post(auth, changePassword);
router.route("/organizer-changepassword").post(organizerChangePassword);

router.route("/sendotp").post(sendotp);
router.route("/verify-otp").post(verifyOtp);

router.route("/organizer-signup").post(organizerSignup);
router.route("/get-organizers").get(getOrganizers);
router.route("/:id").get(removeOrganizer);


module.exports = router;