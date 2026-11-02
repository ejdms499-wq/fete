/* ---------- 이펭: 꾹 눌러 뜨거운 공기 채우기 → 손 떼서 띄우기 → 불이 꺼지기 전에 사라지면 행운 → 대점등 ---------- */
const LSPR=new Image();LSPR.src='img/lantern.png';const LMASK=new Image();LMASK.src='img/yi-peng-mask.png';
let LDARK=null;LSPR.addEventListener('load',()=>{const c=document.createElement('canvas');c.width=LSPR.naturalWidth;c.height=LSPR.naturalHeight;const g=c.getContext('2d');let f=false;try{g.filter='grayscale(1) sepia(.35) brightness(.62) contrast(.9)';f=g.filter&&g.filter!=='none'}catch(e){}g.drawImage(LSPR,0,0);g.filter='none';if(!f){g.globalCompositeOperation='source-atop';g.fillStyle='rgba(120,105,95,.7)';g.fillRect(0,0,c.width,c.height)}LDARK=c});
SC.lan=()=>{let K,n=0,ok=0,state='ready',glows=[],fl=[],heat=0,holding=false,full=false,my=null,appear=0,whoosh=0,shook=0;
  const q=sel=>cur.el.querySelector(sel);
  const big=()=>{[0,4,7,12,16,19].forEach((k,i)=>tone(523.25*Math.pow(2,k/12),i*.16,2.4,.09));noise(1.2,'highpass',4200,.05)};
  function ready(msg){state='ready';heat=0;full=false;holding=false;my=null;appear=0;K.bar(0);K.label(msg||'꾹 누르고 있으면 등불에 뜨거운 공기가 차요')}
  function fire(offset,sync){if(state==='flight'||state==='event')return false;const ve=q('video.ve');if(!ve)return false;state='event';holding=false;my=null;
    try{ve.currentTime=Math.max(0,offset||0)}catch(e){}const p=ve.play();p&&p.catch&&p.catch(()=>{});ve.classList.add('on');big();vib([30,40,60]);
    K.banner(sync?'지금, 모두 함께':'대점등',!!sync);K.label('모두 함께 하늘로');K.bar(0);
    let fin=false;const done=()=>{if(fin)return;fin=true;ve.removeEventListener('ended',done);
      const vl=q('video.vl');if(vl){try{vl.currentTime=0}catch(e){}const p2=vl.play();p2&&p2.catch&&p2.catch(()=>{})}
      ve.classList.add('hold');ve.classList.remove('on');tone(392,0,2.8,.05);tone(587.3,.25,2.6,.04);
      K.later(()=>{ve.pause();ve.classList.remove('hold');ready('한 번 더 띄워볼까요? 꾹 눌러요')},3000)};
    ve.addEventListener('ended',done);K.later(done,11000);return true}
  function launch(){state='flight';holding=false;const h=heat;my={p:0,life:0,lifeMax:8,rate:Math.pow(h,2)/6.4,x0:W*.5,dx:R(-1,1)*W*.18,ph:R(0,6),out:0,fall:0,h};
    [0,7,12].forEach((k,i)=>tone(392*Math.pow(2,k/12),i*.18,1.8,.06));noise(1,'lowpass',700,.08);vib(15);
    K.label(h<.6?'공기가 덜 찼어요…':'불이 꺼지기 전에 하늘 끝까지 사라지면 행운이 온대요');K.bar(0);meter('띄운 등불 '+(++n))}
  function lucky(){ok++;K.banner('행운이 와요',true);chime();vib([20,40,20]);K.say('하늘 끝까지 갔어요!',W/2,H*.42,'#ffe6b8');
    K.later(()=>{if(ok===1||ok%3===0){K.label('');fire(0,false)}else ready('또 띄워볼까요? 꾹 눌러요')},2200)}
  function sendFl(name,msg){fl.push({x:W*R(.3,.7),y:H*.8,ph:R(0,6.3),age:0,name:name||'',msg:msg||''})}
  window.lanApi={add:k=>{if(state==='ready'&&!full){heat=Math.min(1,heat+.13*k);shook=1.4;K.bar(heat);glows.push({x:W/2,y:H*.66,t:.3})}},fire,release:sendFl,busy:()=>state==='flight'||state==='event'};
  function lanXY(){if(!my)return{x:W*.5,y:H*.66,s:1};const e=1-Math.pow(1-Math.min(1,my.p),1.6);
    return{x:my.x0+my.dx*e+Math.sin(my.life*1.2+my.ph)*W*.02*(1-e*.5),y:H*.66-(H*.62)*e+my.fall,s:1-.9*e}}
  return{init(){K=ritualKit();K.clear();n=0;ok=0;glows=[];fl=[];meter('띄운 등불 0');ready()},
  wants(){return state==='ready'},
  scrub(x,y,first){if(state==='ready'&&first){holding=true;noise(.25,'highpass',2500,.06)}},
  release(){if(state!=='ready')return;holding=false;if(heat>=.999)launch();else if(heat>.25)launch();else if(heat>0)K.label('조금 더 오래 꾹 눌러요')},
  tap(x,y){glows.push({x,y,t:0})},
  draw(dt){const t=performance.now()/1000;appear=Math.min(1,appear+dt*1.5);
    if(state==='ready'){if(holding||shook>0){heat=Math.min(1,heat+dt/3.6);whoosh-=dt;if(whoosh<=0){whoosh=.45;noise(.5,'bandpass',300+heat*500,.05)}
        K.bar(heat);if(heat>=.999&&!full){full=true;chime();vib(25);K.label('꽉 찼어요! 소원을 빌고 손을 떼요');if(!holding)K.later(()=>{if(state==='ready'&&full&&!holding)launch()},900)}
        else if(!full)K.label('뜨거운 공기가 차는 중… 손을 떼지 마요')}
      else if(heat>0&&!full)heat=Math.max(0,heat-dt*.08);shook-=dt}
    for(let i=glows.length-1;i>=0;i--){const g=glows[i];g.t+=dt;if(g.t>1){glows.splice(i,1);continue}const a=(1-g.t)*(1-g.t),r=W*(.1+.18*g.t);add(cx,'lighter');halo(g.x,g.y,r,'255,190,110',.5*a);add(cx,'source-over')}
    for(let i=fl.length-1;i>=0;i--){const l=fl[i];l.age+=dt;l.y-=dt*H*.075;const w=W*.27,h=w*232/181;if(l.y<-h){fl.splice(i,1);continue}
      const x=l.x+Math.sin(l.age*1.1+l.ph)*W*.02,al=Math.min(1,l.age*1.2)*Math.min(1,(l.y+h)/(H*.25));cx.globalAlpha=al;
      cx.globalCompositeOperation='lighter';halo(x,l.y,w*1.7,'255,160,70',.45);cx.globalCompositeOperation='source-over';
      if(LSPR.complete&&LSPR.naturalWidth)cx.drawImage(LSPR,x-w/2,l.y-h/2,w,h);
      if(l.name){cx.textAlign='center';cx.shadowColor='rgba(255,150,50,.95)';cx.shadowBlur=12;cx.fillStyle='rgba(255,246,228,.98)';cx.font='400 '+Math.round(W*.05)+'px Jua,sans-serif';cx.fillText(l.name,x,l.y+h/2+W*.06);
        if(l.msg){cx.font='400 '+Math.round(W*.037)+'px "Gowun Dodum",sans-serif';cx.fillText(l.msg,x,l.y+h/2+W*.115)}cx.shadowBlur=0}
      cx.globalAlpha=1}
    if(LMASK.complete&&LMASK.naturalWidth){const sc=Math.max(W/360,H/640),mw=360*sc,mh=640*sc;cx.globalCompositeOperation='destination-out';cx.drawImage(LMASK,(W-mw)/2,(H-mh)*.4,mw,mh);cx.globalCompositeOperation='source-over'}
    /* 내 등불: 맨 앞(스님들보다 가까이)에서 들고 있다가 하늘로 */
    if((state==='ready'||state==='flight')&&LSPR.complete&&LSPR.naturalWidth){
      let lit=heat,alpha=appear;
      if(state==='flight'&&my){my.life+=dt;if(my.out<=0){my.p+=my.rate*dt;if(my.life>=my.lifeMax&&my.p<1){my.out=.001;tone(146.8,0,2.2,.06,'triangle');K.label('불이 먼저 꺼졌어요. 공기를 꽉 채워 다시 해봐요')}}
        else{my.out+=dt;my.fall+=dt*H*.03*my.out}
        if(my.p>=1&&!my.done){my.done=1;lucky()}
        lit=my.out>0?Math.max(0,1-my.out*1.5):.85+.15*Math.sin(t*13+my.ph)*Math.sin(t*7.3);
        alpha=my.p>=1?Math.max(0,1-(my.p-1)*6):my.out>0?Math.max(0,1-my.out/3):1;
        if(my.p>=1)my.p+=my.rate*dt;
        if((my.p>=1&&alpha<=0)||(my.out>3.2)){const fail=my.out>0;my=null;if(fail)ready('꾹 눌러서 공기를 가득 채워요');else state='lucky'}}
      if(state==='ready'||my){const P=lanXY(),w=W*.38*P.s,inf=state==='ready'?.82+.18*heat:1,h=w*232/181*inf,bob=state==='ready'&&full?Math.sin(t*6)*W*.008-W*.01:0,x=P.x,y=P.y+bob+(state==='ready'?Math.sin(t*1.7)*W*.004:0);
        if(state==='ready'&&holding&&!full){cx.save();cx.translate(x,y);cx.rotate(Math.sin(t*9)*.012*heat)} else{cx.save();cx.translate(x,y)}
        cx.globalAlpha=alpha;add(cx,'lighter');halo(0,h*.15,w*(.6+1.4*lit),'255,150,60',.55*lit);add(cx,'source-over');
        if(LDARK)cx.drawImage(LDARK,-w/2,-h/2,w,h);cx.globalAlpha=alpha*lit;cx.drawImage(LSPR,-w/2,-h/2,w,h);
        if(lit>.05){add(cx,'lighter');halo(0,h*.42,w*.18,'255,220,150',.8*lit);add(cx,'source-over')}
        cx.globalAlpha=1;cx.restore()}}
    K.drawMsgs(dt)}}};

