const jwt = require('jsonwebtoken');
const { Unauthorized } = require('http-errors');

const UserDB = require('../repositories/auth');

const { SECRET_KEY } = process.env;

const authenticate = async (req, _, next) => {
  try {
    const [bearer, token] = req.headers.authorization.split(' ');
    if (bearer !== 'Bearer') {
      throw new Unauthorized('Not authorized');
    }

    //verification user by existence token
    const user = await UserDB.findByToken(token);

    //attach user from DB to request args
    req.user = user;

    //call next function
    next();
  } catch (error) {
    throw new Unauthorized('Not authorized');
  }
};

module.exports = authenticate;
