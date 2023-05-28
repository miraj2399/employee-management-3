const mongoose = require("mongoose");

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
