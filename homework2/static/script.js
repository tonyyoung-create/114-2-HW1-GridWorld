// HW1-2 policy display and policy evaluation with interactive start/end/obstacle
(function () {
  const nInput = document.getElementById('nInput');
  const genBtn = document.getElementById('gen');
  const randBtn = document.getElementById('randPolicy');
  const optBtn = document.getElementById('optPolicy');
  const evalBtn = document.getElementById('eval');
  const resetBtn = document.getElementById('reset');
  const valueEl = document.getElementById('value');
  const policyEl = document.getElementById('policy');

  let n = parseInt(nInput.value) || 6;
  let policy = [];
  let values = [];
  let obstacles = [];
  let terminal = null;
  let start = null;
  let mode = 'start'; // default click mode
  let obsCount = 0;
  let maxObstacles = 0;
  let reachable = [];
  let debugOn = false;

  // inject small UI for mode selection
  function injectModeControls() {
    // if mode container already exists in HTML, attach listeners only
    let container = document.getElementById('modeContainer');
    if (!container) {
      container = document.createElement('div');
      container.style.marginLeft = '12px';
      container.innerHTML = `
        <label><input type="radio" name="mode" value="start" checked> Set Start</label>
        <label style="margin-left:8px"><input type="radio" name="mode" value="end"> Set End</label>
        <label style="margin-left:8px"><input type="radio" name="mode" value="obs"> Toggle Obstacle</label>
        <label style="margin-left:8px"><input type="radio" name="mode" value="clear"> Clear</label>
      `;
      genBtn.parentNode.appendChild(container);
    }
    // debug toggle button (single)
    if (!document.getElementById('dbgBtn')) {
      const dbgBtn = document.createElement('button'); dbgBtn.id = 'dbgBtn'; dbgBtn.textContent = 'Debug Overlay'; dbgBtn.style.background = '#ef4444'; dbgBtn.style.marginLeft = '8px';
      dbgBtn.addEventListener('click', () => { debugOn = !debugOn; dbgBtn.style.opacity = debugOn ? '0.9' : '1'; renderMatrices(); if (debugOn) reportDebug(); });
      genBtn.parentNode.appendChild(dbgBtn);
    }
    container.addEventListener('change', () => { mode = container.querySelector('input[name=mode]:checked').value; });
  }

  function clampN() {
    n = Math.max(5, Math.min(9, parseInt(nInput.value) || 6));
    nInput.value = n;
  }

  function createGrid() {
    clampN();
    policy = new Array(n * n).fill(null);
    values = new Array(n * n).fill(0);
    obstacles = new Array(n * n).fill(false);
    terminal = n * n - 1;
    start = 0;
    obsCount = 0;
    maxObstacles = Math.max(0, n - 2);
    computeReachable();
    renderMatrices();
    updateObsInfo();
  }

  // BFS from terminal to mark reachable states (those that can reach terminal without crossing obstacles)
  function computeReachable() {
    reachable = new Array(n * n).fill(false);
    if (terminal === null) return reachable;
    if (obstacles[terminal]) return reachable; // terminal blocked
    const q = [terminal];
    const seen = new Set([terminal]);
    while (q.length) {
      const s = q.shift();
      reachable[s] = true;
      const r = Math.floor(s / n), c = s % n;
      const neigh = [];
      if (r > 0) neigh.push((r - 1) * n + c);
      if (r < n - 1) neigh.push((r + 1) * n + c);
      if (c > 0) neigh.push(r * n + (c - 1));
      if (c < n - 1) neigh.push(r * n + (c + 1));
      for (const t of neigh) {
        if (obstacles[t]) continue;
        if (!seen.has(t)) { seen.add(t); q.push(t); }
      }
    }
    return reachable;
  }

  // compute shortest (BFS) distance in steps from each reachable cell to terminal
  function computeDistance() {
    const N = n * n;
    const dist = new Array(N).fill(Infinity);
    if (terminal === null) return dist;
    if (obstacles[terminal]) return dist;
    const q = [terminal]; dist[terminal] = 0;
    const seen = new Set([terminal]);
    while (q.length) {
      const s = q.shift();
      const r = Math.floor(s / n), c = s % n;
      const neigh = [];
      if (r > 0) neigh.push((r - 1) * n + c);
      if (r < n - 1) neigh.push((r + 1) * n + c);
      if (c > 0) neigh.push(r * n + (c - 1));
      if (c < n - 1) neigh.push(r * n + (c + 1));
      for (const t of neigh) {
        if (obstacles[t]) continue;
        if (!seen.has(t)) { seen.add(t); q.push(t); dist[t] = dist[s] + 1; }
      }
    }
    return dist;
  }

  function renderMatrices() {
    // prepare layout
    valueEl.innerHTML = '';
    valueEl.style.gridTemplateColumns = `repeat(${n}, 48px)`;
    valueEl.style.gridTemplateRows = `repeat(${n}, 48px)`;
    valueEl.className = 'matrix';

    policyEl.innerHTML = '';
    policyEl.style.gridTemplateColumns = `repeat(${n}, 48px)`;
    policyEl.style.gridTemplateRows = `repeat(${n}, 48px)`;
    policyEl.className = 'matrix';

    // ensure reachability is current
  computeReachable();
  const dist = computeDistance();

    for (let i = 0; i < n * n; i++) {
      const vcell = document.createElement('div'); vcell.className = 'mcell';
      const pcell = document.createElement('div'); pcell.className = 'mcell';

      if (obstacles[i]) {
        vcell.classList.add('ob'); pcell.classList.add('ob'); vcell.textContent = 'X'; pcell.textContent = 'X';
        vcell.title = 'obstacle';
      } else if (!reachable[i] && terminal !== null) {
        // unreachable cell (cannot reach terminal)
        vcell.textContent = '-'; pcell.textContent = '-';
        vcell.style.opacity = '0.6'; pcell.style.opacity = '0.6';
      } else if (i === terminal) {
        vcell.classList.add('terminal'); pcell.classList.add('terminal'); vcell.textContent = formatV(values[i]); pcell.textContent = 'T';
      } else if (i === start) {
        vcell.classList.add('start'); pcell.textContent = 'S'; vcell.textContent = formatV(values[i]);
        vcell.title = `start (dist=${dist[i]===Infinity?'-':dist[i]})`;
      } else {
        vcell.textContent = formatV(values[i]);
        pcell.innerHTML = policy[i] ? `<span class="policy-arrow">${arrowFor(policy[i])}</span>` : '-';
        // debug: tooltip with distance and policy
        if(debugOn){ vcell.title = `dist=${dist[i]===Infinity?'-':dist[i]}\npolicy=${policy[i]||'-'}\nreachable=${reachable[i]}` }
      }

      // attach click handler to allow mode-based edits
      vcell.dataset.idx = i; pcell.dataset.idx = i;
      vcell.addEventListener('click', onGridClick);
      pcell.addEventListener('click', onGridClick);

      valueEl.appendChild(vcell);
      policyEl.appendChild(pcell);
    }
    // highlight any self-loop policies when debugOn
    if(debugOn){
      for(let s=0;s<n*n;s++){
        const a = policy[s]; if(!a) continue; const s2 = nextState(s,a);
        if(s2===s){ const nodes = valueEl.children[s]; if(nodes) nodes.classList.add('selfloop'); }
      }
    }
  }

  function updateObsInfo() {
    const el = document.getElementById('obsRemain');
    if (!el) return;
    el.textContent = `${maxObstacles - obsCount}`;
  }

  function onGridClick(e) {
    const idx = parseInt(e.currentTarget.dataset.idx);
    if (mode === 'start') {
      start = idx;
      if (start === terminal) terminal = null;
    } else if (mode === 'end') {
      terminal = idx; if (terminal === start) start = null;
    } else if (mode === 'obs') {
      if (idx === start || idx === terminal) return;
      // toggle obstacle with max limit
      if (!obstacles[idx]) {
        if (obsCount >= maxObstacles) { alert(`Maximum obstacles reached (${maxObstacles}).`); return; }
        obstacles[idx] = true; obsCount++;
      } else { obstacles[idx] = false; obsCount--; }
    } else if (mode === 'clear') {
      if (idx === start) start = null; if (idx === terminal) terminal = null; if (obstacles[idx]) { obstacles[idx] = false; obsCount--; }
      policy[idx] = null; values[idx] = 0;
    }

    // recompute reachability and re-render
    computeReachable();
    renderMatrices();
    updateObsInfo();
  }

  function arrowFor(a) { if (!a) return ''; switch (a) { case 'U': return '↑'; case 'D': return '↓'; case 'L': return '←'; case 'R': return '→'; } }
  function formatV(v) { if (v === null || v === undefined || Number.isNaN(v)) return '-'; return (Math.round(v * 100) / 100).toFixed(2); }

  function nextState(s, a) {
    const r = Math.floor(s / n), c = s % n; let nr = r, nc = c;
    if (a === 'U') nr = Math.max(0, r - 1);
    if (a === 'D') nr = Math.min(n - 1, r + 1);
    if (a === 'L') nc = Math.max(0, c - 1);
    if (a === 'R') nc = Math.min(n - 1, c + 1);
    const ns = nr * n + nc; if (obstacles[ns]) return s; return ns;
  }

  function randomPolicy() {
    const acts = ['U', 'D', 'L', 'R'];
    computeReachable();
    const dist = computeDistance();
    for (let i = 0; i < n * n; i++) {
      if (obstacles[i] || i === terminal) { policy[i] = null; continue; }
      if (!reachable[i]) { policy[i] = null; continue; }
      // pick only actions that actually move the agent (avoid self-loop) when possible
      const valid = [];
      for (const a of acts) {
        const s2 = nextState(i, a);
        if (s2 !== i && reachable[s2]) valid.push(a);
      }
      if (valid.length === 0) {
        for (const a of acts) { const s2 = nextState(i, a); if (s2 !== i) valid.push(a); }
      }
      // prefer actions that reduce BFS distance to terminal (greedy with randomness)
      if (valid.length > 0 && dist[i] !== Infinity) {
        const best = []; let bestd = Infinity;
        for (const a of valid) { const s2 = nextState(i, a); const d = dist[s2]; if (d < bestd) { bestd = d; best.length = 0; best.push(a); } else if (d === bestd) best.push(a); }
        policy[i] = best.length > 0 ? best[Math.floor(Math.random() * best.length)] : valid[Math.floor(Math.random() * valid.length)];
      } else {
        policy[i] = valid.length > 0 ? valid[Math.floor(Math.random() * valid.length)] : null;
      }
    }
    renderMatrices(); updateObsInfo();
  }

  function reportDebug(){
    console.log('reachable:', reachable);
    console.log('policy:', policy);
    console.log('values (sample):', values.slice(0, Math.min(values.length, 36)));
    console.log('distances:', computeDistance());
    const loops = [];
    for(let s=0;s<n*n;s++){ const a = policy[s]; if(!a) continue; const s2 = nextState(s,a); if(s2===s) loops.push(s); }
    console.log('self-loop states:', loops);
    if(loops.length) alert('Debug: found self-loop policies at indices: ' + loops.join(','));
  }

  // compute optimal policy via value iteration (only on reachable cells)
  function computeOptimalPolicy() {
    const N = n * n; const gamma = 0.9; const R = -1;
    computeReachable();
    let V = new Array(N).fill(NaN);
    // initialize V for reachable cells
    for (let i = 0; i < N; i++) {
      if (obstacles[i]) V[i] = NaN;
      else if (reachable[i]) V[i] = 0;
    }
    if (terminal !== null) V[terminal] = 0;

    // use Gauss-Seidel (in-place) updates and initialize V using distance heuristic to help convergence
    const dist = computeDistance();
    for (let s = 0; s < N; s++) { if (reachable[s] && !obstacles[s] && Number.isFinite(dist[s])) V[s] = R * dist[s]; }
    for (let it = 0; it < 2000; it++) {
      let delta = 0;
      for (let s = 0; s < N; s++) {
        if (!reachable[s] || obstacles[s]) continue; if (s === terminal) { V[s] = 0; continue; }
        let best = -Infinity;
        for (const a of ['U', 'D', 'L', 'R']) {
          const s2 = nextState(s, a);
          if (!reachable[s2]) continue;
          const val = R + gamma * (Number.isNaN(V[s2]) ? 0 : V[s2]);
          if (val > best) best = val;
        }
        const newv = (best === -Infinity) ? NaN : best;
        delta = Math.max(delta, Math.abs((newv || 0) - (V[s] || 0)));
        V[s] = newv;
      }
      if (delta < 1e-4) break;
    }

    // extract greedy policy
    for (let s = 0; s < N; s++) {
      if (!reachable[s] || obstacles[s] || s === terminal) { policy[s] = null; continue; }
      let best = -Infinity; let besta = null;
      // prefer non-self-loop actions
      for (const a of ['U', 'D', 'L', 'R']) {
        const s2 = nextState(s, a);
        if (s2 === s) continue;
        if (!reachable[s2]) continue;
        const val = R + gamma * (Number.isNaN(V[s2]) ? -Infinity : V[s2]);
        if (val > best) { best = val; besta = a; }
      }
        if (besta === null) {
          // second pass: still prefer non-self-loop actions — do NOT accept self-loop
          for (const a of ['U', 'D', 'L', 'R']) {
            const s2 = nextState(s, a);
            if (s2 === s) continue; // disallow self-loop
            if (!reachable[s2]) continue;
            const val = R + gamma * (Number.isNaN(V[s2]) ? -Infinity : V[s2]);
            if (val > best) { best = val; besta = a; }
          }
        }
        // if besta still null, leave policy null to avoid self-loop policies
        policy[s] = besta === null ? null : besta;
    }

    values = V.slice();
    renderMatrices(); updateObsInfo();
  }

  function evaluatePolicy() {
    const N = n * n; const gamma = 0.9; const Rstep = -1;
    computeReachable();
    const dist = computeDistance();
    values = new Array(N).fill(NaN);
    for (let i = 0; i < N; i++) if (reachable[i] && !obstacles[i] && Number.isFinite(dist[i])) values[i] = Rstep * dist[i];
    if (terminal !== null) values[terminal] = 0;

    for (let it = 0; it < 2000; it++) {
      let delta = 0;
      for (let s = 0; s < N; s++) {
        if (!reachable[s] || obstacles[s]) continue; if (s === terminal) { values[s] = 0; continue; }
        const a = policy[s]; if (!a) continue; const s2 = nextState(s, a);
        if (!reachable[s2]) continue; // if action goes outside reachable set, skip
        const v = Rstep + gamma * (Number.isNaN(values[s2]) ? 0 : values[s2]);
        delta = Math.max(delta, Math.abs((v || 0) - (values[s] || 0)));
        values[s] = v;
      }
      if (delta < 1e-4) break;
    }
    renderMatrices(); updateObsInfo();
  }

  genBtn.addEventListener('click', () => { createGrid(); });
  randBtn.addEventListener('click', () => { randomPolicy(); });
  if (optBtn) optBtn.addEventListener('click', () => { computeOptimalPolicy(); });
  evalBtn.addEventListener('click', () => { evaluatePolicy(); });
  resetBtn.addEventListener('click', () => { createGrid(); });

  injectModeControls();
  createGrid();
  updateObsInfo();

})();
