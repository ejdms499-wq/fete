/* FÊTE · 축제에 다녀오는 5분 — 이야기 엔진 */
(()=>{
const $=s=>document.querySelector(s);
const R=(a,b)=>a+Math.random()*(b-a);
const FID=(new URLSearchParams(location.search).get('f')||'lan');
const S=STORIES[FID]||STORIES.lan,STORY=S.story;
document.title='FÊTE · '+S.ko;
document.documentElement.style.setProperty('--fc',S.color);

/* ---------- 소리 (임시 합성 앰비언스) ---------- */
let AC=null,master=null,muted=false,NB=null;
function audio(){if(AC){music();return}try{AC=new (window.AudioContext||window.webkitAudioContext)();master=AC.createGain();master.gain.value=0;master.connect(AC.destination);master.gain.linearRampToValueAtTime(.55,AC.currentTime+3);
  NB=AC.createBuffer(1,AC.sampleRate*2,AC.sampleRate);const d=NB.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;
  ({night:crickets,crowd:crowd,water:water,desert:wind,guitar:()=>{}}[S.amb]||crickets)()}catch(e){}music()}
/* 축제 음악 (Gemini로 만든 곡) */
let MUS=null;
function music(){if(MUS){if(MUS.paused){const p=MUS.play();p&&p.catch&&p.catch(()=>{})}return}try{MUS=new Audio('audio/'+FID+'.mp3');MUS.preload='auto';MUS.loop=true;MUS.volume=0;const p=MUS.play();p&&p.catch&&p.catch(()=>{});let v=0;const iv=setInterval(()=>{v=Math.min(.62,v+.02);if(MUS)MUS.volume=muted?0:v;if(v>=.62)clearInterval(iv)},100)}catch(e){}}
function duck(on){if(!MUS||muted)return;const target=on?.25:.62;let n=0;const iv=setInterval(()=>{MUS.volume+= (target-MUS.volume)*.25;if(++n>12)clearInterval(iv)},60)}
const CH={night:[146.8,220,277.2,329.6],crowd:[196,246.9,293.7,392],water:[220,277.2,329.6,440],desert:[110,164.8,196,246.9],guitar:[164.8,207.7,246.9,329.6]};
function pad(){const g=AC.createGain();g.gain.value=.045;const f=AC.createBiquadFilter();f.type='lowpass';f.frequency.value=900;g.connect(f);f.connect(master);
  (CH[S.amb]||CH.night).forEach((fr,i)=>{const o=AC.createOscillator();o.type=i%2?'sine':'triangle';o.frequency.value=fr;o.detune.value=R(-6,6);const lg=AC.createGain();lg.gain.value=.25;
    const l=AC.createOscillator();l.frequency.value=R(.05,.12);const la=AC.createGain();la.gain.value=.18;l.connect(la);la.connect(lg.gain);l.start();o.connect(lg);lg.connect(g);o.start()})}
function loopNoise(type,freq,q,vol,lfo){const s=AC.createBufferSource();s.buffer=NB;s.loop=true;const f=AC.createBiquadFilter();f.type=type;f.frequency.value=freq;f.Q.value=q;const g=AC.createGain();g.gain.value=vol;
  if(lfo){const l=AC.createOscillator();l.frequency.value=lfo;const la=AC.createGain();la.gain.value=vol*.7;l.connect(la);la.connect(g.gain);l.start()}s.connect(f);f.connect(g);g.connect(master);s.start();return g}
function burstNoise(t,dur,type,freq,q,vol){const s=AC.createBufferSource();s.buffer=NB;const f=AC.createBiquadFilter();f.type=type;f.frequency.value=freq;f.Q.value=q;const g=AC.createGain();
  g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(vol,t+Math.min(.05,dur/3));g.gain.linearRampToValueAtTime(0,t+dur);s.connect(f);f.connect(g);g.connect(master);s.start(t,R(0,1.5));s.stop(t+dur+.05)}
function crickets(){const chirp=()=>{if(!AC)return;const t=AC.currentTime;for(let k=0;k<3;k++)burstNoise(t+k*.07,.05,'bandpass',R(4200,5200),18,.12);setTimeout(chirp,R(700,2600))};chirp()}
function crowd(){loopNoise('bandpass',520,.8,.05,.13);const cheer=()=>{if(!AC)return;burstNoise(AC.currentTime,R(.8,1.6),'bandpass',R(700,1100),1.2,R(.03,.07));setTimeout(cheer,R(2500,6000))};cheer()}
function water(){loopNoise('highpass',2200,.6,.03,.2);const sp=()=>{if(!AC)return;burstNoise(AC.currentTime,R(.15,.35),'highpass',R(2500,4000),.7,R(.04,.08));setTimeout(sp,R(900,3000))};sp()}
function wind(){loopNoise('lowpass',380,.7,.08,.07)}
function pluck(){const notes=[329.6,392,440,493.9,587.3,659.3];const p=()=>{if(!AC)return;const t=AC.currentTime,o=AC.createOscillator(),g=AC.createGain();o.type='triangle';o.frequency.value=notes[Math.floor(R(0,notes.length))];
  g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.035,t+.01);g.gain.exponentialRampToValueAtTime(.0001,t+1.6);o.connect(g);g.connect(master);o.start(t);o.stop(t+1.7);setTimeout(p,R(500,1600))};p()}
function bell(f0,v){if(!AC)return;const t=AC.currentTime;[1,2.76,5.4].forEach((m,i)=>{const o=AC.createOscillator();o.frequency.value=f0*m;const g=AC.createGain();g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime((v||.06)/(i+1),t+.01);g.gain.exponentialRampToValueAtTime(.0001,t+3.2/(i+1));o.connect(g);g.connect(master);o.start(t);o.stop(t+3.5)})}
function whoosh(dur,v){if(!AC)return;burstNoise(AC.currentTime,dur,'bandpass',600,.8,v||.08)}
function boom(){if(!AC)return;const t=AC.currentTime;burstNoise(t,1,'lowpass',160,.7,.6);const o=AC.createOscillator(),g=AC.createGain();o.frequency.setValueAtTime(90,t);o.frequency.exponentialRampToValueAtTime(40,t+.6);g.gain.setValueAtTime(.25,t);g.gain.exponentialRampToValueAtTime(.001,t+.8);o.connect(g);g.connect(master);o.start(t);o.stop(t+.9)}
function splat(){if(!AC)return;burstNoise(AC.currentTime,.25,'lowpass',700,1,.35)}
function splashS(){if(!AC)return;burstNoise(AC.currentTime,.4,'highpass',2600,.7,.18)}
function crackle(){if(!AC)return;for(let i=0;i<5;i++)burstNoise(AC.currentTime+i*R(.03,.09),.04,'bandpass',R(1500,3500),2,.2)}
$('#snd').onclick=()=>{muted=!muted;if(MUS)MUS.volume=muted?0:.62;if(master)master.gain.linearRampToValueAtTime(muted?0:.55,AC.currentTime+.4);$('#snd').textContent=muted?'소리 켜기':'소리 끄기'};
const vib=p=>{try{navigator.vibrate&&navigator.vibrate(p)}catch(e){}};

/* ---------- 장면 레이어 ---------- */
const app=$('#app');let front=$('#L1'),back=$('#L2'),curImg=null;
function scene(c,over){const bd=$('#bd');if(bd)bd.style.backgroundImage='url('+c.bg+')';const L=back;L.className='layer';L.innerHTML='';
  const im=document.createElement('img');im.src=c.bg;im.alt='';L.appendChild(im);curImg=im;
  const vs=over||c.vid;if(vs){const v=document.createElement('video');v.muted=true;v.playsInline=true;v.setAttribute('playsinline','');v.autoplay=true;v.loop=!over;
    [['.mp4','video/mp4'],['.webm','video/webm']].forEach(([e,t])=>{const s=document.createElement('source');s.src=vs+e;s.type=t;v.appendChild(s)});v.style.opacity=0;v.style.transition='opacity '+(over?'.5s':'1.2s');
    v.addEventListener('playing',()=>v.style.opacity=1,{once:true});L.appendChild(v);const p=v.play();p&&p.catch&&p.catch(()=>{});
    if(over)v.addEventListener('ended',()=>{v.style.transition='opacity 2.4s';v.style.opacity=0})}
  L.querySelectorAll('img,video').forEach(e=>e.style.filter=c.blur?'blur(5px) brightness(.62)':'');
  const old=front;L.style.zIndex=1;old.style.zIndex=0;requestAnimationFrame(()=>{L.classList.add('on');clearTimeout(old._t);old._t=setTimeout(()=>{if(old!==front)old.classList.remove('on')},1700)});front=L;back=old}
/* 그림이 화면 어디에 있는지 (잘리지 않게 전체를 보여주므로 직접 계산) */
function imgRect(){const L=front.getBoundingClientRect(),A=app.getBoundingClientRect(),ar=curImg&&curImg.naturalWidth?curImg.naturalWidth/curImg.naturalHeight:.5607;
  let w,h;if(L.width/L.height>ar){h=L.height;w=h*ar}else{w=L.width;h=w/ar}return{x:L.left-A.left+(L.width-w)/2,y:L.top-A.top+(L.height-h)/2,w,h}}
const IP=(fx,fy)=>{const r=imgRect();return{x:r.x+fx*r.w,y:r.y+fy*r.h}};

/* ---------- 대사 ---------- */
let ci=-1,li=-1,typing=false,waiting=null,gest=null,G0=null;
const lineEl=$('#line'),whoEl=$('#who'),noteEl=$('#note'),nextEl=$('#next');
function showLine(L){typing=true;nextEl.classList.remove('on');noteEl.classList.remove('on');whoEl.style.opacity=1;whoEl.textContent=S.guide;
  lineEl.innerHTML=L.t.split(' ').map(w=>'<span class="w">'+w+'</span>').join(' ');
  const ws=[...lineEl.querySelectorAll('.w')];ws.forEach((w,i)=>setTimeout(()=>w.classList.add('v'),i*70));
  const ov=L.burst||L.vid;if(ov){scene(STORY[ci],ov);if(L.burst){duck(true);setTimeout(()=>duck(false),5200);setTimeout(()=>{whoosh(1.2,.1)},700);setTimeout(()=>{boom();vib([60,30,120]);app.classList.remove('jolt');void app.offsetWidth;app.classList.add('jolt')},1700)}}
  if(L.clearPaint)setTimeout(()=>{dissolve()},L.clearPaint===true?900:L.clearPaint);
  if(L.gift)gift(L.gift);
  if(L.pin)pin();
  setTimeout(()=>{typing=false;if(L.note){noteEl.textContent=L.note;noteEl.classList.add('on')}
    if(L.g)startGesture(L.g);else if(L.auto)setTimeout(advance,L.auto);else nextEl.classList.add('on')},ws.length*70+400)}
const PRE={};function preload(c){if(!c)return;const u=[c.bg];if(c.vid)u.push(c.vid);c.lines.forEach(l=>{if(l.vid)u.push(l.vid);if(l.burst)u.push(l.burst)});
  u.forEach(x=>{if(!x||PRE[x])return;if(/\.(jpg|png)$/.test(x)){const im=new Image();im.src=x;PRE[x]=im}else{const v=document.createElement('video');v.muted=true;v.preload='auto';v.src=x+'.mp4';try{v.load()}catch(e){}PRE[x]=v}})}
function chapter(i){ci=i;li=-1;const c=STORY[i];preload(c);preload(STORY[i+1]);if(i>0)paintFade=1;
  document.querySelectorAll('#chap i').forEach((e,k)=>e.classList.toggle('on',k<=i));
  scene(c);fxMode=c.fx||'';fire=c.fire?{p:c.fire,heat:.15}:null;
  setHeld(c.held);
  const po=$('#poem');if(c.card){po.querySelector('img').src=c.card.img;po.querySelector('.pl').innerHTML=c.card.lines.map(l=>'<span>'+l+'</span>').join('');setTimeout(()=>po.classList.add('on'),600)}else po.classList.remove('on');
  if(c.mask){mask=new Image();mask.src=c.mask}else mask=null;
  const pl=$('#place');if(c.place){pl.querySelector('.p1').textContent=c.place[0];pl.querySelector('.p2').textContent=c.place[1];pl.classList.add('on');setTimeout(()=>pl.classList.remove('on'),4200)}
  bell(523.25,.04);if(c.fx==='rise')startRise();
  setTimeout(advance,c.place?1400:600)}
function advance(){if(gest)return;const c=STORY[ci];li++;
  if(li>=c.lines.length){if(ci+1<STORY.length)chapter(ci+1);return}
  const L=c.lines[li];showLine(L);if(L.end)setTimeout(()=>{nextEl.classList.remove('on');waiting='end';nextEl.textContent='눌러서 마무리 ›';nextEl.classList.add('on')},2200)}
function tap(){if(gest)return;if(typing){lineEl.querySelectorAll('.w').forEach(w=>w.classList.add('v'));return}
  if(waiting==='end'){finish();return}if(nextEl.classList.contains('on'))advance()}

/* ---------- 손에 든 물건 ---------- */
const held=$('#held'),hImg=held.querySelector('.un'),ink=$('#ink'),ig=ink.getContext('2d');ig.lineCap='round';ig.lineJoin='round';let heldCfg=null,hadInk=false;
function setHeld(h){heldCfg=h||null;held.style.transition='opacity .9s';held.style.opacity='';held.style.left='';held.style.top='';held.style.width='';held.style.transform='';hImg.style.filter='';
  if(!h){held.classList.remove('on');return}hImg.src=h.img;held.style.setProperty('--hw',h.w);held.style.width='calc(var(--hwBase) * '+h.w+')';
  if(h.ink){ink.style.display='';ink.style.left=h.ink[0]*100+'%';ink.style.top=h.ink[1]*100+'%';ink.style.width=h.ink[2]*100+'%';ink.style.height=h.ink[3]*100+'%'}else ink.style.display='none';
  requestAnimationFrame(()=>held.classList.add('on'))}
function pin(){const h=heldCfg;if(!h||!h.pin)return;const p=IP(h.pin[0],h.pin[1]);held.style.transition='left 1.4s cubic-bezier(.3,.7,.3,1),top 1.4s cubic-bezier(.3,.7,.3,1),width 1.4s,opacity 1s';
  held.style.left=p.x+'px';held.style.top=p.y+'px';held.style.width=(imgRect().w*.12)+'px';bell(659.3,.05);vib(15);setTimeout(()=>{held.style.opacity='.85'},1400)}
function gift(g){const p=IP(g.from[0],g.from[1]);hImg.src=g.img;ink.style.display='none';held.style.transition='none';held.style.left=p.x+'px';held.style.top=p.y+'px';held.style.width=(imgRect().w*.14)+'px';held.style.opacity=0;held.classList.add('on');
  $('#app').classList.add('dofOn');front.querySelectorAll('img,video').forEach(e=>{e.style.transition='filter 1s';e.style.filter='blur(5px) brightness(.6)'});
  requestAnimationFrame(()=>requestAnimationFrame(()=>{held.style.transition='left 1.6s cubic-bezier(.4,0,.2,1),top 1.6s cubic-bezier(.4,0,.2,1),width 1.6s cubic-bezier(.4,0,.2,1),opacity .6s';held.style.opacity=1;held.style.left='';held.style.top='';held.style.width='calc(var(--hwBase) * .62)'}));
  setTimeout(()=>{bell(659.3,.06);bell(880,.04);vib([20,40,20])},1600)}

/* ---------- 제스처 ---------- */
const cue=t=>{const c=$('#cue');c.textContent=t||'';c.classList.toggle('on',!!t)};
let inkLen=0,lastP=null,heat=0,holding=false,count=0,rubLen=0,pourOK=false,ptr=null;
function startGesture(g){gest=g.k;G0=g;if(g.as==='climb')climb={h:0,kick:0};nextEl.classList.remove('on');cue(g.cue);count=0;rubLen=0;heat=0;inkLen=0;
  if(g.k==='tap'&&g.as==='candle')targets=g.at.map(a=>({a,on:0,ph:R(0,6)}));else targets=[]}
function endGesture(){gest=null;G0=null;cue('');targets=[];advance()}
function inkPos(e){const r=ink.getBoundingClientRect();return{x:(e.clientX-r.left)/r.width*ink.width,y:(e.clientY-r.top)/r.height*ink.height}}
const appPos=e=>{const A=app.getBoundingClientRect();return{x:e.clientX-A.left,y:e.clientY-A.top}};
const Gd=$('#gest');
Gd.addEventListener('pointerdown',e=>{audio();if(!gest){tap();return}Gd.setPointerCapture(e.pointerId);const p=appPos(e);ptr=p;
  if(gest==='write'){lastP=inkPos(e)}
  if(gest==='hold'){holding=true;cue('');if(G0.as==='light')whoosh(4.5,.06)}
  if(gest==='rub'){lastP=p}
  if(gest==='tap')doTap(p);
  if(gest==='throw')doThrow(p)});
Gd.addEventListener('pointermove',e=>{const p=appPos(e);ptr=p;
  if(gest==='write'&&lastP){const q=inkPos(e);ig.strokeStyle='rgba(60,35,20,.92)';ig.lineWidth=5;ig.beginPath();ig.moveTo(lastP.x,lastP.y);ig.lineTo(q.x,q.y);ig.stroke();inkLen+=Math.hypot(q.x-lastP.x,q.y-lastP.y);lastP=q;hadInk=true;if(inkLen>120)$('#done').classList.add('on')}
  if(gest==='rub'&&lastP){rub(lastP,p);lastP=p}});
const up=()=>{lastP=null;ptr=null;if(gest==='hold'&&holding){holding=false;if(heat>=1)holdDone();else cue('조금만 더 꾹')}};
Gd.addEventListener('pointerup',up);Gd.addEventListener('pointercancel',up);
$('#done').onclick=()=>{$('#done').classList.remove('on');bell(659.3,.05);vib(15);endGesture()};
function holdDone(){const as=G0.as;vib([20,40,20]);bell(392,.06);setTimeout(()=>bell(587.3,.05),220);
  if(as==='light'){held.classList.remove('on')}
  if(as==='squash'){splat()}
  endGesture()}
/* 톡톡 */
let targets=[],climb=null;const CLIMBER=new Image();CLIMBER.src='img/props/tomato-4.png';
function doTap(p){const as=G0.as;
  if(as==='climb'){climb.h=Math.min(1,climb.h+1/G0.n);climb.kick=.6;vib(8);if(AC)burstNoise(AC.currentTime,.06,'bandpass',R(500,900),2,.12);if(climb.h>=1&&!climb.done){climb.done=1;cue('');bell(659.3,.06);setTimeout(()=>bell(880,.05),180);vib([30,40,60]);const q=IP(.47,.17);burstP(q.x,q.y,'spark',30);setTimeout(()=>{climb=null;endGesture()},900)}return}
  if(as==='candle'){let best=null,bd=1e9;targets.forEach(t=>{if(t.on)return;const q=IP(t.a[0],t.a[1]),d=Math.hypot(q.x-p.x,q.y-p.y);if(d<bd){bd=d;best=t}});
    if(best&&bd<imgRect().w*.16){best.on=1;count++;const q=IP(best.a[0],best.a[1]);burstP(q.x,q.y,'spark',14);bell(523.25*Math.pow(2,[0,4,7,12][count-1]/12),.05);vib(10)}else return}
  else{count++;
    if(as==='stick'){const f=IP(fire.p[0],fire.p[1]);parts.push({k:'stick',x:p.x,y:p.y,tx:f.x,ty:f.y,t:0,rot:R(0,6)});setTimeout(()=>{fire.heat=Math.min(1,fire.heat+.16);burstP(f.x,f.y-20,'spark',18);crackle();vib(12)},450)}
    if(as==='splash'){burstP(p.x,p.y,'drop',26);splashS();vib(10)}}
  if(count>=(G0.n||G0.at.length))setTimeout(endGesture,as==='stick'?900:500)}
/* 문지르기 */
const paint=$('#paint'),pg=paint.getContext('2d');let paintFade=0,mask=null,ccol=0,goldPts=[];
const POW=['255,72,176','255,206,40','40,200,230','120,220,90','255,130,40','170,110,255'];
function rub(a,b){const d=Math.hypot(b.x-a.x,b.y-a.y),n=Math.max(1,Math.ceil(d/14));const r=imgRect();
  for(let i=0;i<=n;i++){const x=a.x+(b.x-a.x)*i/n,y=a.y+(b.y-a.y)*i/n;
    if(G0.as==='powder'){const c=POW[ccol%6],rr=r.w*R(.05,.08),g=pg.createRadialGradient(x,y,0,x,y,rr);g.addColorStop(0,'rgba('+c+',.22)');g.addColorStop(1,'rgba('+c+',0)');pg.fillStyle=g;pg.fillRect(x-rr,y-rr,rr*2,rr*2);
      for(let k=0;k<5;k++){pg.fillStyle='rgba('+c+','+R(.3,.6)+')';pg.beginPath();pg.arc(x+R(-rr,rr)*.8,y+R(-rr,rr)*.8,R(.7,1.6),0,7);pg.fill()}}
    else{goldPts.push({x,y});const rad=r.w*.035;pg.globalCompositeOperation='lighter';const g=pg.createRadialGradient(x,y,0,x,y,rad);g.addColorStop(0,'rgba(255,210,110,.28)');g.addColorStop(.5,'rgba(255,170,60,.12)');g.addColorStop(1,'rgba(255,150,40,0)');pg.fillStyle=g;pg.beginPath();pg.arc(x,y,rad,0,7);pg.fill();pg.globalCompositeOperation='source-over';if(Math.random()<.3)burstP(x,y,'spark',1)}}
  if(G0.as==='powder'&&mask&&mask.complete){pg.save();pg.globalCompositeOperation='destination-in';pg.drawImage(mask,r.x,r.y,r.w,r.h);pg.restore()}
  rubLen+=d;if(Math.random()<.08)whoosh(.2,.03);{const need=r.w*(G0.need||2);const pct=Math.min(100,Math.round(rubLen/need*100));if(gest==='rub')cue((G0.as==='powder'?'색칠 ':'꽃길 ')+pct+'%')}
  if(rubLen>r.w*(G0.need||2)){cue('');const k=G0;gest='rubdone';setTimeout(()=>{if(gest==='rubdone'&&G0===k)endGesture()},300)}}
Gd.addEventListener('pointerdown',()=>{if(gest==='rub')ccol++});
function dissolve(){const pts=goldPts.slice();goldPts=[];pts.forEach((p,i)=>{if(i%3)return;setTimeout(()=>{parts.push({k:'spark',x:p.x,y:p.y,vx:R(-20,20),vy:-R(40,120),l:R(1.2,2.4),age:0,r:2,ph:R(0,6)})},i*6)});bell(783.99,.04);setTimeout(()=>bell(1046.5,.03),300);paintFade=2.2}
/* 던지기 */
const SPL=[0,1,2,3,4,5,6].map(i=>{const m=new Image();m.src='img/props/splat-'+i+'.png';return m}),TOM=new Image();TOM.src='img/props/tomato-3.png';
function doThrow(p){const hr=held.getBoundingClientRect(),A=app.getBoundingClientRect();parts.push({k:'tom',x:hr.left-A.left+hr.width/2,y:hr.top-A.top+hr.height/2,tx:p.x,ty:p.y-40,t:0,w:hr.width*.7});whoosh(.4,.06);count++;
  held.style.opacity=.25;setTimeout(()=>{held.style.opacity=1},500);if(count>=G0.n){gest='throwing';setTimeout(()=>{held.classList.remove('on');gest='throw';endGesture()},1200)}}

/* ---------- 효과 캔버스 ---------- */
const fx=$('#fx'),fc=fx.getContext('2d');let W=0,H=0,D=1,fxMode='',parts=[],rise=null,fire=null,lastT=performance.now();
function fit(){const r=fx.getBoundingClientRect();D=Math.min(2,devicePixelRatio||1);W=r.width;H=r.height;[fx,paint].forEach(c=>{c.width=W*D;c.height=H*D});fc.setTransform(D,0,0,D,0,0);pg.setTransform(D,0,0,D,0,0);
  app.style.setProperty('--hwBase',imgRect().w+'px')}
addEventListener('resize',fit);
const LANT=new Image();LANT.src='img/props/lantern-unlit.png';
function startRise(){const r=held.getBoundingClientRect(),a=app.getBoundingClientRect();rise={x:r.left-a.left+r.width/2,y:r.top-a.top+r.height/2,w:r.width||W*.5,t:0,dx:R(-1,1)*W*.12}}
function glow(x,y,r,c,a){if(r<=0||a<=0)return;const g=fc.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,'rgba('+c+','+a+')');g.addColorStop(1,'rgba('+c+',0)');fc.fillStyle=g;fc.fillRect(x-r,y-r,r*2,r*2)}
function burstP(x,y,k,n){for(let i=0;i<n;i++){const a=R(0,6.283),v=k==='drop'?R(80,320):R(30,140);parts.push({k,x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-(k==='drop'?120:40),l:R(.5,1.1),age:0,r:R(1.5,3.5),ph:R(0,6)})}}
function loop(t){const dt=Math.min(.05,(t-lastT)/1000);lastT=t;requestAnimationFrame(loop);fc.clearRect(0,0,W,H);
  const rr=imgRect();
  if(fxMode==='fireflies'&&parts.length<26&&Math.random()<dt*6)parts.push({x:R(0,W),y:R(H*.35,H*.85),vx:R(-8,8),vy:R(-6,3),l:R(3,6),age:0,ph:R(0,6),k:'ff'});
  if((fxMode==='embers'||fxMode==='rise')&&parts.length<40&&Math.random()<dt*10)parts.push({x:R(0,W),y:H+10,vx:R(-10,10),vy:-R(18,40),l:R(5,9),age:0,ph:R(0,6),k:'em'});
  if(fxMode==='dust'&&parts.length<30&&Math.random()<dt*8)parts.push({x:-10,y:R(H*.3,H),vx:R(20,50),vy:R(-5,5),l:R(4,8),age:0,ph:R(0,6),k:'du'});
  if(fxMode==='sparkle'&&parts.length<24&&Math.random()<dt*5)parts.push({x:R(0,W),y:R(0,H*.8),vx:0,vy:R(6,14),l:R(2,4),age:0,ph:R(0,6),k:'sp'});
  if(fxMode==='petals'&&parts.length<22&&Math.random()<dt*4)parts.push({x:R(0,W),y:-10,vx:R(-10,10),vy:R(20,40),l:R(8,12),age:0,ph:R(0,6),k:'pe',rot:R(0,6)});
  if(fxMode==='sun'&&parts.length<16&&Math.random()<dt*3)parts.push({x:R(0,W),y:R(0,H*.6),vx:R(-4,4),vy:R(-4,4),l:R(3,6),age:0,ph:R(0,6),k:'sp'});
  if(fxMode==='powder'&&parts.length<20&&Math.random()<dt*3)parts.push({x:R(0,W),y:R(0,H*.5),vx:R(-6,6),vy:R(3,10),l:R(4,7),age:0,ph:R(0,6),k:'pw',c:POW[Math.floor(R(0,6))]});
  /* 모닥불 */
  if(fire){const f=IP(fire.p[0],fire.p[1]),fl=.85+.15*Math.sin(t/90)*Math.sin(t/37);fc.globalCompositeOperation='lighter';glow(f.x,f.y-rr.w*.05,rr.w*(.2+.55*fire.heat)*fl,'255,140,40',.25+.45*fire.heat);glow(f.x,f.y-rr.w*.1,rr.w*(.08+.25*fire.heat),'255,220,140',.2+.4*fire.heat);
    if(Math.random()<dt*(4+30*fire.heat))parts.push({x:f.x+R(-1,1)*rr.w*.06,y:f.y-rr.w*.05,vx:R(-15,15),vy:-R(40,110)*(1+fire.heat),l:R(.8,1.8),age:0,ph:R(0,6),k:'em'});fc.globalCompositeOperation='source-over'}
  /* 초 표시 */
  targets.forEach(tg=>{const q=IP(tg.a[0],tg.a[1]);fc.globalCompositeOperation='lighter';if(tg.on){glow(q.x,q.y,rr.w*.12*(1+.06*Math.sin(t/80+tg.ph)),'255,180,90',.45)}else{const p=.5+.5*Math.sin(t/300+tg.ph);fc.strokeStyle='rgba(255,236,190,'+(.4+.4*p)+')';fc.lineWidth=2;fc.beginPath();fc.arc(q.x,q.y,rr.w*(.04+.012*p),0,7);fc.stroke();glow(q.x,q.y,rr.w*.05,'255,220,160',.25*p)}fc.globalCompositeOperation='source-over'});
  for(let i=parts.length-1;i>=0;i--){const p=parts[i];
    if(p.k==='stick'||p.k==='tom'){p.t+=dt/(p.k==='tom'?.55:.45);const k=Math.min(1,p.t),x=p.x+(p.tx-p.x)*k,y=p.y+(p.ty-p.y)*k-Math.sin(k*Math.PI)*H*.12;
      if(p.k==='stick'){fc.save();fc.translate(x,y);fc.rotate(p.rot+k*8);fc.fillStyle='#7a5532';fc.fillRect(-14,-2,28,4);fc.restore()}
      else if(TOM.complete){const w=p.w*(1-.55*k);fc.save();fc.translate(x,y);fc.rotate(k*9);fc.drawImage(TOM,-w/2,-w/2,w,w);fc.restore()}
      if(k>=1){parts.splice(i,1);if(p.k==='tom'){const im=SPL[Math.floor(R(0,7))];if(im.complete){const s=rr.w*R(.17,.23);pg.save();pg.translate(p.tx,p.ty);pg.rotate(R(0,6));pg.drawImage(im,-s/2,-s/2,s,s*im.naturalHeight/im.naturalWidth);pg.restore()}splat();vib(25);app.classList.remove('jolt');void app.offsetWidth;app.classList.add('jolt')}}continue}
    p.age+=dt;if(p.age>p.l){parts.splice(i,1);continue}
    if(p.k==='drop'||p.k==='spark'){p.vy+=(p.k==='drop'?600:-20)*dt}
    p.x+=p.vx*dt+Math.sin(t/900+p.ph)*.25;p.y+=p.vy*dt;const a=Math.sin(Math.PI*p.age/p.l);
    fc.globalCompositeOperation='lighter';
    if(p.k==='ff'){const f=.5+.5*Math.sin(t/300+p.ph*3);glow(p.x,p.y,10,'255,226,140',.5*a*f);fc.fillStyle='rgba(255,246,200,'+(.9*a*f)+')';fc.beginPath();fc.arc(p.x,p.y,1.4,0,7);fc.fill()}
    else if(p.k==='em'||p.k==='spark'){glow(p.x,p.y,7,'255,170,90',.4*a);fc.fillStyle='rgba(255,220,170,'+(.85*a)+')';fc.beginPath();fc.arc(p.x,p.y,1.2,0,7);fc.fill()}
    else if(p.k==='du'){glow(p.x,p.y,18,'240,200,170',.08*a)}
    else if(p.k==='sp'){const f=.5+.5*Math.sin(t/200+p.ph);glow(p.x,p.y,8,'255,255,255',.35*a*f)}
    else if(p.k==='pw'){fc.globalCompositeOperation='source-over';glow(p.x,p.y,24,p.c,.12*a)}
    else if(p.k==='drop'){fc.globalCompositeOperation='source-over';fc.fillStyle='rgba(220,245,255,'+(.85*a)+')';fc.beginPath();fc.arc(p.x,p.y,p.r,0,7);fc.fill()}
    else if(p.k==='pe'){fc.globalCompositeOperation='source-over';fc.save();fc.translate(p.x,p.y);fc.rotate(p.rot+t/1500);fc.globalAlpha=.85*a;fc.fillStyle='#ff9a1f';fc.beginPath();fc.ellipse(0,0,4,2.5,0,0,7);fc.fill();fc.restore();fc.globalAlpha=1}
    fc.globalCompositeOperation='source-over'}
  /* 기둥 오르기 */
  if(climb){if(!climb.done)climb.kick=Math.max(0,climb.kick-dt);if(climb.kick<=0)climb.h=Math.max(0,climb.h-dt*.07);const y=.72-(.72-.19)*climb.h,q=IP(.47,y),w=rr.w*.17;fc.globalCompositeOperation='lighter';glow(q.x,q.y,w*1.1,'255,240,200',.45+.2*Math.sin(t/200));fc.globalCompositeOperation='source-over';
    if(CLIMBER.complete){fc.save();fc.translate(q.x,q.y);fc.rotate(Math.sin(t/90)*.08+(climb.kick>0?-.15:0));fc.drawImage(CLIMBER,-w/2,-w/2,w,w*CLIMBER.naturalHeight/CLIMBER.naturalWidth);fc.restore()}
    if(!climb.done&&gest==='tap')cue('높이 '+Math.round(climb.h*100)+'%'+(climb.h>0&&climb.kick<=0?' · 미끄러져요!':''))}
  /* 꾹 누르기 */
  if(gest==='hold'){const as=G0.as;if(holding){heat=Math.min(1,heat+dt/(as==='pour'?5.5:as==='squash'?2.2:4.2))}else heat=Math.max(0,heat-dt*.12);
    if(as==='light'){hImg.style.filter='sepia('+heat+') saturate('+(1+1.6*heat)+') brightness('+(1+.45*heat)+') hue-rotate(-20deg) drop-shadow(0 0 '+(30*heat)+'px rgba(255,150,60,'+(.8*heat)+'))';
      const r=held.getBoundingClientRect(),A=app.getBoundingClientRect();fc.globalCompositeOperation='lighter';glow(r.left-A.left+r.width/2,r.top-A.top+r.height*.62,r.width*(.4+.9*heat),'255,150,60',.5*heat);fc.globalCompositeOperation='source-over'}
    if(as==='squash'){const sq=heldCfg.squash,k=Math.min(sq.length-1,Math.floor(heat*sq.length));if(!hImg.src.endsWith(sq[k]))hImg.src=sq[k];held.style.transform='translate(-50%,-50%) scale('+(1+.08*heat)+','+(1-.1*heat)+')';if(holding&&Math.random()<dt*6)splat()}
    if(as==='pour'){if(holding&&ptr){let near=false;G0.at.forEach(a=>{const q=IP(a[0],a[1]);if(Math.abs(q.x-ptr.x)<rr.w*.12)near=q});
        const ly=near?near.y:Math.min(H*.9,ptr.y+rr.h*.35),top=ptr.y,w=7;fc.strokeStyle='rgba(230,248,255,.85)';fc.lineWidth=w;fc.lineCap='round';fc.beginPath();fc.moveTo(ptr.x,top);for(let k=1;k<=10;k++){const yy=top+(ly-top)*k/10;fc.lineTo(ptr.x+Math.sin(t/60+k)*2,yy)}fc.stroke();
        fc.globalCompositeOperation='lighter';glow(ptr.x,ly,rr.w*.08,'200,240,255',.5);fc.globalCompositeOperation='source-over';if(Math.random()<dt*14)burstP(ptr.x,ly,'drop',2);
        if(!near){heat=Math.max(0,heat-dt/5.5);if(Math.random()<dt*.8)cue('어른 손 위에서 부어요')}else{cue('');if(Math.random()<dt*3&&AC)burstNoise(AC.currentTime,.1,'highpass',3000,.7,.03)}}}
    if(heat>=1&&holding&&G0.done)cue(G0.done);
    if(as==='pour'&&heat>=1&&holding){holding=false;holdDone()}}
  if(paintFade>0){paintFade-=dt*.7;pg.save();pg.setTransform(1,0,0,1,0,0);pg.globalCompositeOperation='destination-out';pg.fillStyle='rgba(0,0,0,'+Math.min(1,dt*1.2)+')';pg.fillRect(0,0,paint.width,paint.height);pg.restore();if(paintFade<=0){pg.save();pg.setTransform(1,0,0,1,0,0);pg.clearRect(0,0,paint.width,paint.height);pg.restore()}}
  /* 띄운 등불 */
  if(rise&&LANT.complete){rise.t+=dt;const k=Math.min(1,rise.t/9),e=1-Math.pow(1-k,1.7),w=rise.w*(1-.9*e),h=w*420/365,x=rise.x+rise.dx*e+Math.sin(rise.t*1.3)*6*(1-e),y=rise.y-(rise.y+H*.1)*e*.95,al=k<.85?1:Math.max(0,1-(k-.85)/.15);
    fc.globalCompositeOperation='lighter';glow(x,y+h*.1,w*1.6,'255,150,60',.5*al);fc.globalCompositeOperation='source-over';fc.globalAlpha=al;fc.filter='sepia(1) saturate(2.6) brightness(1.45) hue-rotate(-20deg)';fc.drawImage(LANT,x-w/2,y-h/2,w,h);fc.filter='none';fc.drawImage(ink,x-w*.32,y-h*.24,w*.64,h*.42);fc.globalAlpha=1;fc.globalCompositeOperation='lighter';glow(x,y+h*.35,w*.2,'255,230,170',.8*al);fc.globalCompositeOperation='source-over';if(k>=1)rise=null}}
