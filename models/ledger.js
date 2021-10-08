const { Schema, model, SchemaTypes } = require('mongoose');
const Joi = require('joi');
const { Category, RequirementRules } = require('../helpers/constants');

const ledgerSchema = Schema(
  {
    owner: { type: SchemaTypes.ObjectId, ref: 'user' },
    date: {
      type: String,
      required: [true, RequirementRules.date],
    },
    monthDate: {
      type: String,
      required: false,
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
        Category.communalExpenses,
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
    expense: {
      type: Boolean,
      default: true,
    },
  },
  { versionKey: false, timestamps: true },
);

const ledgerJoiSchema = Joi.object({
  date: Joi.string().required(),
  monthDate: Joi.string(),
  description: Joi.string().required(),
  category: Joi.string().required(),
  value: Joi.number().required(),
  expense: Joi.boolean().default(true),
});

const Ledger = model('ledger', ledgerSchema);

module.exports = {
  Ledger,
  ledgerJoiSchema,
};
