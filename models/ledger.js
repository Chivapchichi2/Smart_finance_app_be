const { Schema, model } = require('mongoose');
const Joi = require('joi');
const Category = require('../helpers/constants')

const ledgerSchema = Schema({
  date: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: [
      Category.transport,
      Category.products,
      Category.health,
      Category.alcohol,
      Category.amusement,
      Category.housewares,
      Category.technic,
      Category.сommunalExpenses,
      Category.hobby,
      Category.education,
      Category.others,
    ],
    default: Category.others,
  },
  value: {
    type: Number,
    require: true,
  }
});

const ledgerJoiSchema = Joi.object({
  date: Joi.number().required(),
  description: Joi.string().required(),
  category: Joi.string(),
  value: Joi.number().required(),
});

const Ledger = model('ledger', ledgerSchema);

module.exports = {
  Ledger,
  ledgerJoiSchema,
};