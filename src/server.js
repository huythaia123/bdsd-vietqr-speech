require("module-alias/register")
const fs = require("node:fs")
const check_os = require("./utils/checkos")
const {
    getNewSheetTrans,
    saveTrans,
    getLastTrans,
} = require("./controllers/transaction.controller")
const { playAudio, getLinkSpeech, downloadAudio } = require("./controllers/tts.controller")
const { checkConnectDB, sequelize } = require("./configs/db")
const env = require("./configs/env")
const { AxiosError } = require("axios")

/* check os  */
check_os()

/* database */
checkConnectDB(sequelize)

    /* main function */
    ; (async function () {
        setInterval(async () => {
            try {
                // lấy giao dịch cuối cùng trong db
                const lastTrans = await getLastTrans()
                // console.log("[INFO] lastTrans :", JSON.stringify(lastTrans))

                // lấy giao dịch mới
                const newSheetTrans = await getNewSheetTrans({
                    MaGiaoDich: lastTrans ? lastTrans.MaGiaoDich : "",
                })
                // console.log("[INFO] newSheetTrans", newSheetTrans)

                // lưu giao dịch mới vào db
                if (newSheetTrans.newTrans) {
                    const newTrans = await saveTrans(newSheetTrans.data)
                    console.log(`[+] New trans -- ${newTrans.MaGiaoDich} -- ${newTrans.SoTien} VND`)

                    const filename = newTrans.SoTien.toString() + ".mp3"
                    const AUDIO_FILE_PATH = env.AUDIO_FILE_PATH(filename)
                    const audioFilePathExists = fs.existsSync(AUDIO_FILE_PATH)
                    // console.log("[INFO] AUDIO_FILE_PATH :", AUDIO_FILE_PATH)
                    // console.log("[INFO] audioFilePathExists :", audioFilePathExists)

                    // nếu file mp3 đã có
                    if (audioFilePathExists) {
                        playAudio(AUDIO_FILE_PATH)
                    } else {
                        // chưa có file mp3
                        // call api download mp3
                        // play mp3
                        const ttsContent = newTrans.SoTien.toString() + " đồng"
                        const linkSpeech = await getLinkSpeech({ content: ttsContent })
                        // console.log("[INFO] linkSpeech :", linkSpeech.async)
                        const audioFilePathAsync = await downloadAudio({
                            audioUrl: linkSpeech.async,
                            filename,
                        })
                        playAudio(audioFilePathAsync)
                    }
                } else {
                    // không có giao dịch mới
                    // console.log("[INFO] newSheetTrans.message :", newSheetTrans.message)
                }
            } catch (error) {
                if (error instanceof AxiosError) {
                    console.error(`${error.name} :`, error.message);
                } else {
                    console.error(`[ERROR] ${Object.keys[error]} :`, error)
                }
            }
        }, 8000)
    })()
