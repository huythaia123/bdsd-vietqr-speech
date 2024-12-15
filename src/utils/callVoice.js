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
  return response;
}

module.exports = callVoice;
