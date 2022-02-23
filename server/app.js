const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

const PORT = process.env.PORT || 5000

const {MONGOURI} = require('./config/keys')

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

app.use('/api/', require('./routes/auth'))
app.use('/api/', require('./routes/post'))
app.use('/api/', require('./routes/user'))

if(process.env.NODE_ENV === "production") {
    app.use(express.static('../client/build'))
    const path = require('path')
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'))
    })
}

app.listen(PORT, () => {
    console.log("Server is running on ", PORT)
})