// Mark body as JS-enabled (controls reveal animations)
document.body.classList.add('js-enabled');

// =============== STICKY NAV ON SCROLL ===============
const nav = document.getElementById('nav');
const heroSection = document.querySelector('.hero');

function handleNavScroll() {
  const heroHeight = heroSection.offsetHeight;
  const scrollY = window.scrollY;

  if (scrollY > heroHeight - 100) {
    nav.classList.remove('hero-mode');
    nav.classList.add('scrolled');
  } else if (scrollY > 60) {
    nav.classList.add('hero-mode', 'scrolled');
  } else {
    nav.classList.add('hero-mode');
    nav.classList.remove('scrolled');
  }
}
window.addEventListener('scroll', handleNavScroll, { passive: true });
handleNavScroll();

// =============== INTERSECTION REVEAL ===============
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -80px 0px' });

reveals.forEach(el => revealObserver.observe(el));

// =============== GSAP SCROLL ANIMATIONS ===============
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);

  // Parallax on hero media
  gsap.to('.hero-media', {
    yPercent: 25,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });

  // Animated stat counters
  document.querySelectorAll('.stat-num[data-count]').forEach(el => {
    const target = parseInt(el.getAttribute('data-count'), 10);
    const unitEl = el.querySelector('.unit');
    const unitHTML = unitEl ? unitEl.outerHTML : '';

    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      onEnter: () => {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 1.8,
          ease: 'power2.out',
          onUpdate: () => {
            const display = target === 50 ? Math.floor(obj.val) + 'K' : Math.floor(obj.val);
            el.innerHTML = display + unitHTML;
          }
        });
      },
      once: true
    });
  });
}

// =============== SMOOTH SCROLL (anchor offset) ===============
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const targetId = link.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      const offset = target.getBoundingClientRect().top + window.scrollY - 60;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  });
});