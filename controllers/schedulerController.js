//import the database
const schedulerDAO = require('../models/schedulerModel');
const connectDB = require('../models/db1');
const passport = require('../models/passport');
const Coursework = require('../models/Coursework');


connectDB();

//create an instance of te class
//const db = new schedulerDAO();

exports.login = function(req, res) {
    res.render("login", {
        layout: 'login'
    });
};


//db.init();
exports.landing_page = async(req, res) => {
    try {
        const coursework = await Coursework.find({ user: req.user.id }).lean();
        res.render('dashboard', {
            name: req.user.displayName,
            coursework
        })
    } catch(err) {
        console.error(err);
        res.render('/views/error/500.hbs');
    }
    
}

exports.new_cw = function(req, res) {
    res.render("add");
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

    if(!req.body.courseTitle) {
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
}

// Edit coursework
exports.edit_cw = async(req, res) => {
    const coursework = await Coursework.findOne({
        _id: req.params.id
    }).lean();
    if(!coursework) {
        return res.render('../views/error/400.hbs');
    } else {
        res.render('../views/edit.hbs', {
            coursework,
        });
    }
}

// Update edited coursework
exports.update_cw = async(req, res) => {
    try {
        let coursework = await Coursework.findById(req.params.id);

        coursework = await Coursework.findOneAndUpdate({ _id: req.params.id }, req.body, {
            new: true,
            runValidators: true
    });
        res.redirect('/dashboard');
    } catch(err) {
        return res.render('../views/error/500.hbs');
    }
    
}

exports.delete_cw = async(req, res) => {
    console.log('Deleting coursework');
    try {
        await Coursework.remove({ _id: req.params.id });
        res.redirect('/dashboard');
    } catch(err) {
        console.log(err);
        return res.render('../views/error/500.hbs');
    }
    /*
    let course = req.params._id;
    db.deleteCW(course).catch((err) => {
        console.log('Error handling coursework deletion', err);
    });
    res.redirect("/"); */
}