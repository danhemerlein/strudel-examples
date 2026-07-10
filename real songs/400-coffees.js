// @title 400 coffees
// @by young and nauseouse
// @tag 400 coffees

// 400 coffees
setCps(125/60/4)
samples('github:danhemerlein/samples')
samples('bubo:fox')
samples('github:yaxu/clean-breaks');
await import('https://glossing.dev/scripts.js')

$: s("fdarkkick:2!4")
  .sometimesBy(0.1, x=>x.ply("2")).rib(16,4)
  .gain(1).duckorbit(2).duckattack(0.1);

_$: s("- fhh:2").fast(4).room(.5).gain(.25).sometimesBy(0.2, x=>x.ply("2"))

_$: s("swat").fit().chop(16).cut(1)
  .sometimesBy(.5, mul(speed("0.8")))
  .gain(.25).decay(.25).lpf(9000);

_$: s("~ fsnare:2").fast(2).decay(0.1).gain(0.25).room(.2)
  .sometimesBy(.2, x=>x.ply(2))


// BASS
_$: n("<3 0 1 0>")
    .scale("d2:major")
    .s("sine")
    .seg(8)
    .clip(.95)
    .lpf(500)
    .gain(1.3)
    .slow(2)
    ._pianoroll({
      labels: 1
    })

$: s("400-coffees").slow(8).slice(8, `<0 1 2 3 4 5 6 7>`).gain(1.4)//.lpf(1000).hpf(500)
_$: s("400-coffees:1").slow(8).slice(8, `<0 1 2 3 4 5 6 7>`).gain(0.8).lpf(1000).hpf(500)

_$: s("400-coffees:1").slow(8)
  .slice(8, `<0 ~ 2 ~ 4 ~ 6 ~>`)
  .decay(0.5)
  .delay(.2).room(1.4)
  .hpf(500)
  .gain(.8)

$: n("<3>"
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
.gain(.5)

$: s("sine,wt_digital_echoes")
    .n("<3>"
       // <0 -3 -2 -3>
       .add("<0 -3 -2 -3>")
       .add("[0, 2, 4, 6]"))
    .scale("d:major")
    .attack(0.1)
    .decay(0.4)
    .sustain(0.7)
    .release(0.2)
    .room(2)
    .hpf(500)
    .vib("0.5:0.05")
    .lpf(20000)
    .orbit(2)
    .gain(.4)
    .hpf(1000)
    .slow(2)

all(x => x.compressor("-20:20:10:.002:.02")
  // .crush(4)
  // .lpf(1000).hpf(500).room(1).rsize(1).gain(.3)
  ._scope())