const { updateBalance } = require('../../repositories/auth');

const updateUserBalance = async (req, res) => {
  const result = await updateBalance(req.user._id, req.body.value);
  res.status(201).json({
    balance: result.balance
  });
};

module.exports = updateUserBalance;
