
samples('github:danhemerlein/samples')

setCps(117.1/60/4)

$: s("bd _ _ [~ bd] _ _ _ _").fast(2).bank("rhodespolaris")
_$: s("[~ cp ~ cp]").fast(2).bank("emudrumulator").decay(0.1)
_$: s("[~ sh ~ sh]").fast(2).bank("alesissr16").decay(0.1)
_$: s("[~ ~ misc ~]").fast(2).bank("rolandsystem100")


//  const p = "f#4 A4 D5 ".repeat(5) + "b4 " + "g4 A4 D5 ".repeat(5) + "b4"

$: timeCat([15, note("f#4 A4 D5").fast(5)], [1, note("b4")],
           [15, note("g4 A4 D5").fast(5)], [1, note("b4")],
           [15, note("a4 c#5 D5").fast(5)], [1, note("e5")],
           [15, note("a4 c#5 D5").fast(5)], [1, note("f#5")]
          )
  .slow(4)
  .sound("square, saw")
  .attack(0.01)
  .decay(.1)
  .release(.1)
  .delay(0.25)
  .room("[0.6|1]".fast(2))
  .lpf(500)
  .gain(0.6)



_$: note("d1 g1 a1 _")
  .s("supersaw")
  .slow(4)
  .room(1.1)
