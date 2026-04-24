setCps(130/60/4)

samples('github:danhemerlein/samples')
samples('github:mmmgarlic/randumsample')
samples('github:bindbindbind/miscsamples/main/glitch_with_friends')

let cc = await midin('Ableton Push 2 Live Port')

  let drums_energy = 500
  let bass_energy = 500
  let synth_energy = 500
  const chop_energy = ref(() => synth_energy * 1.25)

  if (!document.getElementById('energy-hud')) {
    let hud = document.createElement('div')
    hud.id = 'energy-hud'
    hud.style.cssText = 'position:fixed;bottom:20px;right:20px;background:rgba(0,0,0,0.85);padding:10px;border-radius:6px;font-family:monospace;z-index:9999'


    const row = (id, label, min, max, val, disabled) =>
      '<div style="margin-bottom:6px">' +
      '<label style="color:#aaa;font-size:11px">' + label + '</label>' +
      '<input id="' + id + '-slider" type="range" min="' + min + '" max="' + max + '" value="' + val + '"' + (disabled
   ? ' disabled' : '') + ' style="width:160px;display:block;margin:2px 0">' +
      '<span id="' + id + '-val" style="color:#0ff;font-size:11px">' + Math.round(val) + '</span>' +
      '</div>'

    hud.innerHTML =
      row('drums', 'DRUMS  CC71', 0, 3000, 500) +
      row('bass',  'BASS   CC72', 1000, 5000, 500) +
      row('synth', 'SYNTH  CC73', 0, 5000, 500) +
      row('chop',  'CHOP   (derived)', 0, 6250, 2630 * 1.25, true)

    document.body.appendChild(hud)
  }

  const updateHUD = (id, val) => {
    document.getElementById(id + '-slider').value = val
    document.getElementById(id + '-val').textContent = Math.round(val)
  }

  WebMidi.getInputByName('Ableton Push 2 Live Port').addListener('controlchange', (e) => {
    let delta = e.rawValue < 64 ? e.rawValue : e.rawValue - 128
    if (e.controller.number === 71) {
      drums_energy = Math.max(0, Math.min(10000, drums_energy + delta * 100))
      updateHUD('drums', drums_energy)
    }
    if (e.controller.number === 72) {
      bass_energy = Math.max(1000, Math.min(5000, bass_energy + delta * 30))
      updateHUD('bass', bass_energy)
    }
    if (e.controller.number === 73) {
      synth_energy = Math.max(500, Math.min(5000, synth_energy + delta * 150))
      updateHUD('synth', synth_energy)
      updateHUD('chop', synth_energy * 1.25)
    }
  })

const bd = s("kick3_afterparty!4").fast("1 1 1 <1 1 1 2>")
  .lastOf(8, x => x.mask("0"))
  .gain(4).duckorbit(2).duckattack(0.1).lpf(ref(() => drums_energy));

const bd_double = s("kick3_afterparty!4").gain(4)
  .fast("<1@8 2@2 4@2>")
  .lpf(ref(() => drums_energy));

const oh = s("[~ hat_drugs]").fast(4)
  .speed(perlin.range(0.9,1.1))
  .room(0.2).gain(8)
  .lpf(ref(() => drums_energy));

const energy_hat = s("hat_afterparty*16").degradeBy(slider(0.36,0,1)).almostNever(x=>x.speed("0.5"))
  .jux(rev).gain("0.3");

const back_beat = s("[~ snareaccent_dreamer]").fast(2)
  .lastOf(4, x => delay(.4).delaytime(.125/2).delayfb(.45))
  .transpose(-5).gain(2);

const bass_verse = note("<e1 b0 f#1 f#1>").s("supersaw")
  .seg(8)
  .orbit(2)
  .lpf(ref(() => bass_energy))
  .lpq(7).distort("2.5:.7")
  .ftype('ladder').gain(1)

const bass_patterns = [
  "e1 b0 f#1 _",
  "e1 b0 f#1 c#1"
]
const bass = note(pick("<0!2 1!2>", bass_patterns)).s("supersaw")
  .slow(4)
  .orbit(2)
  .lpf(ref(() => bass_energy))
  .lpq(7).distort("2.5:.7")
  .ftype('ladder').gain(1)

const bass_two = note(pick("<1!2>", bass_patterns)).s("supersaw")
  .slow(4)
  .orbit(2)
  .lpf(ref(() => bass_energy))
  .lpq(7).distort("2.5:.7")
  .ftype('ladder').gain(1)

