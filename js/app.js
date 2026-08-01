const ROOT = document.body.dataset.root || './';
let NAV_DATA = [];

function ensureNavigationStyles() {
  if (document.getElementById('saos-tree-navigation-styles')) return;
  const style = document.createElement('style');
  style.id = 'saos-tree-navigation-styles';
  style.textContent = `
    .tree-item{margin:2px 0}
    .tree-row{display:grid;grid-template-columns:28px minmax(0,1fr);align-items:center}
    .tree-spacer{width:28px}
    .tree-toggle{width:28px;height:36px;border:0;background:transparent;color:var(--muted);font-size:22px;line-height:1;cursor:pointer;transition:transform .18s ease,color .18s ease}
    .tree-toggle:hover{color:var(--orange)}
    .tree-item.open>.tree-row .tree-toggle{transform:rotate(90deg);color:var(--orange)}
    .tree-children{display:none;margin:2px 0 8px 28px;padding-left:8px;border-left:1px solid var(--line)}
    .tree-item.open>.tree-children{display:block}
    .tree-children a{padding:8px 10px;font-size:13px}
  `;
  document.head.appendChild(style);
}

function resolveHref(href) {
  return /^https?:\/\//i.test(href) ? href : ROOT + href;
}

function normalizePath(path) {
  let normalized = path.replace(/\/index\.html$/, '/').replace(/^\/+/, '');
  const marker = 'spolek-ai-design-system/';
  if (normalized.includes(marker)) normalized = normalized.split(marker)[1];
  return normalized || 'index.html';
}

async function loadNavigation() {
  const response = await fetch(ROOT + 'data/navigation.json', { cache: 'no-store' });
  if (!response.ok) throw new Error('Nelze načíst navigaci');
  return response.json();
}

function flattenNavigation() {
  const pages = [];
  NAV_DATA.forEach(item => {
    pages.push({ label: item.label, href: item.href, keywords: item.keywords || '' });
    (item.children || []).forEach(child => {
      pages.push({ label: child.label, href: child.href, keywords: child.keywords || '' });
    });
  });
  return pages;
}

async function buildNavigation() {
  const host = document.querySelector('[data-nav]');
  if (!host) return;

  NAV_DATA = await loadNavigation();
  const current = normalizePath(location.pathname);

  NAV_DATA.forEach(item => {
    const block = document.createElement('div');
    block.className = 'tree-item';

    const row = document.createElement('div');
    row.className = 'tree-row';

    if (item.children?.length) {
      const toggle = document.createElement('button');
      toggle.className = 'tree-toggle';
      toggle.type = 'button';
      toggle.setAttribute('aria-label', 'Rozbalit sekci');
      toggle.textContent = '›';
      row.appendChild(toggle);
    } else {
      const spacer = document.createElement('span');
      spacer.className = 'tree-spacer';
      row.appendChild(spacer);
    }

    const link = document.createElement('a');
    link.href = resolveHref(item.href);
    link.textContent = item.label;
    const itemPath = item.href === 'index.html' ? 'index.html' : item.href;
    if (current === itemPath || current.startsWith(itemPath)) link.classList.add('active');
    row.appendChild(link);
    block.appendChild(row);

    if (item.children?.length) {
      const children = document.createElement('div');
      children.className = 'tree-children';

      item.children.forEach(child => {
        const childLink = document.createElement('a');
        childLink.href = resolveHref(child.href);
        childLink.textContent = child.label;
        if (current === child.href || current.startsWith(child.href)) childLink.classList.add('active');
        children.appendChild(childLink);
      });

      if ([...children.children].some(anchor => anchor.classList.contains('active')) || link.classList.contains('active')) {
        block.classList.add('open');
      }

      row.querySelector('.tree-toggle').addEventListener('click', () => block.classList.toggle('open'));
      block.appendChild(children);
    }

    host.appendChild(block);
  });
}

