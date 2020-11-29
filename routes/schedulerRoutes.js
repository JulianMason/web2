const express = require('express');
const passport = require('passport');
const router = express.Router();
const { ensureAuth, ensureGuest } = require('../middleware/auth');
const controller = require('../controllers/schedulerController');



router.get('/', ensureGuest, controller.login);

////////////////////////// PASSPORT GOOGLE AUTH ////////////////////////////////////
// @desc Authenticate with Google
// @route GET /auth/google
// router.get("/google", controller.login);
/*router.get('/google', passport.authenticate('google', { scope: ['profile'] }))

// @desc Google auth callback
// @route  GET /auth/google/callback
router.get('/google/callback', passport.authenticate('google', {
    successRedirect: '/dashboard',
    failureRedirect: '/'})
);*/
///////////////////////////////////////////////////////////////////////////////////////

router.get("/dashboard", ensureAuth, controller.landing_page);
router.get("/new", ensureAuth, controller.new_cw);
router.post("/new", ensureAuth, controller.post_new_cw);

router.get('/coursework/:id', controller.delete_cw);

//router.get("/view", controller.view_courses);

router.use(function(req, res) {
    res.status(404);
    res.type('text/plain');
    res.send('404 Not Found :(');
});


module.exports = router;