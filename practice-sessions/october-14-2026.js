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

_$: s("fdarkkick:4!4").gain(1)

$: s("fdarkkick:4!16?").degradeBy(slider(0.434,0,1))
  .ribbon(40,2).pg(1.5)
$: s("- fhh:6").fast(4).clip(.5).speed(1.25).gain(1)
$: s("- frim").fast(2).gain(1)
$: n(run(8)).s("fhang").chorus(.1).clip(.4).crush(7).delay(.5).room(.24)
_$: n(run(16)).s("fhit").clip(".4!3 .96".slow(4)).crush(6).delay(.5).room(.24)
$: s("- - fstab:2 -").slow(2).room(0.2).sometimes(x=>x.ply("2|3|4"))
_$: s("- - crow -").slow(2).room(0.6).delay(.4).room(2)

$: n(run(8)).s("fbleep").chorus(.4).clip(".4!3 .96".slow(4))
  .delay(.4).speed(.7).dec(.1).cutoff(3000).pg(1.1)

$: note("g1 d1").slow(16)
    .s("supersaw")
    .glide(.15)
    .distort("2.2:.3")
    .cutoff(500)
    .lpq(2).lpq(12).pg(1.25)

_$: note("b3 f#3 e4")
  .seg("16 4 8 4")
  .mask("1 1 1 1 0 1 1 0 1 0 0 1".fast("8"))
  .s("wt_digital_curses")
  .wtphaserand("0 1 3 10")
  .wtdepth(rand.mul("4"))
  .always(x => x.unison(8).detune("14").lfo({s:0.4,da:100}))
  // .wtsync(irand(8).mul(2).rib(12,1))
  // .wtshape("0 1 2 5 4 6")
  // .sometimes(x => x.rev())
  .penv("100|0").pdec("0.1")

_$: s("sine,wt_digital_echoes")
    .n("<3>"
       .add("<0 -3 -2 -3>")
       .add("[0, 2, 4, 6]"))
    .slow(2)
    .scale("d:major")
    .transpose(12)
    .attack(0.1)
    .decay(0.4)
    .sustain(0.7)
    .release(0.2)
    .vib("0.5:0.05")
    .pg(.6)


_$: note("5 11 12")
  .seg("16 4 8 4")
  .oct(1)
  .mask("1 1 1 1 0 1 1 0 1 0 0 1".fast("2 1 4"))
.s("wt_digital_bad_day")
  .wtphaserand("0 1 3 10")
  .wtdepth(rand.mul("4"))
  .someCycles(x => x.unison(8).detune("14").lfo({s:0.4,da:100}))
  .wtsync(irand(8).mul(2).rib(12,1))
  .wtshape("0 1 2")
  .sometimes(x => x.rev())
.wtskew(rand).FX(
  dist("1.9:1:soft")
  ,stretch(0.1)
  ,dist("0.2:0.6:chebyshev")
)
  .penv("100|0").pdec("0.1")
  .o(2)


all(x => x.compressor("-20:20:10:.002:.02").pg(.7)
  // .lpf(1000).hpf(500).room(1).rsize(1).gain(.3)
  ._scope())