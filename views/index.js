const express = require('express');
const mustache = require('mustache-express');
const { dirname } = require('path');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const public = path.join(__dirname, '/public');
const router = require('../routes/schedulerRoutes');

app.use(express.static(public));
app.use(bodyParser.urlencoded({extended: false}));
app.engine('mustache', mustache());0
app.set('view engine', 'mustache');

app.use('/', router);

app.listen(5000, () => {
    console.log('Server started on port 5000. Ctrl^c to quit.');
});