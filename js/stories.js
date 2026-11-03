/* FÊTE · 축제에 다녀오는 5분 — 이야기 데이터
   제스처: write(적기) · hold(꾹 누르기: light/pour/squash) · tap(톡톡: stick/candle/splash) · rub(문지르기: powder/gold) · throw(던지기) */
const STORIES={
lan:{id:'lan',en:'Yi Peng',ko:'이펭',city:'Chiang Mai',title:'치앙마이,<br>이펭의 밤',sub:'태국 북부의 보름달 밤으로<br>5분만 다녀와요',cover:'img/yi-peng.jpg',color:'#ffb347',
  guide:'쁘아 · 치앙마이 친구',amb:'night',date:['2026-11-24','2027-11-13'],
  learned:['‘이’는 둘째, ‘펭’은 보름. 옛 란나 달력으로 둘째 달 보름밤','하늘로 띄우는 종이 등불은 ‘콤 로이’','같은 밤 강에는 바나나 잎 배 ‘끄라통’을 띄워요'],memo:'하늘로 보낸 걱정',
  story:[
 {place:['Chiang Mai','해 질 녘, 핑강 가'],bg:'img/yi-peng-river.jpg',fx:'fireflies',lines:[
   {t:'어서 와요. 여긴 태국 북부, 치앙마이예요.'},
   {t:'오늘은 일 년 중 달이 가장 밝다는 밤이에요. 이 동네 말로 ‘이펭’이라고 해요.',note:'‘이’는 둘째, ‘펭’은 보름. 옛 란나 달력으로 둘째 달 보름이라는 뜻이에요.'},
   {t:'스님들도, 동네 꼬마들도 다 작은 불빛을 하나씩 들고 나와요.'}]},
 {place:['Wat','절 마당'],vid:'video/yi-peng-loop',bg:'img/yi-peng.jpg',fx:'embers',lines:[
   {t:'저 하늘에 떠 있는 게 ‘콤 로이’예요. ‘띄우는 등’이라는 뜻이에요.'},
   {t:'대나무 테에 얇은 종이를 씌우고, 바닥에 작은 연료를 달아요. 불을 붙이면 뜨거운 공기로 떠올라요.'},
   {t:'사람들은 여기에 지난 일 년의 걱정과 불운을 실어서, 하늘로 보내요.'}]},
 {bg:'img/yi-peng.jpg',blur:true,fx:'embers',held:{img:'img/props/lantern-unlit.png',w:.62,ink:[.18,.26,.64,.42]},lines:[
   {t:'자, 이건 당신 거예요.'},
   {t:'보내고 싶은 걱정을 하나, 손가락으로 적어 봐요. 아무도 안 봐요.',g:{k:'write',cue:'등불 종이 위에 손가락으로 적어요'}},
   {t:'좋아요. 이제 그건 당신 걱정이 아니라, 등불 거예요.'},
   {t:'바닥 심지에 불을 붙였어요. 꾹 누르고, 공기가 찰 때까지 기다려요.',g:{k:'hold',as:'light',cue:'꾹 누르고 기다려요',done:'이제, 놓아주세요'}}]},
 {bg:'img/yi-peng.jpg',fx:'rise',lines:[
   {t:'보세요. 올라가요.',auto:3600},
   {t:'다들 한꺼번에 띄워요. 이 순간엔 이상하게, 다들 조용해져요.',vid:'video/yi-peng-event'},
   {t:'불이 꺼지기 전에 등불이 눈에서 사라지면, 행운이 온다고들 해요.'}]},
 {place:['Mae Ping','같은 밤, 강가'],vid:'video/yi-peng-loop',bg:'img/yi-peng.jpg',fx:'fireflies',lines:[
   {t:'같은 밤, 강에는 바나나 잎으로 접은 작은 배 ‘끄라통’도 띄워요. 태국 전역에서 열리는 러이끄라통이에요.'},
   {t:'아, 요즘 치앙마이 시내에선 등불을 마음대로 못 날려요. 2015년부터 비행기 안전 때문에 막혔거든요.'},
   {t:'그래서 지금은 정해진 행사장에서, 정해진 시간에, 다 같이 띄워요.'},
   {t:'올해 진짜 이펭은 11월 24일과 25일이에요. 언젠가는 진짜로도 와요.',end:true}]}]},

tom:{id:'tom',en:'La Tomatina',ko:'라 토마티나',city:'Buñol',title:'토마토가<br>쏟아지는 날',sub:'스페인 작은 마을의<br>세상에서 제일 큰 음식 싸움',cover:'img/la-tomatina.jpg',color:'#ff5a3c',
  guide:'루시아 · 부뇰 친구',amb:'crowd',date:['lastWedAug'],
  learned:['매년 8월 마지막 수요일, 인구 1만 명이 안 되는 마을 부뇰','던지기 전에 꼭 으깨기. 딱 1시간, 끝나면 소방차가 청소','1945년 마을 청년들의 몸싸움에서 시작'],
  story:[
 {place:['Buñol','8월 마지막 수요일, 아침'],bg:'img/la-tomatina.jpg',vid:'video/la-tomatina-loop',fx:'sun',lines:[
   {t:'올라! 여긴 스페인 발렌시아 근처 작은 마을, 부뇰이야.'},
   {t:'인구 1만 명도 안 되는 마을에 오늘은 2만 명이 몰려와. 다들 버릴 옷을 입고서.',note:'2013년부터 안전 때문에 참가자를 약 2만 명으로 제한하고 있어요.'}]},
 {place:['Palo Jabón','비누칠한 기둥'],bg:'img/la-tomatina-pole.jpg',fx:'sun',lines:[
   {t:'시작 전에 전통이 하나 있어. 미끄러운 기둥 꼭대기에 햄이 걸려 있거든.'},
   {t:'전통대로라면 누군가 저 햄을 따야 싸움이 시작돼. 서로 어깨를 밟고 기어오르지.'}]},
 {bg:'img/la-tomatina.jpg',fx:'sun',lines:[
   {t:'트럭이 들어온다! 토마토가 100톤 넘게 실려 있어.',note:'먹으려고 키운 게 아니라, 값싸고 덜 좋은 토마토를 따로 들여와요.'}]},
 {bg:'img/la-tomatina.jpg',blur:true,fx:'sun',held:{img:'img/props/tomato-4.png',w:.42,squash:['img/props/tomato-4.png','img/props/tomato-0.png','img/props/tomato-2.png','img/props/tomato-3.png']},lines:[
   {t:'잠깐! 규칙이 있어. 던지기 전에 꼭 손으로 꾹 으깨야 해. 그래야 맞아도 안 아파.',g:{k:'hold',as:'squash',cue:'꾹 눌러서 으깨요',done:'좋아, 이제 놓아요'}},
   {t:'좋아, 이제 던져! 아무 데나 휙.',g:{k:'throw',n:3,cue:'화면을 톡 · 세 번 던져요'}}]},
 {bg:'img/la-tomatina.jpg',vid:'video/la-tomatina-loop',fx:'sun',lines:[
   {t:'어, 저쪽에서 너를 노려—',burst:'video/la-tomatina-burst',auto:3300},
   {t:'하하, 너도 맞았네! 여기선 맞는 게 인사야.'},
   {t:'딱 한 시간. 신호가 울리면 더는 던지면 안 돼.',vid:'video/la-tomatina-event'},
   {t:'끝나면 소방차가 거리를 물로 싹 씻어내. 다들 강가에 가서 몸도 씻고.'},
   {t:'1945년, 마을 청년들의 몸싸움에서 시작된 축제야. 내년 8월 마지막 수요일에 또 와!',end:true}]}]},

song:{id:'song',en:'Songkran',ko:'송끄란',city:'Thailand',title:'4월 13일,<br>태국의 설날',sub:'물로 지난해를 씻어내는<br>세상에서 가장 시원한 새해',cover:'img/songkran.jpg',color:'#58c8ff',
  guide:'닛 · 방콕 친구',amb:'water',date:['yearly-4-13'],
  learned:['송끄란은 ‘지나간다, 옮겨간다’는 뜻. 해가 새 별자리로 넘어가는 날','어른 손에 향기로운 물을 붓는 ‘롯남담후아’가 먼저','그 조용한 의식이 커져서 지금의 거리 물싸움이 됐어요'],
  story:[
 {place:['Thailand','4월 13일, 설날 아침'],bg:'img/songkran.jpg',vid:'video/songkran-loop',fx:'sparkle',lines:[
   {t:'싸왓디 카! 오늘은 태국 설날, 송끄란이에요.'},
   {t:'송끄란은 ‘지나간다, 옮겨간다’는 뜻이에요. 해가 새 별자리로 넘어가는 날이거든요.'},
   {t:'다들 물싸움부터 떠올리지만, 아침엔 조용한 의식부터 해요.'}]},
 {place:['Rod Nam Dam Hua','어른께 물 붓기'],bg:'img/songkran-ritual.jpg',fx:'sparkle',lines:[
   {t:'집안 어른 손바닥에 향기로운 물을 살살 부어 드려요. ‘롯남담후아’라고 해요.'},
   {t:'물엔 재스민이나 장미 향을 타요. 고마웠고, 서운하게 한 게 있으면 용서해 달라는 마음이에요.'},
   {t:'어른 손 위를 꾹 누르고, 천천히 부어 드려요.',g:{k:'hold',as:'pour',at:[[.15,.57],[.85,.575]],cue:'손 위를 꾹 · 천천히',done:'다 부었어요'}},
   {t:'어른이 재스민 꽃목걸이를 걸어 주며 축복해 줘요. “올 한 해 건강하고 행복하렴.”',gift:{img:'img/props/jasmine.png',from:[.5,.42]}}]},
 {place:['Street','거리로'],bg:'img/songkran.jpg',vid:'video/songkran-loop',fx:'sparkle',lines:[
   {t:'자, 이제 거리로 나가 볼까요? 어, 위를—',burst:'video/songkran-burst',auto:4200},
   {t:'하하! 물 맞는 건 축복이에요. 화내면 안 돼요.'},
   {t:'당신도 뿌려요! 화면을 톡톡.',g:{k:'tap',as:'splash',n:6,cue:'톡톡 · 물 뿌리기'}},
   {t:'이 조용한 물 붓기가 커져서, 지금의 거리 물싸움이 됐대요.',vid:'video/songkran-event'},
   {t:'4월은 태국에서 제일 더울 때라, 물이 반갑기도 해요. 내년 4월 13일에 만나요!',end:true}]}]},

holi:{id:'holi',en:'Holi',ko:'홀리',city:'India',title:'불을 피우고,<br>색을 던지는 봄',sub:'인도의 봄맞이, 홀리 전날 밤부터<br>색으로 물드는 아침까지',cover:'img/holi.jpg',color:'#ff4fa8',
  guide:'아난야 · 인도 친구',amb:'crowd',date:['2027-03-22'],
  learned:['전날 밤 ‘홀리카 다한’ 모닥불로 나쁜 기운을 태워요','다음 날엔 누구에게나 색 가루 ‘굴랄’을 묻혀도 돼요','‘부라 나 마노, 홀리 하이’ = 기분 나빠하지 마, 홀리잖아!'],
  story:[
 {place:['India','홀리 전날 밤'],bg:'img/holi-night.jpg',fx:'embers',fire:[.505,.72],lines:[
   {t:'나마스테! 홀리 전날 밤이에요. 색을 던지기 전에, 불부터 피워요.'},
   {t:'이 모닥불을 ‘홀리카 다한’이라고 해요. 나쁜 기운을 불에 태워 보내는 밤이에요.'},
   {t:'마른 나뭇가지를 불에 던져 줘요.',g:{k:'tap',as:'stick',n:6,cue:'톡톡 · 나뭇가지 던지기'}},
   {t:'착한 왕자 프라흘라드는 불 속에서도 살아남고, 나쁜 홀리카만 타 버렸대요. 그 이야기를 기억하는 불이에요.'}]},
 {place:['Holi','다음 날 아침'],bg:'img/holi.jpg',fx:'powder',mask:'img/holi-friends-mask.png',lines:[
   {t:'아침이에요! 오늘만큼은 누구에게나 색을 묻혀도 돼요. 낯선 사람에게도, 어른에게도.'},
   {t:'이 색 가루는 ‘굴랄’이라고 불러요. 옛날엔 꽃과 풀로 물을 들였대요.'},
   {t:'두 친구 얼굴에 색을 문질러 줘요.',g:{k:'rub',as:'powder',need:1.6,cue:'손가락으로 문질러요'}},
   {t:'어? 친구들이 반격한다—',burst:'video/holi-burst',auto:3800,clearPaint:true},
   {t:'“부라 나 마노, 홀리 하이!” 기분 나빠하지 마, 홀리잖아! 이 말이면 다 용서돼요.'},
   {t:'다 같이 색을 던지고 나면, 씻고 달콤한 과자 ‘구지야’를 나눠 먹어요.',vid:'video/holi-event'},
   {t:'내년 홀리는 3월 22일이에요. 하얀 옷 입고 와요!',end:true}]}]},

burn:{id:'burn',en:'Burning Man',ko:'버닝맨',city:'Black Rock City',title:'사막 위의<br>일주일짜리 도시',sub:'돈 대신 선물로 사는 곳,<br>마지막엔 모든 걸 태우는 곳',cover:'img/burning-man-playa.jpg',color:'#ff8a3d',
  guide:'레이 · 버너 친구',amb:'desert',date:['burnSat'],
  learned:['네바다 사막에 약 7만 명이 세우는 도시, 블랙록 시티','돈 대신 선물. 공식적으로 파는 건 얼음 정도','맨이 탈 땐 환호, 사원이 탈 땐 침묵'],memo:'사원에 남긴 한 마디',
  story:[
 {place:['Black Rock City','네바다 사막'],bg:'img/burning-man-playa.jpg',vid:'video/burning-man-loop',fx:'dust',lines:[
   {t:'웰컴 홈! 여기 도착하면 다들 이렇게 인사해.'},
   {t:'아무것도 없던 사막에 약 7만 명이 일주일짜리 도시를 세워. 이름은 블랙록 시티.'},
   {t:'여긴 돈 대신 선물로 살아. 공식적으로 파는 건 얼음 정도야.'}]},
 {bg:'img/burning-man-playa.jpg',vid:'video/burning-man-loop',fx:'dust',lines:[
   {t:'토요일 밤, 저 나무 인형 ‘맨’을 태워.'},
   {t:'불꽃놀이가 먼저 하늘을 열고,',burst:'video/burning-man-fireworks',auto:4200},
   {t:'맨이 타올라. 다들 소리 지르고 춤춰.',vid:'video/burning-man-event'}]},
 {place:['The Temple','다음 날 밤, 사원'],bg:'img/burning-man-temple.jpg',fx:'embers',lines:[
   {t:'하지만 진짜는 다음 날 밤이야. 이 사원.'},
   {t:'사람들은 사원 벽에 떠난 사람에게 쓴 편지, 사진, 내려놓고 싶은 마음을 붙여 둬.'}]},
 {bg:'img/burning-man-temple.jpg',blur:true,fx:'embers',held:{img:'img/props/note.png',w:.46,ink:[.12,.3,.76,.62],pin:[.70,.47]},lines:[
   {t:'너도 한 마디 남겨 봐. 보내고 싶은 사람에게.',g:{k:'write',cue:'메모지에 손가락으로 적어요'}},
   {t:'사원 벽에 걸어 둘게.',pin:true,auto:2600}]},
 {bg:'img/burning-man-temple.jpg',fx:'embers',lines:[
   {t:'맨이 탈 땐 환호하지만, 사원이 탈 땐 모두 조용해. 우는 사람도 많아.',vid:'video/burning-man-temple'},
   {t:'다 끝나면 흔적 하나 남기지 않고 떠나. 그게 이 도시의 규칙이야.',note:'Leave No Trace. 쓰레기통도 없어서, 가져온 건 전부 다시 가져가요.'},
   {t:'또 와. 여기 오면 다들, 집에 왔다고 하거든.',end:true}]}]},

dead:{id:'dead',en:'Día de Muertos',ko:'죽은 자의 날',city:'México',title:'일 년에 한 번,<br>그리운 사람이 오는 밤',sub:'멕시코의 가장 다정한 축제,<br>죽은 자의 날',cover:'img/dia-ofrenda.jpg',color:'#ff8a1f',
  guide:'로사 · 멕시코 친구',amb:'guitar',date:['yearly-11-1'],
  learned:['11월 1일엔 아이들, 2일엔 어른들의 영혼이 돌아와요','금잔화(셈파수칠)의 색과 향이 영혼의 길잡이','제왕나비는 약 4,000km를 날아와 딱 이맘때 도착해요'],
  story:[
 {place:['México','11월 1일과 2일'],bg:'img/dia-de-muertos.jpg',vid:'video/dia-de-muertos-loop',fx:'petals',lines:[
   {t:'올라! 여긴 멕시코. 오늘은 ‘죽은 자의 날’이에요.'},
   {t:'무서운 날 아니에요. 세상을 떠난 가족이 일 년에 한 번, 집에 놀러 오는 날이에요.'},
   {t:'11월 1일엔 아이들 영혼이, 2일엔 어른들 영혼이 온대요.'}]},
 {place:['Ofrenda','할머니의 제단'],bg:'img/dia-ofrenda.jpg',fx:'petals',lines:[
   {t:'이건 ‘오프렌다’, 제단이에요. 할머니 사진이랑 좋아하시던 빵, 설탕 해골을 올려요.'},
   {t:'할머니가 길을 잃지 않게, 초를 켜 줘요.',g:{k:'tap',as:'candle',at:[[.235,.195],[.585,.19],[.135,.255],[.725,.255]],cue:'반짝이는 초를 톡톡'}},
   {t:'이 주황 꽃은 ‘셈파수칠’, 금잔화예요. 진한 색과 향이 영혼에게 집으로 오는 길을 알려준대요.'},
   {t:'꽃잎 길을 손가락으로 따라 그려서, 제단까지 이어 줘요.',g:{k:'rub',as:'gold',need:1.8,cue:'꽃잎 길을 따라 그려요'}},
   {t:'봐요… 제왕나비예요.',burst:'video/dia-de-muertos-souls',auto:5200,clearPaint:2600},
   {t:'제왕나비는 캐나다와 미국에서 약 4,000km를 날아와, 딱 이맘때 멕시코에 도착해요. 그래서 돌아온 조상의 영혼이라 믿는 마을들이 있어요.'}]},
 {bg:'img/dia-ofrenda.jpg',blur:true,fx:'petals',card:{img:'img/props/calaverita.jpg',lines:['해골 할머니 오셨네','빵 냄새 맡고 오셨네','초 네 개 다 켰으니','내년에도 길 잃지 마요']},lines:[
   {t:'그리고 이날엔 ‘칼라베리타’라는 장난 시를 써요. 산 사람도 해골로 놀리는, 웃긴 시예요.'},
   {t:'죽음을 무서워하는 대신 웃으면서 맞는 거예요. 그래서 이 축제는 슬프지 않아요.'},
   {t:'내년 11월에 또 와요. 할머니도 또 오실 거예요.',end:true}]}]}
};
const ORDER=['lan','tom','song','holi','burn','dead'];
function nextDate(id,now){now=now||new Date();const s=STORIES[id],t0=new Date(now.getFullYear(),now.getMonth(),now.getDate()),c=[],Y=t0.getFullYear();
  s.date.forEach(r=>{for(const y of [Y-1,Y,Y+1]){
    if(r==='lastWedAug'){const d=new Date(y,7,31);while(d.getDay()!==3)d.setDate(d.getDate()-1);c.push(d)}
    else if(r==='burnSat'){const d=new Date(y,8,1);while(d.getDay()!==1)d.setDate(d.getDate()+1);d.setDate(d.getDate()-2);c.push(d)}
    else if(r.startsWith('yearly')){const [,m,d]=r.split('-').map(Number);c.push(new Date(y,m-1,d))}}
    if(/^\d{4}-/.test(r)){const [a,b,e]=r.split('-').map(Number);c.push(new Date(a,b-1,e))}});
  c.sort((a,b)=>a-b);const day=864e5,past=c.filter(d=>d<t0).pop(),next=c.find(d=>d>=t0);
  if(past&&(t0-past)/day<=7)return{past:Math.round((t0-past)/day)};return next?{d:Math.round((next-t0)/day)}:null}
function ddayText(id){const n=nextDate(id);if(!n)return '';if(n.past)return n.past+'일 전에 열렸어요';if(n.d===0)return '오늘 열려요';return 'D-'+n.d}
