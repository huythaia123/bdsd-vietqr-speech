const transactionModel = require("../model/transaction.model");

async function getLastTransaction() {
  return await transactionModel.findOne({}, {}, { sort: { createdAt: -1 } });
}
module.exports = getLastTransaction;
