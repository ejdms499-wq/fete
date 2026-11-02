const $=s=>document.querySelector(s);
const R=(a,b)=>a+Math.random()*(b-a);
const FEST=[
 {id:'lan',ko:'이펭 등불축제',en:'Yi Peng',where:'태국 치앙마이',mat:'종이와 나무, 안에서 나오는 불빛',c:'#ffb347',fact:'등불에 걱정과 불운을 담아 하늘로 보낸다고 믿어요.',ph:'소원을 적어보세요',btn:'띄우기',unit:'모은 등불'},
 {id:'dead',ko:'죽은 자의 날',en:'Día de Muertos',where:'멕시코',mat:'설탕 반죽과 진짜 금잔화',c:'#ff9a1f',fact:'금잔화 꽃길이 영혼이 집을 찾아오는 길이 된다고 믿어요.',ph:'기억하고 싶은 이름',btn:'켜기',unit:'기억'},
 {id:'tom',ko:'라 토마티나',en:'La Tomatina',where:'스페인 부뇰',mat:'방울토마토 인물과 소금빛 건물',c:'#ff4a36',fact:'트럭 여러 대분의 토마토가 풀리고, 약 한 시간 던진 뒤 소방차가 거리를 씻어내요.',unit:'토마토'},
 {id:'burn',ko:'버닝맨',en:'Burning Man',where:'미국 네바다 사막',mat:'골판지와 철사',c:'#ff7a3d',locked:1},
 {id:'holi',ko:'홀리',en:'Holi',where:'인도 · 네팔',mat:'색분필 가루',c:'#ff48b0',locked:1},
 {id:'song',ko:'송끄란',en:'Songkran',where:'태국',mat:'유리와 물방울',c:'#3ec9ff',locked:1}
];
const OPEN=FEST.filter(f=>!f.locked);
let seen={};try{seen=JSON.parse(localStorage.getItem('fete3-seen')||'{}')}catch(e){}
const saveSeen=()=>{try{localStorage.setItem('fete3-seen',JSON.stringify(seen))}catch(e){}};
function renderDots(){const d=$('#dots');d.innerHTML='';OPEN.forEach(f=>{const s=document.createElement('span');s.className='dot'+(seen[f.id]?' on':'');s.style.setProperty('--c',f.c);d.appendChild(s)})}
/* sound */
let AC=null;
function ac(){if(!AC){try{AC=new (window.AudioContext||window.webkitAudioContext)()}catch(e){return null}}try{AC.resume()}catch(e){}return AC}
function noise(dur,type,freq,gain){const a=ac();if(!a)return;try{const n=a.sampleRate*dur,b=a.createBuffer(1,n,a.sampleRate),d=b.getChannelData(0);for(let i=0;i<n;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/n,3);const s=a.createBufferSource(),f=a.createBiquadFilter(),g=a.createGain();s.buffer=b;f.type=type;f.frequency.value=freq;g.gain.value=gain;s.connect(f).connect(g).connect(a.destination);s.start()}catch(e){}}
function tone(freq,t0,dur,gain,type){const a=ac();if(!a)return;try{const t=a.currentTime+t0,o=a.createOscillator(),g=a.createGain();o.type=type||'sine';o.frequency.value=freq;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(gain,t+.02);g.gain.exponentialRampToValueAtTime(.001,t+dur);o.connect(g).connect(a.destination);o.start(t);o.stop(t+dur+.05)}catch(e){}}
const chime=()=>{[0,7,12].forEach((n,i)=>tone(523.25*Math.pow(2,(n+(Math.random()<.5?0:2))/12),i*.08,1.4,.1))};
const flame=()=>{noise(.18,'highpass',3500,.18);tone(196,.05,.9,.07,'triangle');tone(293.7,.12,.8,.05)};
const splat=()=>{noise(.25,'lowpass',1400,.45);try{const a=ac();if(!a)return;const t=a.currentTime,o=a.createOscillator(),g=a.createGain();o.frequency.setValueAtTime(170,t);o.frequency.exponentialRampToValueAtTime(45,t+.2);g.gain.setValueAtTime(.5,t);g.gain.exponentialRampToValueAtTime(.001,t+.24);o.connect(g).connect(a.destination);o.start(t);o.stop(t+.26)}catch(e){}};
const tick=()=>{noise(.05,'bandpass',2200,.35);tone(900,0,.06,.06,'square')};
const clank=()=>{noise(.2,'bandpass',900,.5);tone(520,0,.25,.12,'triangle');tone(780,.04,.2,.06,'triangle')};
const pop=()=>{noise(.22,'highpass',1800,.4);tone(660,0,.15,.08);tone(990,.06,.3,.08)};
const vib=n=>{try{navigator.vibrate&&navigator.vibrate(n)}catch(e){}};
/* worlds */
const track=$('#track'),frame=$('#frame');let cv=null,cx=null,W=1,H=1,D=1;
const worlds=[];let idx=0,lastAct=performance.now(),scene=null,cur=null,raf=0,last=0;
const meter=t=>{if(cur&&cur.met)cur.met.textContent=t};
const halo=(x,y,r,rgb,a)=>{const g=cx.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,'rgba('+rgb+','+a+')');g.addColorStop(1,'rgba('+rgb+',0)');cx.fillStyle=g;cx.fillRect(x-r,y-r,r*2,r*2)};
const add=(c,t)=>{c.globalCompositeOperation=t};
const shake=()=>{if(!cur)return;cur.el.classList.remove('shake');void cur.el.offsetWidth;cur.el.classList.add('shake')};
const SC={};
FEST.forEach((f,i)=>{const el=document.createElement('div');el.className='world'+(f.locked?' locked':'');el.style.setProperty('--c',f.c);const w={f,el,i,scene:null,cv:null,met:null};
  if(f.locked){el.innerHTML='<div class="big">'+f.ko+'</div><div class="cap"><div class="en">'+f.en+'</div><h2>'+f.ko+'</h2><div class="mat"><b>재료</b>'+f.mat+'</div><div class="soon">곧 열려요 · '+f.where+'</div></div>'}
  else{el.innerHTML='<img class="bg" alt="" src="'+IMG[f.id]+'"><canvas></canvas><div class="cap"><div class="en">'+f.en+'</div><div class="row"><h2>'+f.ko+'</h2><div class="meter"></div></div><div class="mat"><b>재료</b>'+f.mat+' · '+f.where+'</div><div class="fact">'+f.fact+'</div></div>';w.cv=el.querySelector('canvas');w.met=el.querySelector('.meter')}
  if(!f.locked&&VID[f.id]){const v=VID[f.id];
    const mk=(cls,files)=>{const x=document.createElement('video');x.className=cls;x.muted=true;x.defaultMuted=true;x.playsInline=true;x.setAttribute('playsinline','');x.setAttribute('muted','');x.preload='auto';if(cls==='vl')x.loop=true;files.forEach(([src,type])=>{const s=document.createElement('source');s.src=src;s.type=type;x.appendChild(s)});return x};
    const vl=mk('vl',v.loop),ve=mk('ve',v.event);const im=el.querySelector('img.bg');im.after(vl);vl.after(ve);
    el.querySelector('.cap').insertAdjacentHTML('afterbegin','<div class="gauge"><span>눌러서 등불을 모아요</span><b><i></i></b></div>');
    el.insertAdjacentHTML('beforeend','<div class="banner">대점등</div>')}
  track.appendChild(el);worlds.push(w);const t=document.createElement('div');t.className='tick';$('#ticks').appendChild(t)});
