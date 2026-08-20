// nav toggle
document.querySelector('.menu')?.addEventListener('click',()=>document.querySelector('.nav ul').classList.toggle('open'));
// scroll reveal
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.1});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
// publications
const STATUS={published:['Published',''],submitted:['Under review','gold'],preparation:['In preparation','grey'],thesis:['Thesis','grey']};
async function loadPubs(){
  const host=document.getElementById('pubs'); if(!host) return;
  const pubs=await (await fetch('data/publications.json')).json();
  const fmtAuthor=a=>{let s=a.endsWith('*'),n=a.replace('*',''); if(n==='Ali Allami') return `<b>${n}</b>`; return s?`<span class="s" title="Student mentored by Dr. Allami">${n}*</span>`:n;};
  function render(f){
    const list=pubs.filter(p=>f==='all'||p.status===f);
    let html='',yr=null,i=list.length;
    for(const p of list){ if(p.year!==yr){yr=p.year;html+=`<div class="year">${yr}</div>`}
      const [lab,cls]=STATUS[p.status];
      const links=[p.pdf&&`<a href="${p.pdf}">PDF</a>`,p.code&&`<a href="${p.code}">Code</a>`,p.doi&&`<a href="https://doi.org/${p.doi}">DOI</a>`].filter(Boolean).join('');
      html+=`<div class="pub"><div class="n">${String(i--).padStart(2,'0')}</div><div><div class="t">${p.title}</div><div class="a">${p.authors.map(fmtAuthor).join(', ')}</div><div class="v">${p.venue} <span class="tag ${cls}">${lab}</span></div>${links?`<div class="links">${links}</div>`:''}</div></div>`;}
    host.innerHTML=html||'<p class="muted">Nothing here yet.</p>';
  }
  document.querySelectorAll('.filters button').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.filters button').forEach(x=>x.classList.remove('on'));b.classList.add('on');render(b.dataset.f)}));
  render('all');
  const c=document.getElementById('pubcount'); if(c) c.textContent=pubs.filter(p=>p.status==='published').length;
}
loadPubs();
