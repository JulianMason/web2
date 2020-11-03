//import the GuestBook class
const schedulerDAO = require('../models/schedulerModel');

//create an instance of te class
const db = new schedulerDAO();


exports.landing_page = function(req, res) {
    res.send('<h1>Landing page here!</h1>')
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