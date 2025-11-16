setCps(130/60/4)
samples('github:danhemerlein/samples')

const synth_energy = slider(1235, 500,2000)

//JILLIAN
_$: s("youngandnauseous:1").slow(4).gain(4).room(0.8).rsize(2).delay(.5)
.chop(16).cut(1)
.sometimesBy(.5, ply("2"))
.sometimesBy(.25, mul(speed("-1"))).ribbon("[11|7|15]", 1).hpf(500)._punchcard()

const notes = [
  "{e3 b4 ~}%2",
  "{b3 f#4 ~}%2",
  "{f#3 c#3 ~}%2",
  "{f#3 c#3 ~}%2",
]

const notes_2 = [
  "{e3 b4 ~}%2",
  "{b3 f#4 ~}%2",
  "{f#3 c#3 ~}%2",
  "{c#3 g#3 ~}%2",
]

$: s("bd:2!4").bank("KorgDDM110").gain(4).duckorbit(2).duckattack(0.1)
$: s("[~ oh:2]").bank("tr808").fast(4).speed(perlin.range(0.8,1.2)).decay(0.2)
$: s("hh!16").bank("tr808")
  // .degradeBy(0.2)
  .speed(0.8)
  .decay(0.2)
  .gain(1)
  .rib(4,1)
_$: s("white!16").decay(sine.fast(8).range(0.01, 0.1)).gain(.4).room(0.5).late("[.004 .006]*2")
     .velocity("[1 .8]*4")
     .sometimesBy(0.15, x=>x.ply("2"))
$: s("<[~ cp]!7 [~ ~ cp [cp cp]]>").decay(0.05)
  .bank("KorgDDM110")
  .late(".01|0.015")
  .speed(1.2).fast(2).gain(0.7)
_$: s("white!4").orbit(2).gain(0.5).lpf(sine.range(20000, 100).slow(16))._punchcard()

$: note("<e1 b1 f#1 c#1>").s("supersaw")
  .seg(8).sometimesBy(0.1, x=>x.seg(16)).orbit(2)
  .lpf(500).lpq(7).distort("2.5:.7")
  .ftype('ladder').gain(1.25)._punchcard()

$: note("<d#4(3,8,0)!2 [b4(3,8,0)!1|d#4(8,16,16)]>")
  .s("supersaw")
  .fast(2)
  .lpf(synth_energy)
  .room(1.1).delay(1.25)
  ._punchcard()

_$: note(pick("<0!8 1!8 2!8 3!8>", notes_2))
.fast(8)
.sound("square, saw")
.lpf(synth_energy)
.gain(0.5)
.sometimes(x=>x.transpose("[0, 7, 12]"))
.decay(0.5).rarely(x=>x.decay("[0.2|0.3|0.4]"))
.delay(0.25)
.room("[0.5|1]".fast(2))
._punchcard()
