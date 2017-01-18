var querystring = require('querystring')
var request = require('./request')

// Possible values for 'type' field:
// albums - search only for albums
// playlists
// tracks
// artists
// all

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

exports.searchAlbums = (query, callback) => search(query, 'albums', callback)
exports.searchPlaylists = (query, callback) => search(query, 'playlists', callback)
exports.searchTracks = (query, callback) => search(query, 'tracks', callback)
exports.searchArtists = (query, callback) => search(query, 'artists', callback)
exports.searchAll = (query, callback) => search(query, 'all', callback)
