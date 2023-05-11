require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const dns = require('dns')

dns.setDefaultResultOrder('ipv4first')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(middleware)

app.use('/public', express.static(__dirname + '/public'))

app.get('', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
})

app.get('/json', (req, res) => {
  if (process.env.MESSAGE_STYLE === 'uppercase')
    res.json({ message: 'Hello json'.toUpperCase() })
  else res.json({ message: 'Hello json' })
})

app.get('/now', getRequestTime, (req, res) => {
  console.log(req.time)
  res.json({ time: req.time })
})

app.get('/:word/echo', (req, res) => {
  const word = req.params.word || ''
  res.json({ echo: word })
})

app.get('/name', (req, res) => {
  const { first, last } = req.query
  res.json({ name: `${first} ${last}` })
})

app.post('/name', (req, res) => {
  const { first, last } = req.body
  res.json({ name: `${first} ${last}` })
})

function middleware(req, res, next) {
  console.log(`${req.method} ${req.path} - ${req.ip}`)
  next()
}

function getRequestTime(req, res, next) {
  const time = new Date().toString()
  req.time = time
  next()
}

module.exports = app
