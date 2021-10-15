//create the new obj for reports by add transaction
const updateLedgerReport = (year, month, value, lastLedger) =>
  lastLedger[year] !== undefined
    ? {
        ...lastLedger,
        [year]: lastLedger[year][month]
          ? { ...lastLedger[year], [month]: String(+lastLedger[year][month] + +value) }
          : { ...lastLedger[year], [month]: String(value) },
      }
    : {
        ...lastLedger,
        [year]: { [month]: String(value) },
      };

//create the new obj for reports by remove transaction
const updateReportsAfterRemove = (year, month, value, lastLedger) => {
  return {
    ...lastLedger,
    [year]: { [month]: String(+lastLedger[year][month] - +value) },
  }
}

module.exports = {
  updateLedgerReport,
  updateReportsAfterRemove,
};