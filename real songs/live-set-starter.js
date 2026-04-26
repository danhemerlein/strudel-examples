// jillian - 130
// mood ring - 94
// four hundred coffees - 125

setcpm(94/4)
samples('github:danhemerlein/samples')

const lpf = slider(500, 0, 10000)

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

_$: s("youngandnauseous:1").slow(4)
_$: s("moodring:2").slow(4)
_$: s("400-coffees:1")
  .slow(8).slice(8, "<0 ~ 2 ~ 4 ~ 6 ~>")

all(x=> x
  .crush(10)
  // .lpf(5000).hpf(500)
  ._scope())