const {Router} = require("express");
const {isAdmin, isOrganizer, auth} = require("../middlewares/auth.middlewares");
const {signup, login, sendotp, changePassword, organizerSignup, organizerChangePassword ,verifyOtp} = require("../controllers/auth.controllers");


const router = Router();

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/sendotp").post(sendotp);
router.route("/changepassword").post(auth, changePassword);
router.route("/organizer-signup").post(auth, isAdmin, organizerSignup);
router.route("/organizer-changepassword").post(organizerChangePassword);
router.route("/verify-otp").post(verifyOtp);


module.exports = router;