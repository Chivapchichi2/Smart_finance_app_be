const { remove } = require('../../repositories/ledger');

const removeTransaction = async (req, res) => {
  //remove transaction and get value, expense
  const { value, expense } = await remove(req.params.id);

  //check value
  if (!value) return res.status(404).json({ message: 'Not found' });

  //change user balance and reports
  //code...

  //response message to know result
  res.json({ message: 'transaction deleted' });
};

module.exports = removeTransaction;
