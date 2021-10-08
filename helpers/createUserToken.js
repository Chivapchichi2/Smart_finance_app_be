const jwt = require('jsonwebtoken');

const createUserToken = async (user, UserDB) => {
  //create active token for user
  const payload = {
    id: user._id,
  };
  const { SECRET_KEY } = process.env;
  const token = jwt.sign(payload, SECRET_KEY);

  //save new token in DB
  return await UserDB.updateToken(user._id, token);
};

module.exports = createUserToken;
