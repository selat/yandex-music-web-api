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

function getAlbum (albumId, callback) {
  var query = querystring.stringify({
    album: albumId
  })
  request.getJson('music.yandex.ru', '/handlers/album.jsx?' + query, callback)
}

function getTrack (trackId, albumId, callback) {
  var query = querystring.stringify({
    track: trackId + ':' + albumId
  })
  request.getJson('music.yandex.ru', '/handlers/track.jsx?' + query, callback)
}

function getArtist (artistId, callback) {
  var query = querystring.stringify({
    artist: artistId
  })
  request.getJson('music.yandex.ru', '/handlers/artist.jsx?' + query, callback)
}

function getFeed (callback) {
  request.getJson('music.yandex.ru', '/handlers/feed.jsx', callback)
}

function getLibrary (ownerNick, filter, callback) {
  // Unknown options:
  // likeFilter=favorite
  // lang=tur
  // external-domain=music.yandex.ru
  // overembed=false
  // ncrnd=0.03142031434416881
  var query = querystring.stringify({
    owner: ownerNick,
    filter: filter,
    likeFilter: 'favorite'
  })
  request.getJson('music.yandex.ru', '/handlers/library.jsx?' + query, callback)
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

exports.getLibraryAlbums = (ownerNickname, callback) => getLibrary(ownerNickname, 'albums', (js) => {
  callback(js)
})
exports.getLibraryPlaylists = (ownerNickname, callback) => getLibrary(ownerNickname, 'playlists', (js) => {
  callback(js)
})
exports.getLibraryTracks = (ownerNickname, callback) => getLibrary(ownerNickname, 'tracks', (js) => {
  callback(js)
})
exports.getLibraryArtists = (ownerNickname, callback) => getLibrary(ownerNickname, 'artists', (js) => {
  callback(js)
})

exports.getAlbumCoverUri = getAlbumCoverUri
exports.getAlbum = getAlbum
exports.getTrack = getTrack
exports.getArtist = getArtist
exports.getFeed = getFeed
exports.downloadTrack = downloadTrack
exports.getLibrary = getLibrary
