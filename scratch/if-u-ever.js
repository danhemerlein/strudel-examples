
$: setcps(160/60/4)

$: s("gm_applause:3(3,8)")//.duck(2).duckatt(.5).duckdepth(.75).duckons(.01)
$: s("bd!4").bank("tr909").duck(2).duckatt(.5).duckdepth(.75).duckons(.01)//.slow(2)

$: note("<g3 f#3 b3 [g3 a3 b3 e4]>").struct(`x - - x - - x - - x - - x - - x
                                       - - x - - x - - x - - x - - x -`).diode("1.3:.5")

  .s("pulse,gm_electric_guitar_muted")
  .release(0.2).attack(0.03).decay(.1).lpf(1000).transpose(12).slow(4).delay(.5)

$: note("<G2 D2 E2 D2>")
  .struct(`x - - x - - x - - x - - x - - x`)
  .slow(2)
  .sound("gm_percussive_organ:1,sine")
  .release(.25)
  .dist("1.8:.5")
  .cutoff(100)
  // .room(1.2)
  ._pianoroll()




let up = "[24 <36 44>]*4"
  .off(perlin.range(1/256, -1/256), x=>x.add(1))
  .note()
  .sometimesBy(.05, ply(2))
  .lpf(sine.range(2400, 3200).segment(7).slow(2))
  .pan(sine.range(.1, .9).slow(3))
  .speed(1.25)
  .s("conga:13")




$: stack(
    // up,
)
.room(perlin.range(.8, 1.2).segment(17)).roomsize(3).gain(1.5)

