/* ---------- 이펭: 영상 + 게이지 + 함께 점등 + 친구 등불 ---------- */
const LSPR=new Image();LSPR.src='img/lantern.png';const LMASK=new Image();LMASK.src='img/yi-peng-mask.png';
SC.lan=()=>{let n=0,count=0,state='idle',glows=[],fl=[];const NEED=10;
  const q=sel=>cur.el.querySelector(sel);
  const bar=v=>{const i=q('.gauge i');if(i)i.style.width=Math.round(v*100)+'%'};
  const big=()=>{[0,4,7,12,16,19].forEach((k,i)=>tone(523.25*Math.pow(2,k/12),i*.16,2.4,.09));noise(1.2,'highpass',4200,.05)};
  function fire(offset,sync){if(state!=='idle')return false;const ve=q('video.ve'),bn=q('.banner');if(!ve)return false;state='event';
    try{ve.currentTime=Math.max(0,offset||0)}catch(e){}const p=ve.play();p&&p.catch&&p.catch(()=>{});ve.classList.add('on');big();vib([30,40,60]);
    if(bn){bn.textContent=sync?'지금, 모두 함께':'대점등';bn.classList.toggle('sync',!!sync);bn.classList.remove('show');void bn.offsetWidth;bn.classList.add('show')}
    let fin=false;const done=()=>{if(fin)return;fin=true;ve.removeEventListener('ended',done);
      const vl=q('video.vl');if(vl){try{vl.currentTime=0}catch(e){}const p2=vl.play();p2&&p2.catch&&p2.catch(()=>{})}
      ve.classList.add('hold');ve.classList.remove('on');tone(392,0,2.8,.05);tone(587.3,.25,2.6,.04);
      setTimeout(()=>{ve.pause();ve.classList.remove('hold');state='idle';count=0;bar(0)},3000)};
    ve.addEventListener('ended',done);setTimeout(done,11000);return true}
  function addG(k){if(state!=='idle')return;count=Math.min(NEED,count+k);n+=k;bar(count/NEED);meter('모은 등불 '+n);if(count>=NEED)fire(0,false)}
  function release(name,msg){fl.push({x:W*R(.3,.7),y:H*.8,ph:R(0,6.3),age:0,name:name||'',msg:msg||''})}
  window.lanApi={add:addG,fire,release,busy:()=>state!=='idle'};
  return{init(){n=0;count=0;state='idle';glows=[];fl=[];bar(0)},
  tap(x,y){glows.push({x,y,t:0});if(state!=='idle')return;tone(880+count*60,0,.5,.06);addG(1)},
  draw(dt){
    for(let i=glows.length-1;i>=0;i--){const g=glows[i];g.t+=dt;if(g.t>1){glows.splice(i,1);continue}const a=(1-g.t)*(1-g.t),r=W*(.1+.18*g.t);add(cx,'lighter');halo(g.x,g.y,r,'255,190,110',.5*a);add(cx,'source-over')}
    for(let i=fl.length-1;i>=0;i--){const l=fl[i];l.age+=dt;l.y-=dt*H*.075;const w=W*.27,h=w*232/181;if(l.y<-h){fl.splice(i,1);continue}
      const x=l.x+Math.sin(l.age*1.1+l.ph)*W*.02,al=Math.min(1,l.age*1.2)*Math.min(1,(l.y+h)/(H*.25));cx.globalAlpha=al;
      cx.globalCompositeOperation='lighter';halo(x,l.y,w*1.7,'255,160,70',.45);cx.globalCompositeOperation='source-over';
      if(LSPR.complete&&LSPR.naturalWidth)cx.drawImage(LSPR,x-w/2,l.y-h/2,w,h);
      if(l.name){cx.textAlign='center';cx.shadowColor='rgba(255,150,50,.95)';cx.shadowBlur=12;cx.fillStyle='rgba(255,246,228,.98)';cx.font='400 '+Math.round(W*.05)+'px Jua,sans-serif';cx.fillText(l.name,x,l.y+h/2+W*.06);
        if(l.msg){cx.font='400 '+Math.round(W*.037)+'px "Gowun Dodum",sans-serif';cx.fillText(l.msg,x,l.y+h/2+W*.115)}cx.shadowBlur=0}
      cx.globalAlpha=1}
    if(LMASK.complete&&LMASK.naturalWidth){const sc=Math.max(W/360,H/640),mw=360*sc,mh=640*sc;cx.globalCompositeOperation='destination-out';cx.drawImage(LMASK,(W-mw)/2,(H-mh)*.4,mw,mh);cx.globalCompositeOperation='source-over'}}}};

