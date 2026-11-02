/* ---------- 오늘의 축제 처방: 기분대로 그은 낙서 → 그 선이 축제의 재료로 변함 → 처방 카드 ---------- */
const CARD={lan:'img/yi-peng-river.jpg'};
const RX={
  tom:['세게, 빠르게 그었네요','오늘은 토마토를 던지며 다 풀고 가요'],
  lan:['자꾸 위로 향하네요','마음에 걸린 걸 등불에 실어 하늘로 보내요'],
  burn:['꾹, 오래 참았네요','사막에서 다 태워 보내고 가벼워져요'],
  song:['물결처럼 흔들렸네요','시원하게 씻어내고 새로 시작해요'],
  holi:['콕콕, 마음이 알록달록하네요','색을 던지며 누군가와 화해해요'],
  dead:['천천히 맴돌았네요','보고 싶은 사람에게 꽃길을 놓아줘요']};
const SPL=[0,1,2,3,4,5,6].map(i=>{const m=new Image();m.src='img/props/splat-'+i+'.png';return m});
const mood=$('#mood'),mc=$('#mcv'),mx=mc.getContext('2d');
let MW=0,MH=0,mStrokes=[],mCur=null,mState='draw',mT=0,mPick=null,mFx=[],mPts=[],mIdle=null,mRaf=0,mLast=0,mInk=null,mig=null;
function mFit(){const r=mood.getBoundingClientRect(),d=Math.min(2,devicePixelRatio||1);MW=r.width;MH=r.height;mc.width=MW*d;mc.height=MH*d;mx.setTransform(d,0,0,d,0,0);
  mInk=document.createElement('canvas');mInk.width=mc.width;mInk.height=mc.height;mig=mInk.getContext('2d');mig.setTransform(d,0,0,d,0,0);mig.lineCap='round';mig.lineJoin='round'}
function mReset(){mStrokes=[];mCur=null;mState='draw';mFx=[];mPts=[];mPick=null;clearTimeout(mIdle);if(mig)mig.clearRect(0,0,MW,MH);mood.classList.remove('drawn','done');$('#mres').classList.remove('on')}
function openMood(){ac();mood.classList.add('open');mFit();mReset();mLast=performance.now();cancelAnimationFrame(mRaf);mRaf=requestAnimationFrame(mLoop)}
function closeMood(){mood.classList.remove('open');cancelAnimationFrame(mRaf)}
$('#gopen').onclick=openMood;$('#mclose').onclick=closeMood;$('#magain').onclick=()=>{mReset()};
$('#mgo').onclick=()=>{if(!mPick)return;closeMood();activate(worlds.findIndex(w=>w.f.id===mPick));hideHint()};
addEventListener('resize',()=>{if(mood.classList.contains('open'))mFit()});

/* 그리기 */
const mpos=e=>{const r=mc.getBoundingClientRect();return{x:e.clientX-r.left,y:e.clientY-r.top,t:performance.now()/1000}};
mc.addEventListener('pointerdown',e=>{if(mState!=='draw')return;e.preventDefault();mc.setPointerCapture(e.pointerId);clearTimeout(mIdle);mood.classList.add('drawn');mCur=[mpos(e)];mStrokes.push(mCur);dot(mCur[0])});
mc.addEventListener('pointermove',e=>{if(!mCur||mState!=='draw')return;const p=mpos(e),q=mCur[mCur.length-1],d=Math.hypot(p.x-q.x,p.y-q.y);if(d<2)return;mCur.push(p);
  const v=d/Math.max(.008,p.t-q.t);mig.strokeStyle='rgba(255,246,226,.95)';mig.lineWidth=Math.max(2.2,5.5-v/500);mig.beginPath();mig.moveTo(q.x,q.y);mig.lineTo(p.x,p.y);mig.stroke();
  if(Math.random()<.35)mFx.push({k:'mote',x:p.x,y:p.y,vx:R(-20,20),vy:R(-30,10),l:R(.5,1),age:0});if(Math.random()<.12)noise(.04,'highpass',2000+Math.min(4000,v*2),.03)});
