const { default: axios } = require("axios");
const env = require("../configs/env");

async function getNewTransaction({ MaGiaoDich = "" }) {
  const res = await axios.get(
    env.TRANSACTION_URL + `?transactionId=${MaGiaoDich}`
  );
  return res.data;
}

module.exports = getNewTransaction;