/* ---------- 죽은 자의 날: 영상 + 게이지 이벤트(영혼의 길) ---------- */
SC.dead=()=>{let n=0,count=0,state='idle',glows=[],pt=[],sp=[],evT=-1;const NEED=10;
  const q=sel=>cur.el.querySelector(sel);
  const bar=v=>{const i=q('.gauge i');if(i)i.style.width=Math.round(v*100)+'%'};
  const big=()=>{[0,3,7,10,12,15].forEach((k,i)=>tone(392*Math.pow(2,k/12),i*.2,2.6,.08,'triangle'));noise(1,'highpass',3800,.04)};
  function fire(){if(state!=='idle')return;const ve=q('video.ve'),bn=q('.banner');if(!ve)return;state='event';
    try{ve.currentTime=0}catch(e){}const p=ve.play();p&&p.catch&&p.catch(()=>{});ve.classList.add('on');big();evT=0;vib([30,40,60]);
    if(bn){bn.classList.remove('show','sync');void bn.offsetWidth;bn.classList.add('show')}
    let fin=false;const done=()=>{if(fin)return;fin=true;ve.removeEventListener('ended',done);
      const vl=q('video.vl');if(vl){try{vl.currentTime=0}catch(e){}const p2=vl.play();p2&&p2.catch&&p2.catch(()=>{})}
      ve.classList.add('hold');ve.classList.remove('on');tone(293.7,0,2.8,.05,'triangle');tone(440,.3,2.6,.04);
      setTimeout(()=>{ve.pause();ve.classList.remove('hold');state='idle';count=0;bar(0)},3000)};
    ve.addEventListener('ended',done);setTimeout(done,8000)}
  const spark=(x,y,k)=>{for(let i=0;i<k;i++){const a=R(-2.6,-.55),v=R(60,190)*W/430;sp.push({x,y,vx:Math.cos(a)*v*.6,vy:Math.sin(a)*v,r:R(3,6)*W/430,l:R(1.4,2.6),age:0,ph:R(0,6),pet:Math.random()<.3})}};
  const petal=()=>pt.push({x:R(0,W),y:-10,vy:R(22,40),r:R(4,7)*W/430,rot:R(0,6),vr:R(-1.5,1.5),ph:R(0,6)});
  return{init(){n=0;count=0;state='idle';glows=[];pt=[];sp=[];evT=-1;bar(0)},
  tap(x,y){glows.push({x,y,t:0});spark(x,y,22);if(state!=='idle')return;count++;n++;bar(count/NEED);meter('밝힌 촛불 '+n);flame();if(count>=NEED)fire()},
  draw(dt){const t=performance.now()/1000;
    for(let i=glows.length-1;i>=0;i--){const g=glows[i];g.t+=dt;if(g.t>1.1){glows.splice(i,1);continue}const a=(1-g.t/1.1)**2,r=W*(.08+.14*g.t);add(cx,'lighter');halo(g.x,g.y,r,'255,170,70',.5*a);add(cx,'source-over')}
    if(evT>=0){evT+=dt;if(evT<5.5){const k=Math.max(1,Math.round(dt*140));for(let i=0;i<k;i++)spark(R(0,W),H*R(.55,1.02),1);add(cx,'lighter');halo(W/2,H*.62,W*1.1,'255,160,60',.18*Math.sin(Math.min(1,evT/5.5)*Math.PI));add(cx,'source-over')}else evT=-1}
    for(let i=sp.length-1;i>=0;i--){const p=sp[i];p.age+=dt;if(p.age>p.l){sp.splice(i,1);continue}p.vy+= (p.pet?30:-8)*dt;p.vx*=.985;p.x+=p.vx*dt+Math.sin(t*3+p.ph)*.4;p.y+=p.vy*dt;const a=Math.sin(Math.PI*p.age/p.l);
      if(p.pet){cx.save();cx.globalAlpha=a*.9;cx.translate(p.x,p.y);cx.rotate(t*2+p.ph);cx.fillStyle='#ff9a1f';cx.beginPath();cx.ellipse(0,0,p.r*1.8,p.r*1.1,0,0,7);cx.fill();cx.restore()}
      else{add(cx,'lighter');halo(p.x,p.y,p.r*7,'255,190,100',.7*a);cx.globalAlpha=a;cx.fillStyle='#fff3c4';cx.beginPath();cx.arc(p.x,p.y,p.r*.7,0,7);cx.fill();cx.globalAlpha=1;add(cx,'source-over')}}
    if(state==='idle'&&Math.random()<dt*1.2&&pt.length<8)petal();
    const lim=H*.3;
    for(let i=pt.length-1;i>=0;i--){const p=pt[i];p.y+=p.vy*dt;p.x+=Math.sin(t*1.3+p.ph)*.3;p.rot+=p.vr*dt;if(p.y>lim){pt.splice(i,1);continue}
      cx.save();cx.globalAlpha=Math.min(1,(lim-p.y)/(H*.1))*.9;cx.translate(p.x,p.y);cx.rotate(p.rot);cx.fillStyle='#ff9a1f';cx.beginPath();cx.ellipse(0,0,p.r,p.r*.6,0,0,7);cx.fill();cx.restore()}}}};

