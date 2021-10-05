const { Conflict } = require('http-errors');

const UserDB = require('../../repositories/auth');

const signup = async (req, res) => {
  const { email, password } = req.body;

  //check if user was already register
  const user = await UserDB.findByEmail(email);
  if (user) {
    throw new Conflict('Already register');
  }

  //create new user in DB
  const newUser = await UserDB.create(email, password);

  //send response to frontend
  res.status(201).json({
    newUser,
  });
};

module.exports = signup;
