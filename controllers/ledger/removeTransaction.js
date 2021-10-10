const { NotFound } = require('http-errors');

const { remove } = require('../../repositories/ledger');
const { updateBalance } = require('../../repositories/auth');

const removeTransaction = async (req, res) => {
  //remove transaction and get value, expense
  const { value, expense } = await remove(req.params.id);

  const { _id, balance } = req.user;

  //check value
  if (!value) throw new NotFound('Transaction not found');

  //change user balance
  const newBalance = expense ? balance + value : balance - value;

  //update user balance
  await updateBalance(_id, newBalance);

  //response message to know result
  res.json({ message: 'Transaction deleted', balance: newBalance });
};

module.exports = removeTransaction;
