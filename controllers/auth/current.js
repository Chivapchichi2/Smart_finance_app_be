const { Unauthorized } = require('http-errors');

const { getCurrentUser } = require('../../repositories/auth');

const current = async (req, res) => {
  const { email, avatarURL, balance } = await getCurrentUser(req.user.token);

  if (!email) {
    throw new Unauthorized('Not authorized');
  }

  const user = { email, avatarURL, balance };

  res.json({
    user,
  });
};

module.exports = current;
