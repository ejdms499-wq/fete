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
SC.dead=()=>{let n=0,count=0,state='idle',glows=[],pt=[];const NEED=10;
  const q=sel=>cur.el.querySelector(sel);
  const bar=v=>{const i=q('.gauge i');if(i)i.style.width=Math.round(v*100)+'%'};
  const big=()=>{[0,3,7,10,12,15].forEach((k,i)=>tone(392*Math.pow(2,k/12),i*.2,2.6,.08,'triangle'));noise(1,'highpass',3800,.04)};
  function fire(){if(state!=='idle')return;const ve=q('video.ve'),bn=q('.banner');if(!ve)return;state='event';
    try{ve.currentTime=0}catch(e){}const p=ve.play();p&&p.catch&&p.catch(()=>{});ve.classList.add('on');big();vib([30,40,60]);
    if(bn){bn.classList.remove('show','sync');void bn.offsetWidth;bn.classList.add('show')}
    let fin=false;const done=()=>{if(fin)return;fin=true;ve.removeEventListener('ended',done);
      const vl=q('video.vl');if(vl){try{vl.currentTime=0}catch(e){}const p2=vl.play();p2&&p2.catch&&p2.catch(()=>{})}
      ve.classList.add('hold');ve.classList.remove('on');tone(293.7,0,2.8,.05,'triangle');tone(440,.3,2.6,.04);
      setTimeout(()=>{ve.pause();ve.classList.remove('hold');state='idle';count=0;bar(0)},3000)};
    ve.addEventListener('ended',done);setTimeout(done,8000)}
  const petal=()=>pt.push({x:R(0,W),y:-10,vy:R(22,40),r:R(4,7)*W/430,rot:R(0,6),vr:R(-1.5,1.5),ph:R(0,6)});
  return{init(){n=0;count=0;state='idle';glows=[];pt=[];bar(0)},
  tap(x,y){glows.push({x,y,t:0});if(state!=='idle')return;count++;n++;bar(count/NEED);meter('밝힌 촛불 '+n);flame();if(count>=NEED)fire()},
  draw(dt){const t=performance.now()/1000;
    for(let i=glows.length-1;i>=0;i--){const g=glows[i];g.t+=dt;if(g.t>1.1){glows.splice(i,1);continue}const a=(1-g.t/1.1)**2,r=W*(.08+.14*g.t);add(cx,'lighter');halo(g.x,g.y,r,'255,170,70',.5*a);add(cx,'source-over')}
    if(state==='idle'&&Math.random()<dt*1.2&&pt.length<8)petal();
    const lim=H*.3;
    for(let i=pt.length-1;i>=0;i--){const p=pt[i];p.y+=p.vy*dt;p.x+=Math.sin(t*1.3+p.ph)*.3;p.rot+=p.vr*dt;if(p.y>lim){pt.splice(i,1);continue}
      cx.save();cx.globalAlpha=Math.min(1,(lim-p.y)/(H*.1))*.9;cx.translate(p.x,p.y);cx.rotate(p.rot);cx.fillStyle='#ff9a1f';cx.beginPath();cx.ellipse(0,0,p.r,p.r*.6,0,0,7);cx.fill();cx.restore()}}}};

