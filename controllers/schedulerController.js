//import the database
const schedulerDAO = require('../models/schedulerModel');
const connectDB = require('../models/db1');
const passport = require('../models/passport');
const Coursework = require('../models/Coursework');


connectDB();



//create an instance of te class
//const db = new schedulerDAO();

exports.login = function(req, res) {
    res.render("login");
};


//db.init();
exports.landing_page = async(req, res) => {
    try {
        const coursework = await Coursework.find({ user: req.user.id });
        res.render('user_courses', {
            name: req.user.displayName,
            coursework
        })
    } catch(err) {
        console.error(err);
        res.render('/views/error/500.mustache');
    }
    
}
/*
exports.landing_page = function(req, res) {
    db.getCourseworks().then((list) => {
        res.render('user_courses', {
            'firstName': "Julian",
            'user_courses': list
        });
        console.log('promise resolved');
    }).catch((err) => {
        console.log('promise rejected', err);
    })
}; */

exports.welcome = function(req, res) {
   /* db.getProfile().then((profile) => {
        res.render('coursework', {
            'user_name': user,
            'coursework': profile
        });
        console.log('promise resolved');
    }).catch((err) => {
        console.log('promise rejected', err);
    })*/
};

exports.new_cw = function(req, res) {
    res.render("newCoursework");
};

exports.post_new_cw = async (req, res) => {
    console.log("Processing post-new-cw controller");
    try {
        req.body.user = req.user.id;
        await Coursework.create(req.body);
        res.redirect('/dashboard');
    } catch(err) {
        console.log(err);
        res.render('../views/error/500.mustache');
    }

    if(!req.body.coursework) {
        res.status(400).send("Coursework title required");
        return;
    }
    if(!req.body.milestones) {
        res.status(400).send("Milestone required");
        return;
    }
    if(!req.body.end) {
        res.status(400).send("Completion date required");
        return;
    }
    db.addCW(req.body.coursework, req.body.module, req.body.milestones, req.body.start, req.body.end);
    res.redirect("/");
}

exports.delete_cw = async(req, res) => {
    console.log('Deleting coursework');
    try {
        await Coursework.remove({ _id: req.params.id });
        res.redirect('/dashboard');
    } catch(err) {
        console.log(err);
        return res.render('../views/error/500.mustache');
    }
    /*
    let course = req.params._id;
    db.deleteCW(course).catch((err) => {
        console.log('Error handling coursework deletion', err);
    });
    res.redirect("/"); */
}