
// @title Reverse Sound Spa
// @by MaximBMaraczi
// 04/04/2026

setCpm(25)

$: n("<3 -2, 0 -6, -2 -1, 4 2>, [2 4 8 2]/3 <[2,0,-2]/2.5 [5,7 -4]>")
.scale("<F:minor:pentatonic Ab:major:pentatonic>/4")
.sound("organ_8inch")
.speed("-2 -1@2 1!8")
.delay(0.2)
.attack("0.1 0.4? 0.6 0.8?")
.transpose("-12")
.postgain(1.5)
._pianoroll()

$: n("<3 -2, 0 -6, -2 -1, 4 2>, [2 4 8 2]/3 <[2,0,-2]/2.5 [5,7 -4]>")
.scale("<F:minor:pentatonic Ab:major:pentatonic>/4")
.sound("tubularbells")
.speed("-2 -1@2 1!8")
.delay(0.2)
.fm(1)
.fmh(1)
.attack("0.1 0.4? 0.6 0.8?")
.transpose("-12")
.postgain(2.5)
._pianoroll()

$: n("<3 -2, 0 -6, -2 -1, 4 2>, [2 4 8 2]/3 <[2,0,-2]/2.5 [5,7 -4]>")
.scale("<F:minor:pentatonic Ab:major:pentatonic>/4")
.sound("xylophone_soft_ff:2")
.speed("-2 -1@2 1!8")
.delay(0.2)
.fm(1)
.fmh(1)
.attack("0.1 0.4? 0.6 0.8?")
.postgain(2.5)
.transpose("-12")
._scope()