const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');
const Joi = require('joi');

//regular for email check
const emailRegExp =
  /^[-a-z0-9!#$%&'*+/=?^_`{|}~]+(.[-a-z0-9!#$%&'*+/=?^_`{|}~]+)*@([a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?.)*(aero|arpa|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|[a-z][a-z])$/;

const userSchema = Schema(
  {
    password: {
      type: String,
      minlength: 6,
    },
    googlePassword: {
      type: String,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      match: emailRegExp,
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      default: '',
    },
    balance: {
      type: Number,
      default: 0,
    },
  },
  { versionKey: false, timestamps: true },
);

//save password to user by signup
userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};
userSchema.methods.setGooglePassword = function (password) {
  this.googlePassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

//compare user password by signin
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};
userSchema.methods.compareGooglePassword = function (password) {
  return bcrypt.compareSync(password, this.googlePassword);
};

//checked input data from frontend
const userJoiSchema = Joi.object({
  email: Joi.string().pattern(emailRegExp).required(),
  password: Joi.string().min(6),
  googlePassword: Joi.string(),
  token: Joi.string(),
  verify: Joi.boolean(),
  avatarURL: Joi.string(),
  balance: Joi.number(),
});

const User = model('user', userSchema);

module.exports = {
  User,
  userJoiSchema,
};
