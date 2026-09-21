await import('https://glossing.dev/scripts.js')
setCpm(90/4)

const bd = s("{[bd bd] ~ [~ bd] [~ bd bd ~] }").n(1).bank("bossdr550")
const sd = s("~ sd").fast(2).bank("bossdr550").room(.2)
const sh = s("dr550_sh!16").velocity("[.8 .5]*8").late("[.002 .004]*8").room(.2).clip(.2)
const sd_2 = s("{~ [~ ~ ~ sd:2] [~ ~] ~ }").bank("dr550").clip(.4)
const oh = s("{~ ~ oh:1 ~ }").bank("dr550").speed(.8).clip(.9)
const tm = s("{~ ~ [~ ht mt ~] ~}").bank("tr909,bossdr550").room(.15).postgain(.6)
const cp = s("<~ {~!3 [cp cp cp cp]}>").bank("bossdr550").late(0.01).room(.5).crush(8).postgain(.6)

const pad = note("[g2,d3,g3] [d2,a3,d3] [a2,e3,a3 [e4 f#4]]@2".slow(4)).sound("supersaw")
  .room(1).rsize(1.4)
  .attack(0.1)
  .lpf(4000).hpf(100)
  .lpenv(2)
  .lpq(1.1)
  .glide(.1)

const layer =  note("d4@2 [e4 [e4 f#4]]@2".slow(4)).sound("gm_synth_strings_1:4")
  .transpose("0,12")
  .attack(0.1)
  .glide(.15)
  .cutoff(1000)
  .postgain(.4)

const hi = note("d5")
  .struct("x ~ x ~ ~ ~ ~ x ~ x ~ x ~ x ~ ~")
  .s("supersaw,wt_digital_echoes")
  .attack(.05)
  .clip(.8)
  .crush("6")
  .delay(.25)
  .room(1.1)
  .pan("<.5 .3 .5 .8>")
  .postgain(.7)
  .lpf(sine.range(1000,3000).slow(2))

const bass = note("<g1 b1 a1 [d2 a1]>").s("supersaw")
  .seg(8)
  .lpf(1000)
  .lpq(7).distort("2.5:.7")
  .ftype('ladder')
  .clip(.95)
  .glide(.1)
  .postgain(1.5)._pianoroll({labels: true})
const verse = stack(bd, sd, sh, sd_2, oh, tm, cp, pad, layer)
const pre = stack(hi, bd, sd, sh, sd_2, oh, tm, cp, pad, layer)
const chorus = stack(hi, bd, sd, sh, sd_2, oh, tm, cp, pad, layer, bass)

const mastering = register('master', (pat) => pat.bus(1).dry(0))

$: arrange(
  [16, verse],
  [4, pre],
  [16, chorus],
  // [4, hi]
).master()

$: s("bus:1")
  .compressor("-10:4:20:.01:.15")
  .soft("1:1").gain(0.2)._scope()