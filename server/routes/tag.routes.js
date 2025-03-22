const {Router} = require('express');
const {createTag, getTags, deleteTag} = require('../controllers/tag.controllers');
const { auth, isOrganizer, isAdmin } = require("../middlewares/auth.middlewares");


const router = Router();

router.route('/create-tag').post(auth,isOrganizer,createTag);
router.route('/get-tags').get(getTags);
router.route('/delete-tag').post(auth,isOrganizer,deleteTag);

module.exports = router;