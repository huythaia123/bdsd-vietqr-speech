require("dotenv").config();
const path = require("path");
const player = require("play-sound")();
const { default: mongoose } = require("mongoose");
const env = require("./configs/env");
const transactionModel = require("./model/transaction.model");
const getNewTransaction = require("./utils/getNewTransaction");
const getLastTransaction = require("./utils/getLastTransaction");
const callVoice = require("./utils/callVoice");
const fs = require("node:fs");
const playMP3 = require("./utils/playMP3");
const downloadMP3 = require("./utils/downloadMP3");

// connect mongo
mongoose
  .connect(env.MONGO_URI, { dbName: env.MONGO_DB_NAME })
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

        const voicePath =
          process.cwd() +
          `/src/static/voice/${newTransaction.SoTien.toString()}.mp3`;

        const fileVoiceExists = fs.existsSync(voicePath);

        if (fileVoiceExists) {
          // play mp3 file
          playMP3(voicePath);
        } else {
          const voiceResponse = await callVoice({
            text: newTransaction.SoTien.toString() + " đồng",
          });
          console.log(voiceResponse.data.async);
          // download mp3 file
          setTimeout(async () => {
            await downloadMP3(
              voiceResponse.data.async, // link mp3 online
              newTransaction.SoTien.toString() + ".mp3" //save path
            );
            playMP3(voicePath);
          }, 2000);
        }
      } else {
        console.log(nextTransaction.message);
      }
    }, 6000);
  } catch (error) {
    console.error(error);
  }
}
main();
