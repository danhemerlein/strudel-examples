setCpm(135/4)
let drums_energy = slider(2155,0,5000)
const energy = slider(2525,0,5000)
const string_gain = slider(0.333,0,1)
drums_energy = drums_energy.mul(4)
const main_gain = 0.7

_$: s("bd!4").lpf(drums_energy)
_$: s("[~ oh:2]!4").gain(.5).lpf(drums_energy)
_$: s("hh:2!8").gain(.5).lpf(drums_energy)
_$: s("[~ sd:3]!2").room("{<.1 .15>}%2").lpf(drums_energy).gain(0.4)
_$: s("white!16").decay(sine.fast(8).range(0.01, 0.1)).gain(.4).room(0.5).late("[.004 .006]*2")
     .velocity("[1 .8]*4")
     .sometimesBy(0.1, x=>x.ply("2"))
     .lpf(drums_energy.mul(3))

_$: note("B4").s("gm_synth_strings_2").gain(string_gain)

$: note("{0 ~ ~ 0 ~ ~ 0 ~ 0 ~ 0 ~ ~ 0 ~ ~}%16"
  .add("<[0,4] [2,6] [-2,2] [-2,2]>")
  .scale("G#2:minor"))
  .s("piano")
  .adsr("0.1:1:1:1")
  .gain(1.2)
  .room(0.3)
  .gain(main_gain)
  .cutoff(energy)._punchcard()