function fit(w){if(!w.cv)return;const r=w.cv.getBoundingClientRect();D=Math.min(devicePixelRatio||1,2);W=Math.max(10,r.width);H=Math.max(10,r.height);w.cv.width=Math.ceil(W*D);w.cv.height=Math.ceil(H*D);cx=w.cv.getContext('2d');cx.setTransform(D,0,0,D,0,0)}
function activate(n,instant){idx=Math.max(0,Math.min(worlds.length-1,n));cur=worlds[idx];
  track.style.transform='translateY('+(-idx*100)+'%)';
  document.querySelectorAll('.tick').forEach((t,i)=>t.classList.toggle('on',i===idx));
  const f=cur.f;cv=cur.cv;scene=null;
  if(!f.locked){fit(cur);if(!cur.scene){cur.scene=SC[f.id]();cur.scene.init();meter(f.unit+' 0')}scene=cur.scene;
    
    seen[f.id]=1;saveSeen();renderDots();$('#blur').style.backgroundImage='url('+IMG[f.id]+')'}
  else{$('#blur').style.backgroundImage='none'}
  worlds.forEach((w,i)=>{if(w.cv&&i!==idx){w.cv.getContext('2d').clearRect(0,0,w.cv.width,w.cv.height)}});
  worlds.forEach((w,i)=>{const vl=w.el.querySelector('video.vl');if(vl){if(i===idx){const p=vl.play();p&&p.catch&&p.catch(()=>{})}else vl.pause()}});
  lastAct=performance.now()}
