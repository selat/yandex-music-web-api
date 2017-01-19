# Yandex.Music Web API (Unofficial)

##Installation

    npm install yandex-music-web-api

##Usage

```js
var api = require('../yandex-music-web-api')

var yapi = new api.YandexMusicWebApi()
// May be required if you're facing rate-limiting
yapi.setCookie('some cookie')

yapi.searchAlbums('краснознамённая дивизия', (js) => {
  console.log('The first album: ', js.items[0])
})
```

##[Documentation](https://selat.github.io/yandex-music-web-api/YandexMusicWebApi.html)
