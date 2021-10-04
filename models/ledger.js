const { Schema, model, SchemaTypes } = require('mongoose');
const Joi = require('joi');
const { Category, RequirementRules } = require('../helpers/constants');

const ledgerSchema = Schema({
  owner: { type: SchemaTypes.ObjectId, ref: 'user' },
  date: {
    type: String,
    required: [true, RequirementRules.date],
  },
  description: {
    type: String,
    required: [true, RequirementRules.description],
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
      Category.incomes,
      Category.additionalIncomes,
    ],
    require: [true, RequirementRules.category],
  },
  value: {
    type: Number,
    require: [true, RequirementRules.value],
  },
});

const ledgerJoiSchema = Joi.object({
  date: Joi.string().required(),
  description: Joi.string().required(),
  category: Joi.string(),
  value: Joi.number().required(),
});

const Ledger = model('ledger', ledgerSchema);

module.exports = {
  Ledger,
  ledgerJoiSchema,
};
