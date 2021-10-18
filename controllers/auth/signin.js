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

  //create User token
  const { avatarURL, balance, token, incomes, expense } = await createUserToken(
    user,
    UserDB,
  );

  //send response to frontend
  res.json({
    user: { email, avatarURL },
    balance,
    token,
    ledger: {
      incomes,
      expense,
    },
  });
};

module.exports = login;
