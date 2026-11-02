/* 축제 이미지 경로 */
const IMG={song:'img/songkran.jpg',burn:'img/burning-man.jpg',holi:'img/holi.jpg',lan:'img/yi-peng.jpg',dead:'img/dia-de-muertos.jpg',tom:'img/la-tomatina.jpg'};

/* 축제 영상: 평소(반복) / 이벤트(게이지가 차면) */
const VID={song:{
  loop:[['video/songkran-loop.mp4','video/mp4'],['video/songkran-loop.webm','video/webm']],
  event:[['video/songkran-event.mp4','video/mp4'],['video/songkran-event.webm','video/webm']],
  burst:[['video/songkran-burst.mp4','video/mp4'],['video/songkran-burst.webm','video/webm']]},
burn:{
  loop:[['video/burning-man-loop.mp4','video/mp4'],['video/burning-man-loop.webm','video/webm']],
  event:[['video/burning-man-event.mp4','video/mp4'],['video/burning-man-event.webm','video/webm']],
  fireworks:[['video/burning-man-fireworks.mp4','video/mp4'],['video/burning-man-fireworks.webm','video/webm']],
  temple:[['video/burning-man-temple.mp4','video/mp4'],['video/burning-man-temple.webm','video/webm']]},
holi:{
  loop:[['video/holi-loop.mp4','video/mp4'],['video/holi-loop.webm','video/webm']],
  event:[['video/holi-event.mp4','video/mp4'],['video/holi-event.webm','video/webm']],
  burst:[['video/holi-burst.mp4','video/mp4'],['video/holi-burst.webm','video/webm']]},
tom:{
  loop:[['video/la-tomatina-loop.mp4','video/mp4'],['video/la-tomatina-loop.webm','video/webm']],
  event:[['video/la-tomatina-event.mp4','video/mp4'],['video/la-tomatina-event.webm','video/webm']],
  burst:[['video/la-tomatina-burst.mp4','video/mp4'],['video/la-tomatina-burst.webm','video/webm']]},
dead:{
  loop:[['video/dia-de-muertos-loop.mp4','video/mp4'],['video/dia-de-muertos-loop.webm','video/webm']],
  event:[['video/dia-de-muertos-event.mp4','video/mp4'],['video/dia-de-muertos-event.webm','video/webm']],
  souls:[['video/dia-de-muertos-souls.mp4','video/mp4'],['video/dia-de-muertos-souls.webm','video/webm']]},
lan:{
  loop:[['video/yi-peng-loop.mp4','video/mp4'],['video/yi-peng-loop.webm','video/webm']],
  event:[['video/yi-peng-event.mp4','video/mp4'],['video/yi-peng-event.webm','video/webm']]}};

/* 의식 단계 이미지 */
const STAGE={tom:'img/la-tomatina-pole.jpg',song:'img/songkran-ritual.jpg',holi:'img/holi-night.jpg',burn:'img/burning-man-temple.jpg',dead:'img/dia-ofrenda.jpg'};

/* 실제 축제 날짜 (다음 개최일 계산) */
const REAL={
  lan:{where:'치앙마이',dates:['2026-11-24','2027-11-13']},
  dead:{where:'멕시코',yearly:[11,1]},
  tom:{where:'부뇰',rule:'lastWedAug'},
  burn:{where:'네바다 사막',rule:'burnSat'},
  holi:{where:'인도',dates:['2027-03-22']},
  song:{where:'태국',yearly:[4,13]}};
function realNext(id,now){now=now||new Date();const r=REAL[id],t0=new Date(now.getFullYear(),now.getMonth(),now.getDate());let c=[];
  const Y=t0.getFullYear();for(const y of [Y-1,Y,Y+1]){
    if(r.yearly)c.push(new Date(y,r.yearly[0]-1,r.yearly[1]));
    if(r.rule==='lastWedAug'){const d=new Date(y,7,31);while(d.getDay()!==3)d.setDate(d.getDate()-1);c.push(d)}
    if(r.rule==='burnSat'){const d=new Date(y,8,1);while(d.getDay()!==1)d.setDate(d.getDate()+1);d.setDate(d.getDate()-2);c.push(d)}}
  (r.dates||[]).forEach(s=>{const [a,b,e]=s.split('-').map(Number);c.push(new Date(a,b-1,e))});
  c.sort((a,b)=>a-b);const day=864e5;
  const past=c.filter(d=>d<=t0).pop(),next=c.find(d=>d>=t0);
  if(past&&(t0-past)/day<=7&&(t0-past)/day>0)return{past:Math.round((t0-past)/day)};
  if(next)return{d:Math.round((next-t0)/day)};return null}
