const os = require("os")
const bytesToGB = require("./bytesToGB")

function check_os() {
    const os_info = {
        os_version: os.version(),
        os_type: os.type(),
        os_platform: os.platform(),
        cpu_architecture: os.arch(),
        total_memory: bytesToGB(os.totalmem()),
        free_memory: bytesToGB(os.freemem()),
        // cpu_info: os.cpus()
    }
    console.log("[INFO] CHECK OS :", os_info)
    return os_info
}

module.exports = check_os
