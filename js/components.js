/* ============================================================
   TECHY BOX — External Components Loader (Header, Footer, Cart)
   ============================================================ */

(async function() {
  const path = window.location.pathname.toLowerCase();
  const isHome = path === '/' || path.endsWith('/') || path.endsWith('index.html') || path.endsWith('index');
  const homePrefix = isHome ? '' : 'index.html';

  // 1. Fetch & Render Header / Navbar
  const headerPlaceholder = document.getElementById('header-placeholder');
  if (headerPlaceholder) {
    try {
      const res = await fetch('components/header.html');
      if (!res.ok) throw new Error(`Status: ${res.status}`);
      let html = await res.text();
      
      // Update page links relative to current path
      if (!isHome) {
        html = html.replace(/href="#why-us"/g, 'href="index.html#why-us"')
                   .replace(/href="#contact"/g, 'href="index.html#contact"');
      }
      
      // Calculate active page
      let activePage = 'home';
      if (path.includes('products')) activePage = 'products';
      else if (path.includes('services')) activePage = 'services';
      
      // Set active link class
      if (activePage === 'home') {
        html = html.replace('href="index.html" class="nav-link"', 'href="index.html" class="nav-link active"');
        html = html.replace('href="index.html" class="nav-link"', 'href="index.html" class="nav-link active"'); // for mobile as well
      } else if (activePage === 'products') {
        html = html.replace('href="products.html" class="nav-link"', 'href="products.html" class="nav-link active"');
        html = html.replace('href="products.html" class="nav-link"', 'href="products.html" class="nav-link active"'); // for mobile as well
      } else if (activePage === 'services') {
        html = html.replace('href="services.html" class="nav-link"', 'href="services.html" class="nav-link active"');
        html = html.replace('href="services.html" class="nav-link"', 'href="services.html" class="nav-link active"'); // for mobile as well
      }

      // Add scroll background style to navbar if not on homepage
      if (!isHome) {
        html = html.replace('class="navbar"', 'class="navbar scrolled"');
      }

      headerPlaceholder.innerHTML = html;
    } catch (err) {
      console.error('Failed to load header component:', err);
    }
  }

  // 2. Fetch & Render Footer
  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (footerPlaceholder) {
    try {
      const res = await fetch('components/footer.html');
      if (!res.ok) throw new Error(`Status: ${res.status}`);
      let html = await res.text();

      // Update footer links relative to current path
      if (!isHome) {
        html = html.replace(/href="#why-us"/g, 'href="index.html#why-us"')
                   .replace(/href="#contact"/g, 'href="index.html#contact"');
      }

      footerPlaceholder.innerHTML = html;
    } catch (err) {
      console.error('Failed to load footer component:', err);
    }
  }

  // 3. Fetch & Render Cart Sidebar & Toast Wrap
  const cartPlaceholder = document.getElementById('cart-placeholder');
  if (cartPlaceholder) {
    try {
      const res = await fetch('components/cart.html');
      if (!res.ok) throw new Error(`Status: ${res.status}`);
      const html = await res.text();
      cartPlaceholder.innerHTML = html;
    } catch (err) {
      console.error('Failed to load cart component:', err);
    }
  }

  // Create Lucide Icons for dynamic content
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Notify other scripts that the components are loaded in the DOM
  window.dispatchEvent(new Event('componentsLoaded'));
})();
