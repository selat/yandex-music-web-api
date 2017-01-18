var url = require('url')
var querystring = require('querystring')
var hash = require('./yandexhash')
var request = require('./request')

function downloadMedia (data, songId) {
  var hasht = hash.hash(data['path'].substring(1) + data['s'])
  var path = '/get-mp3/' + hasht + '/' + data['ts'] + data['path'] + '?track-id=' + songId
  request.get(data['host'], path, (data) => {
    console.log('Downloaded song!')
  })
}

function fetchMedia (srcUrl, songId) {
  var query = querystring.stringify({
    format: 'json'
  })
  request.getJson(srcUrl.hostname, srcUrl.path + '&' + query, (js) => {
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

function getAlbum(albumId, callback) {
  var query = querystring.stringify({
    album: albumId
  })
  request.getJson('music.yandex.ru', '/handlers/album.jsx?' + query, callback)
}

// Maximum supported size is 500x500
function getAlbumCoverUri (album, size) {
  return album.coverUri.substr(0, album.coverUri.length - 2) + size + 'x' + size
}

function search (query, searchType, callback) {
  var urlQuery = querystring.stringify({
    text: query,
    type: searchType})
  // page=pageId
  // Unknown parameters:
  // lang=ru
  // overembed=false
  // ncrnd=0.49198139212100345
  request.getJson('music.yandex.ru', '/handlers/music-search.jsx?' + urlQuery,
                  callback)
}

exports.searchAlbums = (query, callback) => search(query, 'albums', (js) => {
  callback(js.albums)
})
exports.searchPlaylists = (query, callback) => search(query, 'playlists', (js) => {
  callback(js.playlists)
})
exports.searchTracks = (query, callback) => search(query, 'tracks', (js) => {
  callback(js.tracks)
})
exports.searchArtists = (query, callback) => search(query, 'artists', (js) => {
  callback(js.artists)
})
exports.searchAll = (query, callback) => search(query, 'all', callback)

exports.getAlbumCoverUri = getAlbumCoverUri
exports.getAlbum = getAlbum
