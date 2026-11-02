/* 이펭: 매일 밤 9시 함께 점등 · 폰 움직임 · 친구에게 등불 보내기 */
(function(){
const EVT_HOUR_UTC=12;          /* 한국 시간 21:00 */
const EVT_SEC=4.7;               /* 이벤트 영상 길이 */
const $$=s=>document.querySelector(s);
const nowMs=()=>Date.now()+(window.FETE_OFFSET||0);
function evtInfo(now){const d=new Date(now);let t=Date.UTC(d.getUTCFullYear(),d.getUTCMonth(),d.getUTCDate(),EVT_HOUR_UTC,0,0);
  if(now<t)return{next:t,active:false};
  if(now<t+EVT_SEC*1000)return{next:t,active:true,offset:(now-t)/1000};
  return{next:t+86400000,active:false}}
const p2=n=>String(n).padStart(2,'0');
function fmt(ms){const s=Math.max(0,Math.floor(ms/1000));return p2(Math.floor(s/3600))+':'+p2(Math.floor(s%3600/60))+':'+p2(s%60)}
let onLan=false,lastFired=0;
function tick(){if(!onLan)return;const now=nowMs(),e=evtInfo(now),cd=$$('#cd');
  if(e.active){cd.textContent='지금 대점등!';
    if(lastFired!==e.next&&window.lanApi&&!lanApi.busy()&&!$$('#gacha').classList.contains('open')){if(lanApi.fire(e.offset,true))lastFired=e.next}}
  else cd.textContent=fmt(e.next-now)+' 뒤'}
setInterval(tick,250);
/* 토스트 */
let tt=0;function toast(t){const el=$$('#toast');el.textContent=t;el.classList.add('on');clearTimeout(tt);tt=setTimeout(()=>el.classList.remove('on'),3600)}
/* 폰 움직임 */
let motionOn=false,lastMove=0;
function onMotion(e){if(!onLan||!window.lanApi||lanApi.busy())return;const a=e.acceleration;if(!a||a.x==null)return;
  const m=Math.hypot(a.x||0,a.y||0,a.z||0),t=performance.now();
  if(m>10&&t-lastMove>550){lastMove=t;lanApi.add(2);try{navigator.vibrate&&navigator.vibrate(12)}catch(_){}}}
function startMotion(){if(motionOn)return;motionOn=true;window.addEventListener('devicemotion',onMotion)}
const mb=$$('#motionBtn');
if(typeof DeviceMotionEvent!=='undefined'){
  const ios=/iP(hone|ad|od)/.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
  if(ios&&typeof DeviceMotionEvent.requestPermission==='function'){mb.hidden=false;mb.onclick=async()=>{try{const r=await DeviceMotionEvent.requestPermission();if(r==='granted'){startMotion();mb.hidden=true;toast('이제 폰을 흔들거나 들어올려 보세요')}else toast('움직임이 허용되지 않았어요')}catch(e){toast('이 폰에서는 움직임을 쓸 수 없어요')}}}
  else startMotion()}
/* 월드 전환 */
window.onWorld=function(id){onLan=(id==='lan');$$('#lanUI').hidden=!onLan;tick()};
/* 링크 */
const enc=o=>{const b=new TextEncoder().encode(JSON.stringify(o));let s='';b.forEach(x=>s+=String.fromCharCode(x));return btoa(s).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'')};
const dec=t=>{try{const s=atob(t.replace(/-/g,'+').replace(/_/g,'/'));const b=Uint8Array.from(s,c=>c.charCodeAt(0));const o=JSON.parse(new TextDecoder().decode(b));return{n:String(o.n||'').slice(0,10),m:String(o.m||'').slice(0,20)}}catch(e){return null}};
const ADJ=['졸린','수줍은','느긋한','반짝이는','다정한','엉뚱한','포근한','쪼끄만'],ANI=['오리','곰','고양이','토끼','여우','거북이','다람쥐','두더지'];
const rname=()=>ADJ[Math.floor(Math.random()*ADJ.length)]+' '+ANI[Math.floor(Math.random()*ANI.length)];
const sheet=$$('#sheet');let link='';
function openSheet(){$$('#sForm').hidden=false;$$('#sDone').hidden=true;$$('#sName').value=rname();$$('#sMsg').value='';sheet.hidden=false}
function closeSheet(){sheet.hidden=true}
$$('#sendBtn').onclick=openSheet;$$('#sClose').onclick=closeSheet;$$('#sClose2').onclick=closeSheet;
$$('#sGo').onclick=()=>{const n=($$('#sName').value.trim()||rname()).slice(0,10),m=$$('#sMsg').value.trim().slice(0,20);
  link=location.origin+location.pathname+'?l='+enc({n,m});$$('#sLink').value=link;$$('#sForm').hidden=true;$$('#sDone').hidden=false;
  if(window.lanApi)lanApi.release(n,m);$$('#sShare').hidden=!navigator.share};
$$('#sShare').onclick=async()=>{try{await navigator.share({title:'FÊTE',text:'등불을 보냈어요. 눌러서 하늘에 띄워 보세요.',url:link})}catch(e){}};
$$('#sCopy').onclick=async()=>{try{await navigator.clipboard.writeText(link);toast('링크를 복사했어요')}catch(e){const i=$$('#sLink');i.focus();i.select();try{document.execCommand('copy');toast('링크를 복사했어요')}catch(_){toast('링크를 길게 눌러 복사하세요')}}};
$$('#sLink').onclick=e=>e.target.select();
/* 받은 등불 */
const q=new URLSearchParams(location.search).get('l');
if(q){const o=dec(q);if(o&&(o.n||o.m)){setTimeout(()=>{if(window.lanApi){lanApi.release(o.n,o.m);toast((o.n||'누군가')+'님이 등불을 보냈어요')}},1400)}}
onWorld(window.cur?window.cur.f.id:'lan');
})();
