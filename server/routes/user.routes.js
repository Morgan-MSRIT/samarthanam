const {Router} = require('express');
const { auth, isOrganizer, isAdmin } = require("../middlewares/auth.middlewares");
const {updateUser,getUserEvents}=require("../controllers/user.controller");

const router = Router();

router.route("/update-user").put(auth,updateUser);
router.route("/get-user-events").get(auth,getUserEvents);

module.exports = router;