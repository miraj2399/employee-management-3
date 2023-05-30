const mongoose = require("mongoose");
const Organization = require("./organizationModel");

const userSchema = mongoose.Schema(
  {

    username: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return User.findOne({ username: v }).then((user) => {
            return !user;
          });
        },
        message: 'User already exists!'
      },
      unique: true,
    },

    password: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return v.length > 8 && /[0-9]/.test(v) && /[a-zA-Z]/.test(v);
        },
        message: "Password must be at least 8 characters long with numbers and letters",
      },
    },

    role: {
      type: String,
      enum: ["admin", "moderator","owner"],
      validate: {
        validator: function (value) {
          return ["admin", "moderator"].includes(value);
        },
        message: "Invalid role value",
      }
    },

    moderatorPermissions: {
      employee: {
        view: {
          type: Boolean,
          default: false
        },
        add: {
          type: Boolean,
          default: false
        },
        update: {
          type: Boolean,
          default: false
        },
        delete: {
          type: Boolean,
          default: false
        },
      },
      timeRecord: {
        view: {
          type: Boolean,
          default: true
        },
        add: {
          type: Boolean,
          default: true
        },
        update: {
          type: Boolean,
          default: false
        },
        delete: {
          type: Boolean,
          default: false
        }
      },
      revenueRecord: {
        view: {
          type: Boolean,
          default: true
        },
        add: {
          type: Boolean,
          default: true
        },
        update: {
          type: Boolean,
          default: false
        },
        delete: {
          type: Boolean,
          default: false
        }
      },
    },
    
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
    },

  },

  {
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        ret.id = ret._id;
      },
    },
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
