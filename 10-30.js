samples('github:tidalcycles/uzu-drumkit')
samples('github:algorave-dave/samples')

setCps(120/60/4)
const drums_energy = slider(9400,0,20000)
const energy = slider(0,0,20000)

$: s("bd:2").beat("0,1,2,3", 4).lpf(drums_energy.mul(2))
$: s("oh:2").beat("1,3,5,7",8).gain(.5).lpf(drums_energy.mul(2))
$: s("hh:2").beat("3",32).slow(2).room(".3").gain(.6).lpf(drums_energy.mul(12))
  .sometimesBy(0.8, x=>x.ply("2 | 3 | 4"))
  .sometimesBy(0/8, x=>x.speed("-1 | 0.5"))
$: s("sd:3").beat("1,3", 4).room("{<.1 .15>}%2").lpf(drums_energy.mul(8)).gain(0.2)
$: s("white!16").decay(sine.fast(8).range(0.01, 0.02)).gain(.3).room(0.5).late("[.001 .002]*4").cutoff(drums_energy.mul(6)).velocity("[1 .9]*4")


$: note("{3 0 0 0 2 0 0 1 0 0 0 2 0 0 4 5}%16"
        .scale("C2:minor"))
        .s("crackle").gain(0.3)

$: note("{3 0 0 0 2 0 0 1 0 0 0 2 0 0 4 5}%16"
        .add("{<0 2> <0 2> <2 3> <5 -1>}%1")
        .add("[{[7, 9] ~ ~ ~}%4, {-9 ~ -9 ~ -9}%2, {14 ~ 9 ~ ~ ~ ~}%4]")
        .scale("C3:minor"))
        .s("supersaw").adsr("0.001:1:0:0.2")
      .room(0.3)
      .gain(0.8)
      .lpenv(slider(1.427,1,8))
      .cutoff(energy)
      .pianoroll(
        {
         labels: 1,
         fold: 0,
         hideInactive: 0
       }
      );
// https://www.youtube.com/watch?v=nUr2oN1oltg
$: chord("{<Cm7 EbM7> <Cm7 EbM7> <EbM7 F> <AbM7 Bb>}%1").voicing().s("gm_pad_new_age:5")
    .room(2)
    .attack(0.5)
    .release(0.1)
    .gain(0.5)
    .lpf(energy)
    // .orbit(2)
    // .duckorbit(2)
    // .duckattack(2)
    // .duckdepth(1)
    // .pianoroll({
    //   labels: 1,
    //  fold: 0,
    // })




