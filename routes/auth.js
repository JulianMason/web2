const express = require('express');
const passport = require('passport');
const authRouter = express.Router();
const controller = require('../controllers/schedulerController');


// @desc Authenticate with Google
// @route GET /auth/google
// router.get("/google", controller.login);
authRouter.get('/google', passport.authenticate('google', { scope: ['profile'] }))

// @desc Google auth callback
// @route  GET /auth/google/callback
authRouter.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('/dashboard');
    }
)

// @desc Logout user
// @route  GET /auth/logout
authRouter.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
})

module.exports = authRouter;
