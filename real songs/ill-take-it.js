
samples('github:danhemerlein/samples')

// I'll take it

setCps(130/60/4)

$: s("bd*4").bank("RolandTR909").duckorbit(2).duckattack(0.01)
$: s("[~ cp]").fast(2).bank("RolandTR909")
_$: s("[~ oh]").fast(4).bank("RolandTR909").decay(0.3).gain(.2)

$: n("0!4 0!2 [~ 2] [2 _] 1!4 1!2 [~ -1] [-1 _]").slow(4).scale("c2:major").s("supersaw, sine")
  ._punchcard()




$: n("[~ ~ 6 4]!7 [~ ~ 6 5] [~ ~ 6 5]!7 [~ ~ 6 4]")
  .slow(4).scale("C:major").s("wt_digital_echoes,wt_digital:3").lpf(4000)
  .attack(.03).delay(0.5).room(0.7).orbit(2)
  // .transpose(12)
  ._pianoroll({labels: true})