/* ---------- 라 토마티나: 기름 기둥(팔로 하본) → 폭죽 → 토마토 대전 → 폭죽 → 소방차 청소 ---------- */
SC.tom=()=>{
  const q=sel=>cur.el.querySelector(sel);
  const bar=v=>{const i=q('.gauge i');if(i)i.style.width=Math.round(Math.max(0,Math.min(1,v))*100)+'%'};
  const label=t=>{const s=q('.gauge span');if(s)s.textContent=t};
  const banner=t=>{const b=q('.banner');if(!b)return;b.textContent=t;b.classList.remove('show','sync');void b.offsetWidth;b.classList.add('show')};
  const IDLE_LABEL='햄을 따야 싸움이 시작돼요 · 눌러서 기둥 오르기';
  let st='idle',flash=0,msgs=[],timers=[];
  const later=(f,ms)=>timers.push(setTimeout(f,ms));
  const say=(t,x,y,c)=>msgs.push({t,x:x==null?W/2:x,y:y==null?H*.42:y,age:0,c:c||'#fff'});
  /* 소리 */
  const squelch=()=>{noise(.18,'lowpass',700,.45);tone(110,0,.12,.08,'sawtooth')};
  const thud=()=>{noise(.28,'lowpass',1200,.55);tone(70,0,.2,.12)};
  const clap=()=>{noise(.06,'bandpass',1800,.25)};
  const rocket=()=>{const a=ac();if(a){try{const t=a.currentTime,o=a.createOscillator(),g=a.createGain();o.frequency.setValueAtTime(500,t);o.frequency.exponentialRampToValueAtTime(2400,t+.7);g.gain.setValueAtTime(.05,t);g.gain.linearRampToValueAtTime(0,t+.75);o.connect(g).connect(a.destination);o.start(t);o.stop(t+.8)}catch(e){}}
    later(()=>{noise(1,'lowpass',240,.9);noise(.4,'bandpass',900,.4);flash=1;shake();vib([60,30,90])},750)};
  const siren=()=>{[0,.5,1,1.5].forEach(o=>{tone(960,o,.24,.05,'square');tone(720,o+.25,.24,.05,'square')})};
  /* 기둥 */
  let h=0,v=0,poleT=0,hug=0,clapT=0,hoseT=2,spray=[],ham=null,wave=0,waveHit=-1;const POLE_TIME=30;
  const geo=()=>({px:W*.5,top:H*.17,bot:H*.9,pw:W*.09});
  function startPole(){const sg=q('img.stage');if(sg){sg.style.transition='opacity 1.2s ease';sg.classList.add('on')}st='pole';h=0;v=0;poleT=0;hoseT=2;spray=[];ham=null;banner('팔로 하본!');label('연타해서 올라가요 · 멈추면 미끄러져요');bar(0);meter('높이 0%')}
  function climb(){v+=.12;hug=1;tone(520+h*500,0,.07,.04,'triangle')}
  function grab(){st='ham';ham=null;flash=.8;banner('햄을 땄어요!');chime();vib([20,40,20]);later(()=>{thud();shake();later(()=>{rocket();later(startBattle,1300)},500)},900)}
  function noon(){st='ham';ham=null;say('정오! 햄 없이도 시작해요',W/2,H*.4,'#ffe08a');later(()=>{rocket();later(startBattle,1300)},900)}
  /* 대전 */
  let BT=0,thrown=0,hit=0,hold=null,fly=[],inc=[],incT=1.5,spl=[],bits=[];const BATTLE=40;
  let dirt=null,dx=null,startDirt=1,water=[],lastP=null,chk=0;
  function mkDirt(){dirt=document.createElement('canvas');dirt.width=Math.ceil(W);dirt.height=Math.ceil(H);dx=dirt.getContext('2d')}
  function paint(x,y,r){const g=dx;for(let k=0;k<8;k++){const px=x+R(-.5,.5)*r,py=y+R(-.45,.45)*r,rr=R(.25,.55)*r;const gr=g.createRadialGradient(px,py,0,px,py,rr);gr.addColorStop(0,'rgba(222,40,22,.95)');gr.addColorStop(.7,'rgba(196,30,18,.8)');gr.addColorStop(1,'rgba(196,30,18,0)');g.fillStyle=gr;g.fillRect(px-rr,py-rr,rr*2,rr*2)}
    g.strokeStyle='rgba(200,32,18,.85)';g.lineCap='round';for(let k=0;k<4;k++){g.lineWidth=R(3,7)*W/430;const sx=x+R(-.35,.35)*r;g.beginPath();g.moveTo(sx,y);g.lineTo(sx+R(-3,3),y+R(.5,1.5)*r);g.stroke()}
    g.fillStyle='rgba(255,215,120,.9)';for(let k=0;k<10;k++){g.beginPath();g.ellipse(x+R(-.5,.5)*r,y+R(-.45,.45)*r,2.4*W/430,1.4*W/430,R(0,3),0,7);g.fill()}}
  function measure(){const s=24,t=document.createElement('canvas');t.width=s;t.height=Math.round(s*H/W);const g=t.getContext('2d');g.drawImage(dirt,0,0,t.width,t.height);const d=g.getImageData(0,0,t.width,t.height).data;let a=0;for(let i=3;i<d.length;i+=4)a+=d[i];return a/(d.length/4*255)}
  function burst(x,y,k){for(let i=0;i<k;i++){const a=R(0,6.283),s=R(90,380)*W/430;bits.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s-120*W/430,r:R(2.5,6)*W/430,l:R(.45,.9),age:0})}}
  function playVe(){const ve=q('video.ve');if(!ve)return;try{ve.currentTime=0}catch(e){}const p=ve.play();p&&p.catch&&p.catch(()=>{});ve.classList.add('on');
    let fin=false;const done=()=>{if(fin)return;fin=true;ve.removeEventListener('ended',done);const vl=q('video.vl');if(vl){const p2=vl.play();p2&&p2.catch&&p2.catch(()=>{})}ve.classList.add('hold');ve.classList.remove('on');later(()=>{ve.pause();ve.classList.remove('hold')},3000)};
    ve.addEventListener('ended',done);later(done,8000)}
  function startBattle(){const sg=q('img.stage');if(sg){sg.classList.remove('on');later(()=>{sg.style.transform=''},1300)}st='battle';BT=0;thrown=0;hit=0;hold=null;fly=[];inc=[];incT=1.6;mkDirt();banner('토마토 대전!');label('꾹 눌러 으깨고, 놓아서 던져요');playVe()}
  function endBattle(){st='end';rocket();for(let i=0;i<14;i++)paint(R(0,W),R(H*.08,H*.9),R(.12,.22)*W);later(()=>{banner('끝! 소방차 출동');siren();startClean()},1300)}
  function startClean(){st='clean';startDirt=Math.max(.05,measure());label('손가락으로 문질러 거리를 씻어요');bar(1);meter('던진 '+thrown+' · 맞은 '+hit)}
  function finish(){st='done';banner('깨끗!');chime();vib([20,40,20]);label('오늘 던진 토마토 '+thrown+'개 · 맞은 토마토 '+hit+'개');bar(0);
    later(()=>{dirt=null;st='idle';label(IDLE_LABEL)},4200)}
  /* 그리기 도우미 */
  function tomato(x,y,r,sq,face){cx.save();cx.translate(x,y);cx.scale(1+.32*sq,1-.42*sq);const g=cx.createRadialGradient(-r*.3,-r*.35,r*.1,0,0,r);g.addColorStop(0,'#ff8a64');g.addColorStop(.5,'#e8321e');g.addColorStop(1,'#a81a10');cx.fillStyle=g;cx.beginPath();cx.arc(0,0,r,0,7);cx.fill();
    cx.fillStyle='#3d7a2a';for(let k=0;k<5;k++){cx.save();cx.rotate(k*1.2566);cx.beginPath();cx.ellipse(0,-r*.86,r*.1,r*.26,0,0,7);cx.fill();cx.restore()}
    if(face){const e=(ex)=>{cx.fillStyle='#fff';cx.beginPath();cx.arc(ex,-r*.12,r*.22,0,7);cx.fill();cx.fillStyle='#1b1008';cx.beginPath();cx.arc(ex,-r*.2,r*.1,0,7);cx.fill()};e(-r*.3);e(r*.3);cx.fillStyle='#1b1008';cx.beginPath();cx.ellipse(0,r*.35,r*.1,r*.08+sq*r*.08,0,0,7);cx.fill()}
    cx.restore()}
  function drawHam(x,y,s,rot){cx.save();cx.translate(x,y);cx.rotate(rot);const g=cx.createLinearGradient(-s,0,s,0);g.addColorStop(0,'#7a2a1c');g.addColorStop(.5,'#c0563a');g.addColorStop(1,'#6b2418');cx.fillStyle=g;cx.beginPath();cx.ellipse(0,s*.3,s*.55,s*.8,0,0,7);cx.fill();
    cx.fillStyle='rgba(255,220,190,.55)';cx.beginPath();cx.ellipse(-s*.12,s*.05,s*.15,s*.45,-.2,0,7);cx.fill();cx.fillStyle='#f1e6d0';cx.fillRect(-s*.09,-s*.75,s*.18,s*.4);cx.beginPath();cx.arc(-s*.09,-s*.78,s*.1,0,7);cx.arc(s*.09,-s*.78,s*.1,0,7);cx.fill();cx.restore()}
  let pan=0;function drawPole(t){const sg=q('img.stage');pan+=(Math.min(1,h)-pan)*Math.min(1,dt_*6);const ty=(-.225+.45*pan)*H;if(sg)sg.style.transform='translateY('+ty.toFixed(1)+'px) scale(1.45)'}
  let dt_=0;
  return{init(){st='idle';pan=0;msgs=[];timers.forEach(clearTimeout);timers=[];dirt=null;bar(0);label(IDLE_LABEL)},
  wants(){return st==='pole'||st==='battle'||st==='clean'},
  tap(x,y){if(st==='idle')startPole()},
  scrub(x,y,first){
    if(st==='pole'){if(first)climb();return}
    if(st==='battle'){if(first){hold={x,y,sq:0,snd:false}}else if(hold){hold.x=x;hold.y=y}return}
    if(st==='clean'&&dirt){const p=lastP&&!first?lastP:{x,y};const r=W*.12;dx.globalCompositeOperation='destination-out';dx.lineCap='round';dx.lineWidth=r*2;dx.beginPath();dx.moveTo(p.x,p.y);dx.lineTo(x,y);dx.stroke();dx.globalCompositeOperation='source-over';
      for(let k=0;k<5;k++)water.push({x:x+R(-r,r)*.6,y:y+R(-r,r)*.6,vx:R(-160,160)*W/430,vy:R(-220,-40)*W/430,r:R(2,4.5)*W/430,l:R(.35,.7),age:0});
      lastP={x,y};const t=performance.now();if(t-chk>120){chk=t;noise(.12,'highpass',2600,.08)}}},
  release(x,y){lastP=null;if(st!=='battle'||!hold)return;const hd=hold;hold=null;
    if(hd.sq<.55){say('먼저 꾹 으깨야 해요!',W/2,H*.52,'#ffe08a');tone(220,0,.2,.06,'square');return}
    const ty=y>H*.58?H*R(.18,.45):y;fly.push({x0:W/2,y0:H*.64,x1:x,y1:ty,t:0});thrown++;meter('던진 '+thrown+' · 맞은 '+hit)},
  draw(dt){const t=performance.now()/1000;dt_=dt;
    if(st==='pole'||st==='ham'){drawPole(t);const g=geo();
      if(st==='pole'){poleT+=dt;v*=Math.pow(.02,dt);h+=v*dt-.05*dt;h=Math.max(0,h);hug=Math.max(0,hug-dt*5);
        if(h>.3&&Math.random()<dt*.15){h-=.05;say('미끄덩!',W*.7,H*.5,'#ffe08a');noise(.25,'bandpass',400,.2)}
        clapT-=dt;if(clapT<=0){clapT=.5;clap()}
        hoseT-=dt;if(hoseT<=0){hoseT=R(3,5);wave++;const sd=Math.random()<.5?-1:1,y0=H*R(.35,.75);for(let k=0;k<26;k++)spray.push({x:sd<0?-10:W+10,y:y0+R(-10,10),vx:-sd*R(280,520)*W/430,vy:R(-220,-60)*W/430,r:R(2,4)*W/430,age:0,hitDone:false,wave});noise(.6,'highpass',2400,.15)}
        bar(h);meter('높이 '+Math.round(h*100)+'%');if(h>=1)grab();else if(poleT>POLE_TIME)noon()}
      const cy=H*.5,r=W*.1;
      for(let i=spray.length-1;i>=0;i--){const d=spray[i];d.age+=dt;if(d.age>1.4){spray.splice(i,1);continue}d.vy+=600*dt*W/430;d.x+=d.vx*dt;d.y+=d.vy*dt;
        if(st==='pole'&&!d.hitDone&&waveHit!==d.wave&&Math.hypot(d.x-g.px,d.y-cy)<r*1.4){d.hitDone=true;waveHit=d.wave;h=Math.max(0,h-.025);say('물벼락!',g.px-W*.2,cy,'#bfefff')}
        cx.fillStyle='rgba(210,245,255,.85)';cx.beginPath();cx.arc(d.x,d.y,d.r,0,7);cx.fill()}}
    if(dirt)cx.drawImage(dirt,0,0,W,H);
    if(st==='battle'){BT+=dt;bar(1-BT/BATTLE);if(BT>=BATTLE){endBattle()}
      incT-=dt;if(incT<=0){incT=R(2,3.6);inc.push({x:R(W*.15,W*.85),y:R(H*.18,H*.7),t:0})}}
    for(let i=inc.length-1;i>=0;i--){const o=inc[i];o.t+=dt/.5;const r=W*(.02+.16*o.t*o.t);tomato(o.x,o.y,r,0,false);if(o.t>=1){inc.splice(i,1);if(dx)paint(o.x,o.y,W*R(.18,.26));burst(o.x,o.y,20);thud();shake();vib(40);hit++;say('맞았다!',o.x,o.y-W*.15,'#fff');meter('던진 '+thrown+' · 맞은 '+hit)}}
    for(let i=fly.length-1;i>=0;i--){const f=fly[i];f.t+=dt/.42;const k=Math.min(f.t,1),x=f.x0+(f.x1-f.x0)*k,y=f.y0+(f.y1-f.y0)*k-Math.sin(k*Math.PI)*H*.22,r=W*.09*(1-k*.6);
      cx.save();cx.translate(x,y);cx.scale(1.3,.65);tomato(0,0,r,0,false);cx.restore();if(f.t>=1){fly.splice(i,1);if(dx)paint(f.x1,f.y1,W*.1);burst(f.x1,f.y1,16);thud()}}
    if(st==='battle'){const hx=W/2,hy=H*.64,r=W*.1;if(hold){const was=hold.sq;hold.sq=Math.min(1,hold.sq+dt*2.2);if(!hold.snd&&hold.sq>.2){hold.snd=true;squelch()}if(was<.55&&hold.sq>=.55)vib(15);
        tomato(hx,hy,r,hold.sq,false);if(hold.sq>.5){cx.fillStyle='rgba(205,35,20,.8)';for(let k=0;k<4;k++){cx.beginPath();cx.ellipse(hx+(k-1.5)*r*.4,hy+r*.55+(t*60+k*13)%(r*.6),2.5*W/430,4*W/430,0,0,7);cx.fill()}}
        cx.strokeStyle='rgba(255,255,255,.7)';cx.lineWidth=3*W/430;cx.beginPath();cx.arc(hx,hy,r*1.35,-Math.PI/2,-Math.PI/2+hold.sq*Math.PI*2);cx.stroke()}
      else tomato(hx,hy,r,0,false)}
    for(let i=bits.length-1;i>=0;i--){const b=bits[i];b.age+=dt;if(b.age>b.l){bits.splice(i,1);continue}b.vy+=1100*dt*W/430;b.x+=b.vx*dt;b.y+=b.vy*dt;cx.globalAlpha=Math.min(1,(b.l-b.age)*4);cx.fillStyle='#e2321e';cx.beginPath();cx.arc(b.x,b.y,b.r,0,7);cx.fill();cx.globalAlpha=1}
    for(let i=water.length-1;i>=0;i--){const d=water[i];d.age+=dt;if(d.age>d.l){water.splice(i,1);continue}d.vy+=900*dt*W/430;d.x+=d.vx*dt;d.y+=d.vy*dt;cx.globalAlpha=Math.min(1,(d.l-d.age)*3)*.85;cx.fillStyle='#d8f3ff';cx.beginPath();cx.arc(d.x,d.y,d.r,0,7);cx.fill();cx.globalAlpha=1}
    if(st==='clean'&&dirt){const n=performance.now();if(n-chk>40&&Math.random()<.15){const left=measure()/startDirt;bar(left);if(left<.12)finish()}}
    for(let i=msgs.length-1;i>=0;i--){const m=msgs[i];m.age+=dt;if(m.age>1.3){msgs.splice(i,1);continue}const a=Math.min(1,(1.3-m.age)*2.5);cx.globalAlpha=a;cx.font='400 '+Math.round(W*.075)+'px Jua,sans-serif';cx.textAlign='center';cx.lineWidth=6*W/430;cx.strokeStyle='rgba(40,10,5,.8)';cx.strokeText(m.t,m.x,m.y-m.age*40);cx.fillStyle=m.c;cx.fillText(m.t,m.x,m.y-m.age*40);cx.globalAlpha=1}
    if(flash>0){cx.fillStyle='rgba(255,250,230,'+flash*.6+')';cx.fillRect(0,0,W,H);flash=Math.max(0,flash-dt*2.5)}}}};

