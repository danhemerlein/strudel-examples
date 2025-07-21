const dbank909 = 'RolandTR909'
const dbank808 = 'RolandTR808'
setCps(130 / 60 / 4)
const arp_lpf_sq = slider(1500, 0, 20000)
const bass_lpf = slider(5000, 0, 20000)
const first = true

const bass_part = first
  ? `
  [E1 - - E1] [- -E1 -] [E1 - - E1] [- - B1 -]
  [B1 - - B1] [- - B1 -] [B1 - - B1] [- - B1 -]
  [F#1 - - F#1] [- - F#1 -] [F#1 - - F#1] [- - F#1 -]
  [F#1 - - F#1] [- - F#1 -] [F#1 - - F#1] [- - F#1 -]
  `
  : `
  [E1 - - E1] [- -E1 -] [E1 - - E1] [- - E1 -]
  [B1 - - B1] [- - B1 -] [B1 - - B1] [- - B1 -]
  [F#1 - - F#1] [- - F#1 -] [F#1 - - F#1] [- - F#1 -]
  [C#1 - - C#1] [- - C#1 -] [C#1 - - C#1] [- - C#1 -]
  `

const pluck_part = first
  ? `[C#4 B3 G#3 C#4] [B3 G#3 C#4 B3] [C#4 B3 G#3 C#4] [B3 G#3 C#4 B3]
[C#4 B3 G#3 C#4] [B3 G#3 C#4 B3] [C#4 B3 G#3 C#4] [B3 G#3 C#4 B3]
[C#4 B3 G#3 C#4] [B3 G#3 C#4 B3] [C#4 B3 G#3 C#4] [B3 G#3 C#4 B3]
[C#4 B3 G#3 C#4] [B3 G#3 C#4 B3] [C#4 B3 G#3 C#4] [B3 G#3 C#4 B3]`
  : `[[D#4 D#5] C#4 B3 [D#4 D#5]] [C#4 B3 D#4 C#4] [D#4 C#4 B3 [G#3 G#4]] [C#4 B3 G#3 B3]
[[C#4 C#5] B3 A#3 C#4] [B3 A#3 B3 A#3] [A#3 G#3 G#3 A#3] [A#3 B3 B3 C#4]
[[D#4 D#5] C#4 B3 D#4] [C#4 B3 D#4 C#4] [D#4 C#4 B3 G#3] [C#4 B3 G#3 [B3 B4]]
[C#4 B3 A#3 C#4] [B3 A#3 [B3 B4 B5] A#3] [A#3 G#3 G#3 F#3] [F#3 E3 E3 D#3]`

const short_pluck_part = first
  ? `[D#4 - - D#4] [- - D#4 -] [D#4 - - D#4] [- - D#4 -]`
  : `[G#4 - - G#4] [- - G#4 -] [G#4 - - G#4] [- - G#4 -]`
const short_pluck_2_part = first
  ? `[<[D#2 D#1] [D#2]> - - D#2] [- - D#2 -] [<[D#2] [D#2 D#1] > - - D#2] [- - D#2 -]`
  : `[[G#2 G#1] - - G#2] [- - G#2 -] [G#2 - - G#2] [- - G#2 -]`
const ambiance_part = first
  ? `[B4 - - B5] [- - B4 -] [B4 - - A#4] [- - A#4 -]`
  : `[E4 - - E5] [- - B4 -] [B4 - - G#4] [- - G#4 -]`

// drums
const hh = s('hh*16').bank(dbank909).gain('0.25')
const hh_2 = s('white!16')
  .decay(sine.fast(8).range(0.01, 0.05))
  .gain(0.3)
  .sometimesBy(0.1, (x) => x.ply('2 | 4 | 6'))
const oh = s('[- oh - oh] [<[- hh] -> oh - oh]').bank(dbank909).gain('0.25')
const bd = s('[bd - - -] [bd - - -] [bd - - -] [bd - - -]')
  .bank(dbank909)
  .gain('1.15')
const sd = s('- sd - sd').n(6).gain('.4')
const sd_2 = s('- sd - sd').gain(1).n(3).bank(dbank909)
const cp_2 = s('cp:4!16?'.degradeBy(slider(0.116, 0, 1)).ribbon(19, 2))
  .bank(dbank808)
  .gain(0.5)
const bd_2 = s('bd!16?'.degradeBy(slider(0.749, 0, 1)).ribbon(40, 2))
  .n(irand(5).ribbon(200, 2))
  .bank(dbank909)
samples('bubo:fox')

const run_2 = n(run(16))
  .s('ftabla')
  .early(2 / 4)
  .sometimes(mul(speed('3'.sometimesBy(1, (x) => x.ply('3 | 1.5 | 2')))))
// .jux(iter(4)).gain(.2);

