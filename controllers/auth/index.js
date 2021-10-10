const signup = require('./signup');
const signin = require('./signin');
const logout = require('./logout');
const updateUserBalance = require('./updateBalance');
const current = require('./current');
const googleAuth = require('./googleAuth');

module.exports = {
  signup,
  signin,
  logout,
  updateUserBalance,
  current,
  googleAuth,
};
