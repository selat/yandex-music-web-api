var url = require('url')
var querystring = require('querystring')
var hash = require('./yandexhash')
var request = require('./request')

function downloadMedia (data, trackId, partialCallback, completeCallback) {
  var hasht = hash.hash(data['path'].substring(1) + data['s'])
  var path = '/get-mp3/' + hasht + '/' + data['ts'] + data['path'] + '?track-id=' + trackId
  request.getBlob(data['host'], path, partialCallback, completeCallback)
}

function fetchMedia (srcUrl, trackId, partialCallback, completeCallback) {
  var query = querystring.stringify({
    format: 'json'
  })
  request.getJson(srcUrl.hostname, srcUrl.path + '&' + query, (js) => {
    downloadMedia(js, trackId, partialCallback, completeCallback)
  })
}

function downloadTrack (trackId, albumId, partialCallback, completeCallback) {
  var path = '/api/v2.1/handlers/track/' + trackId + ':' + albumId +
  '/web-feed-promotion-playlist-saved/download/m?hq=0'
  request.getJson('music.yandex.ru', path, (js) => {
    fetchMedia(url.parse(js['src']), trackId, partialCallback, completeCallback)
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

function getTrack(trackId, albumId, callback) {
  var query = querystring.stringify({
    track: trackId + ':' + albumId
  })
  request.getJson('music.yandex.ru', '/handlers/track.jsx?' + query, callback)
}

function getArtist(artistId, callback) {
  var query = querystring.stringify({
    artist: artistId
  })
  // https://music.yandex.ru/handlers/artist.jsx?artist=519187&what=&sort=&dir=&lang=ru&external-domain=music.yandex.ru&overembed=false&ncrnd=0.5167254488564074
  request.getJson('music.yandex.ru', '/handlers/artist.jsx?' + query, callback)
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
exports.getTrack = getTrack
exports.getArtist = getArtist
exports.downloadTrack = downloadTrack
