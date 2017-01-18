var https = require('https')
var secrets = require('./secrets')

const headers = {
  'X-Retpath-Y': 'https%3A%2F%2Fmusic.yandex.ru%2F',
  'Cookie': secrets.cookie
}

function getBlob (hostname, path, partialCallback, completeCallback) {
  var options = {
    hostname: hostname,
    path: path,
    headers: headers
  }
  https.get(options, (res) => {
    res.on('data', partialCallback)
    res.on('end', completeCallback)
  })
}

function get (hostname, path, callback) {
  var options = {
    hostname: hostname,
    path: path,
    headers: headers
  }
  https.get(options, (res) => {
    var rawData = ''
    res.setEncoding('utf8')
    res.on('data', (chunk) => rawData += chunk)
    res.on('end', () => {
      callback(rawData)
    })
  })
}

function getJson (hostname, path, callback) {
  get(hostname, path, (data) => {
    callback(JSON.parse(data))
  })
}

exports.get = get
exports.getJson = getJson
exports.getBlob = getBlob
