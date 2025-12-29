samples('github:danhemerlein/samples')

setCps(158.92/60/4)

 let cc = await midin('Ableton Push 2 Live Port')
  // Track the accumulated value (0-1 range)
  let filterValue = 0.5
  let crushValue = 0.5

  WebMidi.getInputByName('Ableton Push 2 Live Port').addListener('controlchange', (e) => {
    let delta = e.rawValue < 64 ? e.rawValue : e.rawValue - 128

    if (e.controller.number === 71) {
      // Relative encoder: 1-64 = clockwise, 65-127 = counter-clockwise
      let delta = e.rawValue < 64 ? e.rawValue : e.rawValue - 128
      filterValue = Math.max(0, Math.min(1, filterValue + delta * 0.01))

    }
    if (e.controller.number === 72) {
      crushValue = Math.max(0, Math.min(1, crushValue + delta * 0.01))
    }
  })

$: s("party-4-u:1").slow(8)
  // .chop(64).cut(1).loopAt(8)
  // .slice(16, "12 [12!8|13|110]").cut(1)
  .gain(1.5).room(1)

$: s("bd - - [bd bd] - bd bd bd").slow(2).bank("RolandTR909").room(0.7)
$: s(`- - rolandtr626_cp -
     [- rolandtr626_cp] - rolandtr626_cp -
     - [- - - rolandtr626_cp] rolandtr626_cp -
     [- rolandtr626_cp] - rolandtr626_cp [rolandtr626_cp rolandtr626_cp - rolandtr626_cp]
     `)
  .slow(4).crush(6)
$: s("hh*16").degradeBy(slider(0.325,0,1)).bank("RolandTR909").gain("0.25");

const topline_pattern = [
  `db5 f4 Gb4 db5 f4 Gb4 db5 f4`,
  `Gb4 db5 f4 Gb4 db5 f4 Gb4 db5`,
  `eb5 gb4 db5 eb5 gb4 db5 eb5 gb4`,
  `db5 eb5 gb4 db5 f5 ab4 db5 f5`,
]

$: note(pick("<0 1 2 3>", topline_pattern))
  .s("gm_fx_crystal")
  .s("piano")
  .decay(ref(() => filterValue).range(0.1, 1))
  .crush(ref(() => crushValue).range(3, 16))
  .delay(0.25)
  .room(1)
  .rsize(2)
  .sometimesBy(0.25, x=>x.ply("2|3"))
  .sometimesBy(0.25, x=>x.transpose("-12,12"))

$: note("<gb1@2 ab1@2 bb1@2 ab1@2>").s("supersaw")
  .seg(8).sometimesBy(0.1, x=>x.seg(16))
  .sometimesBy(0.15, x=>x.transpose("12"))
  .lpf(1000)
  .distort("3:.7")
  .gain(.3)