const { reportsMap } = require('../models/user');

const updateIncomeReport = (year, month, value, lastIncome) => {
  //add income to month reports as Map
  if (reportsMap.handleIncomes.has(month)) {
    //find value for searching month
    const monthValue = reportsMap.handleIncomes.get(month);

    //handled new month value
    const newMonthValue = String(+monthValue + +value);

    //patch new income value to Map
    reportsMap.handleIncomes.set(month, newMonthValue);
  } else {
    //post new income value to Map
    reportsMap.handleIncomes.set(month, value);
  }

  //create new income report
  return { ...lastIncome, [year]: reportsMap.handleIncomes };
};

const updateExpenseReport = (year, month, value, lastExpense) => {
  //add expense to month reports as Map
  if (reportsMap.handleExpense.has(month)) {
    //find value for searching month
    const monthValue = reportsMap.handleExpense.get(month);

    //handled new month value
    const newMonthValue = String(+monthValue + +value);

    //patch new expense value to Map
    reportsMap.handleExpense.set(month, newMonthValue);
  } else {
    //post new expense value to Map
    reportsMap.handleExpense.set(month, value);
  }

  //create new expense report
  return { ...lastExpense, [year]: reportsMap.handleExpense };
};

const updateAfterRemoveExpenseReport = (year, month, value, lastExpense) => {
  //remove expense from month reports//

  //find value for searching month
  const monthValue = reportsMap.handleExpense.get(month);

  //handled new month value
  const newMonthValue = String(+monthValue - +value);

  //patch new expense value to Map
  reportsMap.handleExpense.set(month, newMonthValue);

  //create new expense report
  return { ...lastExpense, [year]: reportsMap.handleExpense };
};

const updateAfterRemoveIncomeReport = (year, month, value, lastIncome) => {
  //remove income from month reports//

  //find value for searching month
  const monthValue = reportsMap.handleIncomes.get(month);

  //handled new month value
  const newMonthValue = String(+monthValue - +value);

  //patch new expense value to Map
  reportsMap.handleIncomes.set(month, newMonthValue);

  //create new expense report
  return { ...lastIncome, [year]: reportsMap.handleIncomes };
};

module.exports = {
  updateIncomeReport,
  updateExpenseReport,
  updateAfterRemoveExpenseReport,
  updateAfterRemoveIncomeReport,
};