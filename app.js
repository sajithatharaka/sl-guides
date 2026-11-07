(() => {
  const G = window.GUIDE;
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  // line-art illustrations (viewBox 0 0 100 100)
  const ART = {
    story: '<path d="M14 24c14-6 26-4 36 4 10-8 22-10 36-4v54c-14-6-26-4-36 4-10-8-22-10-36-4Z" class="fill"/><path d="M50 28v54"/><path d="M24 38c8-2 16-1 20 3M24 50c8-2 16-1 20 3M76 38c-8-2-16-1-20 3M76 50c-8-2-16-1-20 3"/>',
    about: '<circle cx="50" cy="50" r="34" class="fill"/><path d="M16 50h68M50 16c-18 20-18 48 0 68M50 16c18 20 18 48 0 68M22 33h56M22 67h56"/>',
    lang: '<path d="M12 18h50a6 6 0 0 1 6 6v26a6 6 0 0 1-6 6H34l-14 12V56h-8a6 6 0 0 1-6-6V24a6 6 0 0 1 6-6Z" class="fill"/><path d="M72 40h16a6 6 0 0 1 6 6v22a6 6 0 0 1-6 6h-4v12L70 74H44"/><path d="M22 30h30M22 40h20"/>',
    exp: '<path d="M8 82 36 36l16 24 12-16 28 38Z" class="fill"/><path d="M36 36l8 12 6-6M64 44l6 10"/><path d="M60 26V10l16 6-16 6"/>',
    pack: '<rect x="14" y="32" width="72" height="50" rx="8" class="fill"/><path d="M38 32v-8a6 6 0 0 1 6-6h12a6 6 0 0 1 6 6v8M14 54h72M44 54v8h12v-8"/>',
    gallery: '<rect x="10" y="26" width="80" height="54" rx="8" class="fill"/><path d="M32 26l5-9h26l5 9"/><circle cx="50" cy="53" r="15"/><circle cx="50" cy="53" r="6"/>',
    reviews: '<path d="M50 12l11 24 26 3-19 18 5 26-23-13-23 13 5-26L13 39l26-3Z" class="fill"/>',
    faq: '<circle cx="50" cy="50" r="36" class="fill"/><path d="M38 40a12 12 0 1 1 18 10c-4 3-6 5-6 10"/><circle cx="50" cy="72" r="1.5"/>',
    contact: ''
  };
  const art = (k) => `<div class="art"><svg viewBox="0 0 100 100">${ART[k]}</svg></div>`;

  document.title = `${G.name} | ${G.tagline}`;
  $('logo').textContent = G.name;
  $('name').textContent = G.name;
  $('tagline').textContent = G.tagline;
  $('intro').textContent = G.intro;
  $('photo').src = G.photo;
  $('foot').textContent = `© ${new Date().getFullYear()} ${G.name}`;

  // each block: [id, art, title, copy html, optional panel html]
  const d = G.details;
  const stats = G.stats.map((s) => `<span class="chip">${s.value}${esc(s.suffix)} ${esc(s.label)}</span>`).join('');
  const blocks = [
    ['story', 'story', 'My story', G.story.map((p) => `<p>${esc(p)}</p>`).join('') + `<div class="chips">${stats}</div>`],
    ['about', 'about', 'My details',
      `<dl class="facts">${Object.entries(d).map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>`],
    ['languages', 'lang', 'Languages I speak',
      `<p>I guide in ${G.languages.length} languages, so you can ask anything in the one you're most comfortable with.</p><div class="chips">${G.languages.map((l) => `<span class="chip">${esc(l.name)} · ${esc(l.level)}</span>`).join('')}</div>`],
    ['experience', 'exp', 'My experience',
      `<ol class="timeline">${G.experience.map((e) => `<li><b>${esc(e.year)}</b>${esc(e.title)}<br><span>${esc(e.text)}</span></li>`).join('')}</ol>`],
    ['packages', 'pack', 'My tour packages', '<p>Every package is just my starting point. We shape it around you.</p>',
      `<div class="cards">${G.packages.map((p) => `<article class="card ${p.featured ? 'featured' : ''}"><img src="${esc(p.img)}" alt="${esc(p.name)}" loading="lazy"><div><h3>${esc(p.name)}<span>${esc(p.price)}</span></h3><small>${esc(p.days)}</small><ul>${p.items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul><a class="btn" href="#contact">Enquire</a></div></article>`).join('')}</div>`],
    ['gallery', 'gallery', 'My photo gallery', '<p>Moments from my road. Tap a photo to see it larger.</p>',
      `<div class="gallery" id="galleryGrid">${G.gallery.map((g, i) => `<figure data-i="${i}"><img src="${esc(g.src)}" alt="${esc(g.caption)}" loading="lazy"><figcaption>${esc(g.caption)}</figcaption></figure>`).join('')}</div>`],
    ['reviews', 'reviews', 'What my travellers say', '<p>Kind words from people I\'ve shown around.</p>',
      `<div class="reviews">${G.reviews.map((r) => `<div class="review"><div class="stars">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</div><p>${esc(r.text)}</p><small>${esc(r.name)} · ${esc(r.from)}</small></div>`).join('')}</div>`],
    ['faq', 'faq', 'Good questions', '<p>The things travellers ask me most before booking.</p>',
      G.faq.map((f) => `<details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join('')],
    ['contact', 'contact', 'Contact',
      `<p>Want to plan a trip or just ask something? Always happy to connect. <a href="https://wa.me/${esc(G.whatsapp)}" target="_blank" rel="noopener">WhatsApp me</a> or <a href="mailto:${esc(G.email)}">send an email</a>.</p>`]
  ];

  $('stops').innerHTML = blocks.map(([id, a, title, copy, panel], i) => `
    <section class="stop ${i % 2 ? 'right' : 'left'}" id="${id}">
      ${art(a)}<div class="copy"><h2>${esc(title)}</h2>${copy}</div>
    </section>${panel ? `<div class="panel">${panel}</div>` : ''}`).join('');

  // ---------- hero slideshow ----------
  const urls = G.heroSlides && G.heroSlides.length ? G.heroSlides : [G.photo];
  $('slides').innerHTML = urls.map((u) => `<div class="slide" style="background-image:url('${esc(u)}')"></div>`).join('');
  $('dots').innerHTML = urls.map((_, i) => `<button aria-label="Slide ${i + 1}"></button>`).join('');
  const slides = [...document.querySelectorAll('.slide')], dots = [...document.querySelectorAll('#dots button')];
  let cur = 0, timer;
  const show = (i) => {
    slides[cur].classList.remove('on'); dots[cur].classList.remove('on');
    cur = (i + slides.length) % slides.length;
    slides[cur].classList.add('on'); dots[cur].classList.add('on');
  };
  const start = () => { clearInterval(timer); if (slides.length > 1) timer = setInterval(() => show(cur + 1), 5500); };
  dots.forEach((b, i) => b.addEventListener('click', () => { show(i); start(); }));
  show(0); start();

  // ---------- winding path ----------
  const trail = $('trail'), svg = $('svg'), fg = $('pathFg'), bg = $('pathBg'), walker = $('walker'), pin = $('pin');
  let lastP = 0, lastX = 0, dir = 1, walkT;
  let len = 0;
  const build = () => {
    const tr = trail.getBoundingClientRect();
    svg.setAttribute('viewBox', `0 0 ${tr.width} ${tr.height}`);
    const narrow = innerWidth < 720;
    const pts = [{ x: tr.width / 2, y: 0 }];
    document.querySelectorAll('.stop .art').forEach((el) => {
      const r = el.getBoundingClientRect();
      pts.push({ x: narrow ? tr.width / 2 : r.left - tr.left + r.width / 2, y: r.top - tr.top + r.height / 2 });
    });
    const last = pts[pts.length - 1];
    let dstr = `M${pts[0].x} ${pts[0].y}`;
    for (let i = 1; i < pts.length; i++) {
      const a = pts[i - 1], b = pts[i], dy = (b.y - a.y) * 0.55;
      // swing wide to the opposite side between stops for the loopy look
      const sw = narrow ? 70 * (i % 2 ? 1 : -1) : (b.x > a.x ? 1 : -1) * 160;
      dstr += ` C${a.x + sw} ${a.y + dy} ${b.x - sw} ${b.y - dy} ${b.x} ${b.y}`;
    }
    dstr += ` L${last.x} ${last.y + 30}`;
    pin.style.left = (last.x - 45) + 'px'; pin.style.top = (last.y + 30 - 103) + 'px';
    fg.setAttribute('d', dstr); bg.setAttribute('d', dstr);
    len = fg.getTotalLength();
    fg.style.strokeDasharray = len;
    update();
  };
  const update = () => {
    if (!len) return;
    const tr = trail.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, (innerHeight * 0.6 - tr.top) / tr.height));
    fg.style.strokeDashoffset = len * (1 - p);
    const pt = fg.getPointAtLength(len * p);
    const ahead = fg.getPointAtLength(Math.min(len, len * p + 6)), back = fg.getPointAtLength(Math.max(0, len * p - 6));
    if (Math.abs(ahead.x - back.x) > 1) dir = ahead.x > back.x ? 1 : -1;
    walker.style.transform = `translate(${pt.x}px,${pt.y}px)`;
    if (p !== lastP) {
      walker.classList.add('walking'); clearTimeout(walkT);
      walkT = setTimeout(() => walker.classList.remove('walking'), 160);
      lastP = p;
    }
    pin.classList.toggle('arrived', p > 0.97);
  };
  addEventListener('scroll', update, { passive: true });
  addEventListener('resize', build);
  addEventListener('load', build);
  build();
  new ResizeObserver(build).observe(trail);

  // ---------- reveal ----------
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0.15 });
  document.querySelectorAll('.stop .copy,.stop .art,.panel').forEach((el) => io.observe(el));

  // ---------- lightbox ----------
  const lb = $('lb');
  $('galleryGrid').addEventListener('click', (e) => {
    const f = e.target.closest('figure'); if (!f) return;
    const g = G.gallery[+f.dataset.i];
    $('lbImg').src = g.src; $('lbImg').alt = g.caption; $('lbCap').textContent = g.caption; lb.hidden = false;
  });
  lb.addEventListener('click', () => (lb.hidden = true));
  addEventListener('keydown', (e) => e.key === 'Escape' && (lb.hidden = true));
})();
