/* ---------- 이펭: 등불 ---------- */
SC.lan=()=>{let ls=[],n=0;
  const mk=(x,y,t,big)=>ls.push({x,y,vy:R(24,42)*(big?.85:1),ph:R(0,6.3),w:(big?.11:R(.05,.085))*W,text:t||'',age:0});
  return{init(){ls=[];n=0},
  tap(x,y){mk(x,y);n++;meter('소원 '+n);chime()},
  wish(v){mk(R(W*.3,W*.7),H*.8,v,true);n++;meter('소원 '+n);chime()},
  draw(dt){if(Math.random()<dt*.45&&ls.length<16)mk(R(W*.05,W*.95),H+50);
    for(let i=ls.length-1;i>=0;i--){const l=ls[i];l.age+=dt;l.y-=l.vy*dt;if(l.y<-80){ls.splice(i,1);continue}
      const x=l.x+Math.sin(l.age*1.3+l.ph)*W*.012,a=Math.min(1,l.age*2.2)*Math.min(1,(l.y+60)/(H*.18)),w=l.w,h=w*1.4;
      cx.globalAlpha=a;add(cx,'lighter');halo(x,l.y,w*3.2,'255,150,60',.4);add(cx,'source-over');
      const g=cx.createLinearGradient(0,l.y-h/2,0,l.y+h/2);g.addColorStop(0,'#ffd9a0');g.addColorStop(.6,'#ffb25a');g.addColorStop(1,'#ff8a30');
      cx.fillStyle=g;cx.beginPath();cx.moveTo(x-w*.46,l.y-h*.5);cx.lineTo(x+w*.46,l.y-h*.5);cx.lineTo(x+w*.34,l.y+h*.5);cx.lineTo(x-w*.34,l.y+h*.5);cx.closePath();cx.fill();
      cx.fillStyle='rgba(255,246,214,.85)';cx.beginPath();cx.ellipse(x,l.y+h*.2,w*.18,h*.2,0,0,7);cx.fill();
      cx.strokeStyle='rgba(120,50,10,.35)';cx.lineWidth=1;cx.beginPath();cx.moveTo(x-w*.46,l.y-h*.5);cx.lineTo(x-w*.34,l.y+h*.5);cx.moveTo(x+w*.46,l.y-h*.5);cx.lineTo(x+w*.34,l.y+h*.5);cx.stroke();
      if(l.text){cx.fillStyle='rgba(255,244,222,.96)';cx.shadowColor='rgba(255,140,40,.9)';cx.shadowBlur=10;cx.font='400 '+Math.round(W*.048)+'px Jua,sans-serif';cx.textAlign='center';cx.fillText(l.text,x,l.y+h*.5+W*.06);cx.shadowBlur=0}
      cx.globalAlpha=1}}}};

/* ---------- 죽은 자의 날: 촛불 ---------- */
SC.dead=()=>{let cs=[],pt=[],n=0;
  const candle=(x,y,t)=>{cs.push({x,y,ph:R(0,6),t:t||''});if(cs.length>36)cs.shift()};
  const petal=(x,y,burst)=>pt.push({x,y,vx:burst?R(-60,60):R(-8,8),vy:burst?R(-90,-20):R(20,45),r:R(4,8)*W/430,rot:R(0,6),vr:R(-2,2),a:1,ph:R(0,6)});
  return{init(){cs=[];pt=[];n=0},
  tap(x,y){candle(x,y);for(let i=0;i<6;i++)petal(x,y-8,true);n++;meter('기억 '+n);flame()},
  wish(v){candle(R(W*.2,W*.8),R(H*.55,H*.8),v);n++;meter('기억 '+n);flame()},
  draw(dt){const t=performance.now()/1000,s=W/430;
    if(Math.random()<dt*3)petal(R(0,W),-10,false);
    for(let i=pt.length-1;i>=0;i--){const p=pt[i];p.vy+=(p.vy<50?60:0)*dt;p.x+=p.vx*dt+Math.sin(t*1.5+p.ph)*.25;p.y+=p.vy*dt;p.rot+=p.vr*dt;p.vx*=.98;if(p.y>H+10){pt.splice(i,1);continue}
      cx.save();cx.translate(p.x,p.y);cx.rotate(p.rot);cx.fillStyle='rgba(255,150,30,.85)';cx.beginPath();cx.ellipse(0,0,p.r,p.r*.6,0,0,7);cx.fill();cx.restore()}
    cs.forEach(c=>{const f=1+Math.sin(t*9+c.ph)*.1+Math.sin(t*23+c.ph)*.05;add(cx,'lighter');halo(c.x,c.y-20*s,64*s*f,'255,170,70',.42);add(cx,'source-over');
      cx.fillStyle='#f3e8d2';cx.fillRect(c.x-5*s,c.y-8*s,10*s,24*s);cx.fillStyle='rgba(180,120,60,.35)';cx.fillRect(c.x+2*s,c.y-8*s,3*s,24*s);
      cx.fillStyle='#fff3b8';cx.beginPath();cx.ellipse(c.x,c.y-17*s,3.6*s*f,9*s*f,0,0,7);cx.fill();cx.fillStyle='#ff9a2a';cx.beginPath();cx.ellipse(c.x,c.y-14*s,2*s,5*s*f,0,0,7);cx.fill();
      if(c.t){cx.fillStyle='rgba(255,244,222,.97)';cx.shadowColor='rgba(255,140,40,.9)';cx.shadowBlur=8;cx.font='400 '+Math.round(17*s)+'px Jua,sans-serif';cx.textAlign='center';cx.fillText(c.t,c.x,c.y+36*s);cx.shadowBlur=0}})}}};

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

