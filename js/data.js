/* 축제 이미지 경로 */
const IMG={song:'img/songkran.jpg',burn:'img/burning-man.jpg',holi:'img/holi.jpg',lan:'img/yi-peng.jpg',dead:'img/dia-de-muertos.jpg',tom:'img/la-tomatina.jpg'};

/* 축제 영상: 평소(반복) / 이벤트(게이지가 차면) */
const VID={song:{
  loop:[['video/songkran-loop.mp4','video/mp4'],['video/songkran-loop.webm','video/webm']],
  event:[['video/songkran-event.mp4','video/mp4'],['video/songkran-event.webm','video/webm']]},
burn:{
  loop:[['video/burning-man-loop.mp4','video/mp4'],['video/burning-man-loop.webm','video/webm']],
  event:[['video/burning-man-event.mp4','video/mp4'],['video/burning-man-event.webm','video/webm']],
  temple:[['video/burning-man-temple.mp4','video/mp4'],['video/burning-man-temple.webm','video/webm']]},
holi:{
  loop:[['video/holi-loop.mp4','video/mp4'],['video/holi-loop.webm','video/webm']],
  event:[['video/holi-event.mp4','video/mp4'],['video/holi-event.webm','video/webm']]},
tom:{
  loop:[['video/la-tomatina-loop.mp4','video/mp4'],['video/la-tomatina-loop.webm','video/webm']],
  event:[['video/la-tomatina-event.mp4','video/mp4'],['video/la-tomatina-event.webm','video/webm']]},
dead:{
  loop:[['video/dia-de-muertos-loop.mp4','video/mp4'],['video/dia-de-muertos-loop.webm','video/webm']],
  event:[['video/dia-de-muertos-event.mp4','video/mp4'],['video/dia-de-muertos-event.webm','video/webm']],
  souls:[['video/dia-de-muertos-souls.mp4','video/mp4'],['video/dia-de-muertos-souls.webm','video/webm']]},
lan:{
  loop:[['video/yi-peng-loop.mp4','video/mp4'],['video/yi-peng-loop.webm','video/webm']],
  event:[['video/yi-peng-event.mp4','video/mp4'],['video/yi-peng-event.webm','video/webm']]}};

/* 의식 단계 이미지 */
const STAGE={tom:'img/la-tomatina-pole.jpg',song:'img/songkran-ritual.jpg',holi:'img/holi-night.jpg',burn:'img/burning-man-temple.jpg',dead:'img/dia-ofrenda.jpg'};
