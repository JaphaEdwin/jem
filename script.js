
(function() {
  const CONTENT_KEY = "websiteContent_v1";
  const defaultContent = {"brandName": "Jinja Explorer Marathon — Run the Royal Gateway", "tagline": "Innovation-driven solutions for modern businesses.", "heroTitle": "Build smarter. Move faster.", "heroSubtitle": "Customize this website from the admin dashboard (saved to localStorage).", "aboutTitle": "About", "aboutBody": "Align Tech helps teams build modern digital products with clarity, speed, and quality.", "servicesTitle": "What we do", "services": [{"title": "Web Apps", "body": "Fast, responsive websites and web apps."}, {"title": "Automation", "body": "Streamline workflows and reduce manual work."}, {"title": "Analytics", "body": "Measure what matters with clear dashboards."}], "contactTitle": "Contact", "contactBody": "Reach out and let’s build something impactful together.", "ctaText": "Open Admin Dashboard", "footerCreator": "Developed by Iyundhu Edwin Japheth"};

  function getContent() {
    try {
      const raw = localStorage.getItem(CONTENT_KEY);
      if (!raw) return defaultContent;
      const parsed = JSON.parse(raw);
      return { ...defaultContent, ...parsed };
    } catch (e) {
      return defaultContent;
    }
  }

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, (m) => ({
      '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'
    }[m]));
  }

  function renderServices(services) {
    const grid = document.getElementById('servicesGrid');
    if (!grid) return;
    grid.innerHTML = '';
    (services || []).forEach((s) => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `<h3>${escapeHtml(s.title || '')}</h3><p>${escapeHtml(s.body || '')}</p>`;
      grid.appendChild(card);
    });
  }

  function applyContent(c) {
    const map = {
      brandName: 'brandName',
      tagline: 'tagline',
      heroTitle: 'heroTitle',
      heroSubtitle: 'heroSubtitle',
      aboutTitle: 'aboutTitle',
      aboutBody: 'aboutBody',
      servicesTitle: 'servicesTitle',
      contactTitle: 'contactTitle',
      contactBody: 'contactBody',
      footerCreator: 'footerCreator',
    };

    Object.entries(map).forEach(([key, id]) => {
      const el = document.getElementById(id);
      if (el && c[key] != null) el.textContent = c[key];
    });

    const ctaBtn = document.getElementById('ctaBtn');
    if (ctaBtn && c.ctaText) ctaBtn.textContent = c.ctaText;

    renderServices(c.services);
  }

  function resetToDefault() {
    localStorage.setItem(CONTENT_KEY, JSON.stringify(defaultContent));
    applyContent(defaultContent);
  }

  applyContent(getContent());

  window.addEventListener('storage', (e) => {
    if (e.key === CONTENT_KEY) applyContent(getContent());
  });

  const resetBtn = document.getElementById('resetContentBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (confirm('Reset website text to defaults?')) resetToDefault();
    });
  }
})();