const mUp=()=>{if(!mCur)return;mCur[mCur.length-1].up=performance.now()/1000;mCur=null;clearTimeout(mIdle);mIdle=setTimeout(()=>{if(mState==='draw'&&mStrokes.length)analyze()},1100)};
mc.addEventListener('pointerup',mUp);mc.addEventListener('pointercancel',mUp);
function dot(p){mig.fillStyle='rgba(255,246,226,.95)';mig.beginPath();mig.arc(p.x,p.y,3.2,0,7);mig.fill();tone(880,0,.15,.03)}

/* 선 읽기 */
function analyze(){const U=Math.min(MW,MH);let L=0,T=0,taps=0,holdMax=0,zig=0,up=0,signed=0,waves=0,segs=0;
  mStrokes.forEach(s=>{const t0=s[0].t,t1=(s[s.length-1].up||s[s.length-1].t),dur=t1-t0;let sl=0;for(let i=1;i<s.length;i++)sl+=Math.hypot(s[i].x-s[i-1].x,s[i].y-s[i-1].y);
    L+=sl;T+=dur;if(sl<U*.04&&dur<.4)taps++;if(sl<U*.1)holdMax=Math.max(holdMax,dur);
    /* 일정 간격으로 다시 찍기 */
    const r=[s[0]];let acc=0;for(let i=1;i<s.length;i++){acc+=Math.hypot(s[i].x-s[i-1].x,s[i].y-s[i-1].y);if(acc>=U*.03){r.push(s[i]);acc=0}}
    let hx=0,hy=0,lastSign=0,flips=0;const xs=s.map(p=>p.x),ys=s.map(p=>p.y),bw=Math.max(...xs)-Math.min(...xs),bh=Math.max(...ys)-Math.min(...ys);
    for(let i=1;i<r.length;i++){const dx=r[i].x-r[i-1].x,dy=r[i].y-r[i-1].y;up+=-dy;hx+=Math.abs(dx);hy+=Math.abs(dy);segs++;
      if(i>1){const a1=Math.atan2(r[i-1].y-r[i-2].y,r[i-1].x-r[i-2].x),a2=Math.atan2(dy,dx);let da=a2-a1;while(da>Math.PI)da-=2*Math.PI;while(da<-Math.PI)da+=2*Math.PI;signed+=da;if(Math.abs(da)>1.9)zig++}
      const sg=Math.sign(dy);if(Math.abs(dy)>U*.006&&sg&&lastSign&&sg!==lastSign)flips++;if(sg&&Math.abs(dy)>U*.006)lastSign=sg}
    if(bw>bh*1.4)waves+=flips;
    mPts.push(...r)});
  const speed=L/Math.max(.05,T),loops=Math.abs(signed)/(2*Math.PI),upr=up/Math.max(1,L);
  const sc={holi:taps>=3?2+taps:0,burn:holdMax>=1?3+holdMax*2:0,tom:zig*(speed>U*1.6?1.2:.6),lan:upr>.45?2+upr*4:0,dead:loops*1.6+(speed<U*1.2&&loops>.8?1:0),song:waves*.7};
  let pick='song',best=-1;for(const k in sc)if(sc[k]>best){best=sc[k];pick=k}
  if(best<1.4)pick=speed>U*2.2?'tom':upr>.2?'lan':loops>.5?'dead':holdMax>.6?'burn':L>U*1.5?'song':'holi';
  mPick=pick;mState='fx';mT=0;transform(pick)}

/* 선이 축제 재료로 변함 */
function transform(id){const P=mPts.length?mPts:[{x:MW/2,y:MH/2}];
  P.forEach((p,i)=>{const d=i/P.length*1.1;
    if(id==='tom'&&i%2===0)mFx.push({k:'splat',x:p.x,y:p.y,d,img:SPL[i%7],s:R(.09,.16)*Math.min(MW,MH),rot:R(0,6.3),age:0,sfx:i%4===0});
    if(id==='lan'&&i%3===0)mFx.push({k:'lan',x:p.x,y:p.y,d,s:R(.07,.11)*Math.min(MW,MH),vy:R(40,80),ph:R(0,6),age:0});
    if(id==='burn')mFx.push({k:'fire',x:p.x,y:p.y,d:d*.6,age:0});
    if(id==='song')mFx.push({k:'drop',x:p.x,y:p.y,d,vy:R(-60,0),vx:R(-20,20),age:0});
    if(id==='holi'&&i%2===0)mFx.push({k:'powder',x:p.x,y:p.y,d,c:['255,72,176','255,206,40','40,200,230','120,220,90','255,130,40','170,110,255'][i%6],r:R(.08,.15)*Math.min(MW,MH),age:0});
    if(id==='dead'&&i%2===0)mFx.push({k:'petal',x:p.x,y:p.y,d,rot:R(0,6),r:R(5,9),age:0})});
  setTimeout(showRx,2600)}
