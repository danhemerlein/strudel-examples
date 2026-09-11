$: s("<bd*4!3 [bd*2 bd*4]>").bank("tr909")
_$: s("bd(3,8,0)").bank("tr909")
$: s("~ sd").fast(2).bank("tr909").delay(.3)
$: s("hh*8").bank("tr909").clip(.03).sometimesBy(.1, x=>x.ply(2)).degradeBy(.1)
  .rarely(x=>x.speed(0.9))
  .rib(2,1).room(1).rsize(.5).delay(.1)
  ._punchcard()
$: s("wt_digital_echoes").chord("<Am Em>".slow(2)).voicing().transpose(-12,0).cutoff(5000)
  ._pianorol
_$: note(run(8)).chord("Am Em".slow(2)).voicing().delay(0.4).lpf(6000).lpenv(8).lpq(8).s("supersaw")._pianoroll()


_$: n("0!4 0!2 [~ 2] [2 _] 1!4 1!2 [~ -1] [-1 _]").slow(4).scale("c2:major").s("supersaw, sine")
$: n("[~ ~ 6 4]!7 [~ ~ 6 5] [~ ~ 6 5]!7 [~ ~ 6 4]")
  .slow(4).scale("C:major").s("wt_digital_echoes,wt_digital:3").lpf(4000)
  .attack(.03).delay(0.5)
  .room(0.7).orbit(2)
  ._pianoroll({labels: true})