// index.js
// where your node app starts

// init project
var express = require('express')
var app = express()

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors')
app.use(cors({ optionsSuccessStatus: 200 })) // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html')
})

// your first API endpoint...
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' })
})

app.get('/api', (req, res) => {
  const date = new Date()
  const unix = date.getTime() / 1
  res.json({ unix: unix, utc: date })
})

app.get('/api/:date', (req, res) => {
  const date = req.params?.date
  if (new Date(date).toUTCString() !== 'Invalid Date') {
    const utc = new Date(date).toUTCString()
    const unix = Math.floor(new Date(date).getTime() / 1)

    res.json({ unix, utc })
  } else if (isUnixTimestamp(date)) {
    const unix = parseInt(date)
    const utc = new Date(unix * 1).toUTCString()

    res.json({ unix, utc })
  } else res.json({ error: 'Invalid Date' })
})

function isUnixTimestamp(timestamp) {
  const date = new Date(timestamp * 1000)
  return date instanceof Date && !isNaN(date)
}

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port)
})
