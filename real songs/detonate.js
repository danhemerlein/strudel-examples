// detonate

samples('github:danhemerlein/samples')
samples('github:kyrsive/noe-sounds')
await import('https://glossing.dev/scripts.js')

setCps(117.1/60/4)


_$: s("detonate").fast(4)
    .scrub(
    ".125!3 0!3 .375@2 .625!3 .75!3 .875@2".slow(2)
  )
  .clip(.8)
  .speed("2")
  .room(1.4)
  .rsize(1.3)
  .rfade(1.3)
  .o(2)
  .pan(tri.fast(3))
  .gain(0.05)

// "{0!2 .125!2 .25!2 .375!2 .5!2 .625!2 .75!2 .875!2}/8"
_$: s("detonate")
  .scrub(
    "0*8"
  )
  .speed("1,1.5")
  .pan(tri.fast(3))
  .room(1.4).rsize(1.3).rfade(1.3)
  .o(2)
  .cutoff(sine.range(.2, .4).mul(100).pow(2).slow(4))
  .gain(.1)

$: s("detonate").slow(4)
  .slice(8, `<0 1 2 3 4 5 6 7>`)
  .delay(.25)
  .room(2).rsize(1.5).rfade(1.3)
  .gain(.2)

$: stack(
  s("bd:5 bd:5 ~ ~ ~ ~ ~ bd:5 ~ ~ ~ ~ ~ ~ ~ ~").room(.125).duckorbit(2).duckattack(.1),
  s("~ sd:3 ~ sd:3").room(.1),
  s("~ ~ ~ perc perc:5 ~ perc:1 ~ ~ perc:13 perc:15 ~ ~ ~ perc:10 ~").room(.4)
)
  .bank("noe")
  .gain(.25)
  // .humanize(slider(0.0328, 0, 1))

const bass_notes = ["<d2 g2 a2 _>"]

$: note(pick(bass_notes, 0).sub(12))
   .distort("2.2:.3")
  .s("sine")
  .lpf(slider(3980,0,5000))
  .lpenv(slider(4.6166,0,8))
  .gain(1)
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

all(x => x
  // .glitch(rand)
  ._scope())