/* ---------- 라 토마티나: 토마토 ---------- */
SC.tom=()=>{let fly=[],sp=[],bits=[],n=0;
  const eye=(x,y,r,px)=>{cx.fillStyle='#fff';cx.beginPath();cx.arc(x,y,r,0,7);cx.fill();cx.fillStyle='#1b1008';cx.beginPath();cx.arc(x+px,y+r*.15,r*.45,0,7);cx.fill()};
  const mkSplat=(x,y)=>{const r=R(.11,.15)*W;sp.push({x,y,age:0,r,blobs:Array.from({length:9},()=>({dx:R(-.5,.5)*r,dy:R(-.45,.45)*r,rr:R(.18,.45)*r})),drips:Array.from({length:5},()=>({dx:R(-.4,.4)*r,len:R(.5,1.3)*r,w:R(2,5)*W/430})),seeds:Array.from({length:12},()=>({dx:R(-.6,.6)*r,dy:R(-.5,.5)*r,s:R(1.3,2.8)*W/430}))});if(sp.length>26)sp.shift()};
  return{init(){fly=[];sp=[];bits=[];n=0},
  tap(x,y,auto){fly.push({x0:R(W*.3,W*.7),y0:H+40,x1:x,y1:y,t:0,sp:R(-.4,.4),auto})},
  idle(){this.tap(R(W*.2,W*.8),R(H*.18,H*.55),true)},
  draw(dt){
    sp.forEach(s=>{s.age+=dt;const a=Math.max(0,Math.min(1,1-(s.age-9)/7));if(a<=0)return;const grow=Math.min(1,s.age*6);cx.globalAlpha=a;
      s.blobs.forEach(b=>{const g=cx.createRadialGradient(s.x+b.dx,s.y+b.dy,0,s.x+b.dx,s.y+b.dy,b.rr*grow);g.addColorStop(0,'rgba(230,58,32,.92)');g.addColorStop(.7,'rgba(212,48,28,.7)');g.addColorStop(1,'rgba(212,48,28,0)');cx.fillStyle=g;cx.fillRect(s.x+b.dx-b.rr,s.y+b.dy-b.rr,b.rr*2,b.rr*2)});
      cx.fillStyle='rgba(255,170,70,.55)';cx.beginPath();cx.ellipse(s.x,s.y,s.r*.22*grow,s.r*.16*grow,0,0,7);cx.fill();
      cx.strokeStyle='rgba(215,50,30,.8)';cx.lineCap='round';s.drips.forEach(d=>{cx.lineWidth=d.w;cx.beginPath();cx.moveTo(s.x+d.dx,s.y);cx.lineTo(s.x+d.dx,s.y+d.len*Math.min(1,s.age*.5));cx.stroke()});
      cx.fillStyle='rgba(255,228,150,.9)';s.seeds.forEach(e=>{cx.beginPath();cx.ellipse(s.x+e.dx,s.y+e.dy,e.s,e.s*.6,0.5,0,7);cx.fill()});cx.globalAlpha=1});
    for(let i=fly.length-1;i>=0;i--){const f=fly[i];f.t+=dt/.42;const t=Math.min(f.t,1),x=f.x0+(f.x1-f.x0)*t,y=f.y0+(f.y1-f.y0)*t-Math.sin(t*Math.PI)*H*.28,r=W*.085*(1-t*.5);
      cx.save();cx.translate(x,y);cx.rotate(f.sp*t*5);const g=cx.createRadialGradient(-r*.3,-r*.35,r*.1,0,0,r);g.addColorStop(0,'#ff8a64');g.addColorStop(.5,'#e8321e');g.addColorStop(1,'#a81a10');cx.fillStyle=g;cx.beginPath();cx.arc(0,0,r,0,7);cx.fill();
      cx.fillStyle='#3d7a2a';for(let k=0;k<5;k++){cx.save();cx.rotate(k*1.2566);cx.beginPath();cx.ellipse(0,-r*.86,r*.1,r*.26,0,0,7);cx.fill();cx.restore()}
      eye(-r*.32,-r*.05,r*.24,Math.sin(t*14)*r*.06);eye(r*.32,-r*.05,r*.24,Math.sin(t*14+1)*r*.06);cx.fillStyle='#1b1008';cx.beginPath();cx.ellipse(0,r*.42,r*.1,r*.14,0,0,7);cx.fill();cx.restore();
      if(f.t>=1){fly.splice(i,1);mkSplat(f.x1,f.y1);if(!f.auto){n++;meter('토마토 '+n);splat();shake()}for(let k=0;k<16;k++){const a=R(0,6.283),v=R(80,360);bits.push({x:f.x1,y:f.y1,vx:Math.cos(a)*v,vy:Math.sin(a)*v-140,r:R(2,6)*W/430,l:R(.35,.9)})}}}
    for(let i=bits.length-1;i>=0;i--){const b=bits[i];b.vy+=900*dt;b.x+=b.vx*dt;b.y+=b.vy*dt;b.l-=dt;if(b.l<=0){bits.splice(i,1);continue}cx.fillStyle='rgba(225,50,30,'+Math.min(1,b.l*3)+')';cx.beginPath();cx.arc(b.x,b.y,b.r,0,7);cx.fill()}}}};

