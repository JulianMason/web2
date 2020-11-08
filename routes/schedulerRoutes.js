const express = require('express');
const router = express.Router();
const controller = require('../controllers/schedulerController');

router.get("/", controller.landing_page);
router.get("/new", controller.new_cw);
router.post("/new", controller.post_new_cw);

router.get('/courseworks/:_id', controller.deleted_cw);

//router.get("/view", controller.view_courses);

router.use(function(req, res) {
    res.status(404);
    res.type('text/plain');
    res.send('404 Not Found :(');
});


module.exports = router;