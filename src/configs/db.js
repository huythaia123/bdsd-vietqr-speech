const { Sequelize } = require("sequelize")
const env = require("./env")

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: process.cwd() + "/src/databases/" + env.SQLITE_DB_NAME,
    logging: false,
})

async function checkConnectDB(sequelize) {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        console.log("[INFO] Connection DB has been established successfully.")
    } catch (error) {
        console.error("[ERROR] Unable to connect to the database:", error.message)
    }
}

module.exports = { sequelize, checkConnectDB }
