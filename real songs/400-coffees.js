setCps(125/60/4)
samples('github:danhemerlein/samples')
samples('bubo:fox')
samples('github:yaxu/clean-breaks');

$: s("fdarkkick:2!4").sometimesBy(0.01, x=>x.ply("2")).gain(1.5).duckorbit(2).duckattack(0.1)
$: s("~ fohh:3").fast(4).speed(-2).decay(0.1).gain(1.5)
$: s("swat").fit().chop(16).cut(1).sometimesBy(.5, mul(speed("0.9"))).gain(.75)
$: s("~ fsnare:2").fast(2).decay(0.1)

_$: s("400-coffees:1").slow(8).gain(1.75).room(1)._scope()

_$: s("400-coffees:2").slow(8).gain(1.75).room(1)._scope()
$: s("400-coffees:3").slow(8).gain(1.75).room(1)._scope()

_$: s("wt_digital_echoes")
    .n("3"
       .add("<0 -3 -2 -3>")
       .add("[0, 2, 4, 6]"))
    .scale("d:major")
    .attack(0.1)
    .decay(0.4)
    .sustain(0.7)
    .release(0.2)
    .room(2)
    .hpf(500)
    .vib("0.5:0.05")
    .lpf(4000)
    .orbit(2)
    .lpf(4000)
    // .lpf("<4000@2 2000@2 800@2 400@2>")
    // .gain("<1@2 0.7@2 0.4@2 0.1@2>")
    .slow(2)
    ._pianoroll({
      labels: 1
    })

_$: note("{3 ~ ~ 3 ~ 3 ~ ~ 5 ~ ~ 3 ~ 5 ~ 3}%16"
      .add("<0 -3 -2 -3>")
      .add("[0, 2, 4, 6]")
    .scale("d:major"))
    .s("wt_digital_echoes,gm_koto")
    // .degradeBy("<0.7@2 0.4@2 0.1@2 0@2>")
    .rib(16, 4)
    .attack(perlin.range(0.01,0.02).fast(2))
    .decay(0.6)
    .sustain(0.6)
    .release(0.4)
    .sometimesBy(0.1, x=>x.transpose("0,12"))
    .rib(52, 4)
    // .lpf("<300@2 600@2 1200@2 3000@2>")
    // .hpf("<1000@2 500@2 200@2 50@2>")
    .delay(0.2)
    // .slow(2)
    .room(1.5)
    ._pianoroll({ labels: 1 })



_$: n(irand(8).seg(8))
    .scale("<d1:major:pentatonic g1:major:pentatonic e1:minor:pentatonic g1:major:pentatonic>")
    .rib(4,4)
    .s("gm_acoustic_bass")
    // .slow(2)
    // .degradeBy("<0.15 0.13 0.15 0.2>")
    .rib(16,4)
    // .lpf(1000)
    .gain(2)
    ._pianoroll({
      labels: 1
    })
