const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const mongoose = require('mongoose');
const mustache = require('mustache-express');
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


const PORT = process.env.PORT || 5000

app.use(express.static(public));
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());
app.engine('mustache', mustache());0
app.set('view engine', 'mustache');

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




app.listen(PORT, () => {
    console.log(`Server started in ${process.env.NODE_ENV} mode on port ${PORT}. Ctrl^c to quit.`);
});