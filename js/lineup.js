/* ---------- 타임테이블: 매시간 10분마다 본 행사, 접속한 모두가 같은 시각에 ---------- */
(function(){
const SLOT=[['lan',0,'대점등','🏮'],['tom',10,'토마토 대전','🍅'],['song',20,'물싸움','💧'],['holi',30,'색의 폭발','🎨'],['burn',40,'맨 태우기','🔥'],['dead',50,'영혼의 귀환','🦋']];
const LIVE_MS=20000,COUNT_S=10;
const $$=s=>document.querySelector(s);
const nowMs=()=>Date.now()+(window.FETE_OFFSET||0);
const nameOf=id=>FEST.find(f=>f.id===id).ko;
const p2=n=>String(n).padStart(2,'0');
function at(min,now){const h=Math.floor(now/3600000)*3600000;let t=h+min*60000;if(t+LIVE_MS<now)t+=3600000;return t}
function list(now){return SLOT.map(([id,min,ev,em])=>({id,ev,em,t:at(min,now)})).sort((a,b)=>a.t-b.t)}
function fmt(ms){const s=Math.max(0,Math.ceil(ms/1000));return p2(Math.floor(s/60))+':'+p2(s%60)}
const fired=new Set();let lastCount=-1,countFor=null;

function goTo(id){const i=worlds.findIndex(w=>w.f.id===id);if(i>=0){closeBoard();activate(i);hideHint()}}
/* 칩 */
const chip=$$('#lineup');chip.onclick=openBoard;
/* 보드 */
const board=$$('#board');
function openBoard(){renderBoard();board.hidden=false;try{ac()}catch(e){}}
function closeBoard(){board.hidden=true}
$$('#bclose').onclick=closeBoard;board.onclick=e=>{if(e.target===board)closeBoard()};
function renderBoard(){const now=nowMs(),rows=$$('#brows');rows.innerHTML='';
  list(now).forEach(o=>{const live=o.t<=now,b=document.createElement('button');b.className='br'+(live?' live':'')+(cur&&cur.f.id===o.id?' here':'');
    b.innerHTML='<span class="bm">:'+p2(new Date(o.t).getMinutes())+'</span><span class="be">'+o.em+'</span><span class="bx"><b>'+o.ev+'</b><small>'+nameOf(o.id)+'</small></span><span class="bs" data-t="'+o.t+'">'+(live?'지금!':fmt(o.t-now)+' 뒤')+'</span>';
    b.onclick=()=>goTo(o.id);rows.appendChild(b)})}
/* 큰 카운트다운 */
const cnt=$$('#count');
function showCount(n){cnt.textContent=n;cnt.classList.remove('on');void cnt.offsetWidth;cnt.classList.add('on');
  try{tone(n<=3?880:660,0,.18,.07)}catch(e){}try{navigator.vibrate&&navigator.vibrate(n<=3?25:8)}catch(e){}}

function tick(){const now=nowMs(),L=list(now),first=L[0],live=first.t<=now;
  chip.querySelector('.ln').textContent=(live?'지금 ':'다음 ')+first.em+' '+nameOf(first.id)+' '+first.ev;
  chip.querySelector('.lt').textContent=live?'LIVE':fmt(first.t-now);chip.classList.toggle('live',live);
  if(!board.hidden)board.querySelectorAll('.bs').forEach(s=>{const t=+s.dataset.t;s.textContent=t<=now?'지금!':fmt(t-now)+' 뒤'});
  const here=cur&&cur.f.id;
  L.forEach(o=>{const dt=o.t-now;
    /* 내가 있는 축제: 10초 카운트다운 → 본 행사 */
    if(o.id===here&&dt>0&&dt<=COUNT_S*1000){const n=Math.ceil(dt/1000);if(countFor!==o.t||n!==lastCount){if(countFor!==o.t){castClear();toast('곧 '+o.ev+'! 모두 함께 시작해요')}countFor=o.t;lastCount=n;showCount(n)}}
    if(dt<=0&&dt>-LIVE_MS&&!fired.has(o.t+o.id)){fired.add(o.t+o.id);
      if(o.id===here){cnt.classList.remove('on');if(cur.scene&&cur.scene.live)cur.scene.live()}
      else if(dt>-4000){const el=$$('#toast');el.innerHTML='지금 '+o.em+' '+nameOf(o.id)+' '+o.ev+'! <u>가기</u>';el.classList.add('on','tap');el.onclick=()=>{el.classList.remove('on','tap');goTo(o.id)};setTimeout(()=>el.classList.remove('on','tap'),6000)}}
  })}
/* 처음 들어오면 이미 지난 행사는 쏘지 않기 */
(function(){const now=nowMs();list(now).forEach(o=>{if(o.t<=now)fired.add(o.t+o.id)})})();
setInterval(tick,200);tick();
window.lineupTick=tick;
})();
