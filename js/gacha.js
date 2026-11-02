/* ---------- 캡슐 뽑기 ---------- */
const gacha=$('#gacha'),globe=$('#globe'),knob=$('#knob'),machine=$('#machine');
let turns=0,pending=null,cap=null;
(function(){const pos=[[10,150],[62,160],[116,152],[166,158],[34,104],[92,110],[146,104],[10,96],[188,98],[70,58],[124,54]];
  pos.forEach((p,i)=>{const b=document.createElement('div');b.className='b';b.style.left=p[0]+'px';b.style.top=p[1]+'px';b.style.setProperty('--c',OPEN[i%3].c);b.style.animationDelay=(-i*.37)+'s';globe.appendChild(b)})})();
function resetG(){turns=0;pending=null;if(cap){cap.remove();cap=null}knob.style.transform='rotate(0deg)';$('#gres').classList.remove('on');$('#ghint').textContent='손잡이를 눌러요 (0/3)'}
$('#gopen').onclick=()=>{ac();resetG();gacha.classList.add('open')};
$('#gclose').onclick=()=>gacha.classList.remove('open');
function pick(){const pool=[];OPEN.forEach(f=>{const w=seen[f.id]?1:3;for(let i=0;i<w;i++)pool.push(f)});return pool[Math.floor(Math.random()*pool.length)]}
knob.onclick=()=>{if(pending||cap)return;ac();turns++;knob.style.transform='rotate('+turns*120+'deg)';globe.classList.add('shake');setTimeout(()=>globe.classList.remove('shake'),420);tick();vib(10);
  $('#ghint').textContent=turns<3?'손잡이를 눌러요 ('+turns+'/3)':'나온다…';
  if(turns>=3){const f=pick();pending=f;setTimeout(()=>{cap=document.createElement('button');cap.className='dropcap fall';cap.style.setProperty('--c',f.c);cap.innerHTML='<div class="t"></div><div class="u"></div>';cap.setAttribute('aria-label','캡슐 열기');machine.appendChild(cap);
    setTimeout(()=>{clank();vib([20,30,20]);cap.classList.remove('fall');cap.classList.add('ready');$('#ghint').textContent='캡슐을 눌러서 열어요';cap.onclick=openCap},880)},450)}};
function openCap(){if(!cap||!pending)return;const f=pending;cap.onclick=null;cap.classList.remove('ready');cap.classList.add('open');pop();vib(30);
  setTimeout(()=>{const r=$('#gres');r.style.setProperty('--c',f.c);const first=!seen[f.id];
    r.innerHTML='<div class="rc"><img alt="" src="'+IMG[f.id]+'"><div class="in"><div class="en">'+f.en+'</div><h3>'+f.ko+'</h3><div class="mat">'+f.mat+'</div></div></div><div style="margin-top:14px;font-size:13px;color:#d7caa9">'+(first?'처음 만나는 축제예요':'다시 만났어요')+'</div><div class="rbtn"><button class="go" id="rgo">입장하기</button><button id="ragain">한 번 더</button></div>';
    r.classList.add('on');chime();$('#rgo').onclick=()=>{gacha.classList.remove('open');activate(worlds.findIndex(w=>w.f.id===f.id));hideHint()};$('#ragain').onclick=resetG},520)}
/* boot */
renderDots();activate(0);last=performance.now();raf=requestAnimationFrame(loop);
