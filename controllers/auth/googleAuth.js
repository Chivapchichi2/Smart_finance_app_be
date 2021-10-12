const { OAuth2Client } = require('google-auth-library');

const { findByEmail } = require('../../repositories/auth');
const createUserToken = require('../../helpers/createUserToken');
const UserDB = require('../../repositories/auth');

const { CLIENT_ID } = process.env;
const client = new OAuth2Client(CLIENT_ID);

const googleAuth = async (req, res) => {
  const { tokenId } = req.body;

  const {
    payload: { email, sub, picture },
  } = await client.verifyIdToken({
    idToken: tokenId,
    audience: CLIENT_ID,
  });

  const existedUser = await findByEmail(email);
  if (existedUser) {
    if (!existedUser.comparePassword(sub)) {
      throw new BadRequest('Use your email and password');
    }
    //create User token
    const { avatarURL, balance, token } = await createUserToken(
      existedUser,
      UserDB,
    );

    //send response to frontend
    return res.json({
      user: { email, avatarURL },
      balance,
      token,
    });
  }

  //create new user in DB
  const newUser = await UserDB.create(email, sub, picture);

  const { avatarURL, balance, token } = await createUserToken(newUser, UserDB);

  //send response to frontend
  res.status(201).json({
    user: { email, avatarURL, balance },
    token,
  });
};

module.exports = googleAuth;
