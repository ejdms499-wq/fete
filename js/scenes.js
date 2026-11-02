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

/* ---------- 라 토마티나: 영상 + 게이지 이벤트(토마토 대전) ---------- */
SC.tom=()=>{let n=0,count=0,state='idle',drops=[],spl=[],dirt=null,dx=null,water=[],lastP=null,chk=0,left=1,startDirt=1;const NEED=10;
  const label=t=>{const sp=q('.gauge span');if(sp)sp.textContent=t};
  function mkDirt(){dirt=document.createElement('canvas');dirt.width=Math.ceil(W);dirt.height=Math.ceil(H);dx=dirt.getContext('2d')}
  function paint(x,y,r){const g=dx;for(let k=0;k<8;k++){const px=x+R(-.5,.5)*r,py=y+R(-.45,.45)*r,rr=R(.25,.55)*r;const gr=g.createRadialGradient(px,py,0,px,py,rr);gr.addColorStop(0,'rgba(222,40,22,.95)');gr.addColorStop(.7,'rgba(196,30,18,.8)');gr.addColorStop(1,'rgba(196,30,18,0)');g.fillStyle=gr;g.fillRect(px-rr,py-rr,rr*2,rr*2)}
    g.strokeStyle='rgba(200,32,18,.85)';g.lineCap='round';for(let k=0;k<4;k++){g.lineWidth=R(3,7)*W/430;const sx=x+R(-.35,.35)*r;g.beginPath();g.moveTo(sx,y);g.lineTo(sx+R(-3,3),y+R(.5,1.5)*r);g.stroke()}
    g.fillStyle='rgba(255,215,120,.9)';for(let k=0;k<10;k++){g.beginPath();g.ellipse(x+R(-.5,.5)*r,y+R(-.45,.45)*r,2.4*W/430,1.4*W/430,R(0,3),0,7);g.fill()}}
  function measure(){const s=24,t=document.createElement('canvas');t.width=s;t.height=Math.round(s*H/W);const g=t.getContext('2d');g.drawImage(dirt,0,0,t.width,t.height);const d=g.getImageData(0,0,t.width,t.height).data;let a=0;for(let i=3;i<d.length;i+=4)a+=d[i];return a/(d.length/4*255)}
  function startClean(){state='clean';mkDirt();for(let i=0;i<34;i++)paint(R(0,W),R(H*.06,H*.92),R(.12,.24)*W);startDirt=measure();left=1;label('손가락으로 문질러 거리를 씻어요');bar(1);
    const h=q('.banner');if(h){h.textContent='소방차 출동';h.classList.remove('show','sync');void h.offsetWidth;h.classList.add('show')}
    try{const a=ac();if(a){const t=a.currentTime;[0,.5,1,1.5].forEach(o=>{tone(960,o,.24,.05,'square');tone(720,o+.25,.24,.05,'square')})}}catch(e){}}
  function finishClean(){state='done';label('깨끗해졌어요!');const h=q('.banner');if(h){h.textContent='깨끗!';h.classList.remove('show');void h.offsetWidth;h.classList.add('show')}chime();vib([20,40,20]);
    setTimeout(()=>{dirt=null;state='idle';count=0;bar(0);label('눌러서 토마토를 던져요');const b=q('.banner');if(b)b.textContent='토마토 대전!'},2400)}
  const q=sel=>cur.el.querySelector(sel);
  const bar=v=>{const i=q('.gauge i');if(i)i.style.width=Math.round(v*100)+'%'};
  const burst=(x,y,k,big)=>{for(let i=0;i<k;i++){const a=R(0,6.283),v=R(90,big?520:340)*W/430;drops.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-120*W/430,r:R(2.5,big?8:6)*W/430,l:R(.45,.9),age:0,seed:R(0,1)})}
    spl.push({x,y,age:0,r:(big?.16:.09)*W,blobs:Array.from({length:7},()=>({dx:R(-.45,.45),dy:R(-.4,.4),rr:R(.25,.5)}))})};
  function fire(){if(state!=='idle')return;const ve=q('video.ve'),bn=q('.banner');if(!ve)return;state='event';
    try{ve.currentTime=0}catch(e){}const p=ve.play();p&&p.catch&&p.catch(()=>{});ve.classList.add('on');vib([40,30,40,30,80]);
    noise(.5,'lowpass',900,.6);[0,4,7,12].forEach((k,i)=>tone(330*Math.pow(2,k/12),i*.12,.6,.09,'square'));
    for(let i=0;i<6;i++)setTimeout(()=>{splat();burst(R(W*.1,W*.9),R(H*.15,H*.7),14,true);shake()},500+i*420);
    if(bn){bn.classList.remove('show','sync');void bn.offsetWidth;bn.classList.add('show')}
    let fin=false;const done=()=>{if(fin)return;fin=true;ve.removeEventListener('ended',done);
      const vl=q('video.vl');if(vl){try{vl.currentTime=0}catch(e){}const p2=vl.play();p2&&p2.catch&&p2.catch(()=>{})}
      ve.classList.add('hold');ve.classList.remove('on');
      setTimeout(()=>{ve.pause();ve.classList.remove('hold')},3000);startClean()};
    ve.addEventListener('ended',done);setTimeout(done,8000)}
  return{init(){n=0;count=0;state='idle';drops=[];spl=[];dirt=null;water=[];bar(0)},
  wants(){return state==='clean'},
  scrub(x,y,first){if(state!=='clean'||!dirt)return;const p=lastP&&!first?lastP:{x,y};const r=W*.12;dx.globalCompositeOperation='destination-out';dx.lineCap='round';dx.lineWidth=r*2;dx.strokeStyle='#000';dx.beginPath();dx.moveTo(p.x,p.y);dx.lineTo(x,y);dx.stroke();dx.globalCompositeOperation='source-over';
    for(let k=0;k<5;k++)water.push({x:x+R(-r,r)*.6,y:y+R(-r,r)*.6,vx:R(-160,160)*W/430,vy:R(-220,-40)*W/430,r:R(2,4.5)*W/430,l:R(.35,.7),age:0});
    lastP={x,y};if(first)lastP=null,lastP={x,y};const t=performance.now();if(t-chk>120){chk=t;noise(.12,'highpass',2600,.08)}},
  tap(x,y){if(state==='clean'||state==='done')return;splat();burst(x,y,16,false);shake();if(state!=='idle')return;count++;n++;bar(count/NEED);meter('던진 토마토 '+n);if(count>=NEED)fire()},
  draw(dt){
    if(dirt){cx.drawImage(dirt,0,0,W,H);if(state==='clean'){const t=performance.now();if(t-chk>40&&Math.random()<.15){left=Math.max(0,(measure()-0)/startDirt);bar(left);if(left<.12)finishClean()}}}
    for(let i=water.length-1;i>=0;i--){const d=water[i];d.age+=dt;if(d.age>d.l){water.splice(i,1);continue}d.vy+=900*dt*W/430;d.x+=d.vx*dt;d.y+=d.vy*dt;cx.globalAlpha=Math.min(1,(d.l-d.age)*3)*.85;cx.fillStyle='#d8f3ff';cx.beginPath();cx.arc(d.x,d.y,d.r,0,7);cx.fill();cx.globalAlpha=1}
    for(let i=spl.length-1;i>=0;i--){const s=spl[i];s.age+=dt;const life=1.6;if(s.age>life){spl.splice(i,1);continue}
      const g=Math.min(1,s.age*8),a=Math.min(1,(life-s.age)/.8)*.85;cx.globalAlpha=a;
      s.blobs.forEach(b=>{const x=s.x+b.dx*s.r,y=s.y+b.dy*s.r,r=b.rr*s.r*g;const gr=cx.createRadialGradient(x,y,0,x,y,r);gr.addColorStop(0,'rgba(230,45,25,.95)');gr.addColorStop(.75,'rgba(205,35,20,.75)');gr.addColorStop(1,'rgba(205,35,20,0)');cx.fillStyle=gr;cx.fillRect(x-r,y-r,r*2,r*2)});
      cx.fillStyle='rgba(255,215,120,.85)';for(let k=0;k<6;k++){const an=k*1.05+s.r,rr=s.r*.25;cx.beginPath();cx.ellipse(s.x+Math.cos(an)*rr,s.y+Math.sin(an)*rr,2.2*W/430,1.3*W/430,an,0,7);cx.fill()}
      cx.globalAlpha=1}
    for(let i=drops.length-1;i>=0;i--){const d=drops[i];d.age+=dt;if(d.age>d.l){drops.splice(i,1);continue}d.vy+=1100*dt*W/430;d.x+=d.vx*dt;d.y+=d.vy*dt;
      cx.globalAlpha=Math.min(1,(d.l-d.age)*4);cx.fillStyle=d.seed>.8?'#ffb24a':'#e2321e';cx.beginPath();cx.arc(d.x,d.y,d.r,0,7);cx.fill();cx.globalAlpha=1}}}};

