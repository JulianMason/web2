//import the GuestBook class
const schedulerDAO = require('../models/schedulerModel');

//create an instance of te class
const db = new schedulerDAO();

db.init();
exports.landing_page = function(req, res) {
    //res.redirect('view courses.html');
    db.getCourseworks().then((list) => {
        res.render('user_courses', {
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

exports.add_course = function(req, res) {
    res.redirect('new.html');
};