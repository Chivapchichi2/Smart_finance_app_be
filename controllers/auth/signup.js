const { Conflict } = require('http-errors');

const UserDB = require('../../repositories/auth');
const createUserToken = require('../../helpers/createUserToken');

const signup = async (req, res) => {
  const { email, password } = req.body;

  //check if user was already register
  const userCheck = await UserDB.findByEmail(email);
  if (userCheck) {
    throw new Conflict('Already register');
  }

  //create new user in DB
  const newUser = await UserDB.create(email, password);

  const user = await createUserToken(newUser, UserDB);

  //send response to frontend
  res.status(201).json({
    user,
  });
};

module.exports = signup;
