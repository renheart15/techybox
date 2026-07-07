/**
 * TECHY BOX — Mobile Device Detection & Auto-Redirect
 * Detects mobile/tablet users and redirects to dedicated mobile pages.
 * Users can bypass by adding ?desktop=1 to the URL.
 */
(function () {
  // Skip if already on mobile site
  if (window.location.pathname.includes('/mobile/')) return;

  // Skip if user explicitly chose desktop view
  if (localStorage.getItem('tb_prefer_desktop') === '1') return;
  if (new URLSearchParams(window.location.search).get('desktop') === '1') {
    localStorage.setItem('tb_prefer_desktop', '1');
    return;
  }

  const isMobile = window.matchMedia('(max-width: 767px)').matches ||
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  if (!isMobile) return;

  // Map desktop paths → mobile paths
  const pathname = window.location.pathname;
  const base = pathname.substring(0, pathname.lastIndexOf('/') + 1);

  const routes = {
    'index.html': 'mobile/index.html',
    'products.html': 'mobile/products.html',
    'checkout.html': 'mobile/checkout.html',
    'services.html': 'mobile/services.html',
  };

  // Get filename from path
  const file = pathname.split('/').pop() || 'index.html';
  const mobilePage = routes[file] || routes['index.html'];

  window.location.replace(base + mobilePage + window.location.search);
})();
