<template>
  <div class="home">
    <!-- Asia Hero Section -->
    <section class="hero">
      <!-- SVG Asia Map Background -->
      <div class="map-background">
        <svg class="asia-map" viewBox="0 0 1200 500" xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="dots" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="rgba(232,93,58,0.06)" />
            </pattern>
            <radialGradient id="glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="rgba(232,93,58,0.1)" />
              <stop offset="100%" stop-color="transparent" />
            </radialGradient>
          </defs>
          <rect width="1200" height="500" fill="url(#dots)" />

          <!-- East Asia (China, Japan, Korea) -->
          <path
            d="M500,60 Q550,40 620,50 Q700,55 750,80 Q790,100 800,140 Q790,180 750,200 Q700,220 650,210 Q600,200 560,175 Q520,150 500,120 Q490,90 500,60Z"
            fill="rgba(232,93,58,0.05)" stroke="rgba(232,93,58,0.1)" stroke-width="1" />
          <!-- Japan -->
          <path d="M810,80 Q830,70 845,85 Q855,110 850,140 Q840,165 825,175 Q810,170 805,150 Q800,120 810,80Z"
            fill="rgba(232,93,58,0.06)" stroke="rgba(232,93,58,0.12)" stroke-width="1" />
          <!-- Southeast Asia -->
          <path
            d="M550,220 Q600,210 660,225 Q720,240 750,270 Q760,300 740,330 Q700,360 640,350 Q580,340 550,310 Q530,280 535,250 Q540,230 550,220Z"
            fill="rgba(45,106,79,0.05)" stroke="rgba(45,106,79,0.1)" stroke-width="1" />
          <!-- Indonesia / Philippines archipelago -->
          <path
            d="M650,340 Q700,330 760,345 Q820,360 860,380 Q870,400 840,420 Q790,430 720,420 Q660,410 640,390 Q630,370 650,340Z"
            fill="rgba(45,106,79,0.04)" stroke="rgba(45,106,79,0.08)" stroke-width="1" />
          <!-- South Asia (India, Sri Lanka) -->
          <path
            d="M320,150 Q370,130 420,145 Q460,165 470,210 Q475,260 460,310 Q440,350 400,370 Q360,365 335,340 Q310,310 305,260 Q300,210 310,170 Q315,155 320,150Z"
            fill="rgba(212,168,67,0.05)" stroke="rgba(212,168,67,0.1)" stroke-width="1" />
          <!-- Central Asia -->
          <path
            d="M200,60 Q260,40 340,50 Q400,55 440,80 Q460,100 445,130 Q420,145 370,140 Q310,135 260,120 Q220,105 200,85 Q195,70 200,60Z"
            fill="rgba(232,93,58,0.04)" stroke="rgba(232,93,58,0.08)" stroke-width="1" />

          <!-- Flight lines connecting cities -->
          <line x1="830" y1="110" x2="680" y2="250" stroke="rgba(232,93,58,0.1)" stroke-width="1" stroke-dasharray="6,4"
            class="flight-line line-1" />
          <line x1="400" y1="250" x2="620" y2="270" stroke="rgba(45,106,79,0.1)" stroke-width="1" stroke-dasharray="6,4"
            class="flight-line line-2" />
          <line x1="750" y1="130" x2="630" y2="130" stroke="rgba(212,168,67,0.1)" stroke-width="1"
            stroke-dasharray="6,4" class="flight-line line-3" />
          <line x1="300" y1="100" x2="500" y2="90" stroke="rgba(232,93,58,0.08)" stroke-width="1" stroke-dasharray="6,4"
            class="flight-line line-4" />

          <!-- Animated destination pins -->
          <g v-for="(pin, i) in mapPins" :key="i" class="map-pin" :style="{ animationDelay: `${i * 0.3}s` }">
            <circle :cx="pin.x" :cy="pin.y" r="16" fill="url(#glow)" />
            <circle :cx="pin.x" :cy="pin.y" r="5" :fill="pin.color" class="pin-dot" />
            <circle :cx="pin.x" :cy="pin.y" r="5" :fill="pin.color" class="pin-pulse" />
          </g>
        </svg>
      </div>

      <div class="hero-content container">
        <div class="hero-greeting slide-up">{{ theme.emoji }} {{ theme.greeting }}</div>
        <h1 class="hero-title slide-up delay-1">
          Explore the Heart of
          <span class="title-accent">Asia</span>
        </h1>
        <p class="hero-subtitle slide-up delay-2">
          From ancient temples to modern skylines — find your perfect stay across East, South & Central Asia
        </p>

        <!-- Destination tags -->
        <div class="destination-tags slide-up delay-2">
          <span v-for="tag in destinationTags" :key="tag.name" class="dest-tag" @click="searchDestination(tag.name)">
            <span class="dest-tag-emoji">{{ tag.emoji }}</span>
            {{ tag.name }}
          </span>
        </div>

        <div class="search-card slide-up delay-3">
          <div class="search-field">
            <label>Where</label>
            <input v-model="searchQuery" type="text" placeholder="Tokyo, Bali, Jaipur..." @keyup.enter="handleSearch" />
          </div>
          <div class="search-field">
            <label>Check in</label>
            <input type="date" v-model="checkIn" />
          </div>
          <div class="search-field">
            <label>Check out</label>
            <input type="date" v-model="checkOut" />
          </div>
          <div class="search-field guests-field">
            <label>Guests</label>
            <select v-model="guests">
              <option value="1">1 Guest</option>
              <option value="2">2 Guests</option>
              <option value="3">3 Guests</option>
              <option value="4">4 Guests</option>
              <option value="5">5+ Guests</option>
            </select>
          </div>
          <MagneticButton variant="primary" size="lg" @click="handleSearch">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            Search
          </MagneticButton>
        </div>

        <!-- Stats row -->
        <div class="hero-stats slide-up delay-3">
          <div class="stat-item">
            <span class="stat-number">8K+</span>
            <span class="stat-label">Properties</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-number">25+</span>
            <span class="stat-label">Countries</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-number">40K+</span>
            <span class="stat-label">Happy Guests</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Category Chips -->
    <section class="categories container" data-reveal>
      <div class="category-scroll">
        <button v-for="cat in categories" :key="cat.type" class="category-chip"
          :class="{ active: activeCategory === cat.type }" @click="filterByCategory(cat.type)" data-reveal-child>
          <span class="category-icon">{{ cat.icon }}</span>
          <span>{{ cat.label }}</span>
        </button>
      </div>
    </section>

    <!-- Featured Listings -->
    <section class="featured container" data-reveal>
      <div class="section-header">
        <h2>Featured Stays</h2>
        <router-link to="/listings/search" class="view-all">
          View all
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </router-link>
      </div>

      <!-- Skeleton Loaders -->
      <div v-if="loading" class="listings-grid">
        <div v-for="i in 6" :key="i" class="listing-card-skeleton">
          <div class="skeleton skeleton-image"></div>
          <div class="skeleton-content">
            <div class="skeleton skeleton-title"></div>
            <div class="skeleton skeleton-text"></div>
            <div class="skeleton skeleton-price"></div>
          </div>
        </div>
      </div>

      <!-- Listing Cards — CSS-only hover (no JS tilt) -->
      <div v-else class="listings-grid">
        <div v-for="listing in filteredListings" :key="listing.id" class="listing-card" data-reveal-child
          @click="goToListing(listing.id)">
          <div class="listing-image-wrap">
            <img :src="listing.coverImage" :alt="listing.title" class="listing-image" loading="lazy" />
            <span class="listing-type badge badge-primary">{{ formatType(listing.propertyType) }}</span>
            <span v-if="listing.instantBook" class="instant-badge">⚡ Instant</span>
          </div>
          <div class="listing-body">
            <div class="listing-location">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              {{ listing.city }}, {{ listing.country }}
            </div>
            <h3 class="listing-title">{{ listing.title }}</h3>
            <div class="listing-meta">
              <span>{{ listing.bedrooms }} bed{{ listing.bedrooms > 1 ? 's' : '' }}</span>
              <span>·</span>
              <span>{{ listing.bathrooms }} bath</span>
              <span>·</span>
              <span>{{ listing.maxGuests }} guest{{ listing.maxGuests > 1 ? 's' : '' }}</span>
            </div>
            <div class="listing-footer">
              <div class="listing-price">
                <span class="price">${{ listing.pricePerNight }}</span>
                <span class="per-night">/ night</span>
              </div>
              <div v-if="listing.averageRating" class="listing-rating">
                ⭐ {{ listing.averageRating }}
                <span class="review-count">({{ listing.reviewCount }})</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- How it Works -->
    <section class="how-it-works" data-reveal>
      <div class="container">
        <h2 class="text-center mb-xl">How it Works</h2>
        <div class="steps-grid">
          <div class="step-card" data-reveal-child>
            <div class="step-icon-wrap">
              <div class="step-icon">🔍</div>
              <div class="step-number">1</div>
            </div>
            <h4>Search</h4>
            <p>Browse unique stays across Asia — from ryokans to jungle villas</p>
          </div>
          <div class="step-card" data-reveal-child>
            <div class="step-icon-wrap">
              <div class="step-icon">📅</div>
              <div class="step-number">2</div>
            </div>
            <h4>Book</h4>
            <p>Reserve your perfect stay with instant or request-based booking</p>
          </div>
          <div class="step-card" data-reveal-child>
            <div class="step-icon-wrap">
              <div class="step-icon">🎉</div>
              <div class="step-number">3</div>
            </div>
            <h4>Enjoy</h4>
            <p>Create memories in the world's most captivating destinations</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="cta" data-reveal>
      <div class="container text-center" style="position: relative; z-index: 2;">
        <h2 class="cta-heading" data-reveal-child>Become a Host</h2>
        <p class="cta-text" data-reveal-child>Share your space with travelers from across Asia. List your property
          today.</p>
        <MagneticButton variant="ghost" size="lg" class="cta-btn" @click="$router.push('/register')" data-reveal-child>
          Get Started
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </MagneticButton>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { api } from '../api/client'
import { useTimeTheme } from '../composables/useTimeTheme'
import { useScrollReveal } from '../composables/useScrollReveal'
import MagneticButton from '../components/ui/MagneticButton.vue'

