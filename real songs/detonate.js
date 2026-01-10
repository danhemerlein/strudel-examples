// detonate

samples('github:danhemerlein/samples')

setCps(117.1/60/4)

_$: s("bd _ _ [~ bd] _ _ _ _").fast(2).bank("rhodespolaris").crush(5).duckorbit(2).duckattack(0.1)
$: s("bd!16?")
  .bank("rhodespolaris").degradeBy(slider(0.602,0,1))
  .ribbon(40,2)
  //.n(irand(5).ribbon(200,2))
  .n(4)
  // .crush(5)
  // .dist(0.2)
  .duckorbit(2).duckattack(0.1)

_$: s("[~ cp ~ cp]").fast(2).bank("emudrumulator").decay(0.1)
_$: s("[~ sh ~ sh]").fast(2).bank("alesissr16").decay(0.1).sometimesBy(.1, x=>x.ply(2))
$: s("[~ oh ~ oh]").fast(2).bank("dr550").decay(0.1).sometimesBy(.1, x=>x.ply(2)).speed(1.1).room(.4)

_$: s("perc:1!16")
  .bank("ace")
  .n(irand(7).ribbon(200,2))
  .decay(.02)
  .sometimesBy(.1, x => x.ply("2 | 4"))
  .sometimesBy(.9, x => x.speed("2 | 4"))
  .degradeBy(slider(0.107,0,1))
  .ribbon(90,4)
  ._punchcard()



//  const p = "f#4 A4 D5 ".repeat(5) + "b4 " + "g4 A4 D5 ".repeat(5) + "b4"

$: timeCat([15, note("f#4 A4 D5").fast(5)], [1, note("b4")],
           [15, note("g4 A4 D5").fast(5)], [1, note("b4")],
           [15, note("a4 c#5 D5").fast(5)], [1, note("e5")],
           [15, note("a4 c#5 D5").fast(5)], [1, note("f#5")]
          )
  .slow(4)
  .sound("square, saw")
  .attack(0.01)
  .crush(5)
  .dist(0.2)
  .orbit(2)
  .decay(sine.range(.1, 1).fast(4))
  .release(.1)
  .delay(0.25)
  // .room("[0.6|1]".fast(2))
  .crush(perlin.range(6, 7).slow(6))
  .late(perlin.range(0.01, 0.03))
  .lpf(500)
  .gain(0.3)._punchcard()

_$: note("d2 g2 a2 _")
  .s("sine")
  .sometimesBy(0.05, x=>x.seg(64))
  .orbit(2)
  .distort("0.75:1")
  .lpf(2500)
  .slow(4)

_$: s("detonate").slow(8)
  .slice(8, `<0 2 0 4 0 6 0 0>`)
  .gain(3)

_$: s("detonate:1").slow(8)
  .slice(8, `<0 1 2 3 4 5 6 7>`)
  .orbit(2)
  .gain(1.5)

_$: s("detonate:2").slow(8)
  .slice(8, `<0 1 2 3 4 5 6 7>`)
  .orbit(2)
  .gain(1.5)

