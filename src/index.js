require("dotenv").config();
const { default: mongoose } = require("mongoose");
const env = require("./configs/env");
const transactionModel = require("./model/transaction.model");
const getNewTransaction = require("./utils/getNewTransaction");
const getLastTransaction = require("./utils/getLastTransaction");

// connect mongo
mongoose
  .connect(env.MONGO_URI)
  .then(() => console.log("connect mongo successed"))
  .catch((error) => console.error(error));

// main
async function main() {
  try {
    setInterval(async () => {
      // get last transaction from db
      const lastTransaction = await getLastTransaction();

      // get next transaction from MaGiaoDich in last transaction
      const nextTransaction = await getNewTransaction({
        MaGiaoDich: lastTransaction ? lastTransaction.MaGiaoDich : "",
      });

      if (nextTransaction.message !== "There are no new transactions yet") {
        // save new transaction
        const newTransaction = await transactionModel.create(
          nextTransaction.data
        );
        console.log(newTransaction.MaGiaoDich);
      } else {
        console.log(nextTransaction.message);
      }
    }, 5000);
  } catch (error) {
    console.error(error);
  }
}
main();
