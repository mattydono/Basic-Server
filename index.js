const express = require('express')
const path = require('path')
const socket = require('socket.io')

const app = express()

const PORT = process.env.PORT || 5000 // process.env.PORT look at the environment variables for PORT || 5000, when we deploy server isn't likely going to run on 5000, if not availble 5000

const server = app.listen(PORT, console.log(`Server started on port ${PORT}`))

const io = socket(server)

io.on('connection', (socket) => {
    console.log('made socket connection', socket.id)
})

// const logger = (req, res, next) => {
//     console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}`)
//     next()
// }

// // Init middleware

// app.use(logger)

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html')) // send HTML file, current directory, public folder, index.html
// })

// body parser middleware

app.use(express.json())
app.use(express.urlencoded({extended: false}))

// set static folder

app.use(express.static('public'))

// member api routes

app.use('/api/members', require('./routes/api/members'))