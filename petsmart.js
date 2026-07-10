samples('github:yaxu/clean-breaks');
samples('github:danhemerlein/samples');
samples('github:kyrsive/noe-sounds');
samples('github:mmmgarlic/randumsample')
samples('github:bindbindbind/miscsamples/main/glitch_with_friends')

setCps(165/60/4)

const synth_topline = [
                    `<
                      d1 -!3 -!4 -!8
                      -!8 -!8
                      d1 -!3 -!4 -!8
                      d1 -!3 -!4 -!8
                      d1 -!3 -!4 -!8
                      a1!8 g#1!4 g1!4

                      d1 d1 - d#1 d1 - d1!2 d1!8
                      d1 d1 - f1 d1 - d1!2 d1!8
                      d1 d1 - g#1 d1 - d1!2 d1!8
                      a1!8 g#1!4 g1!4
                     >`

]

$: s("noe_imp")
  .struct(
    `<
      x -!3 -!4 -!8
      -!8 -!8
      x -!3 -!4 -!8
      x -!3 -!4 -!8
      x -!3 -!4 -!8
     x -!3 -!4 -!8

      x -!3 -!4 -!8
      -!8 -!8
      -!8 -!8
      -!8 -!8
     >`
    ).fast(8)
  .postgain(8)
  .dec(0.1)
  .gain(.1)
  .room(2).rsize(2)
  .delay(.5)

$: s("supersaw").note(pick("<0>", synth_topline)
                     ).fast(8)
  .lpf(1000)
  .lpq(10)
  .lpenv(3)
  .lpa(.05).lpd(.15)
  .add(note("0,0.06"))
  .orbit(2)
  .lpq(7).distort("2.5:.7")
  .room(1.1).rsize(1.3).rfade(2)
  .chorus(.25).phaser(0.25)
  .ftype('ladder')
  .gain(.5)
  ._pianoroll({labels: true})



$: s("gm_distortion_guitar").note(pick("<0>", synth_topline)
                     ).fast(8)
  .transpose(12)
  .lpq(10)
  .gain(1)
  ._pianoroll({labels: true})

$: s("swat").fit().gain(.25).o(2)._punchcard()

_$: s("riffin/2").fit().chop(16).cut(1)
  .rarely(ply(2))
  .sometimesBy(.15, mul(speed("-1")))
  .gain(.5)

$: s("- - - riser_lipgloss").slow(8).gain(2).distort("1:.5").room(2)

$: s("petsmart")
  .splice(20, "<0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19>")
  .gain(1.2)

$: s("<noefest_bd:3*4!3 noefest_bd:3*8>").gain(.7).duckorbit(2).duckattack(0.1)

all(x=> x
  // .crush(2)
  // .lpf(5000)
  // .hpf(500)
  // .gain(0)
    ._scope(
  ))
