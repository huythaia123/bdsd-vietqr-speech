const axios = require("axios");
const fs = require("fs");
const path = require("path");

async function downloadMP3(
  url,
  fileNameOutput,
  maxRetries = 100,
  retryDelay = 5000
) {
  const outputPath = path.join(
    process.cwd(),
    `/src/static/voice/${fileNameOutput}`
  );

  // Kiểm tra file đã tồn tại
  if (fs.existsSync(outputPath)) {
    console.log("The file already exists, no need to download:", outputPath);
    return outputPath; // Trả về đường dẫn file nếu file đã tồn tại
  }

  let attempt = 0;

  while (attempt < maxRetries) {
    try {
      console.log(`Attempt ${attempt + 1}/${maxRetries} to download: ${url}`);

      // Gửi request tải file
      const response = await axios.get(url, { responseType: "stream" });

      const writer = fs.createWriteStream(outputPath);
      response.data.pipe(writer);

      // Đợi quá trình ghi file hoàn tất
      await new Promise((resolve, reject) => {
        writer.on("finish", resolve);
        writer.on("error", reject);
      });

      console.log("Download MP3 succeeded:", outputPath);
      return outputPath; // Trả về đường dẫn file khi tải thành công
    } catch (error) {
      console.error(`Error on attempt ${attempt + 1}:`, error.message);
      attempt++;

      if (attempt < maxRetries) {
        console.log(`Retrying in ${retryDelay}ms...`);
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
      } else {
        console.error("Max retries reached. Failed to download the file.");
        throw error; // Ném lỗi nếu quá số lần retry
      }
    }
  }
}
module.exports = downloadMP3;
