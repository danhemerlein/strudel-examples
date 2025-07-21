// "Loop 61" @by Absent Friend
// As for credits: DÉ DÉ MOUSE - LOOP 61 on SoundCloud

samples({ loop_61: 'https://files.catbox.moe/gh2igu.mp3' })

stack(
  // SAMPLE
  s('loop_61')
    .clip(1)
    .slice(64, '0 .. 63')
    .slow(4)
    .dec(sine.range('0.8', '0.5').slow(32))
    .juxBy(0.15, (x) => x.gain(0.5).rev())
    .speed(1.2)
    .lpf(15000)
    .room(1),
  // DRUMS
  s('bd:2')
    .bank('RolandTR808')
    .dec(0.3)
    .beat('0, 3?, 6, 10, 12?, 14?', 16)
    .dist(2.2)
    .postgain(4),
  s('sd:2')
    .bank('LinnDrum')
    .dec(0.4)
    .beat('4, 7?', 8)
    .speed(3)
    .dist(2)
    .postgain(0.95),
  s('hh:1*8')
    .bank('LinnDrum')
    .someCyclesBy(0.15, (x) => x.ply('2 | 3 | 4'))
    .speed(5)
    .dec(0.2)
    .postgain(1.1)
)
// @version 1.1
