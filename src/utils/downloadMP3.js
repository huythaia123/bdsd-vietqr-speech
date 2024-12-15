const fs = require("node:fs");
const { default: axios } = require("axios");

async function downloadMP3(url, fileNameOutput) {
  const outputPath = process.cwd() + `/src/static/voice/${fileNameOutput}`;

  if (fs.existsSync(outputPath)) {
    console.log("The file already exists, no need to download:", outputPath);
    return;
  }

  const response = await axios.get(url, { responseType: "stream" });

  const writer = fs.createWriteStream(outputPath);
  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on("finish", () => {
      console.log("Download mp3 successed:", outputPath);
      resolve();
    });
    writer.on("error", reject);
  });
}

module.exports = downloadMP3;
