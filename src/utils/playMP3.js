// const player = require("play-sound")({ players: ["mplayer"] });

const os = require("os");
const playerLib = require("play-sound");

// Tạo đối tượng player với trình phát mặc định
let player;

if (os.arch() === "arm" && os.platform() === "linux") {
  // Nếu là Raspberry Pi (kiến trúc ARM và Linux), chọn mpg123
  player = playerLib({ players: ["mpg123"] });
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
