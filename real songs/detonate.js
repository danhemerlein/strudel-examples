// detonate

samples('github:danhemerlein/samples')
samples('github:kyrsive/noe-sounds')
await import('https://glossing.dev/scripts.js')

setCps(117.1/60/4)

const vocalChain = (sample, cutoff = 5000, gain = 1) =>
  s(sample).slow(4)
    .slice(8, `<0 1 2 3 4 5 6 7>`)
    .delay(.25)
    .room(1.1).rsize(1.5).rfade(1.3)
    .cutoff(cutoff)
    .gain(gain);

const scrubStem = (sample, clipPattern, speedPattern, cutoffPattern, gain) =>
  s(sample).fast(4)
    .scrub(".125!3 0!3 .375@2 .625!3 .75!3 .875@2".slow(2))
    .clip(clipPattern)
    .speed(speedPattern)
    .pan(tri.fast(3))
    .room(1.5).rsize(2).rfade(2)
    .o(2)
    .cutoff(cutoffPattern)
    .gain(gain);

$: scrubStem("detonate",   .8,     "1,2",                  slider(0, 0, 2500, 100), 0.2)
$: scrubStem("detonate:1", ".8|1", "<[1,2] 1.5>".slow(2),  slider(100, 0, 5000, 100), .5)

// "{0!2 .125!2 .25!2 .375!2 .5!2 .625!2 .75!2 .875!2}/8"
$: s("detonate")
    .scrub(
    "0*8"
  )
    .speed("1,1.5")
    .pan(tri.fast(3))
    .room(1.5).rsize(1.3).rfade(1.3)
    .cutoff(sine.range(.2, .4).mul(100).pow(2).slow(4))
    .cutoff(slider(0,0,5000,50))
    .gain(.15)

$: vocalChain("detonate",   slider(0, 0, 15000, 50), .35)
$: vocalChain("detonate:1", slider(0, 0, 15000, 500), .5)
$: vocalChain("detonate:2", slider(0, 0, 15000, 50), .35)
$: vocalChain("detonate:3", slider(0, 0, 15000, 50), .35)

_$: stack(
    s("bd:5 bd:5 ~ ~ ~ ~ ~ bd:5 ~ ~ ~ ~ ~ ~ ~ ~").room(.2).duckorbit(2).duckattack(.1),
    s("~ sd:3 ~ sd:3").room(.1),
    // s("~*3 sd:9").slow(4).speed(-1).room(.5),
    s("~ ~ ~ perc perc:5 ~ perc:1 ~ ~ perc:13 perc:15 ~ ~ ~ [perc:27|perc:29] ~").degradeBy(0).room(.35),
  ).bank("noe").gain(.25).cutoff(slider(2500,0,10000,10))

// $: sound("gm_taiko_drum:9").struct().room(.7).gain(.8)

const _note = "<3 -2, 0 -6, -2 -1, 4 2>, [2 4 8 2]/3 <[2,0,-2]/2.5 [5,7 -4]>"
const _scale = "<D:major B:minor>/4"

$: stack(
   n(_note).scale(_scale).sound("wt_digital_echoes"),
   // n(_note).scale(_scale).sound("wt_digital"),
   n(_note).scale(_scale).sound("xylophone_soft_ff:2")
).speed("-2 -1@2 1!8")
.attack("0.1 0.4? 0.6 0.8?")
.room(3)
.rsize(2)
.rfade(2)
.cutoff(slider(0,0,15000,100))
.gain(.25)

const bass_notes = ["<[b2 e2]*2 [g3 c#2]*2>", "<d2 g2 a2 _>"]
const bass_slow  = [4, 1];
const bass_gain = [1.5, 1.5];
const bass_part = "1";

_$:  note(pick(bass_notes, bass_part).sub(12))
    .s("sine")
    .slow(pick(bass_slow, bass_part))
    .distort("2.2:.3")
    .lpenv(slider(4,0,8,.25))
    .gain(pick(bass_gain, bass_part))
    .cutoff(slider(7350,0,15000,50))
    .lpq(2).lpq(12).o(2)

const _chords = `[f#4,A4,D5,b4] [g4,A4,D5,b4] [a4,c#5,D5,e5] [a4,c#5,d5,f#5]
[f#4,A4,D5,b5] [g4,A4,D5,[e5|b5]] [a4,c#5,D5,f#5] [a4,c#5,d5,[e5 f#5]]`

$: note(_chords.slow(8))
  .s("wt_digital_echoes")
  .transpose(-12)
  .glide(perlin.range(.03, .09))
  .strum(perlin.range(.06, .1))
  .vib(.05)
  .phaser(.2)
  .delay(.5)
  // .room(.5).rsize(1)
  .cutoff(slider(4000,0,15000,50))
  // .hpf(500)
  .gain(.25)

$: note("[f#4,A4,D5,b4] [g4,A4,D5,b4] [a4,c#5,D5,e5] [a4,c#5,d5,f#5]".slow(4))
  .arpu("0 1 2 3 4 -1 -2 -3".fast(2))
  .s("tri")
  .late(perlin.range(0, 0.03))
  .attack("0.05")
  .delay(.7)
  .pan(tri.fast(3))
  .o(2)
  .cutoff(slider(5000,0,10000,50))
  .hpf(1000)
  .gain(.25)

$: timeCat([15, note("f#4 A4 D5").fast(5)], [1, note("b4")],
           [15, note("g4 A4 D5").fast(5)], [1, note("b4")],
           [15, note("a4 c#5 D5").fast(5)], [1, note("e5")],
           [15, note("a4 c#5 D5").fast(5)], [1, note("f#5")]
          )
  .slow(4)
  .sound("sine")
  .attack("0.05")
  .decay(sine.range(.1, .5).fast(4))
  .release(sine.range(.2, .75).slow(4))
  .delay(0.25)
  .pan(tri.slow(2))
  .room("0.5 1".slow(2))
  // .hpf(1000)
  .o(2)
  .cutoff(slider(5000,0,10000,100))
  .gain(0.25)

all(x => x
  // .glitch(rand)
  // .crush(8)
  // .hpf(500)
  ._scope())
