// jillian - 130
// mood ring - 94
// four hundred coffees - 125

setcpm(130/4)
samples('github:danhemerlein/samples')

const lpf = slider(4580, 0, 10000)

const synth_topline = [
  `c#4 b3 g#3 c#4 b3 g#3 c#4 b3
  c#4 b3 g#3 c#4 b3 g#3 b3 g#3`,
  `d#4 c#4 b3 d#4 c#4 b3 d#4 c#4
  d#4 c#4 b3 g#3 c#4 b3 g#3 b3`,
  `c#4 b3 a#3 c#4 b3 a#3 b3 a#3
  a#3 g#3 g#3 a#3 a#3 b3 b3 c#4`,
  `c#4 b3 a#3 c#4 b3 a#3 b3 a#3
  a#3 g#3 g#3 f#3 f#3 e3 e3 d#3`
]

$: s("youngandnauseous:1").slow(4).chop(16).cut(1)
.sometimesBy(.5, ply("2"))
.sometimesBy(.25, mul(speed("-1")))
.ribbon("[11|7|15]", 1)
.delay(.25)
.lpf(lpf)
.hpf(1000)
.gain(3)

_$: s("moodring:2").slow(4)

all(x=> x
  .crush(10)
  // .lpf(1000).hpf(500)
    ._scope()
    // .gain(0)
  )