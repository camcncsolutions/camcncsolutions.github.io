const header = document.querySelector('[data-header]');
const menuButton = document.getElementById('menuButton');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll('a') : [];
const revealItems = document.querySelectorAll('.reveal');

const setMenuState = (isOpen) => {
  if (!menuButton || !mobileMenu) return;
  menuButton.classList.toggle('is-open', isOpen);
  mobileMenu.classList.toggle('is-open', isOpen);
  menuButton.setAttribute('aria-expanded', String(isOpen));
  document.body.style.overflow = isOpen ? 'hidden' : '';
};

if (menuButton && mobileMenu) {
  menuButton.addEventListener('click', () => {
    setMenuState(!mobileMenu.classList.contains('is-open'));
  });

  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => setMenuState(false));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      setMenuState(false);
    }
  });
}

window.addEventListener('scroll', () => {
  header?.classList.toggle('is-scrolled', window.scrollY > 12);
}, { passive: true });

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.18,
    rootMargin: '0px 0px -8% 0px',
  });

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

header?.classList.toggle('is-scrolled', window.scrollY > 12);
