setCps(130/60/4)

samples('github:danhemerlein/samples')
samples('github:kyrsive/glorkglunk-wavetables')
samples('github:kyrsive/diarrhea-drumkit')
samples('github:bindbindbind/miscsamples/main/glitch_with_friends')
samples('github:mmmgarlic/randumsample')
samples('github:emptyflash/samples')

const synth_energy = slider(2291, 500, 5000)
const bass_energy = slider(586, 100, 1000)
const drums_energy = slider(1994, 500, 5000)
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

const bd = s("bd!4").bank("r8").gain(2).dec(0.9).fast("1 1 1 1").duckorbit(2).duckattack(0.1).lpf(drums_energy);
const oh = s("[~ oh:2]").bank("tr808").fast(4).speed(perlin.range(0.8,1.2)).decay(0.2).room(0.2).gain(.4).lpf(drums_energy);

const bass = note("<e1 b1 f#1 c#1>").s("supersaw")
  .seg(8)
  //.sometimesBy(0.1, x=>x.seg(16))
  .orbit(2)
  .lpf(bass_energy).lpq(7).distort("2.5:.7")
  .ftype('ladder').gain(1.25)

const hi = note("<d#4(3,8,0)!2 [b4(3,8,0)!1|d#4(4,16,16)|d#4(8,16,16)e4(3,16,16)]>")
  .s("supersaw")
  .fast(2)
  .transpose(12)
  .gain(.6)
  .lpf(synth_energy)
  .room(1.1).delay(1.25)

// code by DJ Dave
const main_synth = note(pick("<0!8 1!8 2!8 3!8>", notes_2))
.fast(8)
.sound("square, saw")
.lpf(synth_energy)
.gain(0.4)
.sometimes(x=>x.transpose("[0, 7, 12]"))
.decay(0.2).rarely(x=>x.decay("[0.2|0.3|0.4]"))
.delay(0.25)
.room("[0.5|0.75|1]".fast(2))

const chop = s("youngandnauseous:1").slow(4).gain(2.5).room(2.5).rsize(.5).delay(.2)
.chop(16).cut(1)
.sometimesBy(.5, ply("2"))
.sometimesBy(.25, mul(speed("-1"))).ribbon("[11|7|15]", 1).hpf(200)

const intro = s("youngandnauseous:4").slow(4).gain(2).room(1).rsize(1).delay(.2).lpf(chop_energy)
  .scrub(irand(8).div(8).seg(8).speed(2).degradeBy(0.2)
         .sometimesBy(.25, ply("2"))
         .rib("11", 2))//.sf("2")

const verse = s("youngandnauseous").slow(4).gain(2).slice(8, "0 1 2 3").slow(8)
const verse_2 = s("youngandnauseous").slow(4).gain(2).slice(8, "4 5 6 7").slow(8)

const hat = s("hh!16").stretch(0).lfo({da:2}).postgain("[18 16 18 16] [18 16 16 16]").gain(.1)//.transient(1);
const riser = s("gwf_im:24").speed(-3.7).postgain(1.9);
const HEY = s("impact_femmebot").slow(16).postgain(8).speed(1.5).gain(.5)
const bd_oh = stack(bd, oh)

$: arrange(
  [2, stack(bd_oh)],
  [4, stack(bd_oh, intro)],
  [4, stack(bd_oh, intro, hi)],
  [8, stack(bd_oh, intro, hi, bass)],
  [8, stack(bass, verse)],
  [8, stack(bd, bass, verse_2, hi)],
  [8, stack(bass, main_synth, chop)],
  [7, stack(main_synth, hi, chop).room(2).rsize(1).lpf(5000).hpf(400).delay(.2)],
  [1, stack(riser).room(1.5).rsize(4)],
  [32, stack(HEY, bd_oh, hat, bass, main_synth)],
).master()

const mastering = register('master', (pat) => pat.bus(1).dry(0))

$: s("bus:1")
  // .compressor("-10:20:10:.002:.02")
  .soft("1:1")._scope()
