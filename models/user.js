const Joi = require("joi");
const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
  },

  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().required().min(3).max(50),
    username: Joi.string().required().min(3).max(50),
    email: Joi.string().required(),
    password: Joi.string().required().min(5),
  });

  var result = schema.validate(user);

  return result;
}

exports.User = User;
exports.validate = validateUser;
