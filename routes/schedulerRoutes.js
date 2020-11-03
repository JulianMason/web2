const express = require('express');
const router = express.Router();
const controller = require('../controllers/schedulerController');

router.get("/", controller.landing_page);

//router.get("/welcome", controller.welcome);

router.get("/add", controller.add_course);

//router.get("/view", controller.view_courses);

router.use(function(req, res) {
    res.status(404);
    res.type('text/plain');
    res.send('404 Not Found :(');
});

router.use(function(err, req, res, next) {
    
});

module.exports = router;