function loop(t){const dt=Math.min((t-last)/1000,.05);last=t;
  if(scene&&cx){cx.clearRect(0,0,W,H);scene.draw(dt);if(scene.idle&&!$('#gacha').classList.contains('open')&&t-lastAct>3000){scene.idle();lastAct=t-1000}}
  raf=requestAnimationFrame(loop)}
/* gestures */
const gest=$('#gest');let g0=null,mode=null;const hint=$('#hint');
const hideHint=()=>hint.classList.add('off');
gest.addEventListener('pointerdown',e=>{try{gest.setPointerCapture(e.pointerId)}catch(_){}g0={x:e.clientX,y:e.clientY,t:performance.now()};mode=null;ac()});
gest.addEventListener('pointermove',e=>{if(!g0)return;const dx=e.clientX-g0.x,dy=e.clientY-g0.y;
  if(!mode&&(Math.abs(dy)>12||Math.abs(dx)>12)){mode=Math.abs(dy)>Math.abs(dx)?'swipe':'none'}
  if(mode==='swipe'){track.classList.add('drag');let d=dy;if((idx===0&&dy>0)||(idx===worlds.length-1&&dy<0))d=dy*.25;track.style.transform='translateY(calc('+(-idx*100)+'% + '+d+'px))'}});
function end(e){if(!g0)return;const dy=e.clientY-g0.y,dt=performance.now()-g0.t;const wasSwipe=mode==='swipe';track.classList.remove('drag');
  if(wasSwipe){const fast=Math.abs(dy)/dt>.5;let n=idx;if(Math.abs(dy)>70||(fast&&Math.abs(dy)>25))n=idx+(dy<0?1:-1);activate(n);hideHint();vib(8)}
  else if(!mode&&scene){const r=cv.getBoundingClientRect();lastAct=performance.now();hideHint();scene.tap(e.clientX-r.left,e.clientY-r.top)}
  g0=null;mode=null}
gest.addEventListener('pointerup',end);gest.addEventListener('pointercancel',e=>{track.classList.remove('drag');activate(idx);g0=null;mode=null});
let wl=0;addEventListener('wheel',e=>{const n=performance.now();if(n-wl<600||Math.abs(e.deltaY)<20)return;wl=n;activate(idx+(e.deltaY>0?1:-1));hideHint()},{passive:true});
addEventListener('keydown',e=>{if(e.target.tagName==='INPUT')return;if(e.key==='ArrowDown')activate(idx+1);if(e.key==='ArrowUp')activate(idx-1);if(e.key==='Escape')$('#gacha').classList.remove('open')});
addEventListener('resize',()=>{if(cur&&!cur.f.locked){fit(cur);}});

/* 반짝이 */
(function(){const f=$('#frame');for(let i=0;i<14;i++){const s=document.createElement('span');s.className='sparkle';s.textContent=Math.random()<.5?'✦':'✧';s.style.left=R(4,94)+'%';s.style.top=R(9,66)+'%';s.style.fontSize=R(10,22)+'px';s.style.animationDelay=(-R(0,3.2))+'s';s.style.animationDuration=R(2.4,4.6)+'s';f.insertBefore(s,$('#gest'))}})();
