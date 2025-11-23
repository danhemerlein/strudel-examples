
setCps(130/60/4)
samples('github:danhemerlein/samples')
samples('bubo:fox')
const synth_energy = slider(1131.5, 500,2000)

//JILLIAN
_$: s("youngandnauseous:1").slow(4).gain(4).room(0.8).rsize(2).delay(.2)
.chop(16).cut(1)
.sometimesBy(.5, ply("2"))
.sometimesBy(.25, mul(speed("-1"))).ribbon("[11|7|15]", 1).hpf(200)

_$: s("youngandnauseous:4").slow(4).gain(2).room(1).rsize(1).delay(.2)
  .scrub(irand(8).div(8).seg(8).speed(2).degradeBy(0.2)
         .sometimesBy(.25, ply("2"))
         .rib("11", 2)).hpf(250)
_$: s("youngandnauseous:4").slow(4).gain(3).slice(8, "1|3|7").room(1).rsize(1).delay(0.75)

_$: s("youngandnauseous:5").slow(4).gain(4)
  .slice(8, "<0 1 2 3 4*2 5 6 [6 7]>*2").cut(1)
  .attack(.05)
  .decay(0.6).sometimesBy(1, ply("2"))

const notes_2 = [
  "{e3 b4 ~}%2",
  "{b3 f#4 ~}%2",
  "{f#3 c#3 ~}%2",
  "{c#3 g#3 ~}%2",
]

_$: s("bd:2!4").bank("KorgDDM110").gain(4).duckorbit(2).duckattack(0.1)
_$: s("[~ oh:2]").bank("tr808").fast(4).speed(perlin.range(0.8,1.2)).decay(0.2).room(0.2)

_$: s("hh!16").bank("tr808")
  .degradeBy(0.2)
  .speed(0.8)
  .decay(0.2)
  .rib(4,1)

_$: s("white!16").decay(sine.fast(8).range(0.001, 0.08)).gain(.7).room(0.25).late("[.004 .006]*2")
     .velocity("[1 .8]*4")
     .sometimesBy(0.15, x=>x.ply("2"))

_$: s("<[~ cp]!7 [~ ~ cp [cp cp]]>").decay(0.05)
  .bank("KorgDDM110")
  .late(".01|0.015")
  .speed(1.2).fast(2).gain(0.7)
_$: s("white!4").orbit(2).gain(0.5).lpf(sine.range(20000, 100).slow(16))

_$: note("<e1 b1 f#1 c#1>").s("supersaw")
  .seg(8).sometimesBy(0.1, x=>x.seg(16)).orbit(2)
  .lpf(500).lpq(7).distort("2.5:.7")
  .ftype('ladder').gain(1.25)

_$: note("<d#4(3,8,0)!2 [b4(3,8,0)!1|d#4(8,16,16)]>")
  .s("supersaw")
  .fast(2)
  .gain(1.5)
  .lpf(synth_energy)
  .room(1.1).delay(1.25)

_$: note(pick("<0!8 1!8 2!8 3!8>", notes_2))
.fast(8)
.sound("square, saw")
.lpf(synth_energy)
.gain(0.6)
.sometimes(x=>x.transpose("[0, 7, 12]"))
.decay(0.5).rarely(x=>x.decay("[0.2|0.3|0.4]"))
.delay(0.25)
.room("[0.5|1]".fast(2))



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


// mood ring
$: note("[db3,ab3,db4]@3 [f4,ab4,eb4]@3 c4@2 [eb3,bb3,eb4]@3 [g4,bb4,f4]@3 g4@2").slow(2)
.sound("gm_orchestral_harp")
.lpf(synth_energy)
.decay(1)
.delay(0.5)
.gain(1)
.room("[1|1.25]".fast(2))
._punchcard()


$: s("moodring:1").slow(4).gain(2).room(1).rsize(1).delay(.6)
  .scrub(irand(8).div(8).seg(8).degradeBy(0.4).rib("3", 5)).hpf(1000)._punchcard()