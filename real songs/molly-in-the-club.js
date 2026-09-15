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

const mastering = register('master', (pat) => pat.bus(1).dry(0))

$: arrange(
  [4, stack(bd, sd, sh, sd_2, oh, tm, cp, pad, layer)],
).master()


$: s("bus:1")
  compressor("-10:4:20:.01:.15")
  .soft("1:1").gain(0.3)._scope()