function setupMobileMenu() {
  const sidebar = document.querySelector('.sidebar');
  if (!sidebar || document.querySelector('.mobile-menu-toggle')) return;

  const toggle = document.createElement('button');
  toggle.className = 'mobile-menu-toggle';
  toggle.type = 'button';
  toggle.setAttribute('aria-label', 'Otevřít menu');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.innerHTML = '<span></span>';

  const backdrop = document.createElement('div');
  backdrop.className = 'mobile-menu-backdrop';

  const closeMenu = () => {
    document.body.classList.remove('mobile-menu-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Otevřít menu');
  };

  const toggleMenu = () => {
    const isOpen = document.body.classList.toggle('mobile-menu-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Zavřít menu' : 'Otevřít menu');
  };

  toggle.addEventListener('click', toggleMenu);
  backdrop.addEventListener('click', closeMenu);
  sidebar.addEventListener('click', event => {
    if (event.target.closest('a')) closeMenu();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMenu();
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1080) closeMenu();
  });

  document.body.append(toggle, backdrop);
}

function setupSearch() {
  const input = document.querySelector('[data-search]');
  const panel = document.querySelector('[data-search-panel]');
  if (!input || !panel) return;

  input.addEventListener('input', () => {
    const query = input.value.trim().toLowerCase();
    if (!query) {
      panel.classList.remove('open');
      panel.innerHTML = '';
      return;
    }

    const matches = flattenNavigation().filter(page =>
      (page.label + ' ' + page.href + ' ' + page.keywords).toLowerCase().includes(query)
    );

    panel.innerHTML = matches.map(page =>
      '<a class="search-result" href="' + resolveHref(page.href) + '">' +
      '<strong>' + page.label + '</strong><span>' + page.href + '</span></a>'
    ).join('') || '<div class="search-empty">Nic nenalezeno.</div>';
    panel.classList.add('open');
  });

  document.addEventListener('click', event => {
    if (!panel.contains(event.target) && event.target !== input) panel.classList.remove('open');
  });
}

function setupCopy() {
  const toast = document.querySelector('[data-toast]');
  document.querySelectorAll('[data-copy]').forEach(button => {
    button.addEventListener('click', async () => {
      const value = button.dataset.copy;
      try { await navigator.clipboard.writeText(value); } catch (error) {}
      if (toast) {
        toast.textContent = 'Zkopírováno: ' + value;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 1400);
      }
    });
  });
}

function setupDiagram() {
  document.querySelectorAll('[data-diagram-node]').forEach(node => {
    node.addEventListener('click', () => {
      if (node.dataset.href) location.href = ROOT + node.dataset.href;
    });
  });
}

function setupTeamModelLinks() {
  const models = [
    {
      id: 'root',
      href: 'root-knowledge-core/',
      label: 'Otevřít komplexní model ROOT Knowledge Core'
    },
    {
      id: 'nexus',
      href: 'nexus-plan-architect/',
      label: 'Otevřít komplexní model NEXUS Plan Architect'
    },
    {
      id: 'pixie',
      href: 'pixie-production-studio/',
      label: 'Otevřít komplexní model PIXIE Production Studio'
    },
    {
      id: 'wave',
      href: 'wave-reach-connector/',
      label: 'Otevřít komplexní model WAVE Reach Connector'
    },
    {
      id: 'orbit',
      href: 'orbit-insight-finder/',
      label: 'Otevřít komplexní model ORBIT Insight Finder'
    },
    {
      id: 'max',
      href: 'max-workflow-conductor/',
      label: 'Otevřít komplexní model MAX Workflow Conductor'
    }
  ];

  models.forEach(model => {
    const profile = document.querySelector('.team-profile#' + model.id);
    if (!profile || profile.querySelector('[data-model-link="' + model.id + '"]')) return;

    const actions = document.createElement('div');
    actions.className = 'actions';
    actions.style.marginTop = '28px';
    actions.dataset.modelLink = model.id;

    const link = document.createElement('a');
    link.className = 'btn primary';
    link.href = model.href;
    link.textContent = model.label;
    actions.appendChild(link);
    profile.appendChild(actions);
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  try {
    ensureNavigationStyles();
    await buildNavigation();
    setupMobileMenu();
    setupSearch();
    setupCopy();
    setupDiagram();
    setupTeamModelLinks();
  } catch (error) {
    console.error('SAOS init error', error);
  }
});