const router = useRouter()
const { theme } = useTimeTheme()
useScrollReveal({ staggerDelay: 100 })

const searchQuery = ref('')
const checkIn = ref('')
const checkOut = ref('')
const guests = ref('2')
const listings = ref<any[]>([])
const loading = ref(true)
const activeCategory = ref('ALL')

// Map pins — Asian destinations
const mapPins = [
  { x: 830, y: 110, color: '#e85d3a' },  // Tokyo
  { x: 750, y: 130, color: '#d44425' },  // Seoul
  { x: 620, y: 120, color: '#b5341b' },  // Beijing
  { x: 680, y: 260, color: '#2d6a4f' },  // Bangkok
  { x: 730, y: 350, color: '#245a42' },  // Bali
  { x: 400, y: 260, color: '#d4a843' },  // Jaipur
  { x: 370, y: 350, color: '#e5c158' },  // Goa
  { x: 710, y: 290, color: '#f07d56' },  // Singapore
  { x: 780, y: 340, color: '#4ade80' },  // Manila
  { x: 300, y: 90, color: '#ffa78a' },   // Samarkand (Central Asia)
  { x: 660, y: 240, color: '#d44425' },  // Hanoi
  { x: 800, y: 160, color: '#e85d3a' },  // Hong Kong
]

