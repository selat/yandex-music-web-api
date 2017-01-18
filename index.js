var https = require('https')
var url = require('url')
var hash = require('./yandexhash')
var search = require('./search')
var headers = require('./headers')

var options = {
  hostname: 'music.yandex.ru',
  headers: headers.headers
}

function downloadMedia (data, songId) {
  var hasht = hash.hash(data['path'].substring(1) + data['s'])
  options.hostname = data['host']
  options.path = '/get-mp3/' + hasht + '/' + data['ts'] + data['path'] + '?track-id=' + songId
  https.get(options, (res) => {
    var rawData = ''
    console.log('ok!')
    res.on('data', (chunk) => rawData += chunk)
    res.on('end', () => {
      console.log('Downloaded song!')
      // console.log(rawData)
    })
    res.on('error', (e) => {
      console.log('error! :')
    })
  }).on('error', (e) => {
    console.log('error!')
  })
}

function fetchMedia (srcUrl, songId) {
  options.hostname = srcUrl.hostname
  options.path = srcUrl.path + '&format=json'
  // console.log(options)
  https.get(options, (res) => {
    var rawData = ''
    res.on('data', (chunk) => rawData += chunk)
    res.on('end', () => {
      // console.log(rawData)
      var js = JSON.parse(rawData)
      downloadMedia(js, songId)
      // console.log(js)
    })
  }).on('error', (e) => {
    console.log('ERROR')
  })
}

function fetchSong (songId, albumId) {
  options.path = '/api/v2.1/handlers/track/' + songId + ':' + albumId +
  '/web-feed-promotion-playlist-saved/download/m?hq=0&external-domain=music.yandex.ru&overembed=no'
  https.get(options, (res) => {
    var rawData = ''
    res.on('data', (chunk) => rawData += chunk)
    res.on('end', () => {
      var js = JSON.parse(rawData)
      console.log(url.parse(js['src']))
      fetchMedia(url.parse(js['src']), songId)
    })
  })
}

function fetchAlbum () {
  options.path = '/handlers/album.jsx?album=434317&lang=ru&external-domain=music.yandex.ru&overembed=false'
  https.get(options, (res) => {
    console.log('Status: ', res.statusCode)
    console.log('Headers: ', res.headers)

    res.setEncoding('utf8')
    var rawData = ''
    res.on('data', (chunk) => rawData += chunk)
    res.on('end', () => {
      var js = JSON.parse(rawData)
      var arr = js['volumes'][0]
      for (var i = 0, len = arr.length; i < len; ++i) {
        fetchSong(arr[i].id, '434317')
      }
    })
  })
}

// Maximum supported size is 500x500
function getAlbumCoverUri (album, size) {
  return album.coverUri.substr(0, album.coverUri.length - 2) + size + 'x' + size
}

// fetchAlbum()

search.searchAlbums('краснознамённая', (js) => {
  console.log(js.albums)
  console.log(getAlbumCoverUri(js.albums.items[0], 400))
})
