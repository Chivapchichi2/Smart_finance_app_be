const { Unauthorized } = require('http-errors');

const { getCurrentUser } = require('../../repositories/auth');

const current = async (req, res) => {
  const { email, avatarURL, balance, incomes, expense } = await getCurrentUser(
    req.user.token,
  );

  if (!email) {
    throw new Unauthorized('Not authorized');
  }

  const user = { email, avatarURL };

  res.json({
    user,
    balance,
    ledger: { incomes, expense },
  });
};

module.exports = current;
