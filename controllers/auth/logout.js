const UserDB = require('../../repositories/auth');

const logout = async (req, res) => {
  //remove access token from DB
  await UserDB.removeAccessToken(req.user._id);

  //send response to frontend
  res.json({
    status: 'success',
    code: 204,
    message: 'Success logout',
  });
};

module.exports = logout;
