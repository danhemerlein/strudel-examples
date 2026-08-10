// @title 400 coffees
// @by young and nauseous
// @tag 400 coffees

// 400 coffees
setCps(125/60/4)
samples('github:danhemerlein/samples')
samples('bubo:fox')
samples('github:yaxu/clean-breaks');
await import('https://glossing.dev/scripts.js')

$: s("fdarkkick:4!4")
  .sometimesBy(0.1, x=>x.ply("2")).rib(16,4)
  .gain(1).duckorbit(2).duckattack(0.1);

$: s("- fhh:5").fast(4)
  .sometimesBy(0.2, x=>x.ply("2"))
  .pg(.8)

$: s("swat").fit().chop(16).cut(1)
  .sometimesBy(.5, mul(speed("0.8")))
  .gain(.55).decay(.25).lpf(9000);

$: s("~ fsnare:2").fast(2).decay(0.1).gain(0.25).room(.2)
  .sometimesBy(.2, x=>x.ply(2)).rib(4,4)._punchcard()

_$: s("riffin/2").fit().chop(16).cut(1)
  .rarely(ply(2))
  .sometimesBy(.15, mul(speed("-1")))
  .gain(.5)

$bass: n(irand(10).seg(32)).scale("<g:major:pentatonic d:major e:minor:pentatonic d:major>")
  .slow(2)
  .rib(0,8)
  .distort("2.2:.3")
  .s("sawtooth, sqaure")
  // .transpose("12,24")
  .clip(.55)
  .delay(1)
  .room(1)
  // .rsize(2)
  .lpf(slider(4195,0,5000))
  .lpenv(slider(5.176,0,8))
  .lpq(4)
  .chorus(1.25)
  .pg(.75)
  .orbit(2)
  ._pianoroll({
    labels: 1
  })

// BASS
_$: n("<3 0 1 0>")
    .scale("d2:major")
    .s("sine")
    .seg(8)
    .slow(2)
    .clip(.95)
    .lpf(500)
    .pg(1)
    ._pianoroll({
      labels: 1
    })

_$: s("400-coffees").slow(8).slice(8, `<0 1 2 3 4 5 6 7>`)
  .gain(1.2)
  // .lpf(8000).hpf(500)
_$: s("400-coffees:1").slow(8).slice(8, `<0 1 2 3 4 5 6 7>`)
  .gain(1)//.lpf(1000).hpf(500)

_$: s("400-coffees:1").slow(8)
  .slice(8, `<0 ~ 2 ~ 4 ~ 6 ~>`)
  .decay(0.5)
  .delay(1.5).room(1.4).rsize(2)
  .lpf(1000).hpf(500)
  .gain(.8)

_$: n("<3>"
       .add("<0 -3 -2 -3>")
       .add("[0, 2, 4, 6]"))
.scale("d:major")
.sound("xylophone_soft_ff:2")
.attack("0.1 0.4? 0.6 0.8?")
.speed("-2 -1@2 1!8")
.slow(2)
.delay(0.2)
.fm(1)
.fmh(1)
.hpf(400)
.gain(.25)

_$: s("sine,wt_digital_echoes")
    .n("<3>"
       // <0 -3 -2 -3>
       .add("<0 -3 -2 -3>")
       .add("[0, 2, 4, 6]"))
    .slow(2)
    .scale("d:major")
    .attack(0.1)
    .decay(0.4)
    .sustain(0.7)
    .release(0.2)
    .room(2)
    .hpf(500)
    .vib("0.5:0.05")
    .orbit(2)
    .hpf(1000)


all(x => x.compressor("-20:20:10:.002:.02").pg(.7)
  // .lpf(1000).hpf(500).room(1).rsize(1).gain(.3)
  ._scope())