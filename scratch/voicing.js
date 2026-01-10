
$: setcps(170/60/4)

$: s("bd(3,8)").bank("tr909").color("white").duck(2)
  .duckatt(.5).duckdepth(.75).duckons(.01)

$: chord("<C Em G Am>/2")
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
  .lpf(slider(3790,0,10000))
  .lpf(sine.fast(slider(9.569, 1, 20))
       .mul(slider(4550, 0, 10000))
       .add(slider(1820, 0, 10000))
  )
  .lpq(10)
  .transpose(-12)
  .gain(.1)
  .decay(4)
  .release(2)
  .sound("pulse")
  .color("lightblue")
  ._pianoroll()

let rhythm = "[24 <36 44>]*4"
  .off(perlin.range(1/256, -1/256), x=>x.add(1))
  .note()
  .sometimesBy(.05, ply(2))
  .lpf(sine.range(2400, 3200).segment(7).slow(2))
  .pan(sine.range(.1, .9).slow(3))
  .s("conga:13")
  .color("beige")

let high = "-@3 [- <67>]"
  .sometimesBy("<.1 .3@2>", add(1))
  .note()
  .lpf(3000)
  .pan(sine.range(.4, .6).slow(7))
  .s("conga").n("<13@2 18 19>")
  .color("orange").gain(2)

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

$: n("<- <[0 .. 31] [31 .. 0]> - ->")
.scale("<c1 f1>/2:minor:pentatonic")
.dec(.15).room(.2).delay(.5)
.sometimesBy(1, x=>x.coarse("4"))
.postgain(.4).s("sine").fm(3)
.lpf(sine.range(1500,3000).slow(8))
.add(note(perlin.range(0,.5))).fmh(5.1)