requestAnimationFrame(loop);

/* 키보드 (웹) */
addEventListener('keydown',e=>{if(e.repeat)return;if(e.code==='Space'||e.code==='Enter'||e.code==='ArrowRight'){e.preventDefault();audio();
    if(!$('#start').classList.contains('off')){$('#go').click();return}
    if(gest==='hold'&&G0.as!=='pour'){holding=true;cue('');if(G0.as==='light')whoosh(4.5,.06);return}
    if(gest==='write'){if($('#done').classList.contains('on'))$('#done').click();return}
    if(gest==='tap'&&G0.as!=='candle'){const r=imgRect();doTap({x:r.x+R(.2,.8)*r.w,y:r.y+R(.3,.7)*r.h});return}
    if(gest==='throw'){const r=imgRect();doThrow({x:r.x+R(.3,.7)*r.w,y:r.y+R(.25,.55)*r.h});return}
    tap()}});
addEventListener('keyup',e=>{if(e.code==='Space'&&gest==='hold'&&holding)up()});

/* ---------- 시작 / 끝 ---------- */
STORY.forEach(()=>$('#chap').appendChild(document.createElement('i')));
const st=$('#start');st.style.backgroundImage='radial-gradient(120% 70% at 50% 30%,rgba(40,22,40,.3),rgba(7,5,12,.92)),url('+S.cover+')';
st.querySelector('.k').textContent=S.en+' · '+S.city;st.querySelector('h1').innerHTML=S.title;st.querySelector('p').innerHTML=S.sub;
STORY.forEach(c=>{const im=new Image();im.src=c.bg});preload(STORY[0]);
$('#go').onclick=()=>{audio();fit();st.classList.add('off');setTimeout(()=>chapter(0),900)};
function finish(){waiting=null;nextEl.classList.remove('on');const E=$('#end');E.querySelector('.k').textContent='Today in '+S.city;E.querySelector('h2').textContent='오늘 다녀온 '+S.ko;
  const ww=E.querySelector('.wrap-wish');ww.hidden=!(hadInk&&S.memo);if(!ww.hidden){$('#memo').textContent=S.memo;const w=$('#wishcopy').getContext('2d');w.clearRect(0,0,300,200);w.filter='invert(1) sepia(1) saturate(.4) brightness(1.1)';w.drawImage(ink,0,0);w.filter='none'}
  $('#learned').innerHTML=S.learned.map(l=>'<li>'+l+'</li>').join('');
  const n=nextDate(FID);$('#dday').textContent=n?(n.past?'진짜 '+S.ko+'는 '+n.past+'일 전에 열렸어요':'진짜 '+S.ko+'까지 D-'+n.d):'';
  E.classList.add('on');if(MUS&&!muted){let v=MUS.volume;const iv=setInterval(()=>{v=Math.max(.3,v-.02);MUS.volume=v;if(v<=.3)clearInterval(iv)},100)}bell(392,.05);setTimeout(()=>bell(523.25,.05),300)}