/* ---------- 버닝맨: 영상 반복 + 누르면 불씨와 먼지 (불태우기 이벤트는 영상 준비 중) ---------- */
SC.burn=()=>{let n=0,sp=[];
  const emb=(x,y,k)=>{for(let i=0;i<k;i++){const a=R(-2.7,-.45),v=R(50,170)*W/430;sp.push({x,y,vx:Math.cos(a)*v*.7,vy:Math.sin(a)*v,r:R(2.5,5)*W/430,l:R(1,2.2),age:0,ph:R(0,6),dust:Math.random()<.35})}};
  return{init(){n=0;sp=[]},
  tap(x,y){emb(x,y,20);n++;meter('모은 불씨 '+n);noise(.3,'bandpass',600,.15);tone(196,0,.6,.04,'triangle')},
  draw(dt){const t=performance.now()/1000;
    for(let i=sp.length-1;i>=0;i--){const p=sp[i];p.age+=dt;if(p.age>p.l){sp.splice(i,1);continue}p.vy+=(p.dust?20:-12)*dt;p.vx*=.98;p.x+=p.vx*dt+Math.sin(t*2.4+p.ph)*.5;p.y+=p.vy*dt;const a=Math.sin(Math.PI*p.age/p.l);
      if(p.dust){cx.globalAlpha=a*.35;cx.fillStyle='#f3d6c0';cx.beginPath();cx.arc(p.x,p.y,p.r*3,0,7);cx.fill();cx.globalAlpha=1}
      else{add(cx,'lighter');halo(p.x,p.y,p.r*6,'255,140,60',.65*a);cx.globalAlpha=a;cx.fillStyle='#ffe2a8';cx.beginPath();cx.arc(p.x,p.y,p.r*.6,0,7);cx.fill();cx.globalAlpha=1;add(cx,'source-over')}}}}};

