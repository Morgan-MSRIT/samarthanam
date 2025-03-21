const {Router} = require('express');
const {createTag, getTags, deleteTag} = require('../controllers/tag.controllers');


const router = Router();

router.route('/create-tag').post(createTag);
router.route('/get-tags').post(getTags);
router.route('/delete-tag').post(deleteTag);

module.exports = router;