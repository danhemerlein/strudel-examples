
setCps(130/60/4)
samples('github:danhemerlein/samples')
samples('bubo:fox')
const synth_energy = slider(1544, 500,5000)
const chop_energy = mul(synth_energy, 1.25)

//JILLIAN
_$: s("youngandnauseous:1").slow(4).gain(1.5).room(2.5).rsize(.5).delay(.2)
.chop(16).cut(1)
.sometimesBy(.5, ply("2"))
.sometimesBy(.25, mul(speed("-1"))).ribbon("[11|7|15]", 1).hpf(200)

$: s("youngandnauseous:4").slow(4).gain(2).room(1).rsize(1).delay(.2).lpf(chop_energy)
  .scrub(irand(8).div(8).seg(8).speed(2).degradeBy(0.2)
         .sometimesBy(.25, ply("2"))
         .rib("11", 2))

// "<0 [- 1]>@4" .slow(4)
// "0 1 2 3 4 5 6 7" .slow 16

$: s("youngandnauseous").slow(16).gain(3).slice(8, "<4 5>@4").slow(4).room(1)

const notes_2 = [
  "{e3 b4 ~}%2",
  "{b3 f#4 ~}%2",
  "{f#3 c#3 ~}%2",
  "{c#3 g#3 ~}%2",
]

$: s("bd!4").bank("r8").gain(2).duckorbit(2).duckattack(0.1)
$: s("[~ oh:2]").bank("tr808").fast(4).speed(perlin.range(0.8,1.2)).decay(0.2).room(0.2).gain(.4)
$: s("<[~ cp]!7 [~ ~ cp [cp cp]]>").decay(0.15)
  .bank("mfb512")
  .late(".01|0.015")
  .speed(1).fast(2).gain(0.8)
$: s("hh!16").bank("tr808")
  .degradeBy(0.8)
  .speed(0.8)
  .decay(0.05)
  .gain(2)
  .rib(4,1)

_$: s("white!16").decay(sine.fast(8).range(0.001, 0.08)).gain(.7).room(0.25).late("[.004 .006]*2")
     .velocity("[1 .8]*4")
     .sometimesBy(0.15, x=>x.ply("2"))

$: s("hh*16")
  .n("<0 1 2 3>")
  .gain(perlin.range(.2, .5).slow(8))
  .coarse("<1 1 2 1 4 1 8 1>")
  .hpf(9000)
  .pan(sine.range(.2, .8))

$: s("white")
  .lpf(sine.range(300, 800).slow(32))
  .hpf(sine.range(150, 400).slow(16))
  .gain(sine.range(1, 2).slow(64))
  .room(.9)
  .orbit(3)

$: note("<e1 b1 f#1 c#1>").s("supersaw")
  .seg(8).sometimesBy(0.1, x=>x.seg(16)).orbit(2)
  .lpf(500).lpq(7).distort("2.5:.7")
  .ftype('ladder').gain(1.25)

_$: note("<d#4(3,8,0)!2 [b4(3,8,0)!1|d#4(4,16,16)|d#4(8,16,16)e4(3,16,16)]>")
  .s("supersaw")
  .fast(2)
  .transpose(12)
  .gain(.5)
  .lpf(synth_energy)
  .room(1.1).delay(1.25)

$: note(pick("<0!8 1!8 2!8 3!8>", notes_2))
.fast(8)
.sound("square, saw")
// .degradeBy(0.2)
// .rib(4,4)
.lpf(synth_energy)
.gain(0.4)
.sometimes(x=>x.transpose("[0, 7, 12]"))
.decay(0.2).rarely(x=>x.decay("[0.2|0.3|0.4]"))
.delay(0.25)
.room("[0.5|0.75|1]".fast(2))._punchcard()
