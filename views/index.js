const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const public = path.join(__dirname, '../public');
const router = require('../routes/schedulerRoutes');
const authRouter = require('../routes/auth')
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);


// Load config
dotenv.config();

// Logs
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Passport config
require('../models/passport')(passport);

// Method override
app.use(methodOverride(function (req, res) {
    if(req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and deletes it
        let method = req.body._method
        delete req.body._method
        return method;
    }
}));




// Static folder
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());


// Handlebars Helpers
const { formatDate } = require('../helpers/hbs');

// Handlebars
app.engine('.hbs', exphbs({ helpers: {
    formatDate,
}, extname: '.hbs', partialsDir: [ path.join(__dirname, './partials')] }));
app.set('view engine', '.hbs');

/*
app.engine('mustache', mustache());
app.set('view engine', 'mustache'); */

// Sessions middleware
app.use(session({
    secret: 'Not sure',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/auth', authRouter);
app.use('/', router);

const PORT = process.env.PORT || 5000


app.listen(PORT, () => {
    console.log(`Server started in ${process.env.NODE_ENV} mode on port ${PORT}. Ctrl^c to quit.`);
});