const destinationTags = [
  { name: 'Tokyo', emoji: '🗼' },
  { name: 'Bali', emoji: '🌺' },
  { name: 'Bangkok', emoji: '🛕' },
  { name: 'Seoul', emoji: '🏙️' },
  { name: 'Jaipur', emoji: '🏰' },
  { name: 'Singapore', emoji: '🌆' },
  { name: 'Hanoi', emoji: '🏮' },
]

const categories = [
  { type: 'ALL', label: 'All', icon: '🏠' },
  { type: 'APARTMENT', label: 'Apartments', icon: '🏢' },
  { type: 'HOUSE', label: 'Houses', icon: '🏡' },
  { type: 'VILLA', label: 'Villas', icon: '🏛️' },
  { type: 'COTTAGE', label: 'Cottages', icon: '🛖' },
  { type: 'STUDIO', label: 'Studios', icon: '🎨' },
  { type: 'ROOM', label: 'Rooms', icon: '🚪' },
  { type: 'LOFT', label: 'Lofts', icon: '🏗️' },
]

const filteredListings = computed(() => {
  if (activeCategory.value === 'ALL') return listings.value
  return listings.value.filter((l) => l.propertyType === activeCategory.value)
})

onMounted(async () => {
  await fetchListings()
})

async function fetchListings() {
  loading.value = true
  try {
    const { data } = await api.searchListings({ limit: 12 })
    listings.value = data.listings || data || []
  } catch (error) {
    console.error('Failed to fetch listings:', error)
  } finally {
    loading.value = false
  }
}

