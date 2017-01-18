function hash (a) {
  function b (a, b) {
    return a << b | a >>> 32 - b
  }
  function c (a, b) {
    var c, d, e, f, g
    e = 2147483648 & a
    f = 2147483648 & b
    c = 1073741824 & a
    d = 1073741824 & b
    g = (1073741823 & a) + (1073741823 & b)
    return c & d ? 2147483648 ^ g ^ e ^ f : c | d ? 1073741824 & g ? 3221225472 ^ g ^ e ^ f : 1073741824 ^ g ^ e ^ f : g ^ e ^ f
  }
  function d (a, b, c) {
    return a & b | ~a & c
  }
  function e (a, b, c) {
    return a & c | b & ~c
  }
  function f (a, b, c) {
    return a ^ b ^ c
  }
  function g (a, b, c) {
    return b ^ (a | ~c)
  }
  function h (a, e, f, g, h, i, j) {
    return a = c(a, c(c(d(e, f, g), h), j)),
    c(b(a, i), e)
  }
  function i (a, d, f, g, h, i, j) {
    return a = c(a, c(c(e(d, f, g), h), j)),
    c(b(a, i), d)
  }
  function j (a, d, e, g, h, i, j) {
    return a = c(a, c(c(f(d, e, g), h), j)),
    c(b(a, i), d)
  }
  function k (a, d, e, f, h, i, j) {
    return a = c(a, c(c(g(d, e, f), h), j)),
    c(b(a, i), d)
  }
  function l (a) {
    for (var b, c = a.length, d = c + 8, e = (d - d % 64) / 64, f = 16 * (e + 1), g = Array(f - 1), h = 0, i = 0; c > i; ) b = (i - i % 4) / 4,
    h = i % 4 * 8,
    g[b] = g[b] | a.charCodeAt(i) << h,
    i++;
    return b = (i - i % 4) / 4,
    h = i % 4 * 8,
    g[b] = g[b] | 128 << h,
    g[f - 2] = c << 3,
    g[f - 1] = c >>> 29,
    g
  }
  function m (a) {
    var b,
    c,
    d = '',
    e = '';
    for (c = 0; 3 >= c; c++) b = a >>> 8 * c & 255,
    e = '0' + b.toString(16),
    d += e.substr(e.length - 2, 2);
    return d
  }
  function n (a) {
    a = x(88) + x(39523855 / 556674) + x(47450778 / 578668) + x(82156899 / 760712) + x(5026300 / 76156) + x(26011178 / 298979) + x(28319886 / 496840) + x(23477867 / 335398) + x(21650560 / 246029) + x(22521465 / 208532) + x(16067393 / 159083) + x(94458862 / 882793) + x(67654429 / 656839) + x(98.000015474072) + x(11508494 / 143856) + x(30221073 / 265097) + x(18712908 / 228206) + x(21423113 / 297543) + x(65168784 / 556998) + x(48924535 / 589452) + x(61018985 / 581133) + x(10644616 / 163763) + a.replace(/\r\n/g, '\n');
    for (var b = '', c = 0; c < a.length; c++) {
      var d = a.charCodeAt(c);
      128 > d ? b += x(d)  : d > 127 && 2048 > d ? (b += x(d >> 6 | 192), b += x(63 & d | 128))  : (b += x(d >> 12 | 224), b += x(d >> 6 & 63 | 128), b += x(63 & d | 128))
    }
    return b
  }
  var o,
  p,
  q,
  r,
  s,
  t,
  u,
  v,
  w,
  x = String.fromCharCode,
  y = Array(),
  z = 7,
  A = 12,
  B = 17,
  C = 22,
  D = 5,
  E = 9,
  F = 14,
  G = 20,
  H = 4,
  I = 11,
  J = 16,
  K = 23,
  L = 6,
  M = 10,
  N = 15,
  O = 21;
  for (a = n(a), y = l(a), t = 1732584193, u = 4023233417, v = 2562383102, w = 271733878, o = 0; o < y.length; o += 16) p = t,
  q = u,
  r = v,
  s = w,
  t = h(t, u, v, w, y[o + 0], z, 3614090360),
  w = h(w, t, u, v, y[o + 1], A, 3905402710),
  v = h(v, w, t, u, y[o + 2], B, 606105819),
  u = h(u, v, w, t, y[o + 3], C, 3250441966),
  t = h(t, u, v, w, y[o + 4], z, 4118548399),
  w = h(w, t, u, v, y[o + 5], A, 1200080426),
  v = h(v, w, t, u, y[o + 6], B, 2821735955),
  u = h(u, v, w, t, y[o + 7], C, 4249261313),
  t = h(t, u, v, w, y[o + 8], z, 1770035416),
  w = h(w, t, u, v, y[o + 9], A, 2336552879),
  v = h(v, w, t, u, y[o + 10], B, 4294925233),
  u = h(u, v, w, t, y[o + 11], C, 2304563134),
  t = h(t, u, v, w, y[o + 12], z, 1804603682),
  w = h(w, t, u, v, y[o + 13], A, 4254626195),
  v = h(v, w, t, u, y[o + 14], B, 2792965006),
  u = h(u, v, w, t, y[o + 15], C, 1236535329),
  t = i(t, u, v, w, y[o + 1], D, 4129170786),
  w = i(w, t, u, v, y[o + 6], E, 3225465664),
  v = i(v, w, t, u, y[o + 11], F, 643717713),
  u = i(u, v, w, t, y[o + 0], G, 3921069994),
  t = i(t, u, v, w, y[o + 5], D, 3593408605),
  w = i(w, t, u, v, y[o + 10], E, 38016083),
  v = i(v, w, t, u, y[o + 15], F, 3634488961),
  u = i(u, v, w, t, y[o + 4], G, 3889429448),
  t = i(t, u, v, w, y[o + 9], D, 568446438),
  w = i(w, t, u, v, y[o + 14], E, 3275163606),
  v = i(v, w, t, u, y[o + 3], F, 4107603335),
  u = i(u, v, w, t, y[o + 8], G, 1163531501),
  t = i(t, u, v, w, y[o + 13], D, 2850285829),
  w = i(w, t, u, v, y[o + 2], E, 4243563512),
  v = i(v, w, t, u, y[o + 7], F, 1735328473),
  u = i(u, v, w, t, y[o + 12], G, 2368359562),
  t = j(t, u, v, w, y[o + 5], H, 4294588738),
  w = j(w, t, u, v, y[o + 8], I, 2272392833),
  v = j(v, w, t, u, y[o + 11], J, 1839030562),
  u = j(u, v, w, t, y[o + 14], K, 4259657740),
  t = j(t, u, v, w, y[o + 1], H, 2763975236),
  w = j(w, t, u, v, y[o + 4], I, 1272893353),
  v = j(v, w, t, u, y[o + 7], J, 4139469664),
  u = j(u, v, w, t, y[o + 10], K, 3200236656),
  t = j(t, u, v, w, y[o + 13], H, 681279174),
  w = j(w, t, u, v, y[o + 0], I, 3936430074),
  v = j(v, w, t, u, y[o + 3], J, 3572445317),
  u = j(u, v, w, t, y[o + 6], K, 76029189),
  t = j(t, u, v, w, y[o + 9], H, 3654602809),
  w = j(w, t, u, v, y[o + 12], I, 3873151461),
  v = j(v, w, t, u, y[o + 15], J, 530742520),
  u = j(u, v, w, t, y[o + 2], K, 3299628645),
  t = k(t, u, v, w, y[o + 0], L, 4096336452),
  w = k(w, t, u, v, y[o + 7], M, 1126891415),
  v = k(v, w, t, u, y[o + 14], N, 2878612391),
  u = k(u, v, w, t, y[o + 5], O, 4237533241),
  t = k(t, u, v, w, y[o + 12], L, 1700485571),
  w = k(w, t, u, v, y[o + 3], M, 2399980690),
  v = k(v, w, t, u, y[o + 10], N, 4293915773),
  u = k(u, v, w, t, y[o + 1], O, 2240044497),
  t = k(t, u, v, w, y[o + 8], L, 1873313359),
  w = k(w, t, u, v, y[o + 15], M, 4264355552),
  v = k(v, w, t, u, y[o + 6], N, 2734768916),
  u = k(u, v, w, t, y[o + 13], O, 1309151649),
  t = k(t, u, v, w, y[o + 4], L, 4149444226),
  w = k(w, t, u, v, y[o + 11], M, 3174756917),
  v = k(v, w, t, u, y[o + 2], N, 718787259),
  u = k(u, v, w, t, y[o + 9], O, 3951481745),
  t = c(t, p),
  u = c(u, q),
  v = c(v, r),
  w = c(w, s);
  var P = m(t) + m(u) + m(v) + m(w);
  return P.toLowerCase()
}

exports.hash = hash
