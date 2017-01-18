var yapi = require('../yandex-music-web-api')

yapi.getAlbum(599671, (js) => {
  // console.log(js)
})

yapi.getTrack(5450573, 599671, (js) => {
  console.log(js)
})

yapi.searchAlbums('краснознамённая', (js) => {
  // console.log(js)
})