/* ---------- 홀리: 영상 + 게이지 이벤트(색의 폭발) ---------- */
SC.holi=()=>{let n=0,count=0,state='idle',puffs=[],evT=-1;const NEED=10;
  const COL=['255,72,176','255,206,40','40,200,230','120,220,90','255,130,40','170,110,255'];
  const q=sel=>cur.el.querySelector(sel);
  const bar=v=>{const i=q('.gauge i');if(i)i.style.width=Math.round(v*100)+'%'};
  const puff=(x,y,big)=>{const c=COL[Math.floor(R(0,COL.length))];const k=big?10:7;for(let i=0;i<k;i++){const a=R(0,6.283),v=R(30,big?260:150)*W/430;puffs.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-40*W/430,r:R(14,big?46:30)*W/430,c,age:0,l:R(1.2,2.2)})}
    for(let i=0;i<14;i++){const a=R(0,6.283),v=R(80,300)*W/430;puffs.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-60*W/430,r:R(1.5,3)*W/430,c,age:0,l:R(.6,1.2),dot:1})}};
  function fire(){if(state!=='idle')return;const ve=q('video.ve'),bn=q('.banner');if(!ve)return;state='event';
    try{ve.currentTime=0}catch(e){}const p=ve.play();p&&p.catch&&p.catch(()=>{});ve.classList.add('on');evT=0;vib([30,30,30,30,60]);
    [0,4,7,11,14].forEach((k,i)=>tone(440*Math.pow(2,k/12),i*.1,1.4,.08));noise(.8,'bandpass',1200,.25);
    if(bn){bn.classList.remove('show','sync');void bn.offsetWidth;bn.classList.add('show')}
    let fin=false;const done=()=>{if(fin)return;fin=true;ve.removeEventListener('ended',done);
      const vl=q('video.vl');if(vl){try{vl.currentTime=0}catch(e){}const p2=vl.play();p2&&p2.catch&&p2.catch(()=>{})}
      ve.classList.add('hold');ve.classList.remove('on');tone(523.25,0,2.4,.05);
      setTimeout(()=>{ve.pause();ve.classList.remove('hold');state='idle';count=0;bar(0)},3000)};
    ve.addEventListener('ended',done);setTimeout(done,8000)}
  return{init(){n=0;count=0;state='idle';puffs=[];evT=-1;bar(0)},
  tap(x,y){puff(x,y,false);noise(.35,'bandpass',900,.25);if(state!=='idle')return;count++;n++;bar(count/NEED);meter('던진 가루 '+n);if(count>=NEED)fire()},
  draw(dt){if(evT>=0){evT+=dt;if(evT<4.5){if(Math.random()<dt*5)puff(R(0,W),R(H*.1,H*.6),true)}else evT=-1}
    for(let i=puffs.length-1;i>=0;i--){const p=puffs[i];p.age+=dt;if(p.age>p.l){puffs.splice(i,1);continue}p.vx*=.95;p.vy=p.vy*.95+(p.dot?260:14)*dt*W/430;p.x+=p.vx*dt;p.y+=p.vy*dt;const k=p.age/p.l,a=(1-k)*(p.dot?1:.55);
      if(p.dot){cx.globalAlpha=a;cx.fillStyle='rgb('+p.c+')';cx.beginPath();cx.arc(p.x,p.y,p.r,0,7);cx.fill();cx.globalAlpha=1}
      else{const r=p.r*(1+k*1.4);const g=cx.createRadialGradient(p.x,p.y,0,p.x,p.y,r);g.addColorStop(0,'rgba('+p.c+','+a+')');g.addColorStop(.6,'rgba('+p.c+','+a*.5+')');g.addColorStop(1,'rgba('+p.c+',0)');cx.fillStyle=g;cx.fillRect(p.x-r,p.y-r,r*2,r*2)}}}}};
