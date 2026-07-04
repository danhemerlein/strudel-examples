// @title scrubgate
// @by tzwaan

setCpm(135/4)

samples('https://tij.men/strudel/strudel.json')

// fill in gaps between events
register('fill', function (pat) {
  return new Pattern(function (state) {
    const lookbothways = 2;
    // Expand the query window
    const haps = pat.query(state.withSpan(span => new TimeSpan(span.begin.sub(lookbothways), span.end.add(lookbothways))));
    const onsets = haps.map(hap => hap.whole.begin)
      // sort fractions
      .sort((a, b) => a.compare(b))
      // make unique
      .filter((x, i, arr) => i == (arr.length - 1) || x.ne(arr[i + 1]));
    const newHaps = [];
    for (const hap of haps) {
      // Ingore if the part starts after the original query
      if (hap.part.begin.gte(state.span.end)) {
        continue;
      }

      // Find the next onset, to use as an offset
      const next = onsets.find(onset => onset.gte(hap.whole.end));

      // If there is no next onset, the query window is not large enough.
      // We bail out to avoid a crash.
      if (next === undefined) {
        continue;
      }

      // Ignore if the part ended before the original query, and hasn't expanded inside
      if (next.lte(state.span.begin)) {
        continue;
      }

      const whole = new TimeSpan(hap.whole.begin, next);
      // Constrain part to original query
      const part = new TimeSpan(hap.part.begin.max(state.span.begin), next.min(state.span.end));
      newHaps.push(new Hap(whole, part, hap.value, hap.context, hap.stateful));
    }
    return newHaps;
  });
});


register('trancegate', (density, seed, length, x) => {
  return x.struct(rand.lt(density).seg(16).rib(seed, length)).fill().clip(.7)
})

register('scrubgate', (density, seed, length, x) => {
  return x.scrub(rand.rib(seed, length).trancegate(density, seed, length));
})

$: s("scrubbass").n("7 | 8 | 15 | 16 | 18".fast(8).rib(0, 2)).scrubgate(slider(0.873), "<0 13 24 [50 20]*4>/8", 2)

$: s("sbd*4").o(2).duck(1)
_$: s("[- sd:2]*2").o(2)

_$: s("[hh [<<rd ->*7@7 <cr ->>, hh] <oh hh> <hh!7 cp>]*4").n(irand(4).seg(16).rib(4, 4)).cut(1)
  .velocity(tri.range(.5, 1).fast(2)).lpf(3000).hpf(1000).o(2).swingBy(1/4,8).pan(tri.fast(3))