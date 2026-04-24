setCps(158.92/60/4)
let cc = await midin('Ableton Push 2 Live Port')

  let filterValue = 500

  // Create HUD once
  if (!document.getElementById('lpf-hud')) {
    let hud = document.createElement('div')
    hud.id = 'lpf-hud'
  hud.innerHTML =
    '<label style="color:#aaa;font-size:11px">LPF</label>' +
    '<input id="lpf-slider" type="range" min="500" max="20000" value="500" style="width:160px;display:block;margin:4px 0">' +
    '<span id="lpf-value" style="color:#0ff">1000 Hz</span>'

    hud.style.cssText =
  'position:fixed;top:40px;right:40px;background:rgba(0,0,0,0.85);padding:10px;font-family:monospace;z-index:9999'
    document.body.appendChild(hud)
  }

  WebMidi.getInputByName('Ableton Push 2 Live Port').addListener('controlchange', (e) => {
    if (e.controller.number === 71) {
      let delta = e.rawValue < 64 ? e.rawValue : e.rawValue - 128
      filterValue = Math.max(500, Math.min(20000, filterValue + delta * 100))
      document.getElementById('lpf-slider').value = filterValue
      document.getElementById('lpf-value').textContent = Math.round(filterValue) + ' Hz'
    }
  })

const topline_pattern = [
  `db5 f4 Gb4 db5 f4 Gb4 db5 f4`,
  `Gb4 db5 f4 Gb4 db5 f4 Gb4 db5`,
  `eb5 gb4 db5 eb5 gb4 db5 eb5 gb4`,
  `db5 eb5 gb4 db5 f5 ab4 db5 f5`,
]

$: note(pick("<0 1 2 3>", topline_pattern))
  .s("gm_fx_crystal,piano")
  .delay(0.25)
  .room(1)
  .rsize(2)
  .lpf(ref(() => filterValue))
  .sometimesBy(0.15, x => x.ply("2"))
  .sometimesBy(0.10, x => x.transpose("12"))
