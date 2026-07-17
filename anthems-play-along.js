// https://discord.com/channels/779427371270275082/779744296936275991/1458998771697586409

setcpm(125.13/4)

samples('github:kyrsive/noe-sounds')
samples('github:danhemerlein/samples')
samples({
 wt_mecha: '_gabor.wav'
 }, 'https://raw.githubusercontent.com/kyrsive/some-wavetables/main/');

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
    .room(1.1).rsize(1.5).rfade(1.3)
    .cutoff(cutoff)
    .gain(gain);

$: vocalChain("anthems", slider(11100, 0, 15000, 50), .3)

$: s("noe_perc").euclidRot(4,8,2).slow(4).speed(3).gain(.2)
$: s("- - cp:12 -").bank("noe").room(0.2).gain(.2)

$: stack(
  s(rand.segment(1).markov('drums').pick(["bd:16","sd:15","hh:5 "]))
    .bank("noe").fast("16@3 32")
    .mask(brand.seg(16).rib(2345,1))
    .filtval("s", "bd", x => x.duck(2))
    .filtval("s", "sd", x => x.duck(2).room(0.6))
    .diode(1.2).within(0.2,"0.5 0.6 0.3", x => x.speed(0.2).stretch(0.8).ply("1|2"))
    .transient(1).gain(.2)
).mask(time.segment(1).gte(16))

all(x => x.compressor("-20:20:10:.002:.02").gain(.2)._scope())