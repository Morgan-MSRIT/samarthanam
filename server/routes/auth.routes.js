const {Router} = require("express");
const {isAdmin, isOrganizer, auth} = require("../middlewares/auth.middlewares");
const {signup, login, sendotp, changePassword } = require("../controllers/auth.controllers");


const router = Router();

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/sendotp").post(sendotp);
router.route("/changepassword").post(auth, changePassword);

module.exports = router;