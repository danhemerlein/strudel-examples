

setcpm(130/4)

samples('github:kyrsive/noe-sounds')
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
     //console.log(mytable)

     const p = hap.whole.begin.n;
     while(mystate.length<=p)
       {
         const prev = mystate[mystate.length-1];
         const t = mytable[prev];
         let next = prev;
         for(let i=0,j=t[i];i<t.length;i++,j+=t[i]) if(hap.value<j) { next = i; break; }
         mystate.push(next);
         //console.log(mystate);
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

$: s(rand.segment(1).markov('drums').pick(["bd:5", "sd:1", "hh:3"])).bank("noe").fast("16@3 32")
.mask(brand.seg(16).rib(2345,1))
  .filtval("s", "bd", x => x.duck(2))
  .filtval("s", "sd", x => x.duck(2).room(0.6))
  .diode(1.2).within(0.2,"0.5 0.6 0.3", x => x.speed(0.2).stretch(0.8).ply("1|2"))
.transient(1)

$: s("noe_perc").euclidRot(4,8,2).slow(4).speed(3)

$: s("- - cp:12 -").bank("noe").room(0.2)

$: note("5 11 12")
  .seg("16 4 8 4")
  .oct(1)
  .mask("1 1 1 1 0 1 1 0 1 0 0 1".fast("2 1 4"))
.s("wt_mecha")
  .wtphaserand("0 1 3 10")
  .wtdepth(rand.mul("4"))
  .someCycles(x => x.unison(8).detune("14").lfo({s:"0.4 0.1",da:100}))
  .wtsync(irand(8).mul(2).rib(12,1))
  .wtshape("0 1 2")
  .sometimes(x => x.rev())
.wtskew(rand).FX(
  dist("1.9:1:soft")
  ,stretch(0.1)
  ,dist("0.2:0.6:chebyshev")
)
  .penv("100|0").pdec("0.1")
  .o(2)


all(x => x.compressor("-20:20:10:.002:.02")._scope())