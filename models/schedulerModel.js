const nedb = require('nedb');

class Scheduler {
    constructor(dbFilePath){
        if (dbFilePath) {
            this.db = new nedb({filename: dbFilePath, autoload: true});
            console.log('DB connected to ' + dbFilePath);
        } else {
            this.db = new nedb({filename: 'coursworks.db', autoload: true});
            console.log('DB created');
        }
    }

    init() {
        this.db.insert({
            firstName: "Julian",
            lastName: "Mason",
            coursework: 'CW1',
            module: 'WPD2',
            start: '01/11/2020',
            end: '30/11/2020',
            milestones: [
                'Create wireframes',
                ' Create dashboard ',
                ' Create database'
            ],
            status: "",
            created: new Date().toISOString().split('T')[0]
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

    addCW(coursework, module, milestones, start, end) {
        var cw = {
            coursework: coursework,
            module: module,
            milestones: milestones,
            start: start,
            end: end,
            created: new Date().toISOString().split('T')[0]
        }
        console.log('coursework added', cw);

        this.db.insert(cw, function(err, doc) {
            if(err) {
                console.log("Error adding coursework", coursework);
            } else {
                console.log("Coursework added", doc);
            }
        })
       /* var html = "";
        for(var i = 0; i < milestones.length; i++) {
            html +="<li>" + milestones[i] + "</li>";
        } document.getElementById("list_milestones").innerHTML = html;
    } */
    }

    deleteCW(cwID) {
        return new Promise((resolve, reject) => {
            this.db.remove({ _id: cwID }, function(err, user_courses) {
                if(err) {
                    reject(err);
                } else {
                    resolve(user_courses);
                    console.log('Function deleteCW() returns: ', user_courses)
                }
            });
        });
    }
}
// make module visible outside
module.exports = Scheduler;