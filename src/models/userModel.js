const mongoose = require('mongoose');
const { Schema } = mongoose;

// membuat skema
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  return userObject;
};

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
