const {Router} = require('express');
const {createFeedback, getFeedbacks, deleteFeedback} = require('../controllers/feedback.controllers');


const router = Router();

router.route('/create-feedback').post(createFeedback);
router.route('/get-feedbacks').post(getFeedbacks);
router.route('/delete-feedback').post(deleteFeedback);

module.exports = router;