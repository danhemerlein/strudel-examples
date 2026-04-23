// detonate

samples('github:danhemerlein/samples')
samples('github:kyrsive/noe-sounds')

setCps(117.1/60/4)

$: s("kick2_afterparty _ _ [~ kick2_afterparty] _ _ _ _").fast(2).bank("noe").duckorbit(2).duckattack(0.1)
$: s("bd:4!16?")
  .bank("rhodespolaris").degradeBy(slider(0.842,0,1))
  .ribbon(40,2)
  .duckorbit(2).duckattack(0.1)

_$: s("[~ cp ~ cp]").fast(2).bank("emudrumulator").decay(0.1)
_$: s("[~ sh ~ sh]").fast(2).bank("alesissr16").decay(0.1).sometimesBy(.1, x=>x.ply(2))
_$: s("[~ oh ~ oh]").fast(2).bank("dr550").decay(0.05).sometimesBy(.1, x=>x.ply(2)).speed(1.1).room(.4)

$: s("noe_perc").euclidRot(4,8,2).slow(4).speed(3)
$: s("- - cp:12 -").bank("noe").room(.5)
_$: s("clang!16").bank("noe").n(irand(24)).degradeBy(.75).rib(2,4).hpf(500).room(1)

$: timeCat([15, note("f#4 A4 D5").fast(5)], [1, note("b4")],
           [15, note("g4 A4 D5").fast(5)], [1, note("b4")],
           [15, note("a4 c#5 D5").fast(5)], [1, note("e5")],
           [15, note("a4 c#5 D5").fast(5)], [1, note("f#5")]
          )
  .slow(4)
  .sound("sine,pulse,square")
  .attack(0.01)
  .orbit(2)
  .decay(sine.range(.1, 1).fast(4))
  .release(.1)
  .delay(0.25)
  .room("[0.6|1]".fast(2))
  .late(perlin.range(0.01, 0.03))
  .cutoff(1000).gain(0.3)._punchcard()


let bass_notes = ["<d2 g2 a2 _>"]
// const rhythms = ["x x x x x x x x"]

// $: note("d1 g1 a1 _")
//   .s("sine,supersaw")
//   .sometimesBy(0.05, x=>x.seg(8))
//   .distort("0.75:1")
//   .lpf(1000)
//   .slow(4)


$: note(pick(bass_notes, 0).sub(12))
  // .struct(pick(rhythms, 0))
  .s("sawtooth")
  // .off(1/16, add(note("12")))
  // .add(note("0,0.06"))
  .clip("1.2")
  .lpf(570)
  .hpf(100)
  .lpenv(1.5)
  .delay(0.8)
  .gain(.8)

// $: s("detonate").slow(8)
//   .slice(8, `<0 1 2 3 4 5 6 7>`)
//   .gain(.75).room(2).rsize(2).rfade(2)

_$: s("detonate").slow(4)
  .slice(8, `<0 1 2 3 4 5 6 7>`)
  .echo(2, 1/6, .3)
  .room(1.4).rsize(1.3).rfade(1.3)
  .gain(.5)
