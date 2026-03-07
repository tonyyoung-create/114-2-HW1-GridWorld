// HW1-2 policy display and policy evaluation
(function(){
  const nInput = document.getElementById('nInput');
  const genBtn = document.getElementById('gen');
  const randBtn = document.getElementById('randPolicy');
  const evalBtn = document.getElementById('eval');
  const resetBtn = document.getElementById('reset');
  const valueEl = document.getElementById('value');
  const policyEl = document.getElementById('policy');

  let n = parseInt(nInput.value) || 6;
  let policy = [];
  let values = [];
  // optional: obstacles array, start/end
  let obstacles = new Array(n*n).fill(false);
  let terminal = null; // by default set bottom-right as terminal after generate

  function createGrid(){
    n = Math.max(3, Math.min(10, parseInt(nInput.value) || 6));
    policy = new Array(n*n).fill(null);
    values = new Array(n*n).fill(0);
    obstacles = new Array(n*n).fill(false);
    terminal = n*n - 1;
    renderMatrices();
  }

  function renderMatrices(){
    // value matrix
    valueEl.innerHTML = '';
    valueEl.style.gridTemplateColumns = `repeat(${n}, 48px)`;
    valueEl.style.gridTemplateRows = `repeat(${n}, 48px)`;
    valueEl.className = 'matrix';

    // policy matrix
    policyEl.innerHTML = '';
    policyEl.style.gridTemplateColumns = `repeat(${n}, 48px)`;
    policyEl.style.gridTemplateRows = `repeat(${n}, 48px)`;
    policyEl.className = 'matrix';

    for(let i=0;i<n*n;i++){
      const vcell = document.createElement('div'); vcell.className = 'mcell';
      const pcell = document.createElement('div'); pcell.className = 'mcell';
      if(obstacles[i]){ vcell.classList.add('ob'); pcell.classList.add('ob'); vcell.textContent='X'; pcell.textContent='X'; }
      else if(i===terminal){ vcell.classList.add('terminal'); pcell.classList.add('terminal'); vcell.textContent = formatV(values[i]); pcell.textContent = 'T'; }
      else {
        vcell.textContent = formatV(values[i]);
        pcell.innerHTML = policy[i] ? `<span class="policy-arrow">${arrowFor(policy[i])}</span>` : '-';
      }
      valueEl.appendChild(vcell);
      policyEl.appendChild(pcell);
    }
  }

  function arrowFor(a){ if(!a) return ''; switch(a){case 'U': return '↑'; case 'D': return '↓'; case 'L': return '←'; case 'R': return '→'} }
  function formatV(v){ if(v===null||v===undefined||Number.isNaN(v)) return '-'; return (Math.round(v*100)/100).toFixed(2); }

  function randomPolicy(){
    const acts = ['U','D','L','R'];
    for(let i=0;i<n*n;i++){
      if(obstacles[i] || i===terminal) { policy[i] = null; continue; }
      policy[i] = acts[Math.floor(Math.random()*acts.length)];
    }
    renderMatrices();
  }

  function evaluatePolicy(){
    const N = n*n;
    const gamma = 0.9;
    const Rstep = -1;
    // initialize values; obstacles => NaN
    values = new Array(N).fill(0);
    for(let i=0;i<N;i++) if(obstacles[i]) values[i] = NaN;
    if(terminal !== null) values[terminal] = 0;

    function nextState(s,a){
      const r = Math.floor(s / n), c = s % n;
      let nr=r, nc=c;
      if(a==='U') nr = Math.max(0, r-1);
      if(a==='D') nr = Math.min(n-1, r+1);
      if(a==='L') nc = Math.max(0, c-1);
      if(a==='R') nc = Math.min(n-1, c+1);
      const ns = nr*n + nc;
      if(obstacles[ns]) return s; // bump
      return ns;
    }

    for(let it=0; it<1000; it++){
      let delta = 0;
      const Vnew = values.slice();
      for(let s=0;s<N;s++){
        if(obstacles[s]) continue;
        if(s===terminal){ Vnew[s]=0; continue; }
        const a = policy[s];
        if(!a) continue; // skip undefined policy
        const s2 = nextState(s,a);
        const v = Rstep + gamma * (Number.isNaN(values[s2]) ? 0 : values[s2]);
        Vnew[s] = v;
        delta = Math.max(delta, Math.abs(Vnew[s]-values[s]));
      }
      for(let i=0;i<N;i++) if(!Number.isNaN(Vnew[i])) values[i]=Vnew[i];
      if(delta < 1e-4) break;
    }

    renderMatrices();
  }

  genBtn.addEventListener('click', ()=>{ createGrid(); });
  randBtn.addEventListener('click', ()=>{ randomPolicy(); });
  evalBtn.addEventListener('click', ()=>{ evaluatePolicy(); });
  resetBtn.addEventListener('click', ()=>{ createGrid(); });

  // create initial
  createGrid();

})();