/* ---------- 버닝맨: 영상 + 게이지 이벤트(맨 태우기) ---------- */
SC.burn=()=>{let n=0,count=0,state='idle',sp=[],evT=-1;const NEED=10;
  const q=sel=>cur.el.querySelector(sel);
  const bar=v=>{const i=q('.gauge i');if(i)i.style.width=Math.round(v*100)+'%'};
  const emb=(x,y,k)=>{for(let i=0;i<k;i++){const a=R(-2.7,-.45),v=R(50,170)*W/430;sp.push({x,y,vx:Math.cos(a)*v*.7,vy:Math.sin(a)*v,r:R(2.5,5)*W/430,l:R(1,2.2),age:0,ph:R(0,6),dust:Math.random()<.35})}};
  function fire(){if(state!=='idle')return;const ve=q('video.ve'),bn=q('.banner');if(!ve)return;state='event';
    try{ve.currentTime=0}catch(e){}const p=ve.play();p&&p.catch&&p.catch(()=>{});ve.classList.add('on');evT=0;vib([40,40,80]);
    [0,3,7,10].forEach((k,i)=>tone(196*Math.pow(2,k/12),i*.25,2.6,.07,'triangle'));noise(4,'lowpass',500,.12);
    if(bn){bn.classList.remove('show','sync');void bn.offsetWidth;bn.classList.add('show')}
    let fin=false;const done=()=>{if(fin)return;fin=true;ve.removeEventListener('ended',done);
      const vl=q('video.vl');if(vl){try{vl.currentTime=0}catch(e){}const p2=vl.play();p2&&p2.catch&&p2.catch(()=>{})}
      ve.classList.add('hold');ve.classList.remove('on');tone(130.8,0,3,.05,'triangle');
      setTimeout(()=>{ve.pause();ve.classList.remove('hold');state='idle';count=0;bar(0)},3000)};
    ve.addEventListener('ended',done);setTimeout(done,8000)}
  return{init(){n=0;count=0;state='idle';sp=[];evT=-1;bar(0)},
  tap(x,y){emb(x,y,20);noise(.3,'bandpass',600,.15);tone(196,0,.6,.04,'triangle');if(state!=='idle')return;count++;n++;bar(count/NEED);meter('모은 불씨 '+n);if(count>=NEED)fire()},
  draw(dt){const t=performance.now()/1000;
    if(evT>=0){evT+=dt;if(evT<5){if(evT>1.5&&Math.random()<dt*14){const e=sp.length;emb(W*R(.35,.65),H*R(.12,.45),3);for(let i=e;i<sp.length;i++)sp[i].dust=false}}else evT=-1}
    for(let i=sp.length-1;i>=0;i--){const p=sp[i];p.age+=dt;if(p.age>p.l){sp.splice(i,1);continue}p.vy+=(p.dust?20:-12)*dt;p.vx*=.98;p.x+=p.vx*dt+Math.sin(t*2.4+p.ph)*.5;p.y+=p.vy*dt;const a=Math.sin(Math.PI*p.age/p.l);
      if(p.dust){cx.globalAlpha=a*.35;cx.fillStyle='#f3d6c0';cx.beginPath();cx.arc(p.x,p.y,p.r*3,0,7);cx.fill();cx.globalAlpha=1}
      else{add(cx,'lighter');halo(p.x,p.y,p.r*6,'255,140,60',.65*a);cx.globalAlpha=a;cx.fillStyle='#ffe2a8';cx.beginPath();cx.arc(p.x,p.y,p.r*.6,0,7);cx.fill();cx.globalAlpha=1;add(cx,'source-over')}}}}};

