const mongoose = require('mongoose');


const timeRecordSchema = mongoose.Schema({
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        required: true,
    },
    clockIn: {
        type: Date,
        required: true,
    },
    clockOut: {
        type: Date,
        required: true,
    },
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true,
    },
    description: {
        type: String,
        required: false,
    }
},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
});

const TimeRecord = mongoose.model('TimeRecord', timeRecordSchema);
module.exports = TimeRecord;