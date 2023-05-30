const mongoose = require('mongoose');
const revenueRecordSchema = mongoose.Schema({
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
        validate: {
            validator: function (v) {
                return v >= 0;
            }
        }
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
const RevenueRecord = mongoose.model('RevenueRecord', revenueRecordSchema);
module.exports = RevenueRecord;


