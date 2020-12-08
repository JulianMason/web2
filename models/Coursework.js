const mongoose = require('mongoose');

var CourseworkSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: String,
        default: 'Incomplete',
        enum: ['Incomplete', 'Completed']
    },
    courseTitle: {
        type: String,
        required: true,
        trim: true
    },
    module: {
        type: String,
        required: true
    },
    milestones: {
        type: [String],
        required: true
    },
    start: {
        type: Date,
        default: Date.now
    },
    end: {
        type: Date,
        default: Date.now
    },
    created: {
        type: Date,
        default: Date.now
    }
})
;

module.exports = mongoose.model('Coursework', CourseworkSchema);