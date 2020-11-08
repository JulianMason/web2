//import the GuestBook class
const schedulerDAO = require('../models/schedulerModel');

//create an instance of te class
const db = new schedulerDAO();

//db.init();
exports.landing_page = function(req, res) {
    //res.redirect('view courses.html');
    db.getCourseworks().then((list) => {
        res.render('user_courses', {
            'firstName': "Julian",
            'user_courses': list
        });
        console.log('promise resolved');
    }).catch((err) => {
        console.log('promise rejected', err);
    })
};

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

exports.post_new_cw = function(req, res) {
    console.log("Processing post-new-cw controller");

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

exports.deleted_cw = function(req, res) {
    console.log('Deleting coursework');

    let course = req.params._id;
    db.deleteCW(course).catch((err) => {
        console.log('Error handling coursework deletion', err);
    });
    res.redirect("/");
}