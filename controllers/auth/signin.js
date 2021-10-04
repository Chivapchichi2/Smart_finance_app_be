const bcrypt = require('bcryptjs');
const { BadRequest, NotFound } = require('http-errors');
const jwt = require('jsonwebtoken');

const UserDB = require('../../repositories/auth');

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await UserDB.findByEmail(email);
  if (!user || !user.comparePassword(password)) {
    throw new BadRequest('Email or password is wrong');
  }
  if (!user.verify) {
    throw new NotFound('Email was not confirm');
  }

  const comparePassword = user.comparePassword(password);

  const payload = {
    id: user._id,
  };
  const { SECRET_KEY } = process.env;
  const token = jwt.sign(payload, SECRET_KEY);
  await UserDB.updateToken(user._id, { token });
  res.json({
    token,
    user: {
      email: user.email,
    },
  });
};

module.exports = login;