/* ---------- 공통: 의식 단계 도우미 ---------- */
const ritualKit=()=>{const q=sel=>cur.el.querySelector(sel);const tm=[];
  return{q,
    bar:v=>{const i=q('.gauge i');if(i)i.style.width=Math.round(Math.max(0,Math.min(1,v))*100)+'%'},
    label:t=>{const s=q('.gauge span');if(s)s.textContent=t},
    banner:(t,small)=>{const b=q('.banner');if(!b)return;b.textContent=t;b.classList.remove('show','sync');b.classList.toggle('sync',!!small);void b.offsetWidth;b.classList.add('show')},
    later:(f,ms)=>tm.push(setTimeout(f,ms)),clear:()=>{tm.forEach(clearTimeout);tm.length=0},
    stage:on=>{const s=q('img.stage');if(s)s.classList.toggle('on',on)},
    IP:(fx,fy)=>{const iw=720,ih=1284,sc=Math.max(W/iw,H/ih),mw=iw*sc,mh=ih*sc;return{x:(W-mw)/2+fx*mw,y:(H-mh)*.4+fy*mh}},
    msgs:[],say(t,x,y,c){this.msgs.push({t,x,y,age:0,c:c||'#fff'})},
    drawMsgs(dt){const m=this.msgs;for(let i=m.length-1;i>=0;i--){const o=m[i];o.age+=dt;if(o.age>1.8){m.splice(i,1);continue}const a=Math.min(1,(1.8-o.age)*2);cx.globalAlpha=a;cx.font='400 '+Math.round(W*.068)+'px Jua,sans-serif';cx.textAlign='center';cx.lineWidth=6*W/430;cx.strokeStyle='rgba(20,10,30,.75)';cx.strokeText(o.t,o.x,o.y-o.age*30);cx.fillStyle=o.c;cx.fillText(o.t,o.x,o.y-o.age*30);cx.globalAlpha=1}}}};

