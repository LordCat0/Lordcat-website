const express = require('express')
const path = require('path')
const app = express()

app.use(express.static(path.join(__dirname, "public")))

app.get("/api/health", (req, res) => {
    res.json({health: "OK"})
})

app.listen(3000, () => console.log("Listening on port 3000"))