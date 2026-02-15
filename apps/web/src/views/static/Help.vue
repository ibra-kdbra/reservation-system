<template>
    <div class="static-page">
        <div class="container">
            <h1 class="page-title text-center">How can we help?</h1>

            <div class="search-wrap">
                <input type="text" placeholder="Search for help articles..." class="help-search" />
            </div>

            <div class="help-grid">
                <div class="help-category">
                    <h3>Guest Basics</h3>
                    <ul>
                        <li><button class="help-link" @click="openArticle('booking')">How to book a place</button></li>
                        <li><button class="help-link" @click="openArticle('cancellation')">Canceling your trip</button>
                        </li>
                        <li><button class="help-link" @click="openArticle('payment')">Payment methods</button></li>
                    </ul>
                </div>

                <div class="help-category">
                    <h3>Hosting</h3>
                    <ul>
                        <li><button class="help-link" @click="openArticle('listing')">Listing your space</button></li>
                        <li><button class="help-link" @click="openArticle('requirements')">Host requirements</button>
                        </li>
                        <li><button class="help-link" @click="openArticle('payouts')">Getting paid</button></li>
                    </ul>
                </div>

                <div class="help-category">
                    <h3>Account</h3>
                    <ul>
                        <li><button class="help-link" @click="openArticle('profile')">Profile settings</button></li>
                        <li><button class="help-link" @click="openArticle('security')">Security</button></li>
                        <li><button class="help-link" @click="openArticle('notifications')">Notifications</button></li>
                    </ul>
                </div>
            </div>

            <!-- Help Content Display -->
            <div v-if="selectedTopic" class="help-content-viewer">
                <div class="viewer-header">
                    <h2>{{ getTitle(selectedTopic) }}</h2>
                    <button @click="selectedTopic = null" class="close-viewer">Close</button>
                </div>
                <div class="viewer-body">
                    <p v-if="selectedTopic === 'booking'">To book a place, browse listings, select your dates and
                        guests, and click 'Request to Book'. Some hosts offer Instant Book, which confirms your
                        reservation immediately.</p>
                    <p v-if="selectedTopic === 'cancellation'">Cancellation policies vary by host. Check the listing
                        details before booking. You can cancel your trip from your 'My Bookings' page.</p>
                    <p v-if="selectedTopic === 'payment'">We accept major credit cards (Visa, Mastercard, Amex). All
                        payments are processed securely through our platform.</p>
                    <p v-if="selectedTopic === 'listing'">To list your space, click 'Become a Host' in the menu. You'll
                        need to provide photos, a description, and set your price and availability.</p>
                    <p v-if="selectedTopic === 'requirements'">Hosts must provide essential amenities (toilet paper,
                        soap, sheets, towels) and respond to inquiries within 24 hours.</p>
                    <p v-if="selectedTopic === 'payouts'">Payouts are sent 24 hours after your guest checks in. You can
                        receive payments via bank transfer or PayPal.</p>
                    <p
                        v-else-if="!['booking', 'cancellation', 'payment', 'listing', 'requirements', 'payouts'].includes(selectedTopic)">
                        Content for this topic is coming soon.</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const selectedTopic = ref<string | null>(null)

function openArticle(topic: string) {
    selectedTopic.value = topic
}

function getTitle(topic: string) {
    const titles: Record<string, string> = {
        booking: 'How to book a place',
        cancellation: 'Canceling your trip',
        payment: 'Payment methods',
        listing: 'Listing your space',
        requirements: 'Host requirements',
        payouts: 'Getting paid',
        profile: 'Profile settings',
        security: 'Security',
        notifications: 'Notifications'
    }
    return titles[topic] || 'Help Article'
}
</script>

<style scoped>
.static-page {
    padding: 4rem 0;
    background: white;
    min-height: 80vh;
}

.text-center {
    text-align: center;
}

.page-title {
    font-size: 2.5rem;
    margin-bottom: 2rem;
    color: var(--color-gray-900);
}

.search-wrap {
    max-width: 600px;
    margin: 0 auto 4rem;
}

.help-search {
    width: 100%;
    padding: 1rem 1.5rem;
    border: 1px solid var(--color-gray-300);
    border-radius: var(--radius-full);
    font-size: 1.125rem;
    font-family: inherit;
    box-shadow: var(--shadow-sm);
    transition: all 0.2s;
}

.help-search:focus {
    border-color: var(--color-primary-500);
    box-shadow: 0 0 0 4px var(--color-primary-100);
    outline: none;
}

.help-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 3rem;
    max-width: 1000px;
    margin: 0 auto;
}

.help-category h3 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    color: var(--color-gray-900);
}

.help-category ul {
    list-style: none;
    padding: 0;
}

.help-category li {
    margin-bottom: 1rem;
}

.help-category a {
    color: var(--color-gray-700);
    text-decoration: none;
    font-size: 1.125rem;
    transition: color 0.2s;
}

.help-category a:hover {
    color: var(--color-primary-600);
    text-decoration: underline;
}

.help-link {
    background: none;
    border: none;
    padding: 0;
    color: var(--color-gray-700);
    font-size: 1.125rem;
    cursor: pointer;
    text-align: left;
    transition: color 0.2s;
}

.help-link:hover {
    color: var(--color-primary-600);
    text-decoration: underline;
}

.help-content-viewer {
    margin-top: 3rem;
    padding: 2rem;
    background: var(--color-gray-50);
    border-radius: var(--radius-lg);
    border: 1px solid var(--color-gray-200);
    animation: slideIn 0.3s ease;
}

@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.viewer-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--color-gray-200);
}

.viewer-header h2 {
    margin: 0;
    font-size: 1.5rem;
}

.close-viewer {
    background: none;
    border: 1px solid var(--color-gray-300);
    padding: 6px 12px;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;
}

.close-viewer:hover {
    background: var(--color-gray-100);
}

.viewer-body p {
    line-height: 1.6;
    color: var(--color-gray-700);
    font-size: 1.125rem;
}
</style>
