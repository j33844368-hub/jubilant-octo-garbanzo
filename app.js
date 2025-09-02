// ----- simple router -----
const routes = document.querySelectorAll('.route');
function show(hash) {
  const id = (hash || '#home').replace('#','');
  routes.forEach(r => r.classList.toggle('route--active', r.id === id));
  document.querySelectorAll('.nav-link').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#'+id);
  });
}
addEventListener('hashchange', () => show(location.hash));
show(location.hash);

// ----- data -----
const members = [
  { name:'리코', tag:'#riko_art', thumb:'assets/images/fanart_1.svg', playlist:'https://www.youtube.com/embed/videoseries?list=PL_D2YrKeYY2UvRIw_SW3lQXzBDO7aBeii' },
  { name:'부키', tag:'#shibuki_art', thumb:'assets/images/fanart_2.svg', playlist:'https://www.youtube.com/embed/videoseries?list=PLKVNBOcsLJlVii-8YwoZTD3o4gh5CnIND' },
  { name:'나나', tag:'#Nanart_', thumb:'assets/images/fanart_3.svg', playlist:'https://www.youtube.com/embed/videoseries?list=PLJWmDIpvwe7Cri29xtAyQXLC1RLwOChpA' },
  { name:'히나', tag:'#_hinart', thumb:'assets/images/fanart_4.svg', playlist:'https://www.youtube.com/embed/videoseries?list=PLzdLDJsHzz2NiuwjyW6QgSck4PrwlSyOc' },
  { name:'칸나', tag:'#Kanart', thumb:'assets/images/fanart_5.svg', playlist:'https://www.youtube.com/embed/videoseries?list=PLOPBV2KAIYnt1NJ0QCkfCqMRc00lfcjFa' },
  { name:'리제', tag:'#Lize_art', thumb:'assets/images/fanart_6.svg', playlist:'https://www.youtube.com/embed/videoseries?list=PL-DHk0WpiRNSM5oI19ImJ8sSV65mnGseX' },
  { name:'유니', tag:'#yunyart', thumb:'assets/images/fanart_7.svg', playlist:'https://www.youtube.com/embed/videoseries?list=PL3HtH_xx9h_7ZGoZ9zMUQ-MPumwe21_cc' },
  { name:'타비', tag:'#Tabiart', thumb:'assets/images/fanart_8.svg', playlist:'https://www.youtube.com/embed/videoseries?list=PLbIDsfX2JRA0oawGN209gpd_nz9IMvUlb' },
  { name:'시로', tag:'#shiroart', thumb:'assets/images/fanart_9.svg', playlist:'https://www.youtube.com/embed/videoseries?list=PLWwhuXFHGLvhgZZb5_rmQEMI1B0ysKJxG' },
  { name:'린', tag:'#rin', thumb:'assets/images/fanart_1.svg', playlist:'https://www.youtube.com/embed/videoseries?list=PLSDRWR15h-o4uWNeoLv0upOUUGj12f-yU' },
];

// render members
const grid = document.getElementById('memberGrid');
grid.innerHTML = members.map((m,i)=>`
  <article class="card" data-index="${i}">
    <div class="thumb"><img src="${m.thumb}" alt="${m.name}" loading="lazy"></div>
    <div class="content">
      <div class="name">${m.name}</div>
      <div class="meta">${m.tag}</div>
      <button class="btn primary" style="margin-top:10px" data-play="${i}">플레이리스트 보기</button>
    </div>
  </article>
`).join('');

// click to open playlist
grid.addEventListener('click', (e)=>{
  const idx = e.target?.dataset?.play;
  if(idx!=null){
    openPlaylist(members[idx]);
    location.hash = '#covers';
  }
});

// cover section
const wrap = document.getElementById('playlistWrap');
function openPlaylist(member){
  wrap.innerHTML = `
    <div class="card">
      <div class="content">
        <div class="name">${member.name} · 커버곡</div>
        <div class="meta">${member.tag}</div>
      </div>
      <iframe class="playlist" allowfullscreen loading="lazy"
        src="${member.playlist}"></iframe>
    </div>
  `;
}

// daily fanart rotation (seeded by date)
function seededRandom(seed){
  let x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}
function todaySeed(){
  const d = new Date();
  return Number(`${d.getFullYear()}${(d.getMonth()+1).toString().padStart(2,'0')}${d.getDate().toString().padStart(2,'0')}`);
}
const fanartPool = Array.from({length:9}, (_,i)=>`assets/images/fanart_${i+1}.svg`);
function pickDaily3(){
  const s = todaySeed();
  const picks = new Set();
  let i=0;
  while(picks.size<3 && i<50){
    const r = Math.floor(seededRandom(s+i) * fanartPool.length);
    picks.add(fanartPool[r]);
    i++;
  }
  return [...picks];
}
const fanartGrid = document.getElementById('fanartGrid');
fanartGrid.innerHTML = pickDaily3().map(src => `
  <article class="card"><div class="thumb"><img src="${src}" alt="fanart"></div></article>
`).join('');
