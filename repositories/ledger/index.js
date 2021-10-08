const { Ledger } = require('../../models');

//create transaction
const add = async (userId, body) =>
  await Ledger.create({
    ...body,
    monthDate: body.date.split('.').slice(1).join('.'),
    owner: userId,
  });

//delete transaction
const remove = async id => await Ledger.findByIdAndRemove(id);

//get transactions array by month
const getByMonth = async (userId, date, expense) =>
  await Ledger.find({ owner: userId, monthDate: date, expense });

module.exports = {
  add,
  remove,
  getByMonth,
};