function handleSearch() {
  const query: Record<string, string> = {}
  if (searchQuery.value.trim()) query.city = searchQuery.value
  if (checkIn.value) query.checkIn = checkIn.value
  if (checkOut.value) query.checkOut = checkOut.value
  if (guests.value) query.guests = guests.value
  router.push({ name: 'search', query })
}

function searchDestination(name: string) {
  searchQuery.value = name
  handleSearch()
}

function filterByCategory(type: string) {
  activeCategory.value = type
}

function goToListing(id: string) {
  router.push({ name: 'listing-detail', params: { id } })
}

function formatType(type: string) {
  return type.charAt(0) + type.slice(1).toLowerCase()
}
</script>

<style scoped>
/* ===== HERO ===== */
.hero {
  position: relative;
  min-height: 600px;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: linear-gradient(180deg, #fff8f5 0%, #fff0eb 40%, #ffffff 100%);
}

.map-background {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.asia-map {
  width: 100%;
  height: 100%;
}

.flight-line {
  stroke-dashoffset: 0;
  animation: dash-flow 3s linear infinite;
}

.line-1 {
  animation-delay: 0s;
}

.line-2 {
  animation-delay: 0.8s;
}

.line-3 {
  animation-delay: 1.6s;
}

.line-4 {
  animation-delay: 2.4s;
}

@keyframes dash-flow {
  to {
    stroke-dashoffset: -20;
  }
}

.map-pin {
  animation: pin-appear 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both;
}

@keyframes pin-appear {
  from {
    opacity: 0;
    transform: scale(0) translateY(10px);
  }

  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.pin-dot {
  opacity: 0.9;
}

.pin-pulse {
  opacity: 0;
  animation: pulse-ring 2.5s cubic-bezier(0, 0, 0.2, 1) infinite;
}

@keyframes pulse-ring {
  0% {
    r: 5;
    opacity: 0.5;
  }

  100% {
    r: 18;
    opacity: 0;
  }
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  padding: var(--spacing-4xl) 0 var(--spacing-3xl);
}

.hero-greeting {
  display: inline-block;
  background: white;
  border: 1px solid var(--color-gray-200);
  padding: 0.4rem 1.2rem;
  border-radius: var(--radius-full);
  color: var(--color-gray-700);
  font-size: var(--font-size-sm);
  font-weight: 600;
  margin-bottom: var(--spacing-lg);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

.hero-title {
  color: var(--color-gray-900);
  font-size: clamp(2rem, 5vw, 3.75rem);
  font-weight: 800;
  margin-bottom: var(--spacing-md);
  line-height: 1.15;
}

.title-accent {
  background: linear-gradient(135deg, var(--color-primary-500), var(--color-accent-500));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-subtitle {
  color: var(--color-gray-500);
  font-size: var(--font-size-lg);
  max-width: 600px;
  margin: 0 auto var(--spacing-lg);
  line-height: 1.6;
}

/* Destination tags */
.destination-tags {
  display: flex;
  justify-content: center;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-xl);
  flex-wrap: wrap;
}

.dest-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.4rem 0.9rem;
  background: white;
  border: 1px solid var(--color-gray-200);
  border-radius: var(--radius-full);
  font-size: var(--font-size-xs);
  font-weight: 500;
  color: var(--color-gray-600);
  cursor: pointer;
  transition: all 0.2s ease;
}

.dest-tag:hover {
  border-color: var(--color-primary-300);
  background: var(--color-primary-50);
  color: var(--color-primary-700);
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(232, 93, 58, 0.1);
}

.dest-tag-emoji {
  font-size: 0.875rem;
}

/* Search Card */
.search-card {
  display: flex;
  align-items: flex-end;
  gap: 0;
  background: white;
  border: 1px solid var(--color-gray-200);
  border-radius: var(--radius-2xl);
  padding: var(--spacing-sm);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06), 0 1px 4px rgba(0, 0, 0, 0.04);
  max-width: 900px;
  margin: 0 auto;
}

.search-field {
  flex: 1;
  padding: var(--spacing-sm) var(--spacing-md);
}

.search-field label {
  display: block;
  font-size: var(--font-size-xs);
  font-weight: 700;
  color: var(--color-gray-700);
  margin-bottom: 0.25rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.search-field input,
.search-field select {
  width: 100%;
  border: none;
  font-size: var(--font-size-sm);
  color: var(--color-gray-900);
  background: transparent;
  font-family: inherit;
  padding: 0.25rem 0;
}

.search-field input:focus,
.search-field select:focus {
  outline: none;
}

.search-field input::placeholder {
  color: var(--color-gray-400);
}

.guests-field {
  min-width: 120px;
}

/* Hero stats */
.hero-stats {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xl);
  margin-top: var(--spacing-2xl);
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.125rem;
}

.stat-number {
  font-size: var(--font-size-xl);
  font-weight: 800;
  color: var(--color-gray-900);
}

.stat-label {
  font-size: var(--font-size-xs);
  color: var(--color-gray-400);
  font-weight: 500;
}

.stat-divider {
  width: 1px;
  height: 32px;
  background: var(--color-gray-200);
}

/* ===== CATEGORIES ===== */
.categories {
  padding: var(--spacing-xl) 0;
}

.category-scroll {
  display: flex;
  gap: var(--spacing-sm);
  overflow-x: auto;
  padding-bottom: var(--spacing-sm);
  scrollbar-width: none;
}

.category-scroll::-webkit-scrollbar {
  display: none;
}

.category-chip {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: 0.625rem 1.25rem;
  border: 2px solid var(--color-gray-200);
  border-radius: var(--radius-full);
  background: white;
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--color-gray-600);
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
  white-space: nowrap;
  font-family: inherit;
}

.category-chip:hover {
  border-color: var(--color-gray-300);
  background: var(--color-gray-50);
  transform: translateY(-2px);
}

.category-chip.active {
  border-color: var(--color-primary-500);
  background: var(--color-primary-50);
  color: var(--color-primary-700);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(232, 93, 58, 0.15);
}

.category-icon {
  font-size: 1.125rem;
}

/* ===== FEATURED LISTINGS ===== */
.featured {
  padding-bottom: var(--spacing-3xl);
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--spacing-xl);
}

