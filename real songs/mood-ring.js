// MOOD RING

// setCps(94/60/4)

_$: n(run(16)).s("ftabla").early(2/4)
  .sometimes(mul(speed("3".sometimesBy(0.5, x => x.ply("3 | 1.5 | 2")))))
  .sometimesBy(.3, mul(speed("-1")))
  .speed(0.8)
  .degradeBy(.2).rib(2,4)

_$: s("[bd ~ ~ ~ ~ bd ~ ~]").bank("alesissr16").gain(2)
_$: s("[~ hh:2]").bank("alesissr16").fast(4).speed(0.5)
  .sometimesBy(.25, x=>x.ply(2))
  .rib(4,2)
  .room(0.2)
_$: s("[~ sd]").bank("compurhythm1000").fast(2)

_$: n(run(16)).s("supersaw")
  .scale("<eb1:major db1:major>")
  // .sometimesBy(.3, mul(speed("-1")))
  .gain(1.25)
  .degradeBy(.2).rib(5,4)

_$: note("{0 0 0 _ ~ ~ 0 _ }%8".add("{0 4 7 _ ~ ~ 0 _}").add("<0 1>"))
  .scale("db2:major")
  .s("supersaw")
  .adsr(0.1,0.1,0.1,0.1)
  .lpf(500).lpq(7).distort("2.5:.7")
  .ftype('ladder')
  ._pianoroll({
     labels: 1,
  })

$: note("<{~ ~ ~ [2,4,8] _ 6 _ ~ }%8> <{~ ~ ~ 6 5 _ 4 _ }%8>")
  .slow(2)
  .scale("db4:major")
  .sound("gm_pad_halo:1")
  .sometimes(x=>x.transpose("[0, 7]"))
  .adsr("1:0.1:0.1:1")
  .gain(1)
  ._pianoroll({
     labels: 1,
  })