/* ---------- 송끄란: 롯남담후아(어른 손에 물 붓기) → 축복 → 물싸움 ---------- */
SC.song=()=>{let K,n=0,count=0,state='ritual',dr=[],rip=[],evT=-1,amt=0,hold=null,pet=[],warned=false;const NEED=10;
  const HANDS=[[.25,.55],[.76,.55]];
  const splash=(x,y,k,sp)=>{for(let i=0;i<k;i++){const a=R(-3.0,-.15),v=R(80,sp)*W/430;dr.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,r:R(2,4.5)*W/430,age:0,l:R(.5,1.1)})}rip.push({x,y,age:0})};
  const water=()=>{noise(.35,'highpass',2400,.18);noise(.2,'bandpass',900,.1)};
  function startRitual(){state='ritual';amt=0;K.stage(true);K.label('꾹 누른 채 어른 손 위에서 · 천천히 부어요');K.bar(0);meter('롯남담후아');K.banner('어른께 물 붓기',true)}
  function bless(){state='bless';hold=null;K.banner('축복을 받았어요');[0,4,7,12].forEach((k,i)=>tone(659.3*Math.pow(2,k/12),i*.14,1.8,.07));vib([20,40,20]);
    for(let i=0;i<70;i++)pet.push({x:R(0,W),y:R(-H*.6,-10),vy:R(50,110),ph:R(0,6),r:R(5,9)*W/430,rot:R(0,6)});
    K.say('올 한 해 건강하고 행복하렴',W/2,H*.3,'#fffbe8');
    K.later(()=>{K.stage(false);state='idle';K.label('눌러서 물을 뿌려요');K.bar(0);meter('뿌린 물 0');K.banner('이제 거리로!')},4200)}
  function fire(){if(state!=='idle')return;const ve=K.q('video.ve');if(!ve)return;state='event';
    try{ve.currentTime=0}catch(e){}const p=ve.play();p&&p.catch&&p.catch(()=>{});ve.classList.add('on');evT=0;vib([30,30,30,30,60]);
    [0,5,9,12,16].forEach((k,i)=>tone(587.3*Math.pow(2,k/12),i*.09,1.2,.07));noise(1.4,'highpass',3000,.15);K.banner('물싸움 시작!');
    let fin=false;const done=()=>{if(fin)return;fin=true;ve.removeEventListener('ended',done);const vl=K.q('video.vl');if(vl){try{vl.currentTime=0}catch(e){}const p2=vl.play();p2&&p2.catch&&p2.catch(()=>{})}
      ve.classList.add('hold');ve.classList.remove('on');tone(784,0,2.2,.04);K.later(()=>{ve.pause();ve.classList.remove('hold');state='idle';count=0;K.bar(0)},3000)};
    ve.addEventListener('ended',done);K.later(done,8000)}
  return{init(){K=ritualKit();K.clear();n=0;count=0;dr=[];rip=[];pet=[];evT=-1;startRitual()},
  wants(){return state==='ritual'},
  scrub(x,y,first){if(state!=='ritual')return;if(first){hold={x,y,t:0};warned=false}else if(hold){hold.x=x;hold.y=y}},
  release(){hold=null},
  tap(x,y){if(state!=='idle'&&state!=='event')return;splash(x,y,22,330);water();if(state!=='idle')return;count++;n++;K.bar(count/NEED);meter('뿌린 물 '+n);if(count>=NEED)fire()},
  draw(dt){const t=performance.now()/1000;
    if(state==='ritual'&&hold){hold.t+=dt;const fast=hold.t>1.5;let land=null;for(const h of HANDS){const p=K.IP(h[0],h[1]);if(Math.abs(hold.x-p.x)<W*.1)land=p}
      const ly=land?land.y:H*.8,w=(fast?14:7)*W/430;add(cx,'lighter');halo(hold.x,ly,W*.09,'200,240,255',.45);add(cx,'source-over');
      const g=cx.createLinearGradient(0,0,0,ly);g.addColorStop(0,'rgba(220,245,255,.35)');g.addColorStop(1,'rgba(240,252,255,.95)');cx.strokeStyle=g;cx.lineWidth=w;cx.lineCap='round';
      cx.beginPath();cx.moveTo(hold.x,-10);for(let k=1;k<=12;k++){const yy=ly*k/12;cx.lineTo(hold.x+Math.sin(t*14+k)*w*.35,yy)}cx.stroke();
      cx.strokeStyle='rgba(255,255,255,.7)';cx.lineWidth=w*.3;cx.beginPath();cx.moveTo(hold.x-w*.2,-10);cx.lineTo(hold.x-w*.2,ly);cx.stroke();
      if(Math.random()<dt*(fast?40:12))splash(hold.x+R(-6,6),ly,fast?4:1,fast?260:110);
      if(land){if(fast){amt=Math.max(0,amt-dt*.05);if(!warned){warned=true;K.say('너무 세요, 천천히!',W/2,H*.32,'#ffe08a');noise(.4,'highpass',1600,.2)}}
        else{amt=Math.min(1,amt+dt*.17);if(Math.random()<dt*5)tone(1200+R(0,600),0,.08,.015)}}
      else if(Math.random()<dt*1.2)K.say('손 위에 부어요',W/2,H*.32,'#bfefff');
      K.bar(amt);if(amt>=1)bless()}
    for(let i=pet.length-1;i>=0;i--){const p=pet[i];p.y+=p.vy*dt;p.x+=Math.sin(t*1.5+p.ph)*.5;if(p.y>H+20){pet.splice(i,1);continue}
      cx.save();cx.translate(p.x,p.y);cx.rotate(t*.8+p.rot);cx.fillStyle='rgba(255,255,250,.95)';for(let k=0;k<5;k++){cx.save();cx.rotate(k*1.2566);cx.beginPath();cx.ellipse(0,-p.r*.6,p.r*.35,p.r*.6,0,0,7);cx.fill();cx.restore()}cx.fillStyle='#ffd34d';cx.beginPath();cx.arc(0,0,p.r*.22,0,7);cx.fill();cx.restore()}
    if(evT>=0){evT+=dt;if(evT<4.5){if(Math.random()<dt*4)splash(R(0,W),R(H*.15,H*.75),16,420)}else evT=-1}
    for(let i=rip.length-1;i>=0;i--){const r=rip[i];r.age+=dt;if(r.age>.8){rip.splice(i,1);continue}const k=r.age/.8;cx.strokeStyle='rgba(225,248,255,'+(1-k)*.7+')';cx.lineWidth=2*W/430;cx.beginPath();cx.ellipse(r.x,r.y,W*.13*k,W*.05*k,0,0,7);cx.stroke()}
    for(let i=dr.length-1;i>=0;i--){const d=dr[i];d.age+=dt;if(d.age>d.l){dr.splice(i,1);continue}d.vy+=900*dt*W/430;d.x+=d.vx*dt;d.y+=d.vy*dt;const a=Math.min(1,(d.l-d.age)*3);
      const g=cx.createRadialGradient(d.x-d.r*.3,d.y-d.r*.3,0,d.x,d.y,d.r);g.addColorStop(0,'rgba(255,255,255,'+a+')');g.addColorStop(.6,'rgba(200,240,255,'+a*.7+')');g.addColorStop(1,'rgba(150,215,255,'+a*.25+')');cx.fillStyle=g;cx.beginPath();cx.arc(d.x,d.y,d.r,0,7);cx.fill()}
    K.drawMsgs(dt)}}};

