// @title 400 coffees
// @by young and nauseous
// @tag 400 coffees

// 400 coffees
setCps(125/60/4)
samples('github:danhemerlein/samples')
samples('bubo:fox')
samples('github:yaxu/clean-breaks');
await import('https://glossing.dev/scripts.js')
samples({
 wt_mecha: '_gabor.wav'
 }, 'https://raw.githubusercontent.com/kyrsive/some-wavetables/main/');

$: s("fdarkkick:4!4").gain(2).duckorbit(2).duckattack(.25)
$: s("- fhh:5".fast(4)).gain(1.1).late(0.001).pg(.7).room(.1)
_$: s("- frim:3".fast(2)).gain(1.1).late(0.002).room("<.25!3 [.25 .9]>").roomsize(2)

_$: n(run(16)).s("fpercus|fjungle").early(2/4)
  .sometimes(mul(speed("3".sometimesBy(0.5, x => x.ply("3 | 1.5 | 2")))))
  .sometimesBy(.3, mul(speed("-1")))
  .late(0.006)
  .clip(.6)
  .speed(1.4)
  .degradeBy(.4).rib(2,4)

$: chord("GM7 DM7 Em7 DM7".slow(8)).voicing().s("sine")
  .glide(.1).vib(0.01).pg(.4).orbit(2).cutoff(800)

_$: s("- - fyeah:3 -").slow(4).room(0.2).delay(.5).pg(.5)
_$: s("- - crow -").slow(4).room(2)
_$: s("- - - fikea").slow(4).room(0.5).delay(.5).pg(.8)

_$: s("swat").fit().gain(.25).o(2)

$: s("[useme]/2").fit().chop(16).cut(1)
  .lastOf(4, x => x
    .rarely(ply(2))
    .sometimesBy(.15, mul(speed("-1")))
    .hpf(500))
  .o(2)

_$: n(irand(10).seg(16)).scale("e:minor:pentatonic").s("wt_digital_echoes")
  .rel(5)
  .vib(0.003)
  .chorus(1)
  .phaser(1)
  .tremolo(1)
  .room(1)
  .rsize(1.5)
  .glide(.4)
  .beat(2,15).slow(4)
  .delay(.5)
  .o(2)
  .cutoff(2000)

_$: s("400-coffees").slow(8).slice(8, `<1.2 4.1 6.5>`).clip(.6)
  .lpf(1000).hpf(500).room(1).rsize(1).gain(.3).delay(.4)
  .gain(1.2)

all(x => x.compressor("-20:20:10:.002:.02").pg(.7)
  // .lpf(1000).hpf(500).room(1).rsize(1).gain(.3)
  ._scope())