function showRx(){if(mState!=='fx')return;mState='done';const f=FEST.find(x=>x.id===mPick),rx=RX[mPick],img=CARD[mPick]||(typeof STAGE!=='undefined'&&STAGE[mPick])||IMG[mPick];
  const r=$('#mres');r.style.setProperty('--c',f.c);
  r.querySelector('.mimg').style.backgroundImage='url('+img+')';r.querySelector('.men').textContent=f.en;r.querySelector('.mko').textContent=f.ko;
  r.querySelector('.m1').textContent=rx[0];r.querySelector('.m2').textContent=rx[1];r.querySelector('.mwhere').textContent=f.where;
  mood.classList.add('done');r.classList.add('on');chime();vib([20,40,20])}

/* 그리기 루프 */
function mLoop(t){const dt=Math.min(.05,(t-mLast)/1000);mLast=t;mRaf=requestAnimationFrame(mLoop);mT+=dt;const T=t/1000;
  mx.clearRect(0,0,MW,MH);
  const inkA=mState==='draw'?1:Math.max(0,1-mT/1.4);
  if(inkA>0){mx.save();mx.globalAlpha=inkA;mx.globalCompositeOperation='lighter';mx.filter='blur(6px)';mx.drawImage(mInk,0,0,MW,MH);mx.filter='none';mx.globalAlpha=inkA*.9;mx.drawImage(mInk,0,0,MW,MH);mx.restore()}
  for(let i=mFx.length-1;i>=0;i--){const o=mFx[i];
    if(o.k==='mote'){o.age+=dt;if(o.age>o.l){mFx.splice(i,1);continue}o.x+=o.vx*dt;o.y+=o.vy*dt;mx.globalCompositeOperation='lighter';mx.globalAlpha=1-o.age/o.l;mx.fillStyle='#ffe7b0';mx.beginPath();mx.arc(o.x,o.y,1.6,0,7);mx.fill();mx.globalAlpha=1;mx.globalCompositeOperation='source-over';continue}
    if(mT<o.d)continue;o.age+=dt;const a=o.age;
    if(o.k==='splat'){if(!o.hit){o.hit=1;if(o.sfx){noise(.12,'lowpass',600,.25);vib(8)}}const k=Math.min(1,a/.12),s=o.s*(.4+.6*k+(a<.2?.15*Math.sin(a*40):0));if(o.img.complete&&o.img.naturalWidth){mx.save();mx.translate(o.x,o.y);mx.rotate(o.rot);mx.globalAlpha=Math.min(1,a*8);mx.drawImage(o.img,-s/2,-s/2,s,s*o.img.naturalHeight/o.img.naturalWidth);mx.restore()}}
    if(o.k==='lan'){if(!o.hit){o.hit=1;if(Math.random()<.3)tone(660+R(0,400),0,.8,.03)}o.y-=o.vy*dt*Math.min(1,a);const x=o.x+Math.sin(a*1.5+o.ph)*8,s=o.s*Math.min(1,a*3),h=s*232/181,al=Math.min(1,a*3);
      mx.globalCompositeOperation='lighter';mx.globalAlpha=al;const g=mx.createRadialGradient(x,o.y,0,x,o.y,s*1.6);g.addColorStop(0,'rgba(255,160,70,.5)');g.addColorStop(1,'rgba(255,160,70,0)');mx.fillStyle=g;mx.fillRect(x-s*1.6,o.y-s*1.6,s*3.2,s*3.2);mx.globalCompositeOperation='source-over';
      if(LSPR.complete&&LSPR.naturalWidth)mx.drawImage(LSPR,x-s/2,o.y-h/2,s,h);mx.globalAlpha=1}
    if(o.k==='fire'){if(a>2.2){mFx.splice(i,1);continue}if(!o.hit){o.hit=1;if(Math.random()<.15)noise(.25,'bandpass',500,.08)}const life=Math.sin(Math.min(1,a/2.2)*Math.PI);
      mx.globalCompositeOperation='lighter';const r=14+18*life,g=mx.createRadialGradient(o.x,o.y-life*10,0,o.x,o.y-life*10,r);g.addColorStop(0,'rgba(255,220,140,'+(.55*life)+')');g.addColorStop(.5,'rgba(255,120,40,'+(.3*life)+')');g.addColorStop(1,'rgba(255,60,20,0)');mx.fillStyle=g;mx.fillRect(o.x-r,o.y-r-life*10,r*2,r*2);mx.globalCompositeOperation='source-over';
      if(Math.random()<dt*3)mFx.push({k:'mote',x:o.x+R(-6,6),y:o.y,vx:R(-15,15),vy:-R(60,140),l:R(.8,1.6),age:0})}
    if(o.k==='drop'){o.vy+=420*dt;o.x+=o.vx*dt;o.y+=o.vy*dt;if(!o.hit&&o.y>MH*.86){o.hit=1;o.ry=o.y;if(Math.random()<.15)noise(.06,'highpass',3000,.05)}if(o.hit){o.rr=(o.rr||0)+dt;if(o.rr>.6){mFx.splice(i,1);continue}mx.strokeStyle='rgba(200,240,255,'+(.6-o.rr)+')';mx.lineWidth=1.5;mx.beginPath();mx.ellipse(o.x,o.ry,o.rr*40,o.rr*10,0,0,7);mx.stroke();continue}
      const g=mx.createRadialGradient(o.x-1,o.y-1,0,o.x,o.y,4);g.addColorStop(0,'rgba(255,255,255,.95)');g.addColorStop(1,'rgba(150,215,255,.3)');mx.fillStyle=g;mx.beginPath();mx.arc(o.x,o.y,3.5,0,7);mx.fill()}
    if(o.k==='powder'){if(!o.hit){o.hit=1;if(Math.random()<.4)noise(.3,'bandpass',900,.12)}const k=1-Math.pow(1-Math.min(1,a/.6),3),r=o.r*(.3+.9*k),al=Math.min(1,a*6)*(a>2?Math.max(0,1-(a-2)):1);
      for(let j=0;j<3;j++){const ox=Math.sin(j*2.1+o.r)*r*.3,oy=Math.cos(j*1.7+o.r)*r*.3,g=mx.createRadialGradient(o.x+ox,o.y+oy,0,o.x+ox,o.y+oy,r);g.addColorStop(0,'rgba('+o.c+','+(.38*al)+')');g.addColorStop(.6,'rgba('+o.c+','+(.14*al)+')');g.addColorStop(1,'rgba('+o.c+',0)');mx.fillStyle=g;mx.fillRect(o.x+ox-r,o.y+oy-r,r*2,r*2)}}
    if(o.k==='petal'){if(!o.hit){o.hit=1;if(Math.random()<.2)tone(523+R(0,300),0,.6,.025,'triangle')}const k=Math.min(1,a/.3);mx.save();mx.translate(o.x,o.y+Math.sin(a*2+o.rot)*2);mx.rotate(o.rot+a*.3);mx.globalAlpha=k;
      mx.globalCompositeOperation='lighter';const g=mx.createRadialGradient(0,0,0,0,0,o.r*3);g.addColorStop(0,'rgba(255,170,60,.35)');g.addColorStop(1,'rgba(255,170,60,0)');mx.fillStyle=g;mx.fillRect(-o.r*3,-o.r*3,o.r*6,o.r*6);mx.globalCompositeOperation='source-over';
      for(let j=0;j<6;j++){mx.rotate(Math.PI/3);mx.fillStyle=j%2?'#ff9a1f':'#ffb238';mx.beginPath();mx.ellipse(o.r*.55,0,o.r*.6,o.r*.32,0,0,7);mx.fill()}mx.fillStyle='#c4560c';mx.beginPath();mx.arc(0,0,o.r*.28,0,7);mx.fill();mx.restore()}
  }
  mx.globalAlpha=1}

/* boot */
renderDots();activate(0);last=performance.now();raf=requestAnimationFrame(loop);
