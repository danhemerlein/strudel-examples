// detonate

samples('github:danhemerlein/samples')
samples('github:kyrsive/noe-sounds')

setCps(117.1/60/4)

// "{0!2 .125!2 .25!2 .375!2 .5!2 .625!2 .75!2 .875!2}/8"
$: s("detonate")
  .scrub(
    "{0*8}"
  )
  .speed("1,1.5")
  .pan(tri.fast(3))
  .room(1.4).rsize(1.3).rfade(1.3)
  .o(2)
  .cutoff(sine.range(.2, .4).mul(100).pow(2).slow(4))
  .gain(.05)

$: s("detonate").slow(4)
  .slice(8, `<0 1 2 3 4 5 6 7>`)
  .delay(.25)
  .room(2).rsize(1.5).rfade(1.3)
  .gain(.2)

let bass_notes = ["<d2 g2 a2 _>"]
const rhythms = ["x x x x x x x x"]

_$: note(pick(bass_notes, 0).sub(12))
  // .struct(pick(rhythms, 0))
   .distort("2.2:.3")
  .s("supersaw,square")
  .lpf(slider(1055,0,5000))
  .lpenv(slider(0,0,8))
  .gain(.5)
  .lpq(2).lpq(12).o(2)

$: timeCat([15, note("f#4 A4 D5").fast(5)], [1, note("b4")],
           [15, note("g4 A4 D5").fast(5)], [1, note("b4")],
           [15, note("a4 c#5 D5").fast(5)], [1, note("e5")],
           [15, note("a4 c#5 D5").fast(5)], [1, note("f#5")]
          )
  .slow(4)
  .sound("sine")
  .decay(sine.range(.1, .5).fast(4))
  .release(sine.range(.2, .75).slow(4))
  .late(perlin.range(0, 0.03))
  .delay(0.25)
  .room("0.5 1".slow(2))
  .o(2)
  .gain(0.25)
  ._punchcard()


all(x => x._scope())




