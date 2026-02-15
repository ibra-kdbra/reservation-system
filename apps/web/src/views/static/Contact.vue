<template>
    <div class="static-page">
        <div class="container">
            <div class="content-wrapper">
                <h1 class="page-title">Contact Us</h1>
                <p class="lead">We're here to help. Reach out to us anytime.</p>

                <div class="grid">
                    <div class="contact-card">
                        <div class="icon">💬</div>
                        <h3>Chat with us</h3>
                        <p>Our support team is available 24/7 via live chat.</p>
                        <button class="btn btn-primary">Start Chat</button>
                    </div>

                    <div class="contact-card">
                        <div class="icon">📧</div>
                        <h3>Email Support</h3>
                        <p>Send us an email and we'll get back to you within 24 hours.</p>
                        <a href="mailto:support@nestasia.com" class="link">support@nestasia.com</a>
                    </div>

                    <div class="contact-card">
                        <div class="icon">📞</div>
                        <h3>Phone Support</h3>
                        <p>Available 9AM - 6PM (SGT) for urgent inquiries.</p>
                        <a href="tel:+6512345678" class="link">+65 1234 5678</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.static-page {
    padding: 4rem 0;
    background: var(--color-gray-50);
    min-height: 80vh;
}

.content-wrapper {
    max-width: 1000px;
    margin: 0 auto;
}

.page-title {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: var(--color-gray-900);
    text-align: center;
}

.lead {
    font-size: 1.25rem;
    color: var(--color-gray-600);
    margin-bottom: 4rem;
    text-align: center;
}

.grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
}

.contact-card {
    background: white;
    padding: 2rem;
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-sm);
    text-align: center;
    transition: transform 0.2s;
}

.contact-card:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-md);
}

.icon {
    font-size: 3rem;
    margin-bottom: 1rem;
}

.contact-card h3 {
    margin-bottom: 0.5rem;
    color: var(--color-gray-900);
}

.contact-card p {
    color: var(--color-gray-600);
    margin-bottom: 1.5rem;
}

.link {
    color: var(--color-primary-600);
    font-weight: 600;
    text-decoration: none;
}

.btn {
    width: 100%;
    justify-content: center;
}
</style>
