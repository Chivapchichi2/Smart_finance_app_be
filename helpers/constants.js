const Category = {
  transport: 'Транспорт',
  products: 'Продукты',
  health: 'Здоровье',
  alcohol: 'Алкоголь',
  amusement: 'Развлечения',
  housewares: 'Всё для дома',
  technic: 'Техника',
  communalExpenses: 'Коммуналка, связь',
  hobby: 'Спорт, хобби',
  education: 'Образование',
  others: 'Прочее',
  incomes: 'ЗП',
  additionalIncomes: 'Дополнительные доходы',
};

const RequirementRules = {
  date: 'field date is required',
  description: 'field description is required',
  category: 'field category is required',
  value: 'field value is required',
};

const Messages = {
  negativeBalance:
    'Эта затрата сделает ваш баланс отрицательным. Пополните баланс внесением доходов, либо откоректируйте значение баланса вручную',
};

module.exports = {
  Category,
  RequirementRules,
  Messages,
};
