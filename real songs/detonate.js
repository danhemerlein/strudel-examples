// detonate

samples('github:danhemerlein/samples')
samples('github:kyrsive/noe-sounds')
await import('https://glossing.dev/scripts.js')

setCps(117.1/60/4)

_$:  s("detonate").fast(4)
    .scrub(
      ".125!3 0!3 .375@2 .625!3 .75!3 .875@2".slow(2)
    )
    // .clip(.8)
    .speed("2")
    .room(1).rsize(1).rfade(1)
    // .o(2)
    .pan(tri.fast(3))
    .gain(0.2)

  // "{0!2 .125!2 .25!2 .375!2 .5!2 .625!2 .75!2 .875!2}/8"
_$: s("detonate")
    .scrub(
    "0*8"
  )
    .speed("1,1.5")
    .pan(tri.fast(3))
    .room(1.5).rsize(1.3).rfade(1.3)
    .o(2)
    // .cutoff(sine.range(.2, .4).mul(100).pow(2).slow(4))
    .gain(.1)

_$: s("detonate").slow(4)
    .slice(8, `<0 1 2 3 4 5 6 7>`)
    .delay(.25)
    .room(1.1)
    .rsize(1.5).rfade(1.3)
    .gain(.25)

_$: stack(
    s("bd:5 bd:5 ~ ~ ~ ~ ~ bd:5 ~ ~ ~ ~ ~ ~ ~ ~").room(.2).duckorbit(2).duckattack(.1),
    s("~ sd:3 ~ sd:3").room(.1),
    s("~*3 sd:9").slow(4).speed(-1).room(.5),
    s("~ ~ ~ perc perc:5 ~ perc:1 ~ ~ perc:13 perc:15 ~ ~ ~ [perc:27|perc:29] ~").degradeBy(.6).room(1)
  ).bank("noe").gain(.25)

const _note = "<3 -2, 0 -6, -2 -1, 4 2>, [2 4 8 2]/3 <[2,0,-2]/2.5 [5,7 -4]>"
const _scale = "<D:major G:major A:major D:major>/4"

_$: stack(
   n(_note).scale(_scale).sound("wt_digital_echoes"),
   n(_note).scale(_scale).sound("wt_digital"),
   n(_note).scale(_scale).sound("xylophone_soft_ff:2")
).speed("-2 -1@2 1!8")
.rarely(transpose("12"))
.rarely(transpose("-12"))
.attack("0.1 0.4? 0.6 0.8?")
.phaser(1)
.coarse(2)
.crush(8)
.fm(1)
.delay(0.5)
.room(3)
.rsize(2)
.rfade(2)
.gain(.25)
.cutoff(slider(0,0,10000,10))
.o(2)
._punchcard({labels: true})

const bass_notes = ["<d2 g2 a2 d2>", "<d2 g2 a2 _>"];
const bass_slow  = [4, 1];
const bass_part = "1";

$:  note(pick(bass_notes, bass_part).sub(12))
    .s("sine")
    .slow(pick(bass_slow, bass_part))
    .distort("2.2:.3")
    .lpf(slider(3980,0,5000))
    .lpenv(slider(4.6166,0,8))
    .gain(1.1)
    .lpq(2).lpq(12).o(2)._punchcard()

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
  .pan(tri.slow(2))
  .room("0.5 1".slow(2))
  .o(2)
  .gain(0.25)
  .cutoff(slider(2764,50,10000,1))
  ._punchcard()
all(x => x
  // .glitch(rand)
  // .lpf(1000)
  ._scope())

