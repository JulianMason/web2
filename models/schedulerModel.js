const nedb = require('nedb');

class Scheduler {
    constructor(dbFilePath){
        if (dbFilePath) {
            this.db = new nedb({filename: dbFilePath, autoload: true});
            console.log('DB connected to ' + dbFilePath);
        } else {
            this.db = new nedb();
        }
    }

    init() {
        this.db.insert({
            first_name: 'Jay',
            last_name: 'Mason',
            coursework: 'CW1',
            module: 'WPD2',
            start: '01/11/2020',
            end: '30/11/2020',
            milestones: [
                'Create wireframes',
                ' Create dashboard ',
                ' Create database'
            ]
        });
        console.log('Coursework entered');
    }
    getCourseworks() {
        return new Promise((resolve, reject) => {
            this.db.find({}, function(err, user_courses) {
                if(err) {
                    reject(err);
                } else {
                    resolve(user_courses);
                    console.log('function all() returns: ', user_courses);
                }
            })
        })
    }
}

// make module visible outside
module.exports = Scheduler;