const bass_chorus = note(pick("<0!2 1!2>", bass_patterns)).s("supersaw")
  .seg(8)
  .orbit(2)
  .lpf(ref(() => bass_energy))
  .lpq(7).distort("2.5:.7")
  .ftype('ladder').gain(1)

const hi = note("<d#4(3,8,0)!2 [b4(3,8,0)!1|d#4(4,16,16)|d#4(8,16,16)e4(3,16,16)]>")
  .s("supersaw")
  .fast(2)
  .transpose(12)
  .crush("6|8")
  .room("1.1|1.25").delay(1.25)
  .lpf(ref(() => synth_energy))
  .gain(.4)

// code by DJ Dave
const notes = [
  "{e3 b4 ~}%2",
  "{b3 f#4 ~}%2",
  "{f#3 c#3 ~}%2",
  "{c#3 g#3 ~}%2",
]

const main_synth = note(pick("<0!8 1!8 2!8 3!8>", notes))
  .fast(8)
  .sound("square, saw").delay(1.25)
  .rarely(x=>x.transpose("[0, 7, 12]"))
  .decay(0.25)
  .delay(0.25)
  .room(1.5)
  .orbit(2)
  .gain(.5)
  .lpf(ref(() => synth_energy))

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
  .sometimesBy(1, x=>x.decay("[0.1|0.07|0.08]"))
  .sometimesBy(0.4, x=>x.jux("rev"))
  .delay(0.25)
  .room(1.2)
  .gain(0.5)
  .orbit(2)
  .lpf(ref(() => synth_energy))

const chop = s("youngandnauseous:1").slow(4)
.chop(16).cut(1)
.sometimesBy(.5, ply("2"))
.sometimesBy(.25, mul(speed("-1")))
.ribbon("[11|7|15]", 1)
.delay(.2)
// .jux(rev)
.lpf(ref(() => chop_energy))
.hpf(1000)
.gain(3)

const first_verse = s("youngandnauseous:1").slow(4).gain(2)
const first_verse_two = s("youngandnauseous:2").slow(4).gain(2)
const first_verse_three = s("youngandnauseous:3").slow(4).gain(2)
const first_verse_four = s("youngandnauseous:4").slow(4).gain(2)
const second_verse = s("youngandnauseous:5").slow(4).gain(2)

const verse = s("youngandnauseous:1").slow(4)
.chop(16).cut(1)
.sometimesBy(.5, ply("2"))
.sometimesBy(.25, mul(speed("-1")))
.ribbon("[11|7|15]", 1)
.delay(.2)
// .jux(rev)
.lpf(chop_energy)
.hpf(1000)
.gain(3)

const intro = s("youngandnauseous:4").slow(4).gain(1.5).room(1).rsize(1).delay(.2).lpf(chop_energy)
  .scrub(irand(8).div(8).seg(8).speed(2).degradeBy(0.2)
         .sometimesBy(.25, ply("2"))
         .rib("11", 2))

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
  [4, stack(bd_oh, hi, chop)],
  [8, stack(bd_oh, hi, chop, bass_verse)],
  //
  [4, stack(bd, bass, first_verse)], // first verse
  [4, stack(bd, bass, first_verse_two)], // first verse
  [4, stack(bd, bass_two, hi, first_verse_three)], // first verse
  [4, stack(bd, bass_two, hi, first_verse_four)], // first verse
  //
  [8, stack(bd, bass_two, main_synth)], // chorus
  [7, stack(bd_oh, bass_two, main_synth, hi)], // chorus
  //
  [1, stack(riser, clicks).room(1.5).rsize(2).rfade(0.5)], // transition
  //
  [8, stack(impact, bd_oh, bass, hi_2, energy_hat)], // drop
  [16, stack(impact, bd_oh, bass, hi_2, energy_hat, chop)], // drop
  //
  [8, stack(bass_verse, hi, second_verse)], // second verse
  //
  [8, stack(bd_double, bass, main_synth)], // chorus
  [7, stack(bd, bass, hi, back_beat, main_synth)], // chorus
  //
  [1, stack(riser, clicks).room(1.5).rsize(2).rfade(0.5)], // transition
  [8, stack(impact, bd_oh, bass, hi_2, energy_hat, back_beat)], // drop
  [32, stack(impact, bd_double, oh, bass, hi_2, energy_hat, back_beat, intro, chop)], // outro
).master()

$: s("bus:1")
  .compressor("-10:20:10:.002:.02")
  .soft("1:1").gain(0.3)._scope()
