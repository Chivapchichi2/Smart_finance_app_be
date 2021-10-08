const { getByMonth } = require('../../repositories/ledger');

const getTransactionsByMonth = async (req, res) => {
  //to know expense or income
  const expense = req.route.path === '/expense/:date' ? true : false;

  //get array of month transactions
  const monthTransactions = await getByMonth(
    req.user._id,
    req.params.date,
    expense,
  );

  //check response and return false data
  if (monthTransactions.length === 0) return res.json(null);

  //return array of month transactions
  res.json(monthTransactions);
};

module.exports = getTransactionsByMonth;
