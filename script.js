document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', () => {
  // Hero: поэтапное появление сразу после загрузки
  requestAnimationFrame(() => requestAnimationFrame(() => {
    document.querySelectorAll('.hero .rise').forEach(el => el.classList.add('is-in'));
  }));

  // Остальные блоки: появление при прокрутке
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('[data-reveal]').forEach(el => io.observe(el));

  // Единственное фирменное движение: фото работы следует за курсором над списком услуг
  const preview = document.querySelector('.preview');
  if (!preview || !window.matchMedia('(hover:hover)').matches) return;
  const img = preview.querySelector('img');
  const photos = ['assets/work-floral.jpg', 'assets/work-lantern.jpg'];
  let tx = 0, ty = 0, x = 0, y = 0, raf = null;

  const loop = () => {
    x += (tx - x) * 0.14;
    y += (ty - y) * 0.14;
    preview.style.transform = `translate3d(${x}px,${y}px,0) scale(${preview.classList.contains('is-on') ? 1 : .92})`;
    raf = requestAnimationFrame(loop);
  };

  document.querySelectorAll('.service').forEach((row, i) => {
    row.addEventListener('mouseenter', (e) => {
      img.src = photos[i % photos.length];
      tx = x = e.clientX + 32; ty = y = e.clientY - 160;
      preview.classList.add('is-on');
      if (!raf) loop();
    });
    row.addEventListener('mousemove', (e) => { tx = e.clientX + 32; ty = e.clientY - 160; });
    row.addEventListener('mouseleave', () => {
      preview.classList.remove('is-on');
      setTimeout(() => { if (!preview.classList.contains('is-on')) { cancelAnimationFrame(raf); raf = null; } }, 450);
    });
  });
});
