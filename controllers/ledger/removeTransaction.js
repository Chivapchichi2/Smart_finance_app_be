const { NotFound, BadRequest } = require('http-errors');

const { remove } = require('../../repositories/ledger');
const { updateBalance, updateExpense, updateIncome } = require('../../repositories/auth');
const { updateReportsAfterRemove } = require('../../helpers/updateReport');
const { Messages } = require('../../helpers/constants');

const removeTransaction = async (req, res) => {
  //remove transaction and get value, expense
  const { value, date, expense } = await remove(req.params.id);

  const { _id, balance } = req.user;

  //check value
  if (!value) { throw new NotFound('Transaction not found') };

  //change user balance
  const newBalance = expense ? balance + value : balance - value;

  //update user balance
  if (newBalance > 0) {
    await updateBalance(_id, newBalance);
  } else {
    throw new BadRequest(Messages.negativeBalance);
  }
//------------------------------------------------
  //defined year and month from request
  const month = date.split('.')[1];
  const year = date.split('.')[2];

  //check last user income
  const lastIncome = req.user.incomes;
  const lastExpense = req.user.expense;

  const reports = expense
    ? updateReportsAfterRemove(year, month, value, lastExpense)
    : updateReportsAfterRemove(year, month, value, lastIncome);

  //send new income reports to user
  const todo = expense
    ? await updateExpense(_id, reports)
    : await updateIncome(_id, reports);

  //response message to know result
  res.json({
    message: 'Transaction deleted',
    balance: newBalance,
    ledger: {
      incomes: todo.incomes,
      expense: todo.expense,
    },
  });
};

module.exports = removeTransaction;
