require("dotenv").config()

const env = {
    PORT: process.env.PORT,
    TRANSACTION_URL: process.env.TRANSACTION_URL,
    SQLITE_DB_NAME: process.env.SQLITE_DB_NAME,
    TTS_API_KEY: process.env.TTS_API_KEY,
    TTS_API_URL: process.env.TTS_API_URL,
    AUDIO_FILE_PATH: (filename) => {
        return process.cwd() + `/src/static/voice/${filename}`
    },
}

module.exports = env
