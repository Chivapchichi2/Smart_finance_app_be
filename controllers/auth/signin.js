const { BadRequest } = require('http-errors');

const UserDB = require('../../repositories/auth');
const createUserToken = require('../../helpers/createUserToken');

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

  //create User token
  const updateUser = createUserToken(user, UserDB);

  //send response to frontend
  res.json({
    user: updateUser,
  });
};

module.exports = login;
