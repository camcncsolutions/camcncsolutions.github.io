(async () => {
  const include = async (targetId, url) => {
    const target = document.getElementById(targetId);
    if (!target) return;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to load ${url}`);
    }

    target.innerHTML = await response.text();
  };

  const normalizePath = (pathname) => {
    if (pathname.endsWith('index.html')) {
      return pathname.slice(0, -'index.html'.length) || '/';
    }

    if (pathname !== '/' && !pathname.endsWith('/')) {
      return `${pathname}/`;
    }

    return pathname;
  };

  const setCurrentLink = () => {
    const currentPath = normalizePath(window.location.pathname);

    if (currentPath !== '/' && currentPath !== '/about/') {
      return;
    }

    const header = document.getElementById('header');
    if (!header) return;

    header.querySelectorAll('a[aria-current="page"]').forEach((link) => {
      link.removeAttribute('aria-current');
    });

    header.querySelectorAll('a[href]').forEach((link) => {
      const linkPath = normalizePath(new URL(link.getAttribute('href'), window.location.origin).pathname);
      if (linkPath === currentPath) {
        link.setAttribute('aria-current', 'page');
      }
    });
  };

  const loadMainScript = () =>
    new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = '/assets/js/main.js';
      script.addEventListener('load', resolve, { once: true });
      script.addEventListener('error', reject, { once: true });
      document.body.appendChild(script);
    });

  try {
    await Promise.all([include('header', '/components/header.html'), include('footer', '/components/footer.html')]);
    setCurrentLink();
    await loadMainScript();
  } catch (error) {
    console.error(error);
  }
})();
