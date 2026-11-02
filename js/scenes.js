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
SC.tom=()=>{let n=0,count=0,state='idle',drops=[],spl=[];const NEED=10;
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
      setTimeout(()=>{ve.pause();ve.classList.remove('hold');state='idle';count=0;bar(0)},3000)};
    ve.addEventListener('ended',done);setTimeout(done,8000)}
  return{init(){n=0;count=0;state='idle';drops=[];spl=[];bar(0)},
  tap(x,y){splat();burst(x,y,16,false);shake();if(state!=='idle')return;count++;n++;bar(count/NEED);meter('던진 토마토 '+n);if(count>=NEED)fire()},
  draw(dt){
    for(let i=spl.length-1;i>=0;i--){const s=spl[i];s.age+=dt;const life=1.6;if(s.age>life){spl.splice(i,1);continue}
      const g=Math.min(1,s.age*8),a=Math.min(1,(life-s.age)/.8)*.85;cx.globalAlpha=a;
      s.blobs.forEach(b=>{const x=s.x+b.dx*s.r,y=s.y+b.dy*s.r,r=b.rr*s.r*g;const gr=cx.createRadialGradient(x,y,0,x,y,r);gr.addColorStop(0,'rgba(230,45,25,.95)');gr.addColorStop(.75,'rgba(205,35,20,.75)');gr.addColorStop(1,'rgba(205,35,20,0)');cx.fillStyle=gr;cx.fillRect(x-r,y-r,r*2,r*2)});
      cx.fillStyle='rgba(255,215,120,.85)';for(let k=0;k<6;k++){const an=k*1.05+s.r,rr=s.r*.25;cx.beginPath();cx.ellipse(s.x+Math.cos(an)*rr,s.y+Math.sin(an)*rr,2.2*W/430,1.3*W/430,an,0,7);cx.fill()}
      cx.globalAlpha=1}
    for(let i=drops.length-1;i>=0;i--){const d=drops[i];d.age+=dt;if(d.age>d.l){drops.splice(i,1);continue}d.vy+=1100*dt*W/430;d.x+=d.vx*dt;d.y+=d.vy*dt;
      cx.globalAlpha=Math.min(1,(d.l-d.age)*4);cx.fillStyle=d.seed>.8?'#ffb24a':'#e2321e';cx.beginPath();cx.arc(d.x,d.y,d.r,0,7);cx.fill();cx.globalAlpha=1}}}};
