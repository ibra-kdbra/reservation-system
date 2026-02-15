<template>
    <div class="static-page">
        <div class="container">
            <h1 class="page-title">Host Resources</h1>
            <p class="lead">Tips, guides, and tools to help you become a great host.</p>

            <div class="resource-grid">
                <!-- Article 1 -->
                <article class="resource-card">
                    <img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2000&auto=format&fit=crop"
                        alt="Designing" class="resource-img" />
                    <div class="card-body">
                        <h3>Designing your space</h3>
                        <p>How to create a welcoming atmosphere that guests will love.</p>
                        <button class="link-btn" @click="activeArticle = 1">Read article</button>
                    </div>
                </article>

                <!-- Article 2 -->
                <article class="resource-card">
                    <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2032&auto=format&fit=crop"
                        alt="Photography" class="resource-img" />
                    <div class="card-body">
                        <h3>Taking great photos</h3>
                        <p>Capture your home in the best light to attract more bookings.</p>
                        <button class="link-btn" @click="activeArticle = 2">Read article</button>
                    </div>
                </article>

                <!-- Article 3 -->
                <article class="resource-card">
                    <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop"
                        alt="Communication" class="resource-img" />
                    <div class="card-body">
                        <h3>Guest communication</h3>
                        <p>Templates and tips for responding to inquiries and requests.</p>
                        <button class="link-btn" @click="activeArticle = 3">Read article</button>
                    </div>
                </article>
            </div>

            <!-- Article Modal/Content -->
            <div v-if="activeArticle" class="article-modal-overlay" @click.self="activeArticle = null">
                <div class="article-modal">
                    <button class="close-btn" @click="activeArticle = null">×</button>
                    <div v-if="activeArticle === 1">
                        <h2>Designing your space</h2>
                        <p>Creating a welcoming environment starts with decluttering. Remove personal items so guests
                            feel like it's their own space. Add local touches—artwork, books, or a guide to your
                            neighborhood.</p>
                        <p>Lighting is key. Ensure you have warm lighting for evenings and good task lighting for
                            reading or working. Consider the flow of the room; guests should be able to move freely
                            without bumping into furniture.</p>
                    </div>
                    <div v-if="activeArticle === 2">
                        <h2>Taking great photos</h2>
                        <p>Bright, clear photos are the single most important factor in getting booked. Shoot during the
                            day with natural light. Open all curtains and turn on lights to eliminate dark corners.</p>
                        <p>Take landscape (horizontal) photos as they display best on the site. Capture the unique
                            details—the coffee maker, the view from the window, the texture of the bedding.</p>
                    </div>
                    <div v-if="activeArticle === 3">
                        <h2>Guest communication</h2>
                        <p>Quick responses matter. Aim to reply to inquiries within an hour. Set up saved replies for
                            common questions like check-in instructions or Wi-Fi passwords.</p>
                        <p>Be proactive. Send a welcome message a few days before arrival with clear directions. Check
                            in on them the morning after arrival to make sure everything is okay.</p>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeArticle = ref<number | null>(null)
</script>

<style scoped>
.static-page {
    padding: 4rem 0;
    background: var(--color-gray-50);
    min-height: 80vh;
}

.page-title {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: var(--color-gray-900);
}

.lead {
    font-size: 1.25rem;
    color: var(--color-gray-600);
    margin-bottom: 3rem;
}

.resource-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
}

.resource-card {
    background: white;
    border-radius: var(--radius-lg);
    overflow: hidden;
    box-shadow: var(--shadow-sm);
    transition: transform 0.2s;
}

.resource-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-md);
}

.resource-img {
    width: 100%;
    height: 200px;
    object-fit: cover;
}

.card-body {
    padding: 1.5rem;
}

.card-body h3 {
    margin-bottom: 0.5rem;
    font-size: 1.25rem;
}

.card-body p {
    color: var(--color-gray-600);
    margin-bottom: 1rem;
}

.card-body a {
    color: var(--color-primary-600);
    font-weight: 600;
    text-decoration: none;
}

.link-btn {
    background: none;
    border: none;
    color: var(--color-primary-600);
    font-weight: 600;
    padding: 0;
    font-size: 1rem;
    cursor: pointer;
    text-decoration: underline;
}

.article-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 1rem;
}

.article-modal {
    background: white;
    padding: 2rem;
    border-radius: var(--radius-lg);
    max-width: 600px;
    width: 100%;
    position: relative;
    max-height: 80vh;
    overflow-y: auto;
}

.close-btn {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--color-gray-500);
}

.article-modal h2 {
    margin-top: 0;
    margin-bottom: 1rem;
}

.article-modal p {
    line-height: 1.6;
    color: var(--color-gray-700);
    margin-bottom: 1rem;
}
</style>
