/* FÊTE · 축제에 다녀오는 5분 — 이펭 (프로토타입) */
(()=>{
const $=s=>document.querySelector(s);
const R=(a,b)=>a+Math.random()*(b-a);
const GUIDE='쁘아 · 치앙마이 친구';

/* ---------- 이야기 ---------- */
const STORY=[
 {place:['Chiang Mai','해 질 녘, 핑강 가'],bg:'img/yi-peng-river.jpg',kb:'kb-in',fx:'fireflies',lines:[
   {t:'어서 와요. 여긴 태국 북부, 치앙마이예요.'},
   {t:'오늘은 일 년 중 달이 가장 밝다는 밤이에요. 이 동네 말로 ‘이펭’이라고 해요.',note:'‘이’는 둘째, ‘펭’은 보름. 옛 란나 달력으로 둘째 달 보름이라는 뜻이에요.'},
   {t:'스님들도, 동네 꼬마들도 다 작은 불빛을 하나씩 들고 나와요.'}]},
 {place:['Wat','절 마당'],vid:'video/yi-peng-loop',img:'img/yi-peng.jpg',kb:'kb-up',fx:'embers',lines:[
   {t:'저 하늘에 떠 있는 게 ‘콤 로이’예요. ‘띄우는 등’이라는 뜻이에요.'},
   {t:'대나무 테에 얇은 종이를 씌우고, 바닥에 작은 연료를 달아요. 불을 붙이면 뜨거운 공기로 떠올라요.'},
   {t:'사람들은 여기에 지난 일 년의 걱정과 불운을 실어서, 하늘로 보내요.'}]},
 {bg:'img/yi-peng.jpg',kb:'kb-in',blur:true,held:true,fx:'embers',lines:[
   {t:'자, 이건 당신 거예요.'},
   {t:'보내고 싶은 걱정을 하나, 손가락으로 적어 봐요. 아무도 안 봐요.',gesture:'write'},
   {t:'좋아요. 이제 그건 당신 걱정이 아니라, 등불 거예요.'}]},
 {bg:'img/yi-peng.jpg',kb:'kb-in',blur:true,held:true,fx:'embers',lines:[
   {t:'바닥 심지에 불을 붙였어요. 꾹 누르고, 공기가 찰 때까지 기다려요.',gesture:'hold'}]},
 {bg:'img/yi-peng.jpg',kb:'kb-up',fx:'rise',lines:[
   {t:'보세요. 올라가요.',auto:3600},
   {t:'다들 한꺼번에 띄워요. 이 순간엔 이상하게, 다들 조용해져요.',vid:'video/yi-peng-event'},
   {t:'불이 꺼지기 전에 등불이 눈에서 사라지면, 행운이 온다고들 해요.'}]},
 {place:['Mae Ping','같은 밤, 강가'],vid:'video/yi-peng-loop',img:'img/yi-peng.jpg',kb:'kb-out',fx:'fireflies',lines:[
   {t:'같은 밤, 강에는 바나나 잎으로 접은 작은 배 ‘끄라통’도 띄워요. 태국 전역에서 열리는 러이끄라통이에요.'},
   {t:'아, 요즘 치앙마이 시내에선 등불을 마음대로 못 날려요. 2015년부터 비행기 안전 때문에 막혔거든요.'},
   {t:'그래서 지금은 정해진 행사장에서, 정해진 시간에, 다 같이 띄워요.'},
   {t:'올해 진짜 이펭은 11월 24일과 25일이에요. 언젠가는 진짜로도 와요.',end:true}]}
];

/* ---------- 소리 (임시 합성 앰비언스) ---------- */
let AC=null,master=null,muted=false;
function audio(){if(AC)return;try{AC=new (window.AudioContext||window.webkitAudioContext)();master=AC.createGain();master.gain.value=.0;master.connect(AC.destination);master.gain.linearRampToValueAtTime(.9,AC.currentTime+3);pad();crickets()}catch(e){}}
function pad(){const g=AC.createGain();g.gain.value=.05;const f=AC.createBiquadFilter();f.type='lowpass';f.frequency.value=900;g.connect(f);f.connect(master);
  [146.8,220,277.2,329.6].forEach((fr,i)=>{const o=AC.createOscillator();o.type=i%2?'sine':'triangle';o.frequency.value=fr;o.detune.value=R(-6,6);const lg=AC.createGain();lg.gain.value=.25;
    const l=AC.createOscillator();l.frequency.value=R(.05,.12);const la=AC.createGain();la.gain.value=.18;l.connect(la);la.connect(lg.gain);l.start();o.connect(lg);lg.connect(g);o.start()})}
function noiseBuf(){const b=AC.createBuffer(1,AC.sampleRate*.2,AC.sampleRate),d=b.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;return b}
let NB=null;function crickets(){NB=noiseBuf();const chirp=()=>{if(!AC)return;const t=AC.currentTime;for(let k=0;k<3;k++){const s=AC.createBufferSource();s.buffer=NB;const f=AC.createBiquadFilter();f.type='bandpass';f.frequency.value=R(4200,5200);f.Q.value=18;const g=AC.createGain();
    g.gain.setValueAtTime(0,t+k*.07);g.gain.linearRampToValueAtTime(.12,t+k*.07+.01);g.gain.linearRampToValueAtTime(0,t+k*.07+.05);s.connect(f);f.connect(g);g.connect(master);s.start(t+k*.07);s.stop(t+k*.07+.06)}
    setTimeout(chirp,R(700,2600))};chirp()}
function bell(f0,v){if(!AC)return;const t=AC.currentTime;[1,2.76,5.4].forEach((m,i)=>{const o=AC.createOscillator();o.frequency.value=f0*m;const g=AC.createGain();g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime((v||.06)/(i+1),t+.01);g.gain.exponentialRampToValueAtTime(.0001,t+3.2/(i+1));o.connect(g);g.connect(master);o.start(t);o.stop(t+3.5)})}
function whoosh(dur,v){if(!AC)return;const t=AC.currentTime,s=AC.createBufferSource();const b=AC.createBuffer(1,AC.sampleRate*dur,AC.sampleRate),d=b.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;s.buffer=b;
  const f=AC.createBiquadFilter();f.type='bandpass';f.frequency.setValueAtTime(300,t);f.frequency.linearRampToValueAtTime(900,t+dur);const g=AC.createGain();g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v||.08,t+dur*.5);g.gain.linearRampToValueAtTime(0,t+dur);s.connect(f);f.connect(g);g.connect(master);s.start()}
$('#snd').onclick=()=>{muted=!muted;if(master)master.gain.linearRampToValueAtTime(muted?0:.9,AC.currentTime+.4);$('#snd').textContent=muted?'소리 켜기':'소리 끄기'};
const vib=p=>{try{navigator.vibrate&&navigator.vibrate(p)}catch(e){}};

/* ---------- 장면 레이어 ---------- */
let front=$('#L1'),back=$('#L2');
function scene(c,over){const L=back;L.className='layer '+(c.kb||'');L.innerHTML='';
  const im=document.createElement('img');im.src=c.img||c.bg;im.alt='';L.appendChild(im);
  const vs=over||c.vid;if(vs){const v=document.createElement('video');v.muted=true;v.playsInline=true;v.setAttribute('playsinline','');v.autoplay=true;v.loop=!over;
    [['.mp4','video/mp4'],['.webm','video/webm']].forEach(([e,t])=>{const s=document.createElement('source');s.src=vs+e;s.type=t;v.appendChild(s)});v.style.opacity=0;v.style.transition='opacity 1.2s';
    v.addEventListener('playing',()=>v.style.opacity=1,{once:true});L.appendChild(v);const p=v.play();p&&p.catch&&p.catch(()=>{});
    if(over)v.addEventListener('ended',()=>{v.style.transition='opacity 2.4s';v.style.opacity=.0})}
  L.querySelectorAll('img,video').forEach(e=>e.style.filter=c.blur?'blur(5px) brightness(.62)':'');
  const old=front;requestAnimationFrame(()=>{L.classList.add('on');old.classList.remove('on')});front=L;back=old}

/* ---------- 대사 ---------- */
let ci=-1,li=-1,typing=false,waiting=null,gest=null;
const lineEl=$('#line'),whoEl=$('#who'),noteEl=$('#note'),nextEl=$('#next');
function showLine(L){typing=true;nextEl.classList.remove('on');noteEl.classList.remove('on');whoEl.style.opacity=1;whoEl.textContent=GUIDE;
  lineEl.innerHTML=L.t.split(' ').map(w=>'<span class="w">'+w+'</span>').join(' ');
  const ws=[...lineEl.querySelectorAll('.w')];ws.forEach((w,i)=>setTimeout(()=>w.classList.add('v'),i*70));
  setTimeout(()=>{typing=false;if(L.note){noteEl.textContent=L.note;noteEl.classList.add('on')}
    if(L.gesture)startGesture(L.gesture);else if(L.auto)setTimeout(advance,L.auto);else nextEl.classList.add('on')},ws.length*70+400);
  if(L.vid)scene(STORY[ci],L.vid)}
function chapter(i){ci=i;li=-1;const c=STORY[i];
  document.querySelectorAll('#chap i').forEach((e,k)=>e.classList.toggle('on',k<=i));
  scene(c);fxMode=c.fx||'';$('#held').classList.toggle('on',!!c.held);
  const pl=$('#place');if(c.place){pl.querySelector('.p1').textContent=c.place[0];pl.querySelector('.p2').textContent=c.place[1];pl.classList.add('on');setTimeout(()=>pl.classList.remove('on'),4200)}
  bell(523.25,.04);if(c.fx==='rise')startRise();
  setTimeout(advance,c.place?1400:600)}
function advance(){if(gest)return;const c=STORY[ci];li++;
  if(li>=c.lines.length){if(ci+1<STORY.length)chapter(ci+1);return}
  const L=c.lines[li];showLine(L);if(L.end)setTimeout(()=>{nextEl.classList.remove('on');waiting='end'},2000)}
function tap(){if(gest)return;if(typing){lineEl.querySelectorAll('.w').forEach(w=>w.classList.add('v'));return}
  if(waiting==='end'){finish();return}if(nextEl.classList.contains('on'))advance()}

/* ---------- 제스처 ---------- */
const cue=t=>{const c=$('#cue');c.textContent=t||'';c.classList.toggle('on',!!t)};
const ink=$('#ink'),ig=ink.getContext('2d');ig.lineCap='round';ig.lineJoin='round';
let inkLen=0,lastP=null,heat=0,holding=false;
function startGesture(k){gest=k;nextEl.classList.remove('on');
  if(k==='write'){cue('등불 종이 위에 손가락으로 적어요');inkLen=0}
  if(k==='hold'){cue('꾹 누르고 기다려요');heat=0}}
function inkPos(e){const r=ink.getBoundingClientRect();return{x:(e.clientX-r.left)/r.width*ink.width,y:(e.clientY-r.top)/r.height*ink.height}}
const G=$('#gest');
G.addEventListener('pointerdown',e=>{audio();if(!gest){tap();return}G.setPointerCapture(e.pointerId);
  if(gest==='write'){lastP=inkPos(e)}
  if(gest==='hold'){holding=true;cue('');whoosh(4.5,.06)}});
G.addEventListener('pointermove',e=>{if(gest!=='write'||!lastP)return;const p=inkPos(e);ig.strokeStyle='rgba(70,40,25,.9)';ig.lineWidth=5;ig.beginPath();ig.moveTo(lastP.x,lastP.y);ig.lineTo(p.x,p.y);ig.stroke();inkLen+=Math.hypot(p.x-lastP.x,p.y-lastP.y);lastP=p;
  if(inkLen>120)$('#done').classList.add('on')});
const up=()=>{lastP=null;if(gest==='hold'&&holding){holding=false;if(heat>=1)release();else{cue('조금만 더 꾹');}}};
G.addEventListener('pointerup',up);G.addEventListener('pointercancel',up);
$('#done').onclick=()=>{$('#done').classList.remove('on');cue('');gest=null;bell(659.3,.05);vib(15);advance()};
function release(){gest=null;cue('');vib([20,40,20]);bell(392,.06);setTimeout(()=>bell(587.3,.05),220);$('#held').classList.remove('on');advance()}

/* ---------- 효과 캔버스 ---------- */
const fx=$('#fx'),fc=fx.getContext('2d');let W=0,H=0,D=1,fxMode='',parts=[],rise=null,lastT=performance.now();
function fit(){const r=fx.getBoundingClientRect();D=Math.min(2,devicePixelRatio||1);W=r.width;H=r.height;fx.width=W*D;fx.height=H*D;fc.setTransform(D,0,0,D,0,0)}
addEventListener('resize',fit);fit();
const LIT=new Image();LIT.src='img/props/lantern-unlit.png';
function startRise(){const r=$('#held').getBoundingClientRect(),a=$('#app').getBoundingClientRect();rise={x:r.left-a.left+r.width/2,y:r.top-a.top+r.height/2,w:r.width,t:0,dx:R(-1,1)*W*.12}}
function glow(x,y,r,c,a){const g=fc.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,'rgba('+c+','+a+')');g.addColorStop(1,'rgba('+c+',0)');fc.fillStyle=g;fc.fillRect(x-r,y-r,r*2,r*2)}
function loop(t){const dt=Math.min(.05,(t-lastT)/1000);lastT=t;requestAnimationFrame(loop);fc.clearRect(0,0,W,H);
  if((fxMode==='fireflies'&&parts.length<26&&Math.random()<dt*6))parts.push({x:R(0,W),y:R(H*.35,H*.85),vx:R(-8,8),vy:R(-6,3),l:R(3,6),age:0,ph:R(0,6),k:'ff'});
  if((fxMode==='embers'||fxMode==='rise')&&parts.length<40&&Math.random()<dt*10)parts.push({x:R(0,W),y:H+10,vx:R(-10,10),vy:-R(18,40),l:R(5,9),age:0,ph:R(0,6),k:'em'});
  fc.globalCompositeOperation='lighter';
  for(let i=parts.length-1;i>=0;i--){const p=parts[i];p.age+=dt;if(p.age>p.l){parts.splice(i,1);continue}p.x+=p.vx*dt+Math.sin(t/900+p.ph)*.25;p.y+=p.vy*dt;const a=Math.sin(Math.PI*p.age/p.l);
    if(p.k==='ff'){const f=.5+.5*Math.sin(t/300+p.ph*3);glow(p.x,p.y,10,'255,226,140',.5*a*f);fc.fillStyle='rgba(255,246,200,'+(.9*a*f)+')';fc.beginPath();fc.arc(p.x,p.y,1.4,0,7);fc.fill()}
    else{glow(p.x,p.y,7,'255,170,90',.35*a);fc.fillStyle='rgba(255,220,170,'+(.8*a)+')';fc.beginPath();fc.arc(p.x,p.y,1.1,0,7);fc.fill()}}
  /* 손에 든 등불: 누르면 불이 붙고 부풀어요 */
  const held=$('#held');
  if(gest==='hold'){if(holding){heat=Math.min(1,heat+dt/4.2);vib(0)}else heat=Math.max(0,heat-dt*.15);
    const un=held.querySelector('.un');un.style.filter='sepia('+heat+') saturate('+(1+1.6*heat)+') brightness('+(1+.45*heat)+') hue-rotate(-20deg) drop-shadow(0 0 '+(30*heat)+'px rgba(255,150,60,'+(.8*heat)+'))';held.style.transform='translate(-50%,-50%) scale('+(.92+.1*heat)+') translateY('+(-heat*10)+'px)';
    const r=held.getBoundingClientRect(),a=$('#app').getBoundingClientRect();glow(r.left-a.left+r.width/2,r.top-a.top+r.height*.62,r.width*(.4+.9*heat),'255,150,60',.5*heat);
    if(heat>=1&&holding)cue('이제, 놓아주세요');}
  /* 띄운 등불 */
  if(rise&&LIT.complete){rise.t+=dt;const k=Math.min(1,rise.t/9),e=1-Math.pow(1-k,1.7),w=rise.w*(1-.9*e),h=w*420/365,x=rise.x+rise.dx*e+Math.sin(rise.t*1.3)*6*(1-e),y=rise.y-(rise.y+H*.1)*e*.95,al=k<.85?1:Math.max(0,1-(k-.85)/.15);
    glow(x,y+h*.1,w*1.6,'255,150,60',.5*al);fc.globalCompositeOperation='source-over';fc.globalAlpha=al;fc.filter='sepia(1) saturate(2.6) brightness(1.45) hue-rotate(-20deg)';fc.drawImage(LIT,x-w/2,y-h/2,w,h);fc.filter='none';fc.drawImage(ink,x-w*.32,y-h*.24,w*.64,h*.42);fc.globalAlpha=1;fc.globalCompositeOperation='lighter';glow(x,y+h*.35,w*.2,'255,230,170',.8*al);if(k>=1)rise=null}
  fc.globalCompositeOperation='source-over'}
requestAnimationFrame(loop);

/* ---------- 시작 / 끝 ---------- */
STORY.forEach(()=>$('#chap').appendChild(document.createElement('i')));
$('#go').onclick=()=>{audio();$('#start').classList.add('off');setTimeout(()=>chapter(0),900)};
function dday(){const t=new Date(),a=new Date(t.getFullYear(),t.getMonth(),t.getDate()),e=new Date(2026,10,24);const d=Math.round((e-a)/864e5);return d>0?'진짜 이펭까지 D-'+d:d===0?'오늘 진짜 이펭이 열려요':''}
function finish(){waiting=null;nextEl.classList.remove('on');const w=$('#wishcopy').getContext('2d');w.clearRect(0,0,300,200);w.filter='invert(1) sepia(1) saturate(.4) brightness(1.1)';w.drawImage(ink,0,0);w.filter='none';
  $('#dday').textContent=dday();$('#end').classList.add('on');bell(392,.05);setTimeout(()=>bell(523.25,.05),300)}
$('#again').onclick=()=>{$('#end').classList.remove('on');ig.clearRect(0,0,ink.width,ink.height);rise=null;heat=0;$('#held').querySelector('.un').style.filter='';$('#held').style.transform='';chapter(0)};
})();
