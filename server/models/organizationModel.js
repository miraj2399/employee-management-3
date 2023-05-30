const mongoose = require('mongoose');
const organizationSchema = mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    name: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                // only contains letters and numbers and unique
                return /[a-zA-Z0-9]+$/.test(v) && Organization.findOne({ name: v }).then((organization) => {
                    return !organization;
                }
                );
            },
            message: 'Organization name can only contain letters and numbers and must be unique',
        },
    },
    address: {
        type: String,
        validate: {
            validator: function (v) {
                // only contains letters, numbers, spaces, and commas
                return /^[a-zA-Z0-9\s,]+$/.test(v);
            },
            message: 'Address can only contain letters, numbers, spaces, and commas',
        }
    }
});
const Organization = mongoose.model('Organization', organizationSchema);

const organizationJoinSchema = mongoose.Schema({
    organizationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    approved: {
        type: Boolean,
        default: false,
    },
    rejected: {
        type: Boolean,
        default: false,
    },
});
const OrganizationJoin = mongoose.model('OrganizationJoin', organizationJoinSchema);





module.exports = {Organization, OrganizationJoin};