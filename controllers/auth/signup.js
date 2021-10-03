const { Conflict } = require('http-errors');

const UserDB = require('../../repositories/auth');

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await UserDB.findByEmail(email);
  if (user) {
    throw new Conflict('Already register');
  }
  const newUser = await UserDB.create(email, password);
  res.status(201).json({
    newUser,
  });
};

module.exports = signup;
