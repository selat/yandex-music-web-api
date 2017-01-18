var yapi = require('../yandex-music-web-api')
var fs = require('fs')

yapi.getAlbum(599671, (js) => {
  // console.log(js)
})

yapi.getTrack(5450573, 599671, (js) => {
  // console.log(js)
})

yapi.getArtist(519187, (js) => {
  // console.log(js)
})

yapi.searchAlbums('краснознамённая', (js) => {
  // console.log(js)
})

rawData = ''
yapi.downloadTrack(5450573, 599671, (data) => rawData += data, () => {
  console.log('downloaded!')
  fs.writeFileSync('track.mp3', rawData)
})
