const Joi = require("joi");
const { default: mongoose } = require("mongoose");
const { userSchema } = require("./user");

const postSchema = new mongoose.Schema({
  topic: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  description: {
    type: String,
    required: true,
  },

  photo_path: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },

  user: {
    type: new mongoose.Schema({
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
    }),
    required: true,
  },

  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const Post = mongoose.model("Post", postSchema);

function validatePost(post) {
  const schema = Joi.object({
    topic: Joi.string().required().min(10).max(50),
    description: Joi.string().required().min(10).max(255),
    photo_path: Joi.string().required(),
    userId: Joi.string().required(),
  });

  var result = schema.validate(post);

  return result;
}

exports.Post = Post;
exports.validate = validatePost;
