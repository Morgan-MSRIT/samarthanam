const {Router} = require('express');
const {createFeedback, getFeedbacks, deleteFeedback} = require('../controllers/feedback.controllers');
const { auth, isOrganizer, isAdmin } = require("../middlewares/auth.middlewares");

const router = Router();

router.route('/create-feedback').post(auth,createFeedback);
router.route('/get-feedbacks').post(auth,isOrganizer,getFeedbacks);
router.route('/delete-feedback').post(auth,isAdmin,deleteFeedback);

module.exports = router;