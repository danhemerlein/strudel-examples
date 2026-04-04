setCps(130/60/4)

samples('github:danhemerlein/samples')
samples('github:mmmgarlic/randumsample')
samples('github:bindbindbind/miscsamples/main/glitch_with_friends')

const synth_energy = slider(2630, 0, 5000)
const bass_energy = slider(304, 0, 1000)
const drums_energy = slider(2058, 0, 3000)
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

const bd = s("kick3_afterparty!4").gain(4)
  .fast("1 1 1 <1 1 1 2>").duckorbit(2).duckattack(0.1).lpf(drums_energy);

const bd_double = s("kick3_afterparty!4").gain(4)
  .fast("<1@8 2@2 4@2>")
  .lpf(drums_energy);

const oh = s("[~ hat_drugs]").fast(4)
  .speed(perlin.range(0.8,1.2)).decay(0.2).room(0.2).gain(8).lpf(drums_energy);

const energy_hat = s("hat_afterparty*16").degradeBy(slider(0.36,0,1)).almostNever(x=>x.speed("0.5"))
  .jux(rev).gain("0.3");
const back_beat = s("[~ snareaccent_dreamer]").fast(2).sometimesBy(.25, x => x.ply(2))
  .sometimesBy(0.05, x=>x.speed("-1")).transpose(-5).gain(2);

const bass_verse = note("<e1 b1 f#1 f#1>").s("supersaw")
  .seg(8)
  .orbit(2)
  .lpf(bass_energy).lpq(7).distort("2.5:.7")
  .ftype('ladder').gain(1)

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
  .room("1.1|1.25").delay(1.25)
  .lpf(synth_energy)
  .gain(.4)

// code by DJ Dave
const main_synth = note(pick("<0!8 1!8 2!8 3!8>", notes_2))
  .fast(8)
  .sound("square, saw").delay(1.25)
  .sometimes(x=>x.transpose("[0, 7, 12, 24]"))
  .decay(0.1).sometimesBy(1, x=>x.decay("[0.02|0.03|0.04]"))
  .delay(0.25)
  .room(1.2)
  .gain(0.6)
  .orbit(2)
  .lpf(synth_energy)

const synth_topline = [
  `c#4 b3 g#3 c#4 b3 g#3 c#4 b3
  c#4 b3 g#3 c#4 b3 g#3 b3 g#3`,
  `d#4 c#4 b3 d#4 c#4 b3 d#4 c#4
  d#4 c#4 b3 g#3 c#4 b3 g#3 b3`,
  `c#4 b3 a#3 c#4 b3 a#3 b3 a#3
  a#3 g#3 g#3 a#3 a#3 b3 b3 c#4`,
  `c#4 b3 a#3 c#4 b3 a#3 b3 a#3
  a#3 g#3 g#3 f#3 f#3 e3 e3 d#3`
]

const hi_2 = note(pick("<0!4 1 2 1 3>", synth_topline))
  .slow(2)
  .sound("pulse,square,wt_digital:3")
  .ply(2)
  .transpose("12")
  .decay(0.1).sometimesBy(1, x=>x.decay("[0.1|0.07|0.08]"))
  .delay(0.25)
  .room(1.2)
  .gain(0.5)
  .orbit(2)
  .lpf(synth_energy)

// const chop = s("youngandnauseous:1").slow(4).gain(4)
// .delay(.2)
// .chop(16).cut(1)
// .sometimesBy(.5, ply("2"))
// .sometimesBy(.25, mul(speed("-1")))
// .ribbon("[11|7|15]", 1)
// .lpf(chop_energy)
// .hpf(500)

// const chop = s("youngandnauseous:2").slow(4).gain(4)
// .delay(.2)
// .scrub(irand(8).div(8).seg(8).degradeBy(0.2))
//   .sometimesBy(.2, ply("2"))
//   .sometimesBy(0.8, mul(speed("2")))
// .ribbon("2", 2)
// .hpf(500)
// .lpf(chop_energy)
// ._punchcard()

// const chop = s("youngandnauseous:4").slow(4).gain(2)
// .delay(.6)
// .chop(16).cut(1)
// .mul(speed("2"))
// .ribbon("[4]", 1).hpf(500)
// .lpf(chop_energy)

const intro = s("youngandnauseous:4").slow(4).gain(1.5).room(1).rsize(1).delay(.2).lpf(chop_energy)
  .scrub(irand(8).div(8).seg(8).speed(2).degradeBy(0.2)
         .sometimesBy(.25, ply("2"))
         .rib("11", 2)).sf("2")

let clicks = s("white").dec(0.01).seg(8).delay(1)
  .dt(time.mul(0.002).mod(1))
  .lfo({da:"<0 0.02 0.08 1>"})
  .dfb("<0.9 0.9 0.2 0>").diode(time.mod(1)).fast("<1 1 [2 2 8 16] 1>").fast(4).gain(.3)

const riser = s("[gwf_im:24|gwf_im:27]").speed(-3.7).postgain(1.9).gain(.2);

const impact = s("impact_femmebot").slow(8).postgain(8).gain(.2).room(2).rsize(2).delay(2.5).dec(0.1)

const bd_oh = stack(bd, oh)
const mastering = register('master', (pat) => pat.bus(1).dry(0))

$: arrange(
  [4, stack(bd_oh)],
  [4, stack(bd_oh, hi)],
  [4, stack(bd_oh, hi, intro)],
  [8, stack(bd_oh, hi, intro, bass_verse)],

  [8, stack(bass_verse)], // first verse
  [8, stack(bd, bass, hi)], // first verse

  [8, stack(bd_double, bass, main_synth)], // chorus
  [7, stack(bd_double, oh, bass, main_synth, hi)], // chorus
  [1, stack(riser, clicks).room(1.5).rsize(2).rfade(0.5)], // transition

  [8, stack(impact, bd_oh, bass, hi_2, energy_hat)], // drop
  [16, stack(impact, bd_oh, bass, hi_2, energy_hat, chop)], // drop

  [8, stack(bass, hi)], // second verse

  [8, stack(bd_double, bass, main_synth)], // chorus
  [7, stack(bd, bass, hi, back_beat, main_synth)], // chorus

  [1, stack(riser, clicks).room(1.5).rsize(2).rfade(0.5)], // transition
  [8, stack(impact, bd_oh, bass, hi_2, energy_hat, back_beat)], // drop
  [16, stack(impact, bd_double, oh, bass, hi_2, energy_hat, back_beat, intro, chop)], // outro

).master()

$: s("bus:1")
  .compressor("-10:20:10:.002:.02")
  .soft("1:1").gain(0.2)._scope()