$('#again').onclick=()=>{location.reload()};
/* ---------- 오늘의 카드 (스토리 크기 이미지) ---------- */
function loadImg(src){return new Promise(r=>{const i=new Image();i.onload=()=>r(i);i.onerror=()=>r(null);i.src=src})}
function wrapText(g,t,x,y,maxW,lh){let line='',yy=y;for(const ch of t){const test=line+ch;if(g.measureText(test).width>maxW&&line){g.fillText(line,x,yy);line=ch;yy+=lh}else line=test}g.fillText(line,x,yy);return yy}
/* 빈티지 축제 포스터: 종이 + 두 가지 잉크(리소그래프) + 망점 + 살짝 어긋난 인쇄 */
const POSTER={
  lan:{city:'CHIANG MAI · THAILAND',title:'Yi Peng',tag:'Festival of Lights',when:'24 — 25 NOV 2026',ink:[245,150,58],dark:[28,42,92],paper:[244,234,214],mark:[.278,.338,.08],markC:[28,42,92]},
  tom:{city:'BUÑOL · SPAIN',title:'La Tomatina',tag:'The Great Tomato Battle',when:'LAST WEDNESDAY OF AUGUST',ink:[232,64,42],dark:[24,86,130],paper:[246,236,214]},
  song:{city:'THAILAND',title:'Songkran',tag:'Thai New Year · Water Festival',when:'13 — 15 APRIL',ink:[47,166,217],dark:[22,58,110],paper:[245,238,220]},
  holi:{city:'INDIA',title:'Holi',tag:'Festival of Colours',when:'22 MARCH 2027',ink:[255,79,154],dark:[59,42,143],paper:[247,236,222],titleC:[59,42,143]},
  burn:{city:'BLACK ROCK CITY · NEVADA',title:'Burning Man',tag:'A City in the Desert',when:'LATE AUGUST — LABOR DAY',ink:[255,122,61],dark:[90,45,79],paper:[243,232,216],mark:[.5,.44,.2],markC:[90,45,79]},
  dead:{city:'MÉXICO',title:'Día de Muertos',tag:'The Day of the Dead',when:'1 — 2 NOVEMBER',ink:[255,138,31],dark:[106,30,90],paper:[245,235,215]}};
