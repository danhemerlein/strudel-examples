setcpm(130/4)
// code by goose
// $kalimba: n("<[3 3 0 0 2 2 0 0] [3 3 0 0 4 4 2 2]>").scale("C6:minor").sound("gm_kalimba").room(2.0).postgain(0.5)

$pad: n("<0 -4 [-3 -2] [-2 0]>").scale("C5:minor").strans("<0!4 7!4>").sound("gm_choir_aahs:2").postgain(0.7)
$pad2: n("<0 -4 [-3 -2] [-2 0]>").scale("C5:minor").strans("<0!4 7!4>").sound("gm_pad_choir").postgain(0.7).fast(2)
$pad2: n("<0 -4 [-3 -2] [-2 0]>").scale("C5:minor").strans("<0!4 7!4>").sound("gm_synth_choir").postgain(0.7).fast(4)

// $bass: n("<0 5 4 6>").scale("C2:minor").sound("wt_digital_bad_day")
//   .slow(4)
//   .room(3.0)
//   .lpf(300)
//   .lpq(4)
//   .postgain(0.4)

$taiko: sound("gm_taiko_drum:9").struct("x x [~ x] ~").fast(1)

// $sticks: sound("slapstick:3").struct("~ ~ x ~").note("B2").delay(0.6).delaytime(0.1)


