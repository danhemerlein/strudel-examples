// https://discord.com/channels/779427371270275082/779744296936275991/1458998771697586409

setcpm(110/4)

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

// , 'chords':
//   [[  .2,  .2,  .4,  .2],
//    [ .5,   .3,  .2,  .1],
//    [  0,   .2,   .7,  .1],
//    [ .7,  .1,   .1,  .1]]

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

$: s(rand.segment(1).markov('drums').pick(["bd:16","sd:15","hh:3"])).bank("noe").fast("16@3 32")
.mask(brand.seg(16).rib(2345,1))
  .filtval("s", "bd", x => x.duck(2))
  .filtval("s", "sd", x => x.duck(2).room(0.6))
  .diode(1.2).within(0.2,"0.5 0.6 0.3", x => x.speed(0.2).stretch(0.8).ply("1|2"))
.transient(1)

$: s("noe_perc").euclidRot(4,8,2).slow(4).speed(3)

$: s("- - cp:12 -").bank("noe").room(0.2)


_$: s("loop:6").bank('noe').chop(16).clip(.5).speed(2)
_$: s("loop:7").bank('noe').chop(16).clip(.5).speed(2).hpf(400).gain(.3)

$: s("hh:4!16").bank('noe').decay(0.06).gain(3).room(1.25).rsize(.4)
  .degradeBy(.2).speed("2")
  .sometimes(x=>x.speed("-1"))
  ._punchcard()

_$: note("5 11 12")
  .seg("16 4 8 4")
  .oct(1)
  // .mask("1 1 1 1 0 1 1 0 1 0 0 1".slow("2 4"))
  .mask("0 1 0 1 0 0 1 0 0 0 0 1"//.slow("2 4")
        )
  .s("wt_mecha")
  .speed(6)
  .transpose(12)
  .wtphaserand("0 1 3 10")
  .wtdepth(rand.mul("4"))
  .someCycles(x => x.unison(8).detune("14").lfo({s:0.4,da:100}))
  .unison(8)
  .detune("2").lfo({s:0.4,da:100})
  // .wtsync(irand(8).mul(2).rib(12,1))
  // .wtshape("0 1 2")
  // .sometimes(x => x.rev())
.wtskew(rand).FX(
  dist("1.9:1:soft")
  ,stretch(0.1)
  ,dist("0.2:0.6:chebyshev")
)
  .rib(5,1)
  .penv("100|0").pdec("0.1")
  .hpf(1000)
  .o(2)._pianoroll({lables: true})



_$: chord("<Eb!4 Fm!2 G!1 Ab!3>")
  .voicing()
  .s("saw")
  // .hpf(sine.range(300, 3000).fast(3/2))
  .bpf(sine.range(2000, 4000)//.fast(1/3)
       )
  .adsr("0:.125:0:.25")
  .phaser(3)
  .jux(late(1/16))
  .jux(late(3/16))
  .delay(1)
  .room(2)
  .transpose(-12)
  .gain(2)
  ._punchcard()


all(x => x.compressor("-20:20:10:.002:.02")._scope())