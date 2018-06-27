const express = require('express')
const getRandomInt = require("./utils")

const app = express()

app.set('views', __dirname + '/views')
app.set('view engine', 'jade')

app.get('/', (req, res) => res.render('index', {
  left: getRandomInt(10, 100),
  right: getRandomInt(100, 1000)
}))

process.env.PORT = process.env.PORT || 1337
process.env.IP = process.env.IP || 'localhost'

app.listen(process.env.PORT, () => console.log('Sample site running...'))
