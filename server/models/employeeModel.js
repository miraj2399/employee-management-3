const mongoose = require('mongoose');
const employeeSchema = mongoose.Schema({
    employeeId: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                // only contains numbers and unique
                return /[0-9]+/.test(v) && Employee.findOne({ employeeId: v }).then((employee) => {
                    return !employee;
                }
                );
            },
            message: 'Employee ID can only contain letters and must be unique',
            }
        },
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        required: true,
    },
    firstName: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                // only contains letters
                return /^[a-zA-Z]+$/.test(v);
            },
            message: 'First name can only contain letters'
        }
    },
    lastName: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                // only contains letters
                return /^[a-zA-Z]+$/.test(v);
            },
            message: 'Last name can only contain letters'
        }
    },

    contact: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                // only contains numbers
                return /^[0-9]+$/.test(v);
            },
            message: 'Contact can only contain numbers'
        }
    },

    hourlyRate: {
        type: Number,
        required: true,
        validate: {
            validator: function (v) {
                return v >= 0;
            },
            message: 'Hourly rate must be greater than or equal to 0'
        }
    }});

const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;
