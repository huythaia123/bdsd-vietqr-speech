// const player = require("play-sound")({ players: ["mplayer"] });

const os = require("os");
const playerLib = require("play-sound");

// Tạo đối tượng player với trình phát mặc định
let player;

console.log(os.arch(), "---", os.platform());

if (os.arch().includes("arm") && os.platform().includes("linux")) {
  // Nếu là Raspberry Pi (kiến trúc ARM và Linux), chọn mpg123
  player = playerLib({ players: ["mplayer"] });
  console.log("Detected Raspberry Pi, using mpg123 for audio playback.");
} else {
  // Nếu không phải Raspberry Pi, để thư viện tự động chọn trình phát
  player = playerLib();
  console.log("Non-Raspberry Pi system, using default audio player.");
}

function playMP3(path) {
  player.play(path, function (err) {
    if (err) {
      console.error("Can not play MP3:", err);
    }
  });
}
module.exports = playMP3;
