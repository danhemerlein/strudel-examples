setCpm(90/4)

$: s("{[bd bd] ~ [~ bd] [~ bd bd ~] }").n(1).bank("bossdr550")
$: s("~ sd").fast(2).bank("sakatadpm48").room(.2)
$: s("dr550_sh!16").velocity("[.8 .5]*8").late("[.002 .004]*8").room(.2).clip(.2)
$: s("{~ [~ ~ ~ sd:2] [~ ~] ~ }").bank("dr550").clip(.4)
$: s("{~ ~ oh:1 ~ }").bank("dr550").speed(.8).clip(.9)
$: s("{~ ~ [~ ht mt ~] ~}").bank("tr909,bossdr550").room(.15).postgain(.6)
$: s("<~ {~!3 [cp cp cp cp]}>").bank("bossdr550").room(.15).postgain(.4)

$: note("[g2,d3,g3] [d2,a3,d3] [a2,e3,a3]@2".slow(4)).sound("supersaw")
  .room(1).rsize(1)
  .attack(0.1)
  .lpf(7000).hpf(1000)
  .lpenv(2)
  .lpq(1.1)
  .distort("1.1:1")

all(x => x.compressor("-20:20:10:.002:.02")._scope())
