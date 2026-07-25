
const ROOT = document.body.dataset.root || './';
let NAV_DATA = [];
let META_DATA = {};

function normalizePath(path){
  let p = path.replace(/\/index\.html$/,'/').replace(/^\/+/,'');
  const marker = 'spolek-ai-design-system/';
  if(p.includes(marker)) p = p.split(marker)[1];
  return p || 'index.html';
}

async function loadJSON(path){
  const response = await fetch(ROOT + path, {cache:'no-store'});
  if(!response.ok) throw new Error(path);
  return response.json();
}

async function buildNavigation(){
  const host = document.querySelector('[data-nav]');
  if(!host) return;
  NAV_DATA = await loadJSON('data/navigation.json');
  const current = normalizePath(location.pathname);

  NAV_DATA.forEach(item=>{
    const block = document.createElement('div');
    block.className = 'tree-item';

    const row = document.createElement('div');
    row.className = 'tree-row';

    if(item.children?.length){
      const toggle = document.createElement('button');
      toggle.className = 'tree-toggle';
      toggle.type = 'button';
      toggle.setAttribute('aria-label','Rozbalit sekci');
      toggle.textContent = '›';
      row.appendChild(toggle);
    } else {
      const spacer = document.createElement('span');
      spacer.className = 'tree-spacer';
      row.appendChild(spacer);
    }

    const link = document.createElement('a');
    link.href = ROOT + item.href;
    link.textContent = item.label;
    const itemPath = item.href === 'index.html' ? 'index.html' : item.href;
    if(current === itemPath || current.startsWith(itemPath)) link.classList.add('active');
    row.appendChild(link);
    block.appendChild(row);

    if(item.children?.length){
      const children = document.createElement('div');
      children.className = 'tree-children';
      item.children.forEach(child=>{
        const childLink = document.createElement('a');
        childLink.href = ROOT + child.href;
        childLink.textContent = child.label;
        if(current === child.href || current.startsWith(child.href)) childLink.classList.add('active');
        children.appendChild(childLink);
      });
      if([...children.children].some(a=>a.classList.contains('active')) || link.classList.contains('active')){
        block.classList.add('open');
      }
      row.querySelector('.tree-toggle').onclick = ()=>block.classList.toggle('open');
      block.appendChild(children);
    }
    host.appendChild(block);
  });
}

async function buildMetadata(){
  META_DATA = await loadJSON('data/metadata.json');
  const path = normalizePath(location.pathname);
  const page = META_DATA.pages[path] || {};
  const hero = document.querySelector('.hero');
  if(!hero) return;

  let meta = hero.querySelector('.page-meta');
  if(!meta){
    meta = document.createElement('div');
    meta.className = 'page-meta';
    hero.appendChild(meta);
  }
  meta.innerHTML = `
    <span>Verze ${META_DATA.version}</span>
    <span>Poslední změna: ${page.updated || META_DATA.updated}</span>
    <span>Autor: ${META_DATA.author}</span>
    <span class="status">${META_DATA.status}</span>
  `;

  if(page.related?.length){
    const section = document.createElement('section');
    section.className = 'section related-pages';
    section.innerHTML = '<div class="eyebrow">Související stránky</div><div class="related-grid"></div>';
    const grid = section.querySelector('.related-grid');
    page.related.forEach(href=>{
      const match = flattenNavigation().find(x=>x.href===href);
      const a = document.createElement('a');
      a.className='related-card';
      a.href=ROOT+href;
      a.innerHTML=`<strong>${match?.label || href}</strong><span>Otevřít →</span>`;
      grid.appendChild(a);
    });
    document.querySelector('.wrap')?.appendChild(section);
  }
}

function flattenNavigation(){
  const out=[];
  NAV_DATA.forEach(item=>{
    out.push({label:item.label,href:item.href,keywords:item.keywords||''});
    (item.children||[]).forEach(child=>out.push({label:child.label,href:child.href,keywords:child.keywords||''}));
  });
  return out;
}

function setupSearch(){
  const input=document.querySelector('[data-search]');
  const panel=document.querySelector('[data-search-panel]');
  if(!input||!panel)return;

  input.addEventListener('input',()=>{
    const q=input.value.trim().toLowerCase();
    if(!q){panel.classList.remove('open');panel.innerHTML='';return;}
    const matches=flattenNavigation().filter(x=>(x.label+' '+x.href+' '+(x.keywords||'')).toLowerCase().includes(q));
    panel.innerHTML=matches.map(x=>`
      <a class="search-result" href="${ROOT+x.href}">
        <strong>${x.label}</strong>
        <span>${x.href}</span>
      </a>`).join('') || '<div class="search-empty">Nic nenalezeno.</div>';
    panel.classList.add('open');
  });
  document.addEventListener('click',e=>{
    if(!panel.contains(e.target)&&e.target!==input) panel.classList.remove('open');
  });
}

function setupCopy(){
  const toast=document.querySelector('[data-toast]');
  document.querySelectorAll('[data-copy]').forEach(button=>{
    button.onclick=async()=>{
      const value=button.dataset.copy;
      try{await navigator.clipboard.writeText(value);}catch(e){}
      if(toast){
        toast.textContent='Zkopírováno: '+value;
        toast.classList.add('show');
        setTimeout(()=>toast.classList.remove('show'),1400);
      }
    };
  });
}

function setupDiagram(){
  document.querySelectorAll('[data-diagram-node]').forEach(node=>{
    node.addEventListener('click',()=>{
      const target=node.dataset.href;
      if(target) location.href=ROOT+target;
    });
  });
}

document.addEventListener('DOMContentLoaded',async()=>{
  try{
    await buildNavigation();
    await buildMetadata();
    setupSearch();
    setupCopy();
    setupDiagram();
  }catch(error){
    console.error('SAOS init error', error);
  }
});
