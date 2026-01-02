
// 400 coffees
setCps(125/60/4)
samples('github:danhemerlein/samples')
samples('bubo:fox')
samples('github:yaxu/clean-breaks');

$: s("fdarkkick:2!4").sometimesBy(0.01, x=>x.ply("2"))
  .gain(1.5).duckorbit(2).duckattack(0.1)._scope()
$: s("~ fohh:3").fast(4).speed(-2).decay(0.08)
  .sometimesBy(0.05, x=>x.ply("2")).gain(1.5)._scope()


_$: s("swat").fit().chop(16).cut(1)
  .sometimesBy(.5, mul(speed("0.9")))
  .gain(.75).lpf(3500)._scope()
_$: s("~ fsnare:2").fast(2).decay(0.1).gain(0.5)

// i'd like to know if i can restrict the speed backwards to only the [~ 4] parts of the extended pattern
_$: s("400-coffees").slow(8).sometimesBy(.5, x=>x.speed("-1"))
   // .slice(16, `< ~ [~ 4] ~ [~ 2]>`)
    .slice(16, `<
    ~ [~ 4] ~ [~ 2]
    [3!2] [~ 4] [5!2] ~
    [12 13] [12 13] [2 3] [~ 4]
    [5!2] [6 7] [5!2] [~ 4]
    >`)
   .hpf(1000)
   .orbit(2)
   .gain(1.5).room(1)._punchcard()

_$: s("400-coffees").slow(8)
     .slice(8, `<0 1 2 3 4 5 6 7 8>`)
   // .slice(32, `<0 ~ ~ 0 ~ ~ [0 0] ~ ~ 24 ~ ~ 24 ~ 25 [~ 25]>`).fast(4)
  // .slice(32, `<[~ 25] ~ ~ [~ 25] ~ ~ [~ 25] ~ ~ [~ 25] ~ ~ [~ 25] ~ [~ 25] [~ 25]>`).fast(4)
  .gain(1.25)._scope()
_$: s("400-coffees:1").slow(8).slice(8, `<0 1 2 3 4 5 6 7 8>`).gain(1).room(1)._scope()

$: s("wt_digital_echoes")
    .n("3"
       // <0 -3 [-2|2] -3>
       .add("<0 -3>")
       .add("[0, 2, 4, 6]"))
    .scale("d:major")
    .transpose(-12)
    .attack(0.1)
    .decay(0.4)
    .sustain(0.7)
    .release(0.2)
    .room(2)
    .hpf(500)
    .vib("0.5:0.05")
    // .lpf(20000)
    .orbit(2)
    // .lpf("<4000@2 2000@2 800@2 400@2>")
    // .gain("<1@2 0.7@2 0.4@2 0.1@2>")
    .gain(1.2)
    .slow(2)
    ._pianoroll({
      labels: 1
    })

_$: note("{3 ~ ~ 3 ~ 3 ~ ~ 5 ~ ~ 3 ~ 5 ~ 3}%16"
      .add("<0 -3 -2 -3>")
      .add("[0, 2, 4, 6]")
    .scale("d:major"))
    .s("wt_digital_echoes,gm_koto")
    // .degradeBy("<0.2@2 0.1@2>")
    .rib(16, 4)
    .attack(perlin.range(0.01,0.02).fast(2))
    .decay(0.3)
    .sustain(0.3)
    .release(0.2)
    .sometimesBy(0.1, x=>x.transpose("0,12"))
    .rib(52, 4)
    .lpf("300")
    .hpf("500")
    // .lpf("<300@2 600@2 1200@2 1000@2>")
    // .hpf("<1000@2 500@2 200@2 50@2>")
    // .lpf("2000")
    // .hpf("50")
    .delay(0.2)
    // .slow(2)
    ._pianoroll({ labels: 1 })



// "<g1:major:pentatonic d1:major:pentatonic e1:minor:pentatonic d1:major:pentatonic>"

$: n(irand(8).seg(8))
    .scale("<g1:major:pentatonic d1:major:pentatonic>")
    .s("recorder_bass_sus")
    .rib(4,4)
    .orbit(2)
    .hpf(250)
    .slow(2)
    .gain(2)
    ._pianoroll({
      labels: 1
    })



$: n("<3 0>")
    .scale("d2:major")
    // .struct("x _ _ _ _ _ _ _ _ _ x _ _ _ _ _")
    .s("sine")
    .gain(1.3)
    .slow(2)
    ._pianoroll({
      labels: 1
    })