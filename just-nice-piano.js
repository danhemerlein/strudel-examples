setcpm(120/4)

let bassLo = note("g#1*2 ~*3 g#1@3 d#2 ~ g#1")
  .s("sine")

let kick1 = note("c2(4, 16)")
  .s("bd:4")
  .bank("RolandTR808")

let clicks =
  note("~ c2")
  .s("rim:10")
  .bank("RolandTR909, DMX")
  .decay(.1)
  .every(4, x => x.delay(.4).delaytime(.125/2).delayfb(.45))
  .distort(2)

let hats2 = note("35(8,16,4)")
  .s("<hh:20 oh:10>*8")
  .bank("RolandTR909")
  .gain(.5)
  .off(1/14,
       pickF(
         // "0",
         "0 1 [1 0] 1 0",
         [
           hush,
           // x => x.s("hh:15 cp:<6 8>*8")
           x => x.s("hh:15 ~:<6 8>*8")
         ]
       )
      )
  .cut(1)

let syn = chord("~ ~ A#madd9!2 ~ <Fm ~> <~ G#sus> D#madd9")
  .palindrome()
  .voicing()
  .s("saw")
  .hpf(sine.range(300, 3000).fast(3/2))
  .bpf(sine.range(300, 3000).fast(1/3))
  .adsr("0:.125:0:.25")
  .sub(note(14))
  .phaser(3)
  .jux(late(1/16))
  .jux(late(3/16))
  .delay(1)
  .room(2)
  .lpf(1250)
  .ply("1 0 [1 2] 0 1")

let piano = chord("<[~ ~ ~ Fm ~ ~ ~ A#madd9] ~ ~ D#m>").anchor("C4")
  .voicing().sub(note(2))
  .palindrome()
  .s("piano")
  .room(.8)
  .sz(5)

l1: stack(
  stack(kick1).distort(.75).postgain(.5),
  // stack(bassLo).distort(.75).postgain(.5),
  // syn,
  // clicks.room(.5).postgain(.25),
  // hats2.postgain(.75).decay(.1),
  piano
)
  .crush(10)//.punchcard()