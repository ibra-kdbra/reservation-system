<template>
  <footer class="footer">
    <div class="footer-main container">
      <div class="footer-grid">
        <!-- Brand Column -->
        <div class="footer-brand">
          <div class="brand">
            <!-- SVG Pagoda Icon -->
            <svg class="brand-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
              stroke-linecap="round" stroke-linejoin="round" width="26" height="26">
              <path d="M12 2L8 6h8l-4-4z" />
              <path d="M6 10l6-4 6 4" />
              <path d="M3 14l9-4 9 4" />
              <path d="M3 18h18" />
              <line x1="9" y1="14" x2="9" y2="18" />
              <line x1="15" y1="14" x2="15" y2="18" />
            </svg>
            <span class="brand-text">NestAsia</span>
          </div>
          <p class="footer-desc">
            Discover unique rooms, villas, and suites across East, South &amp; Central Asia. Book with confidence—your
            perfect Asian stay awaits.
          </p>
          <div class="social-links">
            <a href="https://x.com/nestasia" target="_blank" rel="noopener" aria-label="X (Twitter)"
              class="social-link">
              <!-- X / Twitter SVG -->
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path
                  d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a href="https://instagram.com/nestasia" target="_blank" rel="noopener" aria-label="Instagram"
              class="social-link">
              <!-- Instagram SVG -->
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a href="https://facebook.com/nestasia" target="_blank" rel="noopener" aria-label="Facebook"
              class="social-link">
              <!-- Facebook SVG -->
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
              </svg>
            </a>
          </div>
        </div>

        <!-- Explore -->
        <div class="footer-col">
          <h4>Explore</h4>
          <ul>
            <li><router-link to="/listings/search">Browse Listings</router-link></li>
            <li><router-link to="/listings/search?type=APARTMENT">Apartments</router-link></li>
            <li><router-link to="/listings/search?type=VILLA">Villas</router-link></li>
            <li><router-link to="/listings/search?type=STUDIO">Studios</router-link></li>
          </ul>
        </div>

        <!-- Hosting -->
        <div class="footer-col">
          <h4>Hosting</h4>
          <ul>
            <li><a href="#">Become a Host</a></li>
            <li><a href="#">Host Resources</a></li>
            <li><a href="#">Responsible Hosting</a></li>
            <li><a href="#">Community Forum</a></li>
          </ul>
        </div>

        <!-- Support -->
        <div class="footer-col">
          <h4>Support</h4>
          <ul>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Safety Info</a></li>
            <li><a href="#">Cancellation Policy</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="container footer-bottom-inner">
        <p>&copy; {{ new Date().getFullYear() }} NestAsia. All rights reserved.</p>
        <div class="footer-legal">
          <a href="#">Privacy</a>
          <span>·</span>
          <a href="#">Terms</a>
          <span>·</span>
          <a href="#">Sitemap</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: var(--color-gray-900);
  color: var(--color-gray-300);
  margin-top: var(--spacing-4xl);
}

.footer-main {
  padding: var(--spacing-3xl) 0;
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: var(--spacing-2xl);
}

.footer-brand .brand {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  text-decoration: none;
  margin-bottom: var(--spacing-md);
}

.footer-brand .brand-icon-svg {
  color: var(--color-primary-400);
}

.footer-brand .brand-text {
  font-weight: 800;
  font-size: var(--font-size-xl);
  background: linear-gradient(135deg, var(--color-primary-400), var(--color-secondary-400));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.footer-desc {
  font-size: var(--font-size-sm);
  line-height: 1.7;
  color: var(--color-gray-400);
  max-width: 280px;
}

.social-links {
  display: flex;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-lg);
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: var(--radius-lg);
  background: var(--color-gray-800);
  color: var(--color-gray-400);
  transition: all var(--transition-fast);
  text-decoration: none;
}

.social-link:hover {
  background: var(--color-primary-600);
  color: white;
  transform: translateY(-2px);
}

.footer-col h4 {
  color: white;
  font-size: var(--font-size-sm);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: var(--spacing-lg);
}

.footer-col ul {
  list-style: none;
  padding: 0;
}

.footer-col li {
  margin-bottom: var(--spacing-sm);
}

.footer-col a {
  color: var(--color-gray-400);
  font-size: var(--font-size-sm);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.footer-col a:hover {
  color: white;
}

.footer-bottom {
  border-top: 1px solid var(--color-gray-800);
  padding: var(--spacing-lg) 0;
}

.footer-bottom-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.footer-bottom p {
  font-size: var(--font-size-sm);
  color: var(--color-gray-500);
}

.footer-legal {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-size: var(--font-size-sm);
}

.footer-legal a {
  color: var(--color-gray-500);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.footer-legal a:hover {
  color: white;
}

.footer-legal span {
  color: var(--color-gray-600);
}

@media (max-width: 768px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-xl);
  }

  .footer-bottom-inner {
    flex-direction: column;
    gap: var(--spacing-sm);
    text-align: center;
  }
}
</style>