function riso(src,w,h,P){const c=document.createElement('canvas');c.width=w;c.height=h;const g=c.getContext('2d');
  const ar=src.width/src.height;let sw=w,sh=w/ar;if(sh<h){sh=h;sw=h*ar}g.drawImage(src,(w-sw)/2,(h-sh)*.4,sw,sh);
  const d=g.getImageData(0,0,w,h),px=d.data,out=g.createImageData(w,h),o=out.data;
  const cell=7,c1=Math.cos(.26),s1=Math.sin(.26),c2=Math.cos(.785),s2=Math.sin(.785),k=Math.PI*2/cell;
  for(let y=0;y<h;y++)for(let x=0;x<w;x++){const i=(y*w+x)*4,L=(.3*px[i]+.59*px[i+1]+.11*px[i+2])/255;
    const u1=x*c1-y*s1,v1=x*s1+y*c1,u2=x*c2-y*s2,v2=x*s2+y*c2;
    const p1=(Math.cos(u1*k)+Math.cos(v1*k))/4+.5,p2=(Math.cos(u2*k)+Math.cos(v2*k))/4+.5;
    const aA=Math.min(1,Math.max(0,(.94-L)/.62)),aD=Math.min(1,Math.max(0,(.52-L)/.42));
    const inkA=aA>p2?1:0,inkD=aD>p1?.92:0;
    let r=P.paper[0],gg=P.paper[1],bb=P.paper[2];
    if(inkA){r=r*P.ink[0]/255;gg=gg*P.ink[1]/255;bb=bb*P.ink[2]/255}
    o[i]=r;o[i+1]=gg;o[i+2]=bb;o[i+3]=255;o[i+3]=inkD?255:255;
    if(inkD){o[i]=r*(1-inkD)+r*P.dark[0]/255*inkD;o[i+1]=gg*(1-inkD)+gg*P.dark[1]/255*inkD;o[i+2]=bb*(1-inkD)+bb*P.dark[2]/255*inkD}}
  /* 어긋난 인쇄: 진한 잉크 판을 살짝 밀어 다시 찍기 */
  g.putImageData(out,0,0);const sh2=document.createElement('canvas');sh2.width=w;sh2.height=h;const s2g=sh2.getContext('2d'),dd=s2g.createImageData(w,h),q=dd.data;
  for(let y=0;y<h;y++)for(let x=0;x<w;x++){const i=(y*w+x)*4,L=(.3*px[i]+.59*px[i+1]+.11*px[i+2])/255,u=x*c1-y*s1,v=x*s1+y*c1,p=(Math.cos(u*k)+Math.cos(v*k))/4+.5,a=Math.min(1,Math.max(0,(.42-L)/.36));
    if(a>p){q[i]=P.dark[0];q[i+1]=P.dark[1];q[i+2]=P.dark[2];q[i+3]=70}}
  s2g.putImageData(dd,0,0);g.globalCompositeOperation='multiply';g.drawImage(sh2,3,2);g.globalCompositeOperation='source-over';return c}
