const express = require('express')
const cors = require('cors')
const path = require('path')
const app = express()


app.use(cors({
    origin: "www.lordcat.dev",
    methods: ["GET"]
}))
app.use(express.static(path.join(__dirname, "public")))

app.listen(3000, () => console.log("Listening on port 3000"))
