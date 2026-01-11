// https://discord.com/channels/779427371270275082/779744296936275991/1458143783920075014

setcpm(160/4)

samples('github:kyrsive/glorkglunk-wavetables')
samples('github:kyrsive/diarrhea-drumkit')
samples({
 vox: 'agmoney_160BPM(24).wav'
 }, 'https://raw.githubusercontent.com/kyrsive/Random-Samples/main/');
samples('github:bindbindbind/miscsamples/main/glitch_with_friends')
samples('github:mmmgarlic/randumsample')
samples('github:emptyflash/samples')

// code by switch angel

register('sf', (cycles,x) => {
  const segments = 16;
  cycles = reify(cycles)
  return x.scrub(saw.seg(cycles.mul(segments)).slow(cycles))
})

// code by glossing

const glitch = register('glitch', (amt, pat) => {
  return pat.fmap((v) => {
    const keys = Object.keys(v);
    const numKeys = keys.length;
    for (let i = 0; i < numKeys; i++) {
      const k = keys[i];
      if (['orbit', 'duckorbit'].includes(k)) continue;
      const rand = 2 * Math.random() - 1;
      const val = v[k];
      const isNumber = typeof val === 'number';
      if (k === 'note' && !isNumber) {
        const midi = noteToMidi(val);
        v[k] = Math.round(Math.max(midi * (1 + amt * 0.5 * Math.random()), 24));
      } else if (isNumber) {
        v[k] *= 1 + rand * amt;
      }
    }
    return v;
  });
});

const mastering = register('master', (pat) => pat.bus(1).dry(0))

let intro = s("vox").slow(24).chop(16).cut(0)
.sf("<1 1 1 1>")

let wut = s("vox").slow(24).chop(16).cut(0)
.sf("2")

let riser = s("gwf_im:24").speed(-3.7).postgain(1.9)

let clicks = s("white").dec(0.01).seg(8).delay(1)
  .dt(time.mul(0.002).mod(1))
  .lfo({da:"<0 0.02 0.08 1>"})
  .dfb("<0.9 0.9 0.2 0>").diode(time.mod(1)).fast("<1 1 [2 2 8 16] 1>")

let main = s("vox").slow(24).chop(16).cut(0).fit().diode("<0.8!16 1.7!16>")

let HEY = s("impact_femmebot").slow(16).postgain(8).speed(1.5)

let ok = n("0 5 2 1").s("ug_sd").beat("1,2,7",8).brak().diode(1.5)
.room(0.4).ir("gong").irspeed("3 4 8 4".mul(2.4)).size(0.1)
.ply("1 1 2 1").duckorbit(2).diode(2)

let WOW = s("sbd!4")
  .penv(100).diode(1.7).dec(0.9).fast("1 1 1 2")
.duckorbit(2)

let text = s("gwf_pl:6/2").fit()
  .scrub(irand(20).div(16).seg("8 16 8 32"))
.speed("1 2 -1 1".mul(4)).dec(0.1)

let hh = s("hh").ply(16).stretch(0).lfo({da:2}).postgain("[18 16 18 16] [18 16 16 16]")

let growl = note("3 [4 12] 8 2".fast("1 2 1 1".mul(2))).scale("D0:MAJOR@1.5")
  .trans("[0 0 7 0]")
  .unison(7)
  .n("0 2 0 0")
  .s("wt_woo")
  .wtsync("2 1 4".div("<2 2 1 8>"))
  .wtdepth("1 0.8 2 0.9")
.chebyshev("1 1 2 1")
.fm(0).lfo({s:0.5,da:10})
  .fmh(5)
.slow(4).o(2)

let high = s("white").att(0.2).fast(8).lpf(40000)

// let MORE =

$: arrange(
  [3, stack(intro,clicks)],
  [1, stack(wut,riser)],
  [8,
"<0!24, 1, 2!32,3!32,~!4 [4!28],5!32>".pick([main,HEY,ok,WOW,text,high])
   .glitch("<0!7 1!1>")
  ],
  [16,
"<0!24, 1, 2!32,3!32,~!8 4!28,5!32>".pick([main,HEY,ok,growl,hh,WOW])
  ],
  [8,silence]
).delay("<0!27.5 1!8.5>").dt(0.003).lfo({s:1,da:0.008}).dfb(0.9).master()

$: s("bus:1")
  .compressor("-10:20:10:.002:.02")
  .soft("1:1")._scope()
