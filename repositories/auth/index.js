const gravatar = require('gravatar');

const { User } = require('../../models');

const findByEmail = async email => await User.findOne({ email });

const create = async (email, password) => {
  const newUser = new User({ email });
  newUser.setPassword(password);
  newUser.avatarURL = gravatar.url(email, { protocol: 'http' });
  return await newUser.save();
};

module.exports = {
  findByEmail,
  create,
};
