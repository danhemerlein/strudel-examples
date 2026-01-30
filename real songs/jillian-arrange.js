setCps(130/60/4)

samples('github:danhemerlein/samples')
samples('github:mmmgarlic/randumsample')
samples('github:bindbindbind/miscsamples/main/glitch_with_friends')

const synth_energy = slider(3020, 500, 5000)
const bass_energy = slider(271.33, 50, 1000)
const drums_energy = slider(1552.9, 100, 3000)
const chop_energy = mul(synth_energy, 1.25)

// code by switch angel
register('sf', (cycles,x) => {
  const segments = 16;
  cycles = reify(cycles)
  return x.scrub(saw.seg(cycles.mul(segments)).slow(cycles))
})

// code by DJ Dave
const notes_2 = [
  "{e3 b4 ~}%2",
  "{b3 f#4 ~}%2",
  "{f#3 c#3 ~}%2",
  "{c#3 g#3 ~}%2",
]

const bd = s("kick3_afterparty!4").gain(2)
  .dec(0.9).fast("1 1 1 <1 1 1 2>").duckorbit(2).duckattack(0.1).lpf(drums_energy);

const oh = s("[~ hat_drugs]").fast(4)
  .speed(perlin.range(0.8,1.2)).decay(0.2).room(0.2).gain(4).lpf(drums_energy);

const bass = note("<e1 b1 f#1 c#1>").s("supersaw")
  .seg(8)
  .orbit(2)
  .lpf(bass_energy).lpq(7).distort("2.5:.7")
  .ftype('ladder').gain(1)

const hi = note("<d#4(3,8,0)!2 [b4(3,8,0)!1|d#4(4,16,16)|d#4(8,16,16)e4(3,16,16)]>")
  .s("supersaw")
  .fast(2)
  .transpose(12)
  .crush("6|8")
  .gain(.6)
  .room("1.1|1.25").delay(1.25)
  .lpf(synth_energy)

const synth_topline = [
  `c#4 b3 g#3 c#4 b3 g#3 c#4 b3
  c#4 b3 g#3 c#4 b3 g#3 b3 g#3`,
  `d#4 c#4 b3 d#4 c#4 b3 d#4 c#4
  d#4 c#4 b3 g#3 c#4 b3 g#3 b3`
  // "c#4 b3 g#3 c#4 b3 g#3 b3 g#3",
]

const hi_2 = note(pick("<0!4 1>", synth_topline))
  .slow(2)
  .sound("pulse,square,wt_digital:2")
  .ply(2)
  .decay(.15)
  .transpose("12")
  .decay(0.2).sometimesBy(0.5, x=>x.decay("[0.2|0.1|0.05]"))
  .delay(0.25)
  .room(1.2)
  .gain(0.4)
  .orbit(2)
  .lpf(synth_energy)

// code by DJ Dave
const main_synth = note(pick("<0!8 1!8 2!8 3!8>", notes_2))
.fast(8)
.sound("square, saw").delay(1.25)
.sometimes(x=>x.transpose("[0, 7, 12]"))
.decay(0.2).rarely(x=>x.decay("[0.2|0.3|0.4]"))
.delay(0.25)
.room(1.8)
.gain(0.4)
.lpf(synth_energy)

const chop = s("youngandnauseous:1").slow(4).gain(1.15).room(2.5).rsize(.5).delay(.2)
.chop(16).cut(1)
.sometimesBy(.5, ply("2"))
.sometimesBy(.25, mul(speed("-1"))).ribbon("[11|7|15]", 1).hpf(800)

const intro = s("youngandnauseous:4").slow(4).gain(2).room(1).rsize(1).delay(.2).lpf(chop_energy)
  .scrub(irand(8).div(8).seg(8).speed(2).degradeBy(0.2)
         .sometimesBy(.25, ply("2"))
         .rib("11", 2)).sf("2")

let clicks = s("white").dec(0.01).seg(8).delay(1)
  .dt(time.mul(0.002).mod(1))
  .lfo({da:"<0 0.02 0.08 1>"})
  .dfb("<0.9 0.9 0.2 0>").diode(time.mod(1)).fast("<1 1 [2 2 8 16] 1>").fast(4).gain(.6)

const riser = s("gwf_im:24").speed(-3.7).postgain(1.9).gain(.7);
const impact = s("impact_femmebot").slow(16).postgain(8).gain(.5).room(2).rsize(2).delay(2.5)
.speed("1 2 -1 1".mul(4)).dec(0.1)

const bd_oh = stack(bd, oh)
const mastering = register('master', (pat) => pat.bus(1).dry(0))

$: arrange(
  // [4, stack(bd_oh)],
  // [4, stack(bd_oh, hi)],
  // [4, stack(bd_oh, intro, hi)],
  // [8, stack(bd_oh, intro, hi, bass)],

  // [8, stack(bass, bd)], // first verse
  // [8, stack(bd, bass, hi)], // first verse

  // [8, stack(oh, bass, main_synth)], // chorus
  // [7, stack(bd_oh, bass, main_synth, hi)], // chorus

  // [1, stack(bd, riser, clicks, chop).room(1.5).rsize(2).rfade(0.5)], // transition
  // [16, stack(impact, bd_oh, bass, hi_2)], // drop
  // [8, stack(impact, bd_oh, bass, main_synth, hi_2, intro)], // drop

  // [8, stack(bd_oh, bass)], // second verse
  // [8, stack(bd, bass)], // chorus
  // [7, stack(bd, bass, hi, chop)], // chorus

  [1, stack(bd, riser, clicks, chop).room(1.5).rsize(2).rfade(0.5)], // transition
  [16, stack(impact, bd_oh, bass, hi_2)], // drop
  [16, stack(bd_oh, bass, intro, main_synth, hi)], // drop

  [32, stack(bd_oh, intro, hi, bass, main_synth)], // outro

).master()

$: s("bus:1")
  .compressor("-10:20:10:.002:.02")
  .soft("1:1").gain(0.2)._scope()