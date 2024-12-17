function bytesToGB(bytes) {
    return (bytes / 1024 ** 3).toFixed(2) + " GB";
}
module.exports = bytesToGB;
