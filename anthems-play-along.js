// https://discord.com/channels/779427371270275082/779744296936275991/1458998771697586409

setcpm(125.13/4)

samples('github:kyrsive/noe-sounds')
samples('github:danhemerlein/samples')
samples({
 wt_mecha: '_gabor.wav'
 }, 'https://raw.githubusercontent.com/kyrsive/some-wavetables/main/');
await import('https://glossing.dev/scripts.js')

// code by eefano

let markovstates = {};

let markovtables = {
  'drums':
     //bd   sd    hh
  [[  0.2,  .2,  .6],  // bd
   [ .3,   .3,  .4],  // sd
   [ .6,  .1,   .3]]  // hh
}

const markov = register('markov', (id, pat) => pat.withHap((hap)=> {

     if(markovstates[id]===undefined) markovstates[id]=[0];
     const mystate = markovstates[id];
     const mytable = markovtables[id];

     const p = hap.whole.begin.n;
     while(mystate.length<=p)
       {
         const prev = mystate[mystate.length-1];
         const t = mytable[prev];
         let next = prev;
         for(let i=0,j=t[i];i<t.length;i++,j+=t[i]) if(hap.value<j) { next = i; break; }
         mystate.push(next);
       }
     return hap.withValue((v)=>mystate[p]);
}))

// code by glossing

const filtval = register('filtval', (key, val, func, pat) => {
  return pat.when(
    pat.fmap((v) => v[key] === val),
    func,
  );
});

const vocalChain = (sample, cutoff = 5000, gain = 1) =>

s(sample).slow(16)
    .slice(16, `<0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15>`)
  .room(1).rsize(1.5).rfade(1.3)
  .cutoff(cutoff)
  .pg(gain);

$: vocalChain("anthems", slider(0, 12500, 50), 1)
$: vocalChain("anthems:2", slider(0, 0, 12500, 50), 1)

$: vocalChain("anthems:1", slider(6750, 0, 12500, 50), 1)

$: s("noe_perc").euclidRot(4,8,2).slow(4).speed(3).gain(.5).room(.8)
$: s("- - cp:12 -").bank("noe").room(0.2).gain(.3)

$: stack(
  s(rand.segment(1).markov('drums').pick(["bd:16","sd:15","hh:5 "]))
    .bank("noe").fast("16@3 32")
    .mask(brand.seg(16).rib(2345,1))
    .filtval("s", "bd", x => x.duck(2))
    .filtval("s", "sd", x => x.duck(2).room(0.6))
    .diode(0.6).within(0.2,"0.5 0.6 0.3", x => x.speed(0.2).stretch(0.8).ply("1|2"))
    .transient(1)
).mask(time.segment(1).gte(16)).pg(1.2)

const chord_a = '[b4,d#4,f#4]@2 [f4,a#4,d4] [f#4,a#4,[f5 d#5]]';
const chord_b = '[a#4,c#4,g#5]@2 [g#4,b4,f#5]@2';
const _chords = mini([chord_a, chord_a, chord_b, chord_b].join(' '));

$: note(_chords.slow(8))
  .s("wt_digital_echoes")
  .strum(.015)
  .glide(perlin.range(.03, .15))
  .transpose(-12)
  .delay(.4)
  .room(.4)
  .cutoff(slider(2700, 0, 5000, 50)).pg(1.25)

$: note(_chords.slow(8))
  .s("wt_digital_curses")
  .arpu("0 1 2 3 4 -1 -2 -3".fast(2))
  .clip(.8)
  .transpose("12,24")
  .late(.04)
  .attack(.004)
  .pan(sine.fast(2))
  .delay(.6)
  .room(2).rsize(1.5).rfade(1.5)
  .cutoff(slider(450, 0, 1000, 50))

const bassA = 'b1(1,1)@2 d2(1,1) f#1(1,1)';
const bassB = 'a#1(1,1)@2 g#1(1,1)@2';
const _bass = mini([bassA, bassA, bassB, bassB].join(' '));

$: note(_bass.slow(8))
  .s("sine,tri")
  .detune(0, 1.07)
  .diode(0.6)
  .fm(1)
  .fmh(1)
  .pg(.75)

all(x => x.compressor("-20:20:10:.002:.02").pg(.25)
  ._scope())