/* ---------- 죽은 자의 날: 촛불 켜기 → 꽃잎 길 잇기 → 제왕나비(영혼)가 찾아옴 → 칼라베리타 → 영혼의 길 ---------- */
SC.dead=()=>{let K,n=0,count=0,state='idle',glows=[],pt=[],sp=[],evT=-1,B0='',G0='',dk=null,dg=null,darkA=0,C=[],lit=0,PS=[],pk=0,tT=0,poem=0;const NEED=10;
  const q=sel=>cur.el.querySelector(sel);
  const CAND=[[.135,.255],[.235,.195],[.585,.19],[.725,.255],[.22,.355],[.14,.455],[.89,.43]];
  const PATH=[[.5,.89],[.47,.87],[.42,.82],[.40,.77],[.42,.72],[.50,.68],[.62,.655],[.72,.64]];
  const big=()=>{[0,3,7,10,12,15].forEach((k,i)=>tone(392*Math.pow(2,k/12),i*.2,2.6,.08,'triangle'));noise(1,'highpass',3800,.04)};
  function fire(){if(state!=='idle')return;const ve=q('video.ve');if(!ve)return;state='event';
    try{ve.currentTime=0}catch(e){}const p=ve.play();p&&p.catch&&p.catch(()=>{});ve.classList.add('on');big();evT=0;vib([30,40,60]);K.banner(B0);
    let fin=false;const done=()=>{if(fin)return;fin=true;ve.removeEventListener('ended',done);
      const vl=q('video.vl');if(vl){try{vl.currentTime=0}catch(e){}const p2=vl.play();p2&&p2.catch&&p2.catch(()=>{})}
      ve.classList.add('hold');ve.classList.remove('on');tone(293.7,0,2.8,.05,'triangle');tone(440,.3,2.6,.04);
      K.later(()=>{ve.pause();ve.classList.remove('hold');state='idle';count=0;K.bar(0)},3000)};
    ve.addEventListener('ended',done);K.later(done,8000)}
  const spark=(x,y,k)=>{for(let i=0;i<k;i++){const a=R(-2.6,-.55),v=R(60,190)*W/430;sp.push({x,y,vx:Math.cos(a)*v*.6,vy:Math.sin(a)*v,r:R(3,6)*W/430,l:R(1.4,2.6),age:0,ph:R(0,6),pet:Math.random()<.3})}};
  const motes=(x,y,k,s)=>{for(let i=0;i<k;i++)sp.push({x:x+R(-1,1)*s,y:y+R(-1,1)*s,vx:R(-15,15)*W/430,vy:-R(10,40)*W/430,r:R(2,4)*W/430,l:R(1.2,2.2),age:0,ph:R(0,6),pet:false})};
  const petal=()=>pt.push({x:R(0,W),y:-10,vy:R(22,40),r:R(4,7)*W/430,rot:R(0,6),vr:R(-1.5,1.5),ph:R(0,6)});
  const hole=(x,y,r,a)=>{const g=dg.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,'rgba(0,0,0,'+a+')');g.addColorStop(.55,'rgba(0,0,0,'+(a*.6)+')');g.addColorStop(1,'rgba(0,0,0,0)');dg.globalCompositeOperation='destination-out';dg.fillStyle=g;dg.fillRect(x-r,y-r,r*2,r*2);dg.globalCompositeOperation='source-over'};
  const focus=on=>cur.el.classList.toggle('focus',on);
  function startRitual(){state='candles';K.stage(true);focus(true);darkA=0;lit=0;pk=0;
    dk=document.createElement('canvas');dk.width=Math.ceil(W);dk.height=Math.ceil(H);dg=dk.getContext('2d');dg.fillStyle='rgba(10,8,24,.68)';dg.fillRect(0,0,W,H);
    C=CAND.map(([fx,fy])=>Object.assign(K.IP(fx,fy),{on:0,ph:R(0,6)}));
    const pts=PATH.map(([fx,fy])=>K.IP(fx,fy));PS=[];for(let i=0;i<pts.length-1;i++){const a=pts[i],b=pts[i+1],d=Math.hypot(b.x-a.x,b.y-a.y),m=Math.max(1,Math.ceil(d/5));for(let j=0;j<m;j++)PS.push({x:a.x+(b.x-a.x)*j/m,y:a.y+(b.y-a.y)*j/m})}PS.push(pts[pts.length-1]);
    K.banner('11월 2일 밤',true);K.label('반짝이는 초를 눌러 하나씩 불을 켜요');K.bar(0);meter('켠 촛불 0/'+C.length);tone(196,0,3,.04,'triangle')}
  function lightC(c){c.on=1;lit++;hole(c.x,c.y,W*.2,.9);flame();tone(523.25*Math.pow(2,[0,2,4,7,9,12,14][lit-1]/12),0,1.4,.06);motes(c.x,c.y,10,W*.02);vib(10);
    K.bar(lit/C.length);meter('켠 촛불 '+lit+'/'+C.length);
    if(lit>=C.length){K.banner('제단이 밝아졌어요',true);K.label('');K.later(()=>{state='path';K.bar(0);K.label('금빛 점을 손가락으로 끌어 꽃잎 길을 제단까지 이어요');tone(392,0,2,.05)},1500)}}
  function arrive(){state='arrive';tT=0;chime();vib([20,40,20]);K.banner('영혼이 돌아와요',true);K.label('멕시코에선 제왕나비를 돌아온 영혼이라 믿어요');meter('영혼의 길');K.bar(1);
    K.later(()=>{const vt=q('video.vt');if(vt){try{vt.currentTime=0}catch(e){}const p=vt.play();p&&p.catch&&p.catch(()=>{});vt.classList.add('on');
      let fin=false;const done=()=>{if(fin)return;fin=true;vt.removeEventListener('ended',done);vt.classList.remove('on');K.later(()=>vt.pause(),1700);showPoem()};vt.addEventListener('ended',done);K.later(done,8000)}else showPoem()},900)}
  function showPoem(){state='poem';poem=0;K.label('칼라베리타: 죽음을 웃으며 놀리는 짧은 시');[0,4,7,4,0].forEach((k,i)=>tone(523.25*Math.pow(2,k/12),i*.22,.6,.05,'triangle'));
    K.later(()=>{state='idle';K.stage(false);focus(false);K.label(G0);K.bar(0);count=0;meter('밝힌 촛불 '+n)},7500)}
  const POEM=['해골 할머니 오셨네','빵 냄새 맡고 오셨네','초 일곱 개 다 켰으니','내년에도 길 잃지 마요'];
  function drawPoem(){const a=Math.min(1,poem*2)*Math.min(1,Math.max(0,(7.2-poem)*1.5));if(a<=0)return;const w=W*.78,h=W*.62,x=W/2,y=H*.36+(1-Math.min(1,poem*2))*20;
    cx.save();cx.globalAlpha=a;cx.translate(x,y);cx.rotate(-.025);cx.shadowColor='rgba(0,0,0,.35)';cx.shadowBlur=20;cx.shadowOffsetY=8;cx.fillStyle='#fbf1e2';cx.fillRect(-w/2,-h/2,w,h);cx.shadowColor='transparent';
    cx.strokeStyle='#e4572e';cx.lineWidth=3;cx.setLineDash([7,6]);cx.strokeRect(-w/2+10,-h/2+10,w-20,h-20);cx.setLineDash([]);
    cx.textAlign='center';cx.fillStyle='#c2185b';cx.font='400 '+Math.round(W*.034)+'px "Gowun Dodum",sans-serif';cx.fillText('칼라베리타 · Calaverita',0,-h/2+W*.075);
    cx.fillStyle='#3d2a3f';cx.font='400 '+Math.round(W*.05)+'px "Gowun Dodum",sans-serif';POEM.forEach((l,i)=>{const la=Math.min(1,Math.max(0,(poem-.6-i*.55)*2.5));cx.globalAlpha=a*la;cx.fillText(l,0,-h/2+W*.16+i*W*.1)});
    cx.restore()}
  return{init(){K=ritualKit();K.clear();n=0;count=0;glows=[];pt=[];sp=[];evT=-1;const s_=q('.gauge span'),bn=q('.banner');if(s_&&!G0)G0=s_.textContent;if(bn&&!B0)B0=bn.textContent;
    if(!q('video.vt')&&VID.dead.souls){const x=document.createElement('video');x.className='vt';x.muted=true;x.defaultMuted=true;x.playsInline=true;x.setAttribute('playsinline','');x.setAttribute('muted','');x.preload='auto';
      VID.dead.souls.forEach(([src,type])=>{const s=document.createElement('source');s.src=src;s.type=type;x.appendChild(s)});q('canvas').before(x)}
    startRitual()},
  wants(){return state==='path'},
  scrub(x,y){if(state!=='path')return;const tol=W*.11;let best=-1;for(let i=pk;i<Math.min(PS.length,pk+14);i++){const p=PS[i];if(Math.hypot(p.x-x,p.y-y)<tol)best=i}
    if(best>pk){for(let i=pk;i<=best;i+=2)hole(PS[i].x,PS[i].y,W*.13,.55);const h=PS[best];motes(h.x,h.y,2,W*.03);if(Math.random()<.3)tone(659.3+best*3,0,.25,.025);pk=best;K.bar(pk/(PS.length-1));
      if(pk>=PS.length-1)arrive()}},
  release(){},
  tap(x,y){glows.push({x,y,t:0});
    if(state==='candles'){let bc=null,bd=1e9;C.forEach(c=>{if(c.on)return;const d=Math.hypot(c.x-x,c.y-y);if(d<bd){bd=d;bc=c}});if(bc&&bd<W*.16)lightC(bc);else K.say('반짝이는 초를 눌러요',x,y,'#ffe6b8');return}
    if(state==='path'){K.label('손가락을 떼지 말고 금빛 점을 끌어요');return}
    spark(x,y,22);if(state!=='idle')return;count++;n++;K.bar(count/NEED);meter('밝힌 촛불 '+n);flame();if(count>=NEED)fire()},
  draw(dt){const t=performance.now()/1000;
    if(dk){const target=state==='candles'||state==='path'?1:0;darkA+=(target-darkA)*Math.min(1,dt*(target?2.5:1.2));if(darkA<.003&&target===0&&state!=='candles'){darkA=0;if(state==='idle')dk=null}
      if(dk&&darkA>0){cx.globalAlpha=darkA;cx.drawImage(dk,0,0,W,H);cx.globalAlpha=1}}
    if(state==='candles'||state==='path'){C.forEach(c=>{if(c.on){add(cx,'lighter');halo(c.x,c.y,W*.09*(1+.08*Math.sin(t*9+c.ph)),'255,180,90',.35*darkA);add(cx,'source-over')}
      else if(state==='candles'){const p=.5+.5*Math.sin(t*3+c.ph);cx.strokeStyle='rgba(255,236,190,'+(.35+.4*p)*darkA+')';cx.lineWidth=2;cx.beginPath();cx.arc(c.x,c.y,W*(.035+.012*p),0,7);cx.stroke();add(cx,'lighter');halo(c.x,c.y,W*.035,'255,220,160',.25*p*darkA);add(cx,'source-over')}})}
    if(state==='path'&&PS.length){const h=PS[Math.min(PS.length-1,pk+3)],p=.5+.5*Math.sin(t*4);add(cx,'lighter');halo(h.x,h.y,W*(.07+.03*p),'255,200,90',.8);halo(h.x,h.y,W*.025,'255,245,210',.9);add(cx,'source-over');
      const end=PS[PS.length-1];add(cx,'lighter');halo(end.x,end.y,W*.06,'255,170,90',.25+.2*p);add(cx,'source-over')}
    if(state==='arrive'){tT+=dt;if(tT>1.2&&tT<6.5&&Math.random()<dt*14){const P=K.IP(.42,.19);motes(P.x,P.y,1,W*.1)}const P=K.IP(.42,.19);add(cx,'lighter');halo(P.x,P.y,W*.25,'255,200,120',.25*Math.min(1,tT/1.5));add(cx,'source-over')}
    for(let i=glows.length-1;i>=0;i--){const g=glows[i];g.t+=dt;if(g.t>1.1){glows.splice(i,1);continue}const a=(1-g.t/1.1)**2,r=W*(.08+.14*g.t);add(cx,'lighter');halo(g.x,g.y,r,'255,170,70',.5*a);add(cx,'source-over')}
    if(evT>=0){evT+=dt;if(evT<5.5){const k=Math.max(1,Math.round(dt*140));for(let i=0;i<k;i++)spark(R(0,W),H*R(.55,1.02),1);add(cx,'lighter');halo(W/2,H*.62,W*1.1,'255,160,60',.18*Math.sin(Math.min(1,evT/5.5)*Math.PI));add(cx,'source-over')}else evT=-1}
    for(let i=sp.length-1;i>=0;i--){const p=sp[i];p.age+=dt;if(p.age>p.l){sp.splice(i,1);continue}p.vy+= (p.pet?30:-8)*dt;p.vx*=.985;p.x+=p.vx*dt+Math.sin(t*3+p.ph)*.4;p.y+=p.vy*dt;const a=Math.sin(Math.PI*p.age/p.l);
      if(p.pet){cx.save();cx.globalAlpha=a*.9;cx.translate(p.x,p.y);cx.rotate(t*2+p.ph);cx.fillStyle='#ff9a1f';cx.beginPath();cx.ellipse(0,0,p.r*1.8,p.r*1.1,0,0,7);cx.fill();cx.restore()}
      else{add(cx,'lighter');halo(p.x,p.y,p.r*7,'255,190,100',.7*a);cx.globalAlpha=a;cx.fillStyle='#fff3c4';cx.beginPath();cx.arc(p.x,p.y,p.r*.7,0,7);cx.fill();cx.globalAlpha=1;add(cx,'source-over')}}
    if(state==='poem'){poem+=dt;drawPoem()}
    if(state==='idle'&&Math.random()<dt*1.2&&pt.length<8)petal();
    const lim=H*.3;
    for(let i=pt.length-1;i>=0;i--){const p=pt[i];p.y+=p.vy*dt;p.x+=Math.sin(t*1.3+p.ph)*.3;p.rot+=p.vr*dt;if(p.y>lim){pt.splice(i,1);continue}
      cx.save();cx.globalAlpha=Math.min(1,(lim-p.y)/(H*.1))*.9;cx.translate(p.x,p.y);cx.rotate(p.rot);cx.fillStyle='#ff9a1f';cx.beginPath();cx.ellipse(0,0,p.r,p.r*.6,0,0,7);cx.fill();cx.restore()}
    K.drawMsgs(dt)}}};

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
  function grab(){st='ham';ham=null;msgs.length=0;flash=.8;banner('햄을 땄어요!');chime();vib([20,40,20]);later(()=>{thud();shake();later(()=>{rocket();later(startBattle,1300)},500)},900)}
  function noon(){st='ham';ham=null;say('정오! 햄 없이도 시작해요',W/2,H*.4,'#ffe08a');later(()=>{rocket();later(startBattle,1300)},900)}
  /* 대전 */
  let BT=0,thrown=0,hit=0,hold=null,fly=[],inc=[],incT=1.5,spl=[],bits=[];const BATTLE=25;
  let dA=1,dirt=null,dx=null,startDirt=1,water=[],lastP=null,chk=0;
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
    if(dirt){dA=st==='done'?Math.max(0,dA-dt*.9):1;cx.globalAlpha=dA;cx.drawImage(dirt,0,0,W,H);cx.globalAlpha=1}
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