.view-all {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  font-weight: 600;
  font-size: var(--font-size-sm);
  color: var(--color-primary-600);
  text-decoration: none;
  transition: gap var(--transition-fast);
}

.view-all:hover {
  gap: var(--spacing-sm);
}

.listings-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--spacing-lg);
}

/* Listing Card — CSS-only hover, no JS tilt */
.listing-card {
  position: relative;
  background: white;
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid var(--color-gray-100);
}

.listing-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.1), 0 4px 10px rgba(0, 0, 0, 0.04);
}

.listing-image-wrap {
  position: relative;
  overflow: hidden;
}

.listing-image {
  width: 100%;
  height: 220px;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.listing-card:hover .listing-image {
  transform: scale(1.05);
}

.listing-type {
  position: absolute;
  top: var(--spacing-md);
  left: var(--spacing-md);
}

.instant-badge {
  position: absolute;
  top: var(--spacing-md);
  right: var(--spacing-md);
  background: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: var(--radius-full);
  font-size: var(--font-size-xs);
  font-weight: 600;
  backdrop-filter: blur(10px);
}

.listing-body {
  padding: var(--spacing-md) var(--spacing-lg) var(--spacing-lg);
}

.listing-location {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: var(--font-size-xs);
  color: var(--color-gray-500);
  margin-bottom: var(--spacing-xs);
}

.listing-title {
  font-size: var(--font-size-base);
  font-weight: 700;
  color: var(--color-gray-900);
  margin-bottom: var(--spacing-xs);
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.listing-meta {
  display: flex;
  gap: var(--spacing-xs);
  font-size: var(--font-size-xs);
  color: var(--color-gray-400);
  margin-bottom: var(--spacing-md);
}

.listing-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: var(--spacing-md);
  border-top: 1px solid var(--color-gray-100);
}

.listing-price {
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
}

.price {
  font-size: var(--font-size-lg);
  font-weight: 800;
  color: var(--color-gray-900);
}

.per-night {
  font-size: var(--font-size-xs);
  color: var(--color-gray-500);
}

.listing-rating {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: var(--font-size-sm);
  font-weight: 600;
}

.review-count {
  font-weight: 400;
  color: var(--color-gray-400);
}

/* Skeleton */
.listing-card-skeleton {
  border-radius: var(--radius-xl);
  overflow: hidden;
  background: white;
  border: 1px solid var(--color-gray-100);
}

.skeleton-image {
  height: 220px;
  border-radius: 0;
}

.skeleton-content {
  padding: var(--spacing-md) var(--spacing-lg) var(--spacing-lg);
}

.skeleton-title {
  height: 20px;
  width: 80%;
  margin-bottom: var(--spacing-sm);
}

.skeleton-text {
  height: 14px;
  width: 50%;
  margin-bottom: var(--spacing-md);
}

.skeleton-price {
  height: 24px;
  width: 30%;
}

/* ===== HOW IT WORKS ===== */
.how-it-works {
  padding: var(--spacing-4xl) 0;
  background: var(--color-gray-50);
}

.steps-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-xl);
}

