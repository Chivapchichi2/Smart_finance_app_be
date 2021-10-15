const { BadRequest } = require('http-errors');

const { Messages } = require('../../helpers/constants');
const { add } = require('../../repositories/ledger');
const {
  updateBalance,
  updateIncome,
  updateExpense,
} = require('../../repositories/auth');
const { updateLedgerReport } = require('../../helpers/updateReport');

const addTransaction = async (req, res) => {
  const { value } = req.body;
  const { _id, balance } = req.user;

  //to know expense or income
  const expense = req.route.path === '/expense' ? true : false;

  //change user balance
  const newBalance = expense ? balance - value : balance + value;

  //check availability of the balance to spend
  if (newBalance < 0) {
    throw new BadRequest(Messages.negativeBalance);
  }
  
  console.log('не добавляет')
  //create transaction
  const transaction = await add(_id, {
    ...req.body,
    expense,
  });

  //update user balance
  await updateBalance(_id, newBalance);
//------------------------------------------
  //defined year and month from request
  const month = req.body.date.split('.')[1];
  const year = req.body.date.split('.')[2];

  //check last user income
  const lastIncome = req.user.incomes;
  const lastExpense = req.user.expense;

  const reports = expense
    ? updateLedgerReport(year, month, value, lastExpense)
    : updateLedgerReport(year, month, value, lastIncome);
  
  //send new income reports to user
  const todo = expense
    ? await updateExpense(_id, reports)
    : await updateIncome(_id, reports);

  //response transaction to know result
  res.status(201).json({
    transaction: {
      date: transaction.date,
      description: transaction.description,
      category: transaction.category,
      value: transaction.value,
      _id: transaction._id,
    },
    balance: newBalance,
    ledger: {
      incomes: todo.incomes,
      expense: todo.expense,
    },
  });
};

module.exports = addTransaction;
