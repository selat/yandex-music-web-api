var url = require('url')
var querystring = require('querystring')
var https = require('https')
var hash = require('./yandexhash')

function YandexMusicWebApi () {
  this.headers = {
    'X-Retpath-Y': 'https%3A%2F%2Fmusic.yandex.ru%2F',
    'Cookie': ''
  }
}

YandexMusicWebApi.prototype.setCookie = function (cookie) {
  this.headers.Cookie = cookie
}

YandexMusicWebApi.prototype.getBlob = function (hostname, path, partialCallback, completeCallback) {
  var options = {
    hostname: hostname,
    path: path,
    headers: this.headers
  }
  https.get(options, (res) => {
    res.on('data', partialCallback)
    res.on('end', completeCallback)
  })
}

YandexMusicWebApi.prototype.get = function (hostname, path, callback) {
  var options = {
    hostname: hostname,
    path: path,
    headers: this.headers
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

YandexMusicWebApi.prototype.getJson = function (hostname, path, callback) {
  this.get(hostname, path, (data) => {
    callback(JSON.parse(data))
  })
}

YandexMusicWebApi.prototype.downloadMedia = function (data, trackId, partialCallback, completeCallback) {
  var hasht = hash.hash(data['path'].substring(1) + data['s'])
  var path = '/get-mp3/' + hasht + '/' + data['ts'] + data['path'] + '?track-id=' + trackId
  this.getBlob(data['host'], path, partialCallback, completeCallback)
}

YandexMusicWebApi.prototype.fetchMedia = function (srcUrl, trackId, partialCallback, completeCallback) {
  var query = querystring.stringify({
    format: 'json'
  })
  this.getJson(srcUrl.hostname, srcUrl.path + '&' + query, (js) => {
    this.downloadMedia(js, trackId, partialCallback, completeCallback)
  })
}

YandexMusicWebApi.prototype.downloadTrack = function (trackId, albumId, partialCallback, completeCallback) {
  var path = '/api/v2.1/handlers/track/' + trackId + ':' + albumId +
  '/web-feed-promotion-playlist-saved/download/m?hq=0'
  this.getJson('music.yandex.ru', path, (js) => {
    this.fetchMedia(url.parse(js['src']), trackId, partialCallback, completeCallback)
  })
}

YandexMusicWebApi.prototype.getAlbum = function (albumId, callback) {
  var query = querystring.stringify({
    album: albumId
  })
  this.getJson('music.yandex.ru', '/handlers/album.jsx?' + query, callback)
}

YandexMusicWebApi.prototype.getTrack = function (trackId, albumId, callback) {
  var query = querystring.stringify({
    track: trackId + ':' + albumId
  })
  this.getJson('music.yandex.ru', '/handlers/track.jsx?' + query, callback)
}

YandexMusicWebApi.prototype.getArtist = function (artistId, callback) {
  var query = querystring.stringify({
    artist: artistId
  })
  this.getJson('music.yandex.ru', '/handlers/artist.jsx?' + query, callback)
}

YandexMusicWebApi.prototype.getFeed = function (callback) {
  this.getJson('music.yandex.ru', '/handlers/feed.jsx', callback)
}

YandexMusicWebApi.prototype.getLibrary = function (ownerNick, filter, callback) {
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
  this.getJson('music.yandex.ru', '/handlers/library.jsx?' + query, callback)
}

// Maximum supported size is 500x500
YandexMusicWebApi.prototype.getAlbumCoverUri = function (album, size) {
  return album.coverUri.substr(0, album.coverUri.length - 2) + size + 'x' + size
}

YandexMusicWebApi.prototype.search = function (query, searchType, callback) {
  var urlQuery = querystring.stringify({
    text: query,
    type: searchType})
  // page=pageId
  // Unknown parameters:
  // lang=ru
  // overembed=false
  // ncrnd=0.49198139212100345
  this.getJson('music.yandex.ru', '/handlers/music-search.jsx?' + urlQuery,
                  callback)
}

YandexMusicWebApi.prototype.searchAlbums = function (query, callback) {
  this.search(query, 'albums', (js) => {
    callback(js.albums)
  })
}

YandexMusicWebApi.prototype.searchPlaylists = function (query, callback) {
  this.search(query, 'playlists', (js) => {
    callback(js.playlists)
  })
}

YandexMusicWebApi.prototype.searchTracks = function (query, callback) {
  this.search(query, 'tracks', (js) => {
    callback(js.tracks)
  })
}

YandexMusicWebApi.prototype.searchArtists = function (query, callback) {
  this.search(query, 'artists', (js) => {
    callback(js.artists)
  })
}

YandexMusicWebApi.prototype.searchAll = function (query, callback) {
  this.search(query, 'all', callback)
}

YandexMusicWebApi.prototype.getUserAlbums = function (ownerNickname, callback) {
  this.getLibrary(ownerNickname, 'albums', (js) => {
    callback(js)
  })
}

YandexMusicWebApi.prototype.getUserPlaylists = function (ownerNickname, callback) {
  this.getLibrary(ownerNickname, 'playlists', (js) => {
    callback(js)
  })
}

YandexMusicWebApi.prototype.getUserTracks = function (ownerNickname, callback) {
  this.getLibrary(ownerNickname, 'tracks', (js) => {
    callback(js)
  })
}

YandexMusicWebApi.prototype.getUserArtists = function (ownerNickname, callback) {
  this.getLibrary(ownerNickname, 'artists', (js) => {
    callback(js)
  })
}

exports.YandexMusicWebApi = YandexMusicWebApi
