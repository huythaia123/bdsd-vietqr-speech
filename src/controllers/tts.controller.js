const os = require("os")
const fs = require("fs")
const { default: axios } = require("axios")
const env = require("@src/configs/env")
const playerLib = require("play-sound")

/* config sound */
let player
if (os.arch().includes("arm") && os.platform().includes("linux")) {
    player = playerLib({ players: ["mplayer"] })
    console.log("[INFO] Raspberry Pi")
} else {
    player = playerLib()
    console.log("[INFO] Non-Raspberry Pi")
}

/* playAudio */
const playAudio = (path) => {
    player.play(path, function (err) {
        if (err) {
            console.error(`[ERROR] Can not play MP3, path: ${JSON.stringify(path)} ,`, err)
        }
    })
}
module.exports.playAudio = playAudio

/* getLinkSpeech */
const getLinkSpeech = async ({ content, speed }) => {
    const response = await axios.post(env.TTS_API_URL, content, {
        headers: {
            "Content-Type": "text/plain",
            "api-key": env.TTS_API_KEY,
            voice: "banmai",
            speed,
        },
    })
    return response.data
}
module.exports.getLinkSpeech = getLinkSpeech

/* download audio file */
const downloadAudio = async ({ audioUrl, filename, maxRetries = 50, retryDelay = 5000 }) => {
    const AUDIO_FILE_PATH = env.AUDIO_FILE_PATH(filename)

    // nếu đã có file âm thanh
    if (fs.existsSync(AUDIO_FILE_PATH)) {
        return AUDIO_FILE_PATH
    }

    let attempt = 0

    while (attempt < maxRetries) {
        try {
            const response = await axios.get(audioUrl, { responseType: "stream" })
            const writer = fs.createWriteStream(AUDIO_FILE_PATH)
            response.data.pipe(writer)

            // đợi file tải
            await new Promise((resolve, reject) => {
                writer.on("error", reject)
                writer.on("finish", resolve)
            })

            console.log(
                `[SUCCESS] Attempt ${attempt} Download audio file successfully :`,
                AUDIO_FILE_PATH
            )
            return AUDIO_FILE_PATH
        } catch (error) {
            console.log(
                `[ERROR] Attempt ${attempt + 1}/${maxRetries}, delay ${retryDelay}ms :`,
                error.message
            )
            attempt++

            if (attempt < maxRetries) {
                await new Promise((resolve) => setTimeout(resolve, retryDelay))
            } else {
                console.error(`[ERROR] Attempt ${attempt + 1}/${maxRetries}`, error.message)
                throw error
            }
        }
    }
}
module.exports.downloadAudio = downloadAudio