// bass
const bass = note(bass_part)
  .sound('sine')
  .adsr('0:1:1:0')
  .dist('1')
  .n('32')
  .gain('3')
  .lpf(bass_lpf)
  .cpm(130 / 16)

const saw_sidechain = note('[D#5 - - D#5] [- - D#5 -] [- - D#5 -] [- - - -]')
  .sound('sawtooth')
  .adsr('0:0:.5:.2')
  .vib(4)
  .vibmod('100 105 150 150')
  .room(0.5)
  .rsize(1)
  .rfade(0.5)
  .noise('<0.1 0.15 0.2>')

const short_pluck = note(short_pluck_part)
  .cpm(130 / 4)
  .sound('sawtooth')
  .adsr('0.01:0.1:0:0')
  .room(1)
  .rsize(1)
  .dist('0.25')
  .gain('0.6')

const short_pluck_two = note(short_pluck_2_part)
  .cpm(130 / 4)
  .sound('square')
  .adsr('0:0.1:0:0')
  .dist('0.35')
  .room(1)
  .rsize(0.1)
  .dist('0.4')
  .gain('0.75')

const ambiance = note(ambiance_part)
  .cpm(130 / 4)
  .sound('sawtooth')
  .adsr('0:0.1:0:0')
  .room(5)
  .rsize(2)
  .rfade(0.5)
  .gain('0.2')

const arp_pluck = note(pluck_part)
  .cpm(130 / 32)
  .sound('square')
  .adsr('0:0.1:0:0')
  .gain(1)
  .vib(first ? 0.2 : 0.4)
  .crush(8)
  .room(first ? 1 : 1.5)
  .rsize(first ? 1 : 1.5)
  .phaser(0.75)
  .jux(press)
  .lpf(arp_lpf_sq)

const bg_pattern = stack(
  // short_pluck,
  // short_pluck_two,
  saw_sidechain
  // ambiance,
)

const drums = stack(
  // bd,
  // bd_2,
  // sd,
  // sd_2,
  // cp_2,
  // oh,
  hh_2,
  run_2,
  hh
  // .phaser(0.3),
)
// .phaser(0.3)
// .phaserdepth("<0 .05 .075 .1 .1 .075 .05 0>")

samples('github:yaxu/clean-breaks')
samples('github:algorave-dave/samples/')

const verse = s('giveittome')
  .n(2)
  .chop(16)
  .cut(8)
  .sometimesBy(0.05, (x) => x.ply('2 |4'))
  .late('[0 .001]*4')
  .late('[0 .001]*2')
  .size(2)
  .penv('<-1, -1, 2, -1>')
  .phaser(4)
  .room(0.5)
  .sometimesBy(0.5, mul(speed('-1')))
  .lpf(slider(5000, 0, 20000))

const amen_break = s('swat')
  .fit()
  .chop(16)
  .cut(1)
  .sometimesBy(0.0, (x) => x.ply('2 | 4'))
  .sometimesBy(0.0, mul(speed('-1')))
  .lpf(slider(1500, 0, 20000))
  .gain(1.2)

samples('github:eddyflux/crate')
const crate_drums = stack(
  s('bd').struct('<[x*<1 2> [~@3 x]] x>').gain(1.25),
  s('~ [rim:<2 2 4 3>, sd:<2 2 2 3>]').room('<0 .1 0 .2 .06 .15 0 .175>')
  // n("[0 <1 3>]*<2!3 2!3 2!3 4>").s("hh"),
  // s("rd:<1!3 2>*2").gain(.5)
  // s("rd:<2 - - ->").gain(1)
  // s("rd:<1!4>*1").gain(.5)
)
  .cpm(130 / 2)
  .bank('crate')
  .sometimesBy(0.0, (x) => x.ply('2 | 4'))
  .sometimesBy(0.0, mul(speed('-1')))
  .late('[0 .01]*4')
  .late('[0 .01]*2')
  .size(4)
  .lpf(slider(3500, 0, 20000))

const melody_chords = chord('<DbM7 EbM7>/4').dict('ireal')

const piano = melody_chords
  .offset(-2)
  .voicing()
  .s('piano')
  .room(0.5)
  .rsize(2)
  .gain(1.25)
  .cpm(130 / 2)

const pad = melody_chords
  .offset(-1)
  .voicing()
  .s('gm_epiano1:2')
  .phaser(4)
  .room(0.5)
  .gain(1)
  .late('[0 .01]*4')
  .late('[0 .01]*2')
  .size(4)
  .cpm(130 / 2)

const one = stack(
  drums,
  bg_pattern
  // arp_pluck,
  // bass,
)

const two = stack(
  amen_break,
  crate_drums,
  // pad,
  // piano,
  verse
)

stack(one, two)
