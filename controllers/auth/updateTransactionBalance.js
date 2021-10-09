const { BadRequest } = require('http-errors');
const { getUser, updateBalance } = require('../../repositories/auth');
const { Messages } = require('../../helpers/constants');

const updateTransactionBalance = async (_id, inputValue, path) => {
  //find current user
  const user = await getUser(_id);

  //calculate new balance value
  let newBalance;
  newBalance = user.balance + inputValue;

  if (path === '/expense') {
    newBalance = user.balance - inputValue;
  }

  //check availability of the balance to spend
  if (newBalance < 0) {
    throw new BadRequest(Messages.negativeBalance);
  }

  //update user balance
  const result = await updateBalance(user._id, newBalance);
  return result;
};

module.exports = updateTransactionBalance;
