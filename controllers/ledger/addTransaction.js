const { BadRequest } = require('http-errors');

const { Messages } = require('../../helpers/constants');
const { add } = require('../../repositories/ledger');
const { updateBalance } = require('../../repositories/auth');

const addTransaction = async (req, res) => {
  const { value } = req.body;
  const { _id, balance } = req.user;

  //to know expense or income
  const expense = req.route.path === '/expense' ? true : false;

  //create transaction
  const transaction = await add(_id, {
    ...req.body,
    expense,
  });

  //change user balance
  const newBalance = expense ? balance - value : balance + value;

  //check availability of the balance to spend
  if (newBalance < 0) {
    throw new BadRequest(Messages.negativeBalance);
  }

  //update user balance
  await updateBalance(_id, newBalance);

  //response transaction to know result
  res.status(201).json({
    transaction: {
      date: transaction.date,
      description: transaction.description,
      category: transaction.category,
      value: transaction.value,
    },
    balance: newBalance,
  });
};

module.exports = addTransaction;
