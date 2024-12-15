const player = require("play-sound")();

function playMP3(path) {
  player.play(path, function (err) {
    if (err) {
      console.error("Can not play MP3:", err);
    }
  });
}
module.exports = playMP3;
