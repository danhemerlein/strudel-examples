
$: setcps(170/60/4)

$: s("bd(3,8)").bank("tr909").duck(2).duckatt(.5).duckdepth(.75).duckons(.01)
$: s("white").att(0.2).slow(8).lpf(20000).gain(.05).delay(.2).room(1).orbit(2)

$: chord("<G D Em D>/2")
  .voicing()
  .orbit(2)
  .slow(2)
  .delay(slider(0.885,0,1))
  .delayfb(slider(0.755,0,1))
  .delaysync(4/16)
  .room(3)
  .superimpose(x=>x.transpose(-12))
  .superimpose(x=>x.transpose(12))
  .superimpose(x=>x.lpf(1000))
  .lpf(slider(6790,0,10000))
  .lpf(sine.fast(slider(13.825, 1, 20))
       .mul(slider(8570, 0, 10000))
       .add(slider(6380, 0, 10000))
  )
  .lpq(10)
  .transpose(-12)
  .attack(0.5)
  .decay(4)
  .release(2)
  .sound("sine")
  .gain(.06)
  ._pianoroll()

let rhythm = "[24 <36 44>]*4"
  .off(perlin.range(1/256, -1/256), x=>x.add(1))
  .note()
  .sometimesBy(.05, ply(2))
  .lpf(sine.range(2400, 3200).segment(7).slow(2))
  .pan(sine.range(.1, .9).slow(3))
  .speed(1.25)
  .s("conga:13")


let high = "-@3 [- <67>]"
  .sometimesBy("<.1 .3@2>", add(1))
  .note()
  .lpf(3000)
  .pan(sine.range(.4, .6).slow(7))
  .s("conga").n("<13@2 18 19>")

let chorus = "40 50@2 [32 -]".add("<0@2 2>")
    .off(perlin.range(1/256, -1/256), x=>x.add(-1))
    .off(perlin.range(-1/256, 1/256), x=>x.add(+2))
    .note()
    .lpf(sine.range(600, 1600).segment(9).slow(4))
    .pan(sine.range(.3, .7).slow(5))
    .s("conga").n("13")

$: stack(
    chorus,
    rhythm,
    high,
)
.room(perlin.range(.8, 1.2).segment(17)).roomsize(3).gain(1.5)

