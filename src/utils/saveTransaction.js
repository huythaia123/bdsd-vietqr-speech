const transactionModel = require("src/model/transaction.model");

async function saveTransaction(data) {
  return await transactionModel.create(data);
}
module.exports = saveTransaction;
