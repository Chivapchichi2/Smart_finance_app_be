const { Ledger } = require('../../models')

const add = async (userId, body) => {
  const result = await Ledger.create({ owner: userId, ...body });
  return result;
};

const remove = async (userId, id) => {
  const result = await Ledger.findOneAndRemove({ _id: id, owner: userId });
  return result;
};

module.exports = {
  add,
  remove,
};
