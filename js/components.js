/* ============================================================
   TECHY BOX — External Components (Header, Footer, Cart)
   ============================================================ */

(function() {
  const path = window.location.pathname.toLowerCase();
  const isHome = path === '/' || path.endsWith('/') || path.endsWith('index.html') || path.endsWith('index');
  const homePrefix = isHome ? '' : 'index.html';

  // Helper to check if a navigation link is active
  const activeLink = (page) => {
    if (page === 'home' && isHome) return 'active';
    if (page === 'products' && path.includes('products')) return 'active';
    if (page === 'services' && path.includes('services')) return 'active';
    return '';
  };

  // 1. Render Header / Navbar
  const headerPlaceholder = document.getElementById('header-placeholder');
  if (headerPlaceholder) {
    const navClass = isHome ? "navbar" : "navbar scrolled";
    headerPlaceholder.innerHTML = `
      <nav class="${navClass}" id="navbar" role="navigation" aria-label="Main navigation">
        <div class="nav-container">
          <!-- Logo -->
          <a href="${homePrefix || 'index.html'}" class="nav-logo" aria-label="Techy Box Home">
            <div class="nav-logo-mark" aria-hidden="true">
              <img src="assets/images/logo.jpg" alt="Techy Box Logo" class="nav-logo-img">
            </div>
            <span class="nav-logo-text">Techy<em>Box</em></span>
          </a>

          <!-- Desktop Links -->
          <ul class="nav-links" role="list">
            <li><a href="${homePrefix || 'index.html'}" class="nav-link ${activeLink('home')}" data-section="hero">Home</a></li>
            <li><a href="products.html" class="nav-link ${activeLink('products')}" data-section="featured">Products</a></li>
            <li><a href="services.html" class="nav-link ${activeLink('services')}" data-section="services-section">Services</a></li>
            <li><a href="${homePrefix}#why-us" class="nav-link" data-section="why-us">About</a></li>
            <li><a href="${homePrefix}#contact" class="nav-link" data-section="contact">Contact</a></li>
          </ul>

          <!-- Actions -->
          <div class="nav-actions">
            <button class="cart-btn" aria-label="Open cart" id="cart-open-btn">
              <i data-lucide="shopping-cart" width="18" height="18"></i>
              <span class="cart-badge" aria-label="Cart items count">0</span>
            </button>
            <a href="products.html" class="btn btn-primary btn-sm" style="display:none" id="nav-shop-btn">Shop Now</a>
            <button class="hamburger" id="hamburger" aria-label="Toggle mobile menu" aria-expanded="false">
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>

        <!-- Mobile Navigation -->
        <nav class="mobile-nav" id="mobile-nav" aria-label="Mobile navigation">
          <a href="${homePrefix || 'index.html'}" class="nav-link ${activeLink('home')}"><i data-lucide="home" width="16" height="16"></i>Home</a>
          <a href="products.html" class="nav-link ${activeLink('products')}"><i data-lucide="package" width="16" height="16"></i>Products</a>
          <a href="services.html" class="nav-link ${activeLink('services')}"><i data-lucide="code-2" width="16" height="16"></i>Services</a>
          <a href="${homePrefix}#why-us" class="nav-link"><i data-lucide="info" width="16" height="16"></i>About</a>
          <a href="${homePrefix}#contact" class="nav-link"><i data-lucide="mail" width="16" height="16"></i>Contact</a>
          <a href="products.html" class="btn btn-primary" style="justify-content:center;margin-top:0.5rem">
            <i data-lucide="shopping-bag" width="16" height="16"></i>Shop Now
          </a>
        </nav>
      </nav>
    `;
  }

  // 2. Render Footer
  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (footerPlaceholder) {
    footerPlaceholder.innerHTML = `
      <footer class="footer">
        <div class="container">
          <div class="footer-grid">
            <!-- Brand -->
            <div>
              <div class="footer-logo">
                <a href="${homePrefix || 'index.html'}" class="nav-logo">
                  <div class="nav-logo-mark"><img src="assets/images/logo.jpg" alt="Techy Box Logo" class="nav-logo-img"></div>
                  <span class="nav-logo-text">Techy<em>Box</em></span>
                </a>
              </div>
              <p class="footer-about">
                Your trusted source for premium IoT components, microcontrollers, sensors, and relay modules.
                We also offer professional web and IoT development services.
              </p>
              <div class="footer-socials">
                <a href="https://facebook.com/techybox" target="_blank" rel="noopener" class="social-btn" aria-label="Facebook">
                  <i data-lucide="facebook" width="16" height="16"></i>
                </a>
                <a href="#" class="social-btn" aria-label="Instagram">
                  <i data-lucide="instagram" width="16" height="16"></i>
                </a>
                <a href="#" class="social-btn" aria-label="GitHub">
                  <i data-lucide="github" width="16" height="16"></i>
                </a>
                <a href="#" class="social-btn" aria-label="YouTube">
                  <i data-lucide="youtube" width="16" height="16"></i>
                </a>
              </div>
            </div>

            <!-- Quick Links -->
            <div>
              <div class="footer-col-title">Quick Links</div>
              <ul class="footer-links">
                <li><a href="${homePrefix || 'index.html'}" class="footer-link">Home</a></li>
                <li><a href="products.html" class="footer-link">All Products</a></li>
                <li><a href="services.html" class="footer-link">Services</a></li>
                <li><a href="${homePrefix}#why-us" class="footer-link">About Us</a></li>
                <li><a href="${homePrefix}#contact" class="footer-link">Contact</a></li>
              </ul>
            </div>

            <!-- Categories -->
            <div>
              <div class="footer-col-title">Categories</div>
              <ul class="footer-links">
                <li><a href="products.html?cat=Microcontrollers" class="footer-link">Microcontrollers</a></li>
                <li><a href="products.html?cat=Relay Modules" class="footer-link">Relay Modules</a></li>
                <li><a href="products.html?cat=Sensors" class="footer-link">Sensors & Displays</a></li>
                <li><a href="products.html?cat=Power" class="footer-link">Power Supplies</a></li>
                <li><a href="products.html?cat=Accessories" class="footer-link">Accessories</a></li>
              </ul>
            </div>

            <!-- Contact Info -->
            <div>
              <div class="footer-col-title">Contact Info</div>
              <div class="footer-contact-item">
                <i data-lucide="map-pin" width="14" height="14" class="footer-contact-icon"></i>
                <span>Philippines</span>
              </div>
              <div class="footer-contact-item">
                <i data-lucide="mail" width="14" height="14" class="footer-contact-icon"></i>
                <span>techybox26@gmail.com</span>
              </div>
              <div class="footer-contact-item">
                <i data-lucide="phone" width="14" height="14" class="footer-contact-icon"></i>
                <span>+63 994 342 8659</span>
              </div>
              <div class="footer-contact-item">
                <i data-lucide="clock" width="14" height="14" class="footer-contact-icon"></i>
                <span>Mon–Sat, 9AM–6PM</span>
              </div>
            </div>
          </div>

          <div class="footer-bottom">
            <span>© 2025 Techy Box. All rights reserved.</span>
            <div class="footer-bottom-links">
              <a href="#" class="footer-bottom-link">Privacy Policy</a>
              <a href="#" class="footer-bottom-link">Terms of Service</a>
              <a href="#" class="footer-bottom-link">Shipping Policy</a>
            </div>
          </div>
        </div>
      </footer>
    `;
  }

  // 3. Render Cart Sidebar & Toast Wrap
  const cartPlaceholder = document.getElementById('cart-placeholder');
  if (cartPlaceholder) {
    cartPlaceholder.innerHTML = `
      <div class="cart-overlay" id="cart-overlay" aria-hidden="true"></div>
      <aside class="cart-sidebar" id="cart-sidebar" aria-label="Shopping cart">
        <div class="cart-header">
          <div class="cart-title-wrap">
            <span class="cart-title">Your Cart</span>
            <span class="cart-count-badge" id="cart-count-badge">0</span>
          </div>
          <button class="cart-close" id="cart-close-btn" aria-label="Close cart">
            <i data-lucide="x" width="16" height="16"></i>
          </button>
        </div>

        <!-- Empty State -->
        <div class="cart-empty" id="cart-empty" style="display:flex">
          <div class="cart-empty-icon">
            <i data-lucide="shopping-cart" width="48" height="48"></i>
          </div>
          <div class="cart-empty-text">Your cart is empty</div>
          <div class="cart-empty-sub">Add some IoT components to get started!</div>
          <a href="products.html" class="btn btn-primary btn-sm" onclick="closeCart()">
            <i data-lucide="package" width="14" height="14"></i>
            Browse Products
          </a>
        </div>

        <!-- Cart Items -->
        <div class="cart-body" id="cart-body"></div>

        <!-- Footer -->
        <div class="cart-footer" id="cart-footer-section">
          <div class="cart-summary">
            <div class="cart-row">
              <span>Subtotal</span>
              <span id="cart-subtotal-val">&#8369;0</span>
            </div>
            <div class="cart-row">
              <span>Shipping</span>
              <span style="color:var(--green)">Calculated at checkout</span>
            </div>
            <div class="cart-row total">
              <span>Total</span>
              <span class="cart-total-val" id="cart-total-val">&#8369;0</span>
            </div>
          </div>
          <div class="cart-checkout-btns">
            <a href="checkout.html" class="btn btn-primary" id="checkout-btn">
              <i data-lucide="credit-card" width="16" height="16"></i>
              Proceed to Checkout
            </a>
            <button class="btn btn-ghost" onclick="emailOrder()" id="email-order-btn">
              <i data-lucide="mail" width="16" height="16"></i>
              Inquire via Email
            </button>
          </div>
        </div>
      </aside>

      <!-- Toast Container -->
      <div class="toast-wrap" aria-live="polite"></div>
    `;
  }

  // Create Lucide Icons for dynamic content
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
})();
