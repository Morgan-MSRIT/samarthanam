const {Router} = require('express');
const { auth, isOrganizer, isAdmin } = require("../middlewares/auth.middlewares");
const {updateUser,getUserEvents}=require("../controllers/user.controllers");

const router = Router();

router.route("/update-user").post(auth,updateUser);
router.route("/get-user-events").post(auth,getUserEvents);

module.exports = router;