.step-card {
  text-align: center;
  padding: var(--spacing-xl);
  border-radius: var(--radius-xl);
  background: white;
  border: 1px solid var(--color-gray-100);
  transition: all 0.3s ease;
}

.step-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
}

.step-icon-wrap {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  margin-bottom: var(--spacing-md);
}

.step-icon {
  font-size: 3rem;
  position: relative;
  z-index: 1;
}

.step-number {
  position: absolute;
  top: -4px;
  right: -4px;
  width: 24px;
  height: 24px;
  background: var(--color-primary-500);
  color: white;
  border-radius: 50%;
  font-size: 12px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(232, 93, 58, 0.4);
}

.step-card h4 {
  margin-bottom: var(--spacing-sm);
  font-size: var(--font-size-xl);
}

.step-card p {
  color: var(--color-gray-500);
  font-size: var(--font-size-sm);
  max-width: 250px;
  margin: 0 auto;
}

/* ===== CTA ===== */
.cta {
  position: relative;
  padding: var(--spacing-4xl) 0;
  background: linear-gradient(135deg, #6e2417, var(--color-primary-500), var(--color-accent-500));
  overflow: hidden;
}

.cta-heading {
  color: white;
  font-size: var(--font-size-3xl);
  margin-bottom: var(--spacing-md);
}

.cta-text {
  color: rgba(255, 255, 255, 0.85);
  font-size: var(--font-size-lg);
  margin-bottom: var(--spacing-xl);
}

.cta-btn {
  background: rgba(255, 255, 255, 0.95) !important;
  color: var(--color-primary-700) !important;
  border: none !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15) !important;
  font-weight: 700 !important;
}

/* ===== ANIMATIONS ===== */
.slide-up {
  opacity: 0;
  transform: translateY(24px);
  animation: slide-up-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.delay-1 {
  animation-delay: 0.15s;
}

.delay-2 {
  animation-delay: 0.3s;
}

.delay-3 {
  animation-delay: 0.45s;
}

@keyframes slide-up-in {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ===== RESPONSIVE ===== */
@media (max-width: 768px) {
  .hero {
    min-height: auto;
  }

  .hero-content {
    padding: var(--spacing-3xl) 0 var(--spacing-2xl);
  }

  .search-card {
    flex-direction: column;
    border-radius: var(--radius-xl);
  }

  .search-field {
    border-bottom: 1px solid var(--color-gray-100);
    width: 100%;
  }

  .steps-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-lg);
  }

  .hero-stats {
    gap: var(--spacing-lg);
  }

  .destination-tags {
    gap: var(--spacing-xs);
  }
}
</style>
