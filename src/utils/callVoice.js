const fs = require("node:fs");
const axios = require("axios");
const player = require("play-sound")();
const env = require("../configs/env");

const url = env.VOICE_API_URL;
const apiKey = env.VOICE_API_KEY;
const voice = "banmai";

// Hàm gọi API
async function callVoice({ text, speed }) {
  const response = await axios.post(url, text, {
    headers: {
      "Content-Type": "text/plain",
      "api-key": apiKey,
      voice,
      speed,
    },
  });

  const mp3FileResponse = await axios({
    method: "get",
    url: response.data.async,
    responseType: "stream",
  });
  const filePath = "./temp.mp3";
  const writer = fs.createWriteStream(filePath);

  mp3FileResponse.data.pipe(writer);

  writer.on("finish", () => {
    console.log("File downloaded. Playing...");

    // Phát file MP3
    player.play(filePath, (err) => {
      if (err) {
        console.error("Error playing the file:", err);
      } else {
        console.log("Playback finished.");
      }

      // Xóa file sau khi phát xong
      fs.unlinkSync(filePath);
    });
  });
}

module.exports = callVoice;
