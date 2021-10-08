const { add } = require('../../repositories/ledger');

const addTransaction = async (req, res) => {
  //create transaction
  const transaction = await add(req.user._id, {
    ...req.body,
    //to know expense or income
    expense: req.route.path === '/expense' ? true : false,
  });

  //change user balance and reports
  //code...

  //response transaction to know result
  res.status(201).json(transaction);
};

module.exports = addTransaction;
