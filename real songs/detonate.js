// detonate

samples('github:danhemerlein/samples')

setCps(117.1/60/4)

$: s("bd _ _ [~ bd] _ _ _ _").fast(2).bank("rhodespolaris").crush(5).duckorbit(2).duckattack(0.1)
_$: s("[~ cp ~ cp]").fast(2).bank("emudrumulator").decay(0.1)
$: s("[~ sh ~ sh]").fast(2).bank("alesissr16").decay(0.1)
_$: s("[~ ~ misc ~]").fast(2).bank("rolandsystem100")


//  const p = "f#4 A4 D5 ".repeat(5) + "b4 " + "g4 A4 D5 ".repeat(5) + "b4"

_$: timeCat([15, note("f#4 A4 D5").fast(5)], [1, note("b4")],
           [15, note("g4 A4 D5").fast(5)], [1, note("b4")],
           [15, note("a4 c#5 D5").fast(5)], [1, note("e5")],
           [15, note("a4 c#5 D5").fast(5)], [1, note("f#5")]
          )
  .slow(4)
  .sound("square, saw")
  .attack(0.01)
  .crush(5)
  .dist(0.2)
  .decay(.1)
  .release(.1)
  .delay(0.25)
  .room("[0.6|1]".fast(2))
  .late(perlin.range(0.01, 0.03))
  .lpf(500)
  .gain(0.3)._punchcard()

_$: note("d1 g1 a1 _")
  .s("supersaw")
  .sometimesBy(0.05, x=>x.seg(64))
  .orbit(2)
  .distort("0.75:1")
  .lpf(2500)
  .slow(4)
  .room(1.1)

_$: s("detonate").slow(8)
  .slice(8, `<0 1 2 3 4 5 6 7>`)
  .gain(1.5)

_$: s("detonate:1").slow(8)
  .slice(8, `<0 1 2 3 4 5 6 7>`)
  .orbit(2)
  .gain(1.5)

$: s("detonate:2").slow(8)
  .slice(8, `<0 1 2 3 4 5 6 7>`)
  .orbit(2)
  .gain(1.5)
