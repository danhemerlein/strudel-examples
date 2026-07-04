// Prebake script
//
// This is code that is loaded before your pattern is run.
// You can use it to define custom functions to use in any pattern.
//
// This is an initial example script. You can edit it to add
// your own funtions.
//
// To use a script shared by some other user you can use
// the import-button or paste the script in this editor.

const ratchet = register('ratchet', (pat) => pat.sometimes(ply(2)))

// @title Jazz Drum Brush Loop Randomized
// @by Mikal Hitsøy Henriksen
// @license CC-BY-SA-4.0
// @genre jazze
// @details Credit for main drum loop sample: vincent sermonne https://freesound.org/people/vincent%20sermonne/sounds/107846/

setcpm(145/8)
samples('github:stylpe/poe-jazz')

$: s("jazz_snare_brush_loop").slice(16, "<[0|5|8] [1|9|12|13] [0|5|8] [2|3|4|6|7|10|11|14|15]>")

_$: n("[4 - - 2?? - 3?] - - [- 3?? 5?? 3?? - 5??]".add(choose("-2","-1","0","1","2"))).sound('bassdrum1')
.color("red white!11")._pianoroll({playhead:0.1, minMidi:0, maxMidi:7, fold:false})

let bass = cat(
  chooseCycles(
    "c2 bb1 a1 d#2 d2 ab1 g1 b1",
    "c2 e1 f1 f#1 g1 a1 bb1 b1",
  ).seed(3),
  chooseCycles(
    "c2 e2 a2 d#2 d2 g#2 g2 b1",
    "c2 bb1 a1 g#1 g1 [f1 e1 d1|e1 d1 g1]@3"
  ).seed(7)
)
$: bass
.note()
.s("gm_acoustic_bass:1")
.almostNever(x=>x.superimpose(x=>x.pressBy(2/3).gain(0.5)
  .transpose(choose(0,0,7,12).when(bass.fmap(noteToMidi).gt(noteToMidi('c2')), x=>x.mul(-1)))
))
.decay(0.7)
._pianoroll({playhead:0.1})
// $: note(bass).filterWhen(v => v.add(0) < 1)._pianoroll()

