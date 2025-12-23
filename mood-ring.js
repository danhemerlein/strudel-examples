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