/* ---------- 홀리: 전날 밤 홀리카 모닥불 → 아침 → 친구 얼굴에 색 문지르기 → "부라 나 마노, 홀리 하이!" ---------- */
const HMASK=new Image();HMASK.src='img/holi-friends-mask.png';
SC.holi=()=>{let K,n=0,count=0,state='night',puffs=[],evT=-1,heat=0,sticks=[],emb=[],flare=0,dawn=0,pc=null,pg=null,tmp=null,painted=0,ci=0,last=null;const NEED=10;
  const COL=['255,72,176','255,206,40','40,200,230','120,220,90','255,130,40','170,110,255'];
  const FIRE=()=>K.IP(.505,.72);
  const puff=(x,y,big,c)=>{c=c||COL[Math.floor(R(0,COL.length))];const k=big?10:7;for(let i=0;i<k;i++){const a=R(0,6.283),v=R(30,big?260:150)*W/430;puffs.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-40*W/430,r:R(14,big?50:30)*W/430,c,age:0,l:R(1.2,big?2.6:2.2)})}
    for(let i=0;i<14;i++){const a=R(0,6.283),v=R(80,300)*W/430;puffs.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-60*W/430,r:R(1.5,3)*W/430,c,age:0,l:R(.6,1.2),dot:1})}};
  const crackle=()=>{for(let i=0;i<5;i++)setTimeout(()=>noise(.05,'bandpass',R(1500,3500),.25),i*R(40,90))};
  function toss(x,y){const f=FIRE();sticks.push({x0:x,y0:y,x1:f.x+R(-W*.05,W*.05),y1:f.y+R(-W*.03,W*.02),t:0,rot:R(0,6)})}
  function morning(){state='flare';flare=1;K.banner('홀리카 다한');[0,3,7,10,12].forEach((k,i)=>tone(220*Math.pow(2,k/12),i*.12,2,.07,'triangle'));noise(1.6,'lowpass',500,.4);vib([40,40,80]);
    K.later(()=>{state='dawn';dawn=0},1800)}
  function startPaint(){state='paint';K.stage(false);pc=document.createElement('canvas');pc.width=Math.ceil(W);pc.height=Math.ceil(H);pg=pc.getContext('2d');tmp=document.createElement('canvas');tmp.width=pc.width;tmp.height=pc.height;painted=0;ci=0;
    K.banner('홀리 아침이에요');K.label('손가락으로 두 친구 얼굴에 색을 문질러요');K.bar(0);meter('색칠 0%')}
  function throwback(){state='back';K.banner('부라 나 마노,\n홀리 하이!',true);K.say('화내지 마, 홀리잖아!',W/2,H*.3,'#fff');vib([30,30,60]);noise(.8,'bandpass',900,.3);
    for(let i=0;i<7;i++)K.later(()=>{puff(R(W*.1,W*.9),R(H*.1,H*.55),true);noise(.3,'bandpass',800,.2)},i*230);
    K.later(()=>{state='idle';count=0;K.label('눌러서 색 가루를 던져요');K.bar(0);meter('던진 가루 0')},3200)}
  function fire(){if(state!=='idle')return;const ve=K.q('video.ve');if(!ve)return;state='event';
    try{ve.currentTime=0}catch(e){}const p=ve.play();p&&p.catch&&p.catch(()=>{});ve.classList.add('on');evT=0;vib([30,30,30,30,60]);
    [0,4,7,11,14].forEach((k,i)=>tone(440*Math.pow(2,k/12),i*.1,1.4,.08));noise(.8,'bandpass',1200,.25);K.banner('색의 폭발');
    let fin=false;const done=()=>{if(fin)return;fin=true;ve.removeEventListener('ended',done);const vl=K.q('video.vl');if(vl){try{vl.currentTime=0}catch(e){}const p2=vl.play();p2&&p2.catch&&p2.catch(()=>{})}
      ve.classList.add('hold');ve.classList.remove('on');tone(523.25,0,2.4,.05);K.later(()=>{ve.pause();ve.classList.remove('hold');state='idle';count=0;K.bar(0)},3000)};
    ve.addEventListener('ended',done);K.later(done,8000)}
  return{init(){K=ritualKit();K.clear();puffs=[];sticks=[];emb=[];heat=0;flare=0;pc=null;state='night';K.stage(true);K.label('눌러서 마른 나뭇가지를 불에 던져요');K.bar(0);meter('홀리 전날 밤');K.banner('홀리 전날 밤',true)},
  wants(){return state==='paint'},
  scrub(x,y,first){if(state!=='paint')return;if(first){ci=(ci+1)%COL.length;last=null;noise(.15,'bandpass',900,.12)}const c=COL[ci],p=last||{x,y},dist=Math.hypot(x-p.x,y-p.y),steps=Math.max(1,Math.ceil(dist/16));
    for(let s=0;s<=steps;s++){const px=p.x+(x-p.x)*s/steps,py=p.y+(y-p.y)*s/steps,r=W*R(.045,.07),ox=px+R(-1,1)*W*.012,oy=py+R(-1,1)*W*.012;const g=pg.createRadialGradient(ox,oy,0,ox,oy,r);g.addColorStop(0,'rgba('+c+',.2)');g.addColorStop(.6,'rgba('+c+',.08)');g.addColorStop(1,'rgba('+c+',0)');pg.fillStyle=g;pg.fillRect(ox-r,oy-r,r*2,r*2);
      for(let k=0;k<7;k++){const a=R(0,7),d=r*Math.sqrt(R(0,1))*1.1;pg.fillStyle='rgba('+c+','+R(.25,.6).toFixed(2)+')';pg.beginPath();pg.arc(ox+Math.cos(a)*d,oy+Math.sin(a)*d,R(.5,1.4)*W/430,0,7);pg.fill()}}
    const sc=Math.max(W/360,H/646),mw=360*sc,mh=646*sc,mx=(W-mw)/2,my=(H-mh)*.4;const inside=x>mx+70*sc&&x<mx+280*sc&&y>my+388*sc&&y<my+526*sc;if(inside)painted+=dist;last={x,y};
    const v=Math.min(1,painted/(W*4));K.bar(v);meter('색칠 '+Math.round(v*100)+'%');if(v>=1)throwback()},
  release(){last=null},
  tap(x,y){if(state==='night'){toss(x,y);return}if(state!=='idle'&&state!=='event')return;puff(x,y,false);noise(.35,'bandpass',900,.25);if(state!=='idle')return;count++;n++;K.bar(count/NEED);meter('던진 가루 '+n);if(count>=NEED)fire()},
  draw(dt){const t=performance.now()/1000;
    if(state==='night'||state==='flare'||state==='dawn'){const f=FIRE(),fl=1+Math.sin(t*9)*.06+Math.sin(t*23)*.04,rad=W*(.16+.22*heat+.6*flare)*fl;
      add(cx,'lighter');halo(f.x,f.y-W*.04,rad,'255,140,40',.28+.3*heat+.3*flare);halo(f.x,f.y-W*.08,rad*.5,'255,210,120',.18+.25*heat);add(cx,'source-over');
      if(Math.random()<dt*(6+30*heat+60*flare))emb.push({x:f.x+R(-W*.06,W*.06),y:f.y,vy:-R(60,160)*W/430,vx:R(-20,20),l:R(1,2.2),age:0});
      if(flare>0)flare=Math.max(0,flare-dt*.35)}
    for(let i=emb.length-1;i>=0;i--){const e=emb[i];e.age+=dt;if(e.age>e.l){emb.splice(i,1);continue}e.x+=e.vx*dt+Math.sin(t*3+i)*.4;e.y+=e.vy*dt;const a=Math.sin(Math.PI*e.age/e.l);add(cx,'lighter');halo(e.x,e.y,5*W/430,'255,170,70',.8*a);add(cx,'source-over')}
    for(let i=sticks.length-1;i>=0;i--){const s=sticks[i];s.t+=dt/.55;const k=Math.min(1,s.t),x=s.x0+(s.x1-s.x0)*k,y=s.y0+(s.y1-s.y0)*k-Math.sin(k*Math.PI)*H*.15;
      cx.save();cx.translate(x,y);cx.rotate(s.rot+k*8);cx.strokeStyle='#6b4a2a';cx.lineCap='round';cx.lineWidth=4*W/430;cx.beginPath();cx.moveTo(-W*.03,0);cx.lineTo(W*.03,0);cx.moveTo(W*.01,0);cx.lineTo(W*.025,-W*.015);cx.stroke();cx.fillStyle='#8a6a2a';cx.beginPath();cx.ellipse(-W*.02,-W*.008,W*.008,W*.004,.4,0,7);cx.fill();cx.restore();
      if(s.t>=1){sticks.splice(i,1);heat=Math.min(1,heat+.1);count++;K.bar(heat);meter('던진 나뭇가지 '+count);crackle();for(let j=0;j<10;j++)emb.push({x:s.x1+R(-10,10),y:s.y1,vy:-R(120,260)*W/430,vx:R(-60,60),l:R(.6,1.4),age:0});if(heat>=.999&&state==='night')morning()}}
    if(state==='dawn'){dawn+=dt;const a=dawn<1.2?dawn/1.2:Math.max(0,1-(dawn-1.2)/1.2);cx.fillStyle='rgba(255,232,215,'+a+')';cx.fillRect(0,0,W,H);if(dawn>=1.2&&!pc)startPaint();if(dawn>2.4)state=state==='dawn'?'paint':state}
    if(pc&&HMASK.complete&&HMASK.naturalWidth){const tg=tmp.getContext('2d');tg.globalCompositeOperation='source-over';tg.clearRect(0,0,tmp.width,tmp.height);tg.drawImage(pc,0,0);tg.globalCompositeOperation='destination-in';const sc=Math.max(W/360,H/646),mw=360*sc,mh=646*sc;tg.drawImage(HMASK,(W-mw)/2,(H-mh)*.4,mw,mh);cx.globalCompositeOperation='multiply';cx.globalAlpha=.9;cx.drawImage(tmp,0,0,W,H);cx.globalAlpha=1;cx.globalCompositeOperation='source-over'}
    if(state==='paint'&&dawn<2.4){dawn+=dt;const a=Math.max(0,1-(dawn-1.2)/1.2);cx.fillStyle='rgba(255,232,215,'+a+')';cx.fillRect(0,0,W,H)}
    if(evT>=0){evT+=dt;if(evT<4.5){if(Math.random()<dt*5)puff(R(0,W),R(H*.1,H*.6),true)}else evT=-1}
    for(let i=puffs.length-1;i>=0;i--){const p=puffs[i];p.age+=dt;if(p.age>p.l){puffs.splice(i,1);continue}p.vx*=.95;p.vy=p.vy*.95+(p.dot?260:14)*dt*W/430;p.x+=p.vx*dt;p.y+=p.vy*dt;const k=p.age/p.l,a=(1-k)*(p.dot?1:.55);
      if(p.dot){cx.globalAlpha=a;cx.fillStyle='rgb('+p.c+')';cx.beginPath();cx.arc(p.x,p.y,p.r,0,7);cx.fill();cx.globalAlpha=1}
      else{const r=p.r*(1+k*1.4);const g=cx.createRadialGradient(p.x,p.y,0,p.x,p.y,r);g.addColorStop(0,'rgba('+p.c+','+a+')');g.addColorStop(.6,'rgba('+p.c+','+a*.5+')');g.addColorStop(1,'rgba('+p.c+',0)');cx.fillStyle=g;cx.fillRect(p.x-r,p.y-r,r*2,r*2)}}
    K.drawMsgs(dt)}}};