function grain(g,W,H,amt){const d=g.getImageData(0,0,W,H),p=d.data;for(let i=0;i<p.length;i+=4){const n=(Math.random()-.5)*amt;p[i]+=n;p[i+1]+=n;p[i+2]+=n}g.putImageData(d,0,0)}
function spaced(g,t,x,y,sp){const al=g.textAlign;if('letterSpacing' in g){g.letterSpacing=sp+'px';g.textAlign='center';g.fillText(t,x+sp/2,y);g.letterSpacing='0px'}else{g.textAlign='center';g.fillText(t.split('').join('\u200A'),x,y)}g.textAlign=al}
async function makeCard(){const Wc=1080,Hc=1920,cv=document.createElement('canvas');cv.width=Wc;cv.height=Hc;const g=cv.getContext('2d'),P=POSTER[FID];
  try{await Promise.all(['italic 600 120px Fraunces','italic 400 40px Fraunces','600 60px Hahmlet','400 30px Hahmlet','400 30px "Gowun Batang"'].map(f=>document.fonts.load(f)))}catch(e){}
  const rgb=a=>'rgb('+a.join(',')+')',PAPER=[240,229,207];g.fillStyle=rgb(PAPER);g.fillRect(0,0,Wc,Hc);
  for(let i=0;i<1400;i++){g.fillStyle='rgba(110,80,50,'+(Math.random()*.06)+')';g.fillRect(Math.random()*Wc,Math.random()*Hc,Math.random()*3,Math.random()*1.4)}
  /* 포스터 그림 */
  const im=await loadImg('img/poster/'+FID+'.jpg')||await loadImg(S.cover);const M=74,TOP=74,BOT=300;let aw=Wc-M*2,ah=aw*im.height/im.width;if(ah>Hc-TOP-BOT){ah=Hc-TOP-BOT;aw=ah*im.width/im.height}const ax=(Wc-aw)/2,ay=TOP;
  g.drawImage(im,ax,ay,aw,ah);
  /* 내 글씨를 그림 속 잉크로 */
  if(hadInk&&P.mark){const iw=aw*P.mark[2],ih=iw*ink.height/ink.width,tmp=document.createElement('canvas');tmp.width=ink.width;tmp.height=ink.height;const tg=tmp.getContext('2d');tg.shadowColor='#000';tg.shadowBlur=0;for(let o of [[0,0],[1.5,0],[0,1.5],[1.5,1.5]])tg.drawImage(ink,o[0],o[1]);tg.globalCompositeOperation='source-in';tg.fillStyle=rgb(P.markC||PAPER);tg.fillRect(0,0,tmp.width,tmp.height);
    g.globalAlpha=.85;g.drawImage(tmp,ax+aw*P.mark[0]-iw/2,ay+ah*P.mark[1]-ih/2,iw,ih);g.globalAlpha=1}
  /* 하늘 위 제목 (오래된 포스터처럼, 잉크가 살짝 어긋나게) */
  g.textAlign='center';const tc=P.titleC||PAPER;g.fillStyle=rgb(tc);g.font='400 26px Hahmlet, serif';spaced(g,P.city,Wc/2,ay+78,10);
  let ts=150;g.font='italic 600 '+ts+'px Fraunces, serif';while(g.measureText(P.title).width>aw-80&&ts>60){ts-=6;g.font='italic 600 '+ts+'px Fraunces, serif'}
  const ty=ay+78+ts*.95+18;g.fillStyle='rgba('+P.ink.join(',')+',.9)';g.fillText(P.title,Wc/2+4,ty+4);g.fillStyle=rgb(tc);g.fillText(P.title,Wc/2,ty);
  g.font='italic 400 34px Fraunces, serif';g.fillText(P.tag,Wc/2,ty+56);
  /* 아래 설명 */
  const by=ay+ah;g.fillStyle=rgb(P.dark);g.font='600 54px Hahmlet, serif';g.fillText(S.ko,Wc/2,by+92);
  g.font='400 27px Hahmlet, serif';spaced(g,P.when,Wc/2,by+146,7);
  g.fillRect(M,Hc-112,Wc-M*2,2);const d=new Date();g.font='400 25px "Gowun Batang", serif';g.textAlign='left';
  g.fillText((hadInk&&S.memo?S.memo+'을 담아 · ':'')+'visited '+d.getFullYear()+'.'+String(d.getMonth()+1).padStart(2,'0')+'.'+String(d.getDate()).padStart(2,'0'),M,Hc-70);
  g.textAlign='right';g.font='italic 400 27px Fraunces, serif';g.fillText('FÊTE',Wc-M,Hc-70);
  grain(g,Wc,Hc,12);
  return new Promise(r=>cv.toBlob(b=>r(b),'image/png'))}
$('#save').onclick=async()=>{const b=$('#save');b.textContent='카드 만드는 중…';try{const blob=await makeCard();const file=new File([blob],'fete-'+FID+'.png',{type:'image/png'});
    if(navigator.canShare&&navigator.canShare({files:[file]})){try{await navigator.share({files:[file],title:'FÊTE · '+S.ko,text:'오늘 '+S.ko+'에 다녀왔어요'})}catch(e){}}
    else{const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=file.name;document.body.appendChild(a);a.click();a.remove()}
    b.textContent='✦ 저장했어요'}catch(e){b.textContent='저장에 실패했어요'}setTimeout(()=>b.textContent='✦ 오늘의 카드 저장하기',2600)};
setTimeout(fit,50);
})();
