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

var data = []
yapi.downloadTrack(5450573, 599671, (chunk) => data.push(chunk), () => {
  console.log('downloaded ', data.length, ' chunks')
  fs.writeFileSync('track.mp3', Buffer.concat(data))
})

yapi.getFeed((js) => console.log(js.days[0].tracksToPlay))
