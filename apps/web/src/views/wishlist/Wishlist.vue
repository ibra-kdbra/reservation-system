<template>
    <div class="wishlist-page">
        <div class="container">
            <div class="wishlist-header">
                <h1>My Wishlist</h1>
                <p class="wishlist-subtitle">{{ favorites.length }} saved listing{{ favorites.length !== 1 ? 's' : '' }}
                </p>
            </div>

            <!-- Loading -->
            <div v-if="loading" class="wishlist-grid">
                <div v-for="n in 4" :key="n" class="skeleton-card">
                    <div class="skeleton" style="height: 200px; border-radius: 12px"></div>
                    <div class="skeleton" style="height: 18px; width: 70%; margin-top: 12px"></div>
                    <div class="skeleton" style="height: 14px; width: 40%; margin-top: 8px"></div>
                </div>
            </div>

            <!-- Empty state -->
            <div v-else-if="favorites.length === 0" class="wishlist-empty">
                <div class="empty-icon">
                    <svg viewBox="0 0 24 24" width="64" height="64" fill="none" stroke="currentColor"
                        stroke-width="1.5">
                        <path
                            d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                    </svg>
                </div>
                <h2>No saved listings yet</h2>
                <p>Explore our collection and save the ones you love.</p>
                <router-link to="/listings/search" class="explore-btn">
                    Explore Listings
                </router-link>
            </div>

            <!-- Favorites grid -->
            <div v-else class="wishlist-grid">
                <div v-for="fav in favorites" :key="fav.id" class="wishlist-card">
                    <router-link :to="`/listings/${fav.listing.id}`" class="card-link">
                        <div class="card-image-wrap">
                            <img :src="fav.listing.images?.[0] || ''" :alt="fav.listing.title" loading="lazy" />
                            <button class="remove-btn" @click.prevent.stop="removeFavorite(fav.id)"
                                aria-label="Remove from wishlist">
                                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"
                                    stroke="currentColor" stroke-width="1">
                                    <path
                                        d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                                </svg>
                            </button>
                        </div>
                        <div class="card-info">
                            <h3>{{ fav.listing.title }}</h3>
                            <p class="card-location">{{ fav.listing.city }}, {{ fav.listing.country }}</p>
                            <p class="card-price">
                                <strong>{{ formatPrice(fav.listing.pricePerNight) }}</strong> / night
                            </p>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useWishlist } from '@/composables/useWishlist'

const { favorites, loading, fetchWishlist, removeFavorite, formatPrice } = useWishlist()

onMounted(() => {
    fetchWishlist()
})
</script>

<style scoped>
.wishlist-page {
    padding: var(--spacing-2xl) 0 var(--spacing-4xl);
    min-height: 60vh;
}

.wishlist-header {
    margin-bottom: var(--spacing-2xl);
}

.wishlist-header h1 {
    font-size: var(--font-size-3xl);
    font-weight: 800;
}

.wishlist-subtitle {
    color: var(--color-gray-500);
    margin-top: var(--spacing-xs);
}

.wishlist-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: var(--spacing-xl);
}

.skeleton-card {
    padding: 4px;
}

.skeleton {
    background: linear-gradient(90deg, var(--color-gray-100) 25%, var(--color-gray-50) 50%, var(--color-gray-100) 75%);
    background-size: 200% 100%;
    animation: skeleton-pulse 1.5s infinite;
    border-radius: var(--radius-md);
}

@keyframes skeleton-pulse {
    0% {
        background-position: 200% 0;
    }

    100% {
        background-position: -200% 0;
    }
}

.wishlist-card {
    border-radius: var(--radius-xl);
    overflow: hidden;
    border: 1px solid var(--color-gray-100);
    transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.wishlist-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08);
}

.card-link {
    text-decoration: none;
    color: inherit;
}

.card-image-wrap {
    position: relative;
    aspect-ratio: 16 / 11;
    overflow: hidden;
}

.card-image-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
}

.wishlist-card:hover .card-image-wrap img {
    transform: scale(1.03);
}

.remove-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.9);
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: var(--color-primary-500);
    transition: all 0.2s;
    backdrop-filter: blur(4px);
}

.remove-btn:hover {
    background: white;
    transform: scale(1.1);
}

.card-info {
    padding: var(--spacing-md) var(--spacing-lg) var(--spacing-lg);
}

.card-info h3 {
    font-size: var(--font-size-base);
    font-weight: 600;
    line-height: 1.3;
}

.card-location {
    color: var(--color-gray-500);
    font-size: var(--font-size-sm);
    margin-top: var(--spacing-xs);
}

.card-price {
    margin-top: var(--spacing-sm);
    font-size: var(--font-size-sm);
    color: var(--color-gray-600);
}

.card-price strong {
    font-size: var(--font-size-lg);
    color: var(--color-gray-900);
}

/* Empty state */
.wishlist-empty {
    text-align: center;
    padding: var(--spacing-4xl) var(--spacing-xl);
}

.empty-icon {
    color: var(--color-gray-300);
    margin-bottom: var(--spacing-lg);
}

.wishlist-empty h2 {
    font-size: var(--font-size-xl);
    color: var(--color-gray-700);
    margin-bottom: var(--spacing-sm);
}

.wishlist-empty p {
    color: var(--color-gray-500);
    margin-bottom: var(--spacing-xl);
}

.explore-btn {
    display: inline-flex;
    padding: 12px 28px;
    background: var(--color-primary-500);
    color: white;
    border-radius: var(--radius-xl);
    font-weight: 600;
    text-decoration: none;
    transition: background 0.2s;
}

.explore-btn:hover {
    background: var(--color-primary-600);
}
</style>
