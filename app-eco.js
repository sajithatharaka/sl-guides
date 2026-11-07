(() => {
  const G = window.GUIDE;
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const ico = (p) => `<svg viewBox="0 0 24 24">${p}</svg>`;
  const I = {
    badge: '<path d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6Z"/><path d="m9 12 2 2 4-4"/>',
    people: '<circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.4"/><path d="M3 20c0-4 3-6 6-6s6 2 6 6M15 14c3 0 6 1.500 6 5"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c-4 4-4 14 0 18M12 3c4 4 4 14 0 18"/>',
    leaf: '<path d="M5 19C5 10 10 4 20 4c0 9-5 15-13 15M5 19l8-8"/>',
    mount: '<path d="M3 19 10 7l4 6 3-4 4 10Z"/>',
    star: '<path d="m12 3 2.700 5.600 6.100.9-4.400 4.300 1 6.100L12 17l-5.400 2.900 1-6.100L3.200 9.500l6.100-.9Z"/>',
    wave: '<path d="M3 9c3-3 6 3 9 0s6 3 9 0M3 15c3-3 6 3 9 0s6 3 9 0"/>',
    pin: '<path d="M12 21s7-6.500 7-12a7 7 0 0 0-14 0c0 5.500 7 12 7 12Z"/><circle cx="12" cy="9" r="2.500"/>'
  };
  const statIcons = [I.leaf, I.people, I.star, I.globe];

  document.title = `${G.name} | ${G.tagline}`;
  $('logo').textContent = G.name;
  $('brandSub').textContent = G.tagline;
  $('kicker').textContent = 'Explore • Discover • Travel better';
  const h = G.headline;
  $('headline').innerHTML = `<span>${esc(h[0])}</span><span>${esc(h[1])}</span><em>${esc(h[2])}</em>`;
  $('intro').textContent = G.intro;
  $('photo').src = G.photo;
  const d = G.details;
  $('licBadge').innerHTML = d['Licence no.'] ? `<b>✔ My licence</b>${esc(d['Licence no.'])}` : '';
  $('perks').innerHTML = [[I.badge, 'My Guide Licence'], [I.mount, `${d['Experience'] || ''} Experience`], [I.globe, `${G.languages.length} Languages`]]
    .map(([i, t]) => `<li>${ico(i)}${esc(t)}</li>`).join('');
  $('storyText').innerHTML = G.story.map((p) => `<p>${esc(p)}</p>`).join('');

  $('packageList').innerHTML = G.packages.map((p, i) => `
    <article class="card pkg reveal">
      <div class="img"><img src="${esc(p.img)}" alt="${esc(p.name)}" loading="lazy"><span class="tag">${p.featured ? 'Most loved' : esc(p.days)}</span></div>
      <div class="body"><h3>${esc(p.name)}<span>${esc(p.price)}</span></h3>
      <ul>${p.items.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
      <div class="foot"><span>${esc(p.days)} · Private guide</span><a class="go" href="#contact" aria-label="Enquire">→</a></div></div>
    </article>`).join('');

  const slides = (G.heroSlides && G.heroSlides.length ? G.heroSlides : [G.photo]);
  const band = $('stats');
  band.style.backgroundImage = `url('${slides[2] || slides[0]}')`;
  band.insertAdjacentHTML('afterbegin', '<div class="ov"></div>');
  $('statList').innerHTML = G.stats.map((s, i) => `<div class="stat"><div class="ic">${ico(statIcons[i % 4])}</div><div><b data-to="${s.value}" data-dec="${s.decimals || 0}" data-suf="${esc(s.suffix)}">0</b><span>${esc(s.label)}</span></div></div>`).join('');
  $('contact').style.backgroundImage = `url('${slides[0]}')`;

  $('galleryGrid').innerHTML = G.gallery.map((g, i) => `
    <figure class="card dest reveal" data-i="${i}"><div class="img"><img src="${esc(g.src)}" alt="${esc(g.caption)}" loading="lazy"></div><figcaption class="cap">${ico(I.pin)}${esc(g.caption)}</figcaption></figure>`).join('');

  $('facts').innerHTML = Object.entries(d).map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('');
  $('langs').innerHTML = G.languages.map((l) => `<div class="lang"><div><span>${esc(l.name)}</span><small>${esc(l.level)}</small></div><div class="bar"><i data-w="${l.pct}"></i></div></div>`).join('');
  $('timeline').innerHTML = G.experience.map((e) => `<li><b>${esc(e.year)}</b>${esc(e.title)}<br><span>${esc(e.text)}</span></li>`).join('');

  $('reviewList').innerHTML = G.reviews.map((r, i) => `
    <article class="card review reveal"><p>“${esc(r.text)}”</p>
      <div class="who"><img src="https://i.pravatar.cc/120?img=${[47, 33, 32, 44, 15][i % 5]}" alt=""><div><b>${esc(r.name)}</b><small>${esc(r.from)}</small><div class="stars">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</div></div></div>
    </article>`).join('');
  const rl = $('reviewList');
  $('prev').onclick = () => rl.scrollBy({ left: -380, behavior: 'smooth' });
  $('next').onclick = () => rl.scrollBy({ left: 380, behavior: 'smooth' });

  $('faqList').innerHTML = G.faq.map((f) => `<details class="reveal"><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join('');
  $('wa').href = `https://wa.me/${G.whatsapp}`;
  $('mail').href = `mailto:${G.email}`;
  $('foot').textContent = `© ${new Date().getFullYear()} ${G.name}`;

  // hero slideshow
  $('slides').innerHTML = slides.map((u) => `<div class="slide" style="background-image:url('${esc(u)}')"></div>`).join('');
  $('dots').innerHTML = slides.map((_, i) => `<button aria-label="Slide ${i + 1}"></button>`).join('');
  const sl = [...document.querySelectorAll('.slide')], dots = [...document.querySelectorAll('#dots button')];
  let cur = 0, timer;
  const show = (i) => { sl[cur].classList.remove('on'); dots[cur].classList.remove('on'); cur = (i + sl.length) % sl.length; sl[cur].classList.add('on'); dots[cur].classList.add('on'); };
  const start = () => { clearInterval(timer); if (sl.length > 1) timer = setInterval(() => show(cur + 1), 5500); };
  dots.forEach((b, i) => b.addEventListener('click', () => { show(i); start(); }));
  show(0); start();

  // nav, reveal, counters, bars
  const nav = $('nav');
  const sc = () => nav.classList.toggle('scrolled', scrollY > 30);
  addEventListener('scroll', sc, { passive: true }); sc();
  const count = (el) => {
    const to = +el.dataset.to, dec = +el.dataset.dec, suf = el.dataset.suf, t0 = performance.now();
    const step = (t) => { const p = Math.min((t - t0) / 1400, 1); el.textContent = (to * (1 - Math.pow(1 - p, 3))).toFixed(dec) + (p === 1 ? suf : ''); if (p < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  };
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in'); io.unobserve(e.target);
    e.target.querySelectorAll('[data-to]').forEach(count);
    e.target.querySelectorAll('[data-w]').forEach((b) => (b.style.width = b.dataset.w + '%'));
  }), { threshold: 0.15 });
  document.querySelectorAll('.reveal,#stats,#langs').forEach((el) => io.observe(el));

  // lightbox
  const lb = $('lb');
  $('galleryGrid').addEventListener('click', (e) => {
    const f = e.target.closest('figure'); if (!f) return;
    const g = G.gallery[+f.dataset.i];
    $('lbImg').src = g.src; $('lbImg').alt = g.caption; $('lbCap').textContent = g.caption; lb.hidden = false;
  });
  lb.addEventListener('click', () => (lb.hidden = true));
  addEventListener('keydown', (e) => e.key === 'Escape' && (lb.hidden = true));
})();
