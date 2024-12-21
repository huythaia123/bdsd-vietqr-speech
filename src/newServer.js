require("module-alias/register")
const cors = require("cors")
const express = require("express")
const env = require("./configs/env")

const app = express()
const PORT = env.PORT

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.post("/post-trans", (req, res) => {
    console.log(req.body)
    res.status(200).json({ data: req.body })
})

app.listen(PORT, () => {
    console.log(`BDSD TTS PORT=>${PORT}`)
})
