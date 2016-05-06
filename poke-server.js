var express = require('express')
var app = express()
var path = require('path')

console.log('dirname:' + __dirname)

app.use('/React', express.static(__dirname + '/React'))
app.use('/Pictures', express.static(__dirname + '/Pictures'))
app.use('/Scripts', express.static(__dirname + '/Scripts'))
app.use(express.static(__dirname + '/'))

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'))
// __dirname : It will resolve to your project folder.
})

app.listen(process.env.PORT || 5000, function () {
  console.log('Example app listening on port' + process.env.PORT + '!')
})