/* ---------- 버닝맨: 맨을 태우고(환호) → 다음 날 밤 사원에 마음을 적어 걸고 → 말없이 함께 지켜보기 ---------- */
SC.burn=()=>{let K,n=0,count=0,state='idle',sp=[],evT=-1,G0='',B0='',card=null,ink=null,ig=null,inkLen=0,lastP=null,tT=0,shh=0;const NEED=10;
  const q=sel=>cur.el.querySelector(sel);
  const emb=(x,y,k)=>{for(let i=0;i<k;i++){const a=R(-2.7,-.45),v=R(50,170)*W/430;sp.push({x,y,vx:Math.cos(a)*v*.7,vy:Math.sin(a)*v,r:R(2.5,5)*W/430,l:R(1,2.2),age:0,ph:R(0,6),dust:Math.random()<.35})}};
  const rise=(x,y,k,spread)=>{for(let i=0;i<k;i++)sp.push({x:x+R(-1,1)*spread,y:y+R(-1,1)*spread*.5,vx:R(-12,12)*W/430,vy:-R(30,80)*W/430,r:R(2,4)*W/430,l:R(1.8,3.4),age:0,ph:R(0,6),dust:false})};
  function fire(){if(state!=='idle')return;const ve=q('video.ve');if(!ve)return;state='event';
    try{ve.currentTime=0}catch(e){}const p=ve.play();p&&p.catch&&p.catch(()=>{});ve.classList.add('on');evT=0;vib([40,40,80]);
    [0,3,7,10].forEach((k,i)=>tone(196*Math.pow(2,k/12),i*.25,2.6,.07,'triangle'));noise(4,'lowpass',500,.12);noise(2.4,'bandpass',1400,.08);
    K.banner(B0);
    let fin=false;const done=()=>{if(fin)return;fin=true;ve.removeEventListener('ended',done);
      const vl=q('video.vl');if(vl){try{vl.currentTime=0}catch(e){}const p2=vl.play();p2&&p2.catch&&p2.catch(()=>{})}
      ve.classList.add('hold');ve.classList.remove('on');tone(130.8,0,3,.05,'triangle');
      K.later(()=>{ve.pause();ve.classList.remove('hold');toTemple()},3000)};
    ve.addEventListener('ended',done);K.later(done,8000)}
  function toTemple(){state='write';K.stage(true);K.banner('다음 날 밤, 사원',true);[0,7,12].forEach((k,i)=>tone(220*Math.pow(2,k/12),i*.5,3,.04));
    K.label('보내고 싶은 사람에게 손가락으로 한 마디 적어요');K.bar(0);meter('사원');
    const cw=Math.round(W*.66),ch=Math.round(W*.44);card={x:W/2,y:H*.6,w:cw,h:ch,rot:-.03,s:1,a:0};
    ink=document.createElement('canvas');ink.width=cw*2;ink.height=ch*2;ig=ink.getContext('2d');ig.scale(2,2);ig.lineCap='round';ig.lineJoin='round';inkLen=0;lastP=null}
  function local(x,y){const c=card,dx=x-c.x,dy=y-c.y,co=Math.cos(-c.rot),si=Math.sin(-c.rot);return{x:dx*co-dy*si+c.w/2,y:dx*si+dy*co+c.h/2}}
  function pin(){state='pin';lastP=null;tT=0;chime();vib(20);K.label('사원 벽에 걸었어요');
    const to=K.IP(.70,.47);card.fx=card.x;card.fy=card.y;card.tx=to.x;card.ty=to.y}
  function burnTemple(){state='silent';evT=0;shh=0;const vt=q('video.vt');K.label('사원이 탈 때는 모두 말없이 지켜봐요');K.bar(0);meter('고요');
    if(vt){try{vt.currentTime=0}catch(e){}const p=vt.play();p&&p.catch&&p.catch(()=>{});vt.classList.add('on')}
    noise(6,'lowpass',380,.05);
    let fin=false;const done=()=>{if(fin)return;fin=true;vt&&vt.removeEventListener('ended',done);after()};
    vt&&vt.addEventListener('ended',done);K.later(done,9500)}
  function after(){state='after';tT=0;K.stage(false);tone(110,0,4,.04,'triangle');tone(164.8,.6,4,.03);
    K.later(()=>K.banner('마음은 연기가 되어\n하늘로 올라갔어요',true),600);
    K.later(()=>{const vt=q('video.vt');if(vt){vt.style.transition='opacity 2.4s ease';vt.classList.remove('on');K.later(()=>{vt.pause();vt.style.transition=''},2600)}
      state='idle';count=0;card=null;K.label(G0);K.bar(0);meter('모은 불씨 '+n)},3400)}
  function drawCard(){const c=card;if(!c)return;cx.save();cx.globalAlpha=c.a;cx.translate(c.x,c.y);cx.rotate(c.rot);cx.scale(c.s,c.s);
    cx.shadowColor='rgba(0,0,0,.35)';cx.shadowBlur=18;cx.shadowOffsetY=6;cx.fillStyle='#f6ead4';cx.fillRect(-c.w/2,-c.h/2,c.w,c.h);cx.shadowColor='transparent';
    cx.strokeStyle='rgba(150,110,80,.18)';cx.lineWidth=1;for(let yy=-c.h/2+c.h*.34;yy<c.h/2-8;yy+=c.h*.17){cx.beginPath();cx.moveTo(-c.w/2+14,yy);cx.lineTo(c.w/2-14,yy);cx.stroke()}
    cx.fillStyle='rgba(110,70,50,.55)';cx.font='400 '+Math.round(c.w*.07)+'px "Gowun Dodum",sans-serif';cx.textAlign='left';cx.fillText('To.',-c.w/2+14,-c.h/2+c.w*.09);
    cx.fillStyle='#c0392b';cx.beginPath();cx.arc(0,-c.h/2+6,5,0,7);cx.fill();
    cx.drawImage(ink,-c.w/2,-c.h/2,c.w,c.h);
    if(c.burn>0){cx.globalCompositeOperation='source-atop';cx.fillStyle='rgba(255,'+Math.round(150-c.burn*90)+',40,'+(c.burn*.8)+')';cx.fillRect(-c.w/2,-c.h/2,c.w,c.h);cx.globalCompositeOperation='source-over'}
    cx.restore()}
  return{init(){K=ritualKit();K.clear();n=0;count=0;state='idle';sp=[];evT=-1;card=null;K.bar(0);
    const sp_=q('.gauge span'),bn=q('.banner');if(sp_&&!G0)G0=sp_.textContent;if(bn&&!B0)B0=bn.textContent;
    if(!q('video.vt')&&VID.burn.temple){const x=document.createElement('video');x.className='vt';x.muted=true;x.defaultMuted=true;x.playsInline=true;x.setAttribute('playsinline','');x.setAttribute('muted','');x.preload='auto';
      VID.burn.temple.forEach(([src,type])=>{const s=document.createElement('source');s.src=src;s.type=type;x.appendChild(s)});q('canvas').before(x)}},
  wants(){return state==='write'},
  scrub(x,y,first){if(state!=='write'||!card)return;const p=local(x,y);if(p.x<0||p.y<0||p.x>card.w||p.y>card.h){lastP=null;return}
    if(first||!lastP){lastP=p;ig.fillStyle='#3b2418';ig.beginPath();ig.arc(p.x,p.y,1.6,0,7);ig.fill();return}
    const d=Math.hypot(p.x-lastP.x,p.y-lastP.y);if(d<1)return;ig.strokeStyle='#3b2418';ig.lineWidth=3.2*W/430;ig.beginPath();ig.moveTo(lastP.x,lastP.y);ig.lineTo(p.x,p.y);ig.stroke();lastP=p;inkLen+=d;
    if(Math.random()<.08)noise(.05,'highpass',5000,.03);
    const v=Math.min(1,inkLen/(W*1.3));K.bar(v);if(v>=1)K.label('다 적었으면 손을 떼요')},
  release(){lastP=null;if(state==='write'&&inkLen>=W*1.3)K.later(()=>{if(state==='write')pin()},500)},
  tap(x,y){if(state==='silent'){if(shh<=0){K.say('쉿…',x,y,'#ffe6c8');shh=1.2}return}
    if(state!=='idle')return;emb(x,y,20);noise(.3,'bandpass',600,.15);tone(196,0,.6,.04,'triangle');count++;n++;K.bar(count/NEED);meter('모은 불씨 '+n);if(count>=NEED)fire()},
  draw(dt){const t=performance.now()/1000;shh-=dt;
    if(evT>=0&&state==='event'){evT+=dt;if(evT<5){if(evT>1.5&&Math.random()<dt*14){const e=sp.length;emb(W*R(.35,.65),H*R(.12,.45),3);for(let i=e;i<sp.length;i++)sp[i].dust=false}}else evT=-1}
    if(card){if(state==='write')card.a=Math.min(1,card.a+dt*2.5);
      if(state==='pin'){tT+=dt;const k=Math.min(1,tT/1.4),e=1-Math.pow(1-k,3);card.x=card.fx+(card.tx-card.fx)*e;card.y=card.fy+(card.ty-card.fy)*e-Math.sin(k*Math.PI)*H*.06;card.s=1-.8*e;card.rot=-.03+.1*e;if(k>=1&&!card.done){card.done=1;K.later(burnTemple,1600)}}
      if(state==='silent'){card.burn=Math.min(1,Math.max(0,(evT-1.4)/1.6));if(evT>1.4&&evT<3.4&&Math.random()<dt*20)rise(card.x,card.y,2,card.w*card.s*.4);if(evT>3)card.a=Math.max(0,card.a-dt*1.5);if(card.a<=0)card=null}}
    if(state==='silent'){evT+=dt;if(evT>2&&Math.random()<dt*6)rise(W*R(.4,.8),H*R(.25,.55),1,W*.05)}
    if(state==='after'&&Math.random()<dt*10)rise(W*R(.2,.8),H*R(.5,.8),1,W*.05);
    drawCard();
    for(let i=sp.length-1;i>=0;i--){const p=sp[i];p.age+=dt;if(p.age>p.l){sp.splice(i,1);continue}p.vy+=(p.dust?20:-12)*dt;p.vx*=.98;p.x+=p.vx*dt+Math.sin(t*2.4+p.ph)*.5;p.y+=p.vy*dt;const a=Math.sin(Math.PI*p.age/p.l);
      if(p.dust){cx.globalAlpha=a*.35;cx.fillStyle='#f3d6c0';cx.beginPath();cx.arc(p.x,p.y,p.r*3,0,7);cx.fill();cx.globalAlpha=1}
      else{add(cx,'lighter');halo(p.x,p.y,p.r*6,'255,140,60',.65*a);cx.globalAlpha=a;cx.fillStyle='#ffe2a8';cx.beginPath();cx.arc(p.x,p.y,p.r*.6,0,7);cx.fill();cx.globalAlpha=1;add(cx,'source-over')}}
    K.drawMsgs(dt)}}};

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
    K.banner('홀리 아침이에요',true);K.label('손가락으로 두 친구 얼굴에 색을 문질러요');K.bar(0);meter('색칠 0%')}
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
