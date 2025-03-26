const {Router} = require('express');
const {getNotifications} = require('../controllers/notification.controllers');
const { auth } = require("../middlewares/auth.middlewares");

const router = Router();

router.route('/get-notifications/:userId').get(auth,getNotifications);

module.exports = router;