function realLabel(id){const n=realNext(id);if(!n)return '';if(n.past)return '실제 축제는 '+n.past+'일 전에 열렸어요';if(n.d===0)return '오늘 실제로 열리는 중';return '실제 축제까지 D-'+n.d}

/* 현장 중계: 놀다 보면 저절로 들리는 진짜 이야기 */
const CAST={
  lan:{start:['이펭은 란나 달력으로 둘째 달 보름밤에 열려요. 올해는 11월 24~25일이에요','등불(콤로이)에 걱정과 불운을 실어 하늘로 보내요'],
    hold:['뜨거운 공기가 차야 떠요. 진짜 등불도 바닥의 연료에 불을 붙여 띄워요'],
    lucky:['불이 꺼지기 전에 시야 밖으로 사라지면 행운이라고 믿는 사람이 많아요'],
    event:['2015년부터 치앙마이 시내에선 등불 날리기가 금지됐어요. 비행기 안전 때문에요','그래서 요즘은 정해진 행사장에서 수천 개를 한꺼번에 띄워요']},
  dead:{start:['11월 1일엔 아이들의 영혼이, 2일엔 어른들의 영혼이 집에 온대요','제단(오프렌다)엔 고인의 사진과 좋아하던 음식을 올려요'],
    path:['금잔화(셈파수칠)의 진한 색과 향이 영혼에게 집 가는 길을 알려준대요'],
    arrive:['제왕나비는 미국과 캐나다에서 약 4,000km를 날아와 딱 이맘때 멕시코에 도착해요','그래서 나비를 돌아온 조상의 영혼이라 믿는 마을들이 있어요'],
    poem:['칼라베리타: 살아 있는 사람까지 해골로 놀리는 장난 시예요. 죽음을 웃으며 맞는 거죠']},
  tom:{start:['매년 8월 마지막 수요일, 인구 1만 명도 안 되는 스페인 마을 부뇰','1945년, 마을 청년들의 몸싸움에서 시작된 축제래요'],
    pole:['미끄러운 기둥 꼭대기의 햄을 누군가 따야 싸움이 시작되는 게 전통이에요'],
    burst:['트럭 여러 대가 토마토 120~160톤을 쏟아부어요','먹으려고 키운 게 아니라 던지려고 들여온 값싼 토마토예요'],
    battle:['규칙: 던지기 전에 꼭 으깰 것! 그래야 맞아도 안 다쳐요','2013년부터 참가자는 약 2만 명으로 제한돼요'],
    end:['딱 1시간. 신호가 울리면 더는 던지면 안 돼요','끝나면 소방차가 거리를 물로 씻어내요']},
  burn:{start:['네바다 블랙록 사막에 약 7만 명이 일주일짜리 도시를 세워요','여긴 돈 대신 선물로 살아요. 공식적으로 파는 건 얼음 정도예요'],
    fire:['마지막 주말 밤, 불꽃놀이가 먼저 하늘을 열고 맨이 타요'],
    temple:['다음 날 밤엔 사원(템플)이 타요. 사람들은 떠난 이에게 쓴 편지와 사진을 남겨요'],
    silent:['맨이 탈 땐 환호하지만, 사원이 탈 땐 모두 조용히 지켜봐요'],
    after:['끝나면 흔적을 하나도 남기지 않고 떠나는 게 규칙이에요']},
  holi:{start:['홀리는 힌두력 팔구나 달 보름, 보통 3월이에요','전날 밤엔 마을마다 큰 모닥불부터 피워요'],
    fire:['홀리카 다한: 나쁜 기운을 불에 태워 보내는 밤이에요'],
    morning:['다음 날 아침엔 누구에게나 색을 묻혀도 돼요. 낯선 사람에게도요','색 가루는 \'굴랄\'이라고 불러요'],
    back:['\'부라 나 마노, 홀리 하이\' = 기분 나빠하지 마, 홀리잖아!']},
  song:{start:['4월 13일, 태국의 설날 송끄란','물싸움 전에 먼저, 어른 손바닥에 향기로운 물을 살살 부어요'],
    pour:['재스민과 장미 향을 탄 물이에요. 존경과 감사의 뜻이죠'],
    bless:['어른은 재스민 꽃목걸이와 함께 새해 축복을 건네줘요'],
    street:['이 조용한 의식이 커져서 지금의 거리 물싸움이 됐대요'],
    ambush:['물 맞는 건 축복이에요. 화내면 안 돼요!']}};
