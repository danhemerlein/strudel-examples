setcpm(130/4)

// === ACID BASS with movement ===
const acidBass = note("<c1!3 [c1 g1]> <c1 eb1 f1 g1>")
  .s("sawtooth")
  .lpf(sine.range(150, 1200).slow(8))
  .lpq(sine.range(5, 15).slow(16))
  .lpenv(perlin.range(2, 8))
  .lpa(.05).lpd(.15)
  .distort("1.5:0.4")
  .gain(.75)
  .orbit(2)

// Sub layer for weight
const subBass = note("<c1!3 [c1 g1]> <c1 eb1 f1 g1>")
  .s("sine")
  .lpf(100)
  .gain(1.0)
  .orbit(1)

// Heavy kick with punch
const kick = s("bd:8*4")
  .lpf(180)
  .gain(1)
  .duckorbit("1:2")
  .duckattack(.03)
  .duckdepth(.8)

// Textured hats
const hats = s("hh*16")
  .n("<0 1 2 3>")
  .gain(perlin.range(.2, .5).slow(8))
  .coarse("<1 1 2 1 4 1 8 1>")
  .hpf(9000)
  .pan(sine.range(.2, .8))

// Industrial clap
const clap = s("~ cp ~ cp")
  .gain(.5)
  .room(.25)
  .distort(2)

// Percussive stabs
const perc = s("[~ rim]*4")
  .n("<0 1 2 1>")
  .gain("<.3 .4 .3 .5>")
  .distort(1.5)
  .delay(.2)

// Dark atmosphere
const atmo = s("white")
  .lpf(sine.range(300, 800).slow(32))
  .hpf(sine.range(150, 400).slow(16))
  .gain(sine.range(.06, .12).slow(64))
  .room(.9)
  .orbit(3)

// === SECTIONS ===
const intro = stack(kick, subBass)

const minimal = stack(kick, subBass, acidBass.gain(.4))

const build = stack(
  kick,
  subBass,
  acidBass,
  hats.gain(sine.range(0, .5).slow(8))
)

const drop = stack(kick, subBass, acidBass, hats, clap)

const fullPower = stack(kick, subBass, acidBass, hats, clap, perc, atmo)

const breakdown = stack(
  acidBass.lpf(sine.range(1200, 200).slow(4)),
  atmo,
  hats.gain(sine.range(.5, 0).slow(4))
)

// === ARRANGEMENT ===
$: arrange(
  [8, intro],
  [8, minimal],
  [8, build],
  [16, drop],
  [16, fullPower],
  [8, breakdown],
  [16, fullPower]
)._scope()