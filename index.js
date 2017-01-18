var url = require('url')
var hash = require('./yandexhash')
var search = require('./search')
var request = require('./request')

function downloadMedia (data, songId) {
  var hasht = hash.hash(data['path'].substring(1) + data['s'])
  var path = '/get-mp3/' + hasht + '/' + data['ts'] + data['path'] + '?track-id=' + songId
  request.get(data['host'], path, (data) => {
    console.log('Downloaded song!')
  })
}

function fetchMedia (srcUrl, songId) {
  request.getJson(srcUrl.hostname, srcUrl.path + '&format=json', (js) => {
    downloadMedia(js, songId)
  })
}

function fetchSong (songId, albumId) {
  var path = '/api/v2.1/handlers/track/' + songId + ':' + albumId +
  '/web-feed-promotion-playlist-saved/download/m?hq=0'
  request.getJson('music.yandex.ru', path, (js) => {
    console.log(js)
    // onsole.log(url.parse(js['src']))
    fetchMedia(url.parse(js['src']), songId)
  })
}

function fetchAlbum () {
  request.getJson('music.yandex.ru', '/handlers/album.jsx?album=434317', (js) => {
    var arr = js['volumes'][0]
    for (var i = 0, len = arr.length; i < len; ++i) {
      fetchSong(arr[i].id, '434317')
    }
  })
}

// Maximum supported size is 500x500
function getAlbumCoverUri (album, size) {
  return album.coverUri.substr(0, album.coverUri.length - 2) + size + 'x' + size
}

fetchAlbum()

// search.searchAlbums('краснознамённая', (js) => {
//   console.log(js.albums)
//   console.log(getAlbumCoverUri(js.albums.items[0], 400))
// })
