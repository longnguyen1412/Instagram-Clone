const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

const PORT = 5000

const {MONGOURI} = require('./keys')

mongoose.connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

mongoose.connection.on('connected', () => {
    console.log("Connected to mongo yeahh")
})

mongoose.connection.on('error', (err) => {
    console.log("Err connecting: ", err)
})

require('./models/user')
require('./models/post')

app.use(cors())             // cho phép truy cập chéo
app.use(express.json())     // giúp đọc dữ liệu trong req.body

app.use(require('./routes/auth'))
app.use(require('./routes/post'))

app.listen(PORT, () => {
    console.log("Server is running on ", PORT)
})