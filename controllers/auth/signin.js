const bcrypt = require('bcryptjs');
const { BadRequest, NotFound } = require('http-errors');
const jwt = require('jsonwebtoken');

const UserDB = require('../../repositories/auth');

const login = async (req, res) => {
  const { email, password } = req.body;

  //find use in DB by email
  const user = await UserDB.findByEmail(email);
  if (!user || !user.comparePassword(password)) {
    throw new BadRequest('Email or password is wrong');
  }

  // //sandgrid verification by email confirm
  // if (!user.verify) {
  //   throw new NotFound('Email was not confirm');
  // }

  //compare if was user already signup
  const comparePassword = user.comparePassword(password);

  //create active token for user
  const payload = {
    id: user._id,
  };
  const { SECRET_KEY } = process.env;
  const token = jwt.sign(payload, SECRET_KEY);

  //save new token in DB
  await UserDB.updateToken(user._id, token);

  //send response to frontend
  res.json({
    token,
    user: {
      email: user.email,
    },
  });
};

module.exports = login;
