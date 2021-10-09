const { OAuth2Client } = require('google-auth-library');

const { CLIENT_ID } = process.env;
const client = new OAuth2Client(CLIENT_ID);

const { User } = require('../../models');

const { users: service } = require('../../services');

const googlelogin = (req, res) => {
  const { tokenId } = req.body;
  client
    .verifyIdToken({
      idToken: tokenId,
      audience: CLIENT_ID,
    })
    .then(response => {
      const { email_verified, name, email } = response.payload;

      if (email_verified) {
        User.findOne({ email }).exec((err, user) => {
          const verifyToken = nanoid();
          if (err) {
            return res.status(400).json({ error: 'Something went wrong....' });
          } else {
            if (user) {
              const token = jwt.sign({ id: user.id }, SECRET_KEY);

              const { id, email, verifyToken } = user;

              service.update(user.id, { token });

              res.json({
                user: { id, token, email, verifyToken },
              });
            } else {
              let password = email + SECRET_KEY;

              let newUser = new User({
                name,
                email,
                password,
                verifyToken,
              });
              newUser.save((err, data) => {
                if (err) {
                  return res
                    .status(400)
                    .json({ error: 'Something went wrong....' });
                }

                const token = jwt.sign({ id: data.id }, SECRET_KEY);

                const { id, email } = newUser;

                service.update(data.id, { token });

                res.json({
                  user: { id, token, email },
                });
              });
            }
          }
        });
      }
    });
};

module.exports = googlelogin;
