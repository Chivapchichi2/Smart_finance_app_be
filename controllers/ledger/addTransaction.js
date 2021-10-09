const { add } = require('../../repositories/ledger');
const { getUser } = require('../../repositories/auth');
const { updateTransactionBalance } = require('../auth');

const addTransaction = async (req, res) => {
  //create transaction
  const transaction = await add(req.user._id, {
    ...req.body,
    //to know expense or income
    expense: req.route.path === '/expense' ? true : false,
  });

  //change user balance
  const updatedUser = await updateTransactionBalance(
    transaction.owner,
    req.body.value,
    req.route.path,
  );

  //response transaction to know result
  res.status(201).json({
    date: transaction.date,
    description: transaction.description,
    category: transaction.category,
    value: transaction.value,
    expense: transaction.expense,
    userId: updatedUser._id,
    balance: updatedUser.balance,
  });
};

module